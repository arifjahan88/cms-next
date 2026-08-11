import { and, asc, eq, isNull, max, sql } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';
import { db } from '@/db';
import { navMenuItems, navMenus, type NavMenuItemRow, type NavMenuRow } from '@/db/schema';
import type { MenuItem, MenuItemStatus, NavMenu } from '@/features/dashboard/data/navigation-cms';

export const NAVIGATION_CACHE_TAG = 'navigation';

export function navigationSlugTag(slug: string) {
  return `navigation:${slug}`;
}

function toUiStatus(status: string): MenuItemStatus {
  return status.toLowerCase() === 'published' ? 'Published' : 'Draft';
}

function toDbStatus(status: MenuItemStatus | string): 'published' | 'draft' {
  return status.toLowerCase() === 'published' ? 'published' : 'draft';
}

function formatUpdatedAt(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`;
  return date.toLocaleDateString();
}

function resolveRel(openIn: string, rel: string | null | undefined): string | undefined {
  if (rel) return rel;
  if (openIn === 'new') return 'noopener noreferrer';
  return undefined;
}

export function serializeMenuItem(row: NavMenuItemRow): MenuItem {
  const openIn = row.openIn === 'new' ? 'new' : 'same';
  return {
    id: row.id,
    label: row.label,
    href: row.href,
    icon: row.icon ?? undefined,
    status: toUiStatus(row.status),
    openIn,
    visible: row.visible,
    cssClass: row.cssClass ?? undefined,
    rel: resolveRel(openIn, row.rel),
    description: row.description ?? undefined,
    children: [],
  };
}

export function buildItemTree(rows: NavMenuItemRow[], opts?: { publicOnly?: boolean }): MenuItem[] {
  const filtered = opts?.publicOnly
    ? rows.filter((row) => row.status.toLowerCase() === 'published' && row.visible === true)
    : rows;

  const byParent = new Map<string | null, NavMenuItemRow[]>();
  for (const row of filtered) {
    const key = row.parentId ?? null;
    const list = byParent.get(key) ?? [];
    list.push(row);
    byParent.set(key, list);
  }

  for (const list of byParent.values()) {
    list.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  function childrenOf(parentId: string | null): MenuItem[] {
    return (byParent.get(parentId) ?? []).map((row) => {
      const item = serializeMenuItem(row);
      // Max depth 2: only attach children for root items
      if (parentId === null) {
        item.children = childrenOf(row.id);
      }
      return item;
    });
  }

  return childrenOf(null);
}

export function serializeMenu(
  menu: NavMenuRow,
  items: NavMenuItemRow[],
  opts?: { publicOnly?: boolean }
): NavMenu {
  return {
    id: menu.id,
    slug: menu.slug,
    title: menu.title,
    description: menu.description,
    status: toUiStatus(menu.status),
    updatedAt: formatUpdatedAt(menu.updatedAt),
    items: buildItemTree(items, opts),
  };
}

export async function fetchMenuBySlug(slug: string) {
  const [menu] = await db.select().from(navMenus).where(eq(navMenus.slug, slug)).limit(1);
  return menu ?? null;
}

export async function fetchAllMenus() {
  return db.select().from(navMenus).orderBy(asc(navMenus.sortOrder));
}

export async function fetchItemsForMenu(menuId: string) {
  return db
    .select()
    .from(navMenuItems)
    .where(eq(navMenuItems.menuId, menuId))
    .orderBy(asc(navMenuItems.sortOrder));
}

export async function getAdminMenus(): Promise<NavMenu[]> {
  const menus = await fetchAllMenus();
  const result: NavMenu[] = [];
  for (const menu of menus) {
    const items = await fetchItemsForMenu(menu.id);
    result.push(serializeMenu(menu, items));
  }
  return result;
}

async function loadPublicMenu(slug: string): Promise<NavMenu | null> {
  const menu = await fetchMenuBySlug(slug);
  if (!menu) return null;
  if (menu.status.toLowerCase() !== 'published') return null;
  const items = await fetchItemsForMenu(menu.id);
  return serializeMenu(menu, items, { publicOnly: true });
}

export function getPublicMenu(slug: string) {
  return unstable_cache(() => loadPublicMenu(slug), [`public-nav-menu-${slug}`], {
    tags: [NAVIGATION_CACHE_TAG, navigationSlugTag(slug)],
  })();
}

export async function getPublicMenus(slug?: string): Promise<NavMenu[]> {
  if (slug) {
    const menu = await getPublicMenu(slug);
    return menu ? [menu] : [];
  }
  const menus = await fetchAllMenus();
  const result: NavMenu[] = [];
  for (const menu of menus) {
    if (menu.status.toLowerCase() !== 'published') continue;
    const items = await fetchItemsForMenu(menu.id);
    result.push(serializeMenu(menu, items, { publicOnly: true }));
  }
  return result;
}

export async function getNextSortOrder(menuId: string, parentId: string | null) {
  const conditions = [
    eq(navMenuItems.menuId, menuId),
    parentId === null ? isNull(navMenuItems.parentId) : eq(navMenuItems.parentId, parentId),
  ];

  const [row] = await db
    .select({ maxSort: max(navMenuItems.sortOrder) })
    .from(navMenuItems)
    .where(and(...conditions));

  return (row?.maxSort ?? -1) + 1;
}

export { toDbStatus, toUiStatus };

export async function touchMenu(menuId: string) {
  await db.update(navMenus).set({ updatedAt: new Date() }).where(eq(navMenus.id, menuId));
}

export async function reorderSiblingItems(
  menuId: string,
  parentId: string | null,
  orderedIds: string[]
) {
  await db.transaction(async (tx) => {
    for (let i = 0; i < orderedIds.length; i++) {
      const id = orderedIds[i]!;
      await tx
        .update(navMenuItems)
        .set({ sortOrder: i, updatedAt: new Date() })
        .where(
          and(
            eq(navMenuItems.id, id),
            eq(navMenuItems.menuId, menuId),
            parentId === null ? isNull(navMenuItems.parentId) : eq(navMenuItems.parentId, parentId)
          )
        );
    }
    await tx.update(navMenus).set({ updatedAt: new Date() }).where(eq(navMenus.id, menuId));
  });
}

/** Returns true if parentId is a root item in the menu (depth allows children). */
export async function assertParentIsRoot(menuId: string, parentId: string): Promise<boolean> {
  const [parent] = await db
    .select()
    .from(navMenuItems)
    .where(and(eq(navMenuItems.id, parentId), eq(navMenuItems.menuId, menuId)))
    .limit(1);

  if (!parent) return false;
  return parent.parentId === null;
}

export async function countMenus() {
  const [row] = await db.select({ count: sql<number>`count(*)::int` }).from(navMenus);
  return row?.count ?? 0;
}
