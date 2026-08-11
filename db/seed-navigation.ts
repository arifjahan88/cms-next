import { count, eq } from 'drizzle-orm';
import { footerLinks, mainNav } from '@/features/layout/data/nav';
import { db } from './index';
import { navMenuItems, navMenus, type NewNavMenuItem } from './schema';

const ICON_BY_LABEL: Record<string, string> = {
  Home: 'globe',
  Services: 'briefcase',
  Industries: 'building',
  Technologies: 'layers',
  Portfolio: 'eye',
  'Case Studies': 'eye',
  Blog: 'message',
  'About Us': 'users',
  Careers: 'briefcase',
  'Contact Us': 'mail',
  Contact: 'mail',
};

type SeedItem = {
  label: string;
  href: string;
  icon?: string;
  description?: string;
  children?: SeedItem[];
};

function buildMainSeedItems(): SeedItem[] {
  const fromSite = mainNav.map((item) => ({
    label: item.title,
    href: item.href,
    icon: ICON_BY_LABEL[item.title] ?? 'layers',
    children: item.children?.map((c) => ({
      label: c.title,
      href: c.href,
      description: c.description,
    })),
  }));

  return [
    { label: 'Home', href: '/', icon: 'globe' },
    ...fromSite,
    { label: 'Contact Us', href: '/contact', icon: 'mail' },
  ];
}

function buildFooterSeedItems(): SeedItem[] {
  return (Object.entries(footerLinks) as [string, { title: string; href: string }[]][]).map(
    ([column, links]) => ({
      label: column.charAt(0).toUpperCase() + column.slice(1),
      href: '#',
      icon: 'layers',
      children: links.map((l) => ({
        label: l.title,
        href: l.href,
      })),
    })
  );
}

const SYSTEM_MENUS = [
  {
    slug: 'main' as const,
    title: 'Main Menu',
    description: 'Primary navigation menu',
    sortOrder: 0,
    items: buildMainSeedItems,
  },
  {
    slug: 'footer' as const,
    title: 'Footer Menu',
    description: 'Footer navigation menu',
    sortOrder: 1,
    items: buildFooterSeedItems,
  },
  {
    slug: 'mobile' as const,
    title: 'Mobile Menu',
    description: 'Mobile navigation menu',
    sortOrder: 2,
    items: buildMainSeedItems,
  },
];

async function insertItemTree(menuId: string, items: SeedItem[], parentId: string | null = null) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]!;
    const values: NewNavMenuItem = {
      menuId,
      parentId,
      label: item.label,
      href: item.href,
      icon: item.icon ?? 'layers',
      status: 'published',
      openIn: 'same',
      visible: true,
      description: item.description ?? null,
      sortOrder: i,
    };

    const [inserted] = await db.insert(navMenuItems).values(values).returning();
    if (inserted && item.children?.length) {
      await insertItemTree(menuId, item.children, inserted.id);
    }
  }
}

export async function seedNavigation() {
  for (const def of SYSTEM_MENUS) {
    const [existing] = await db.select().from(navMenus).where(eq(navMenus.slug, def.slug)).limit(1);

    let menuId = existing?.id;

    if (!existing) {
      const [created] = await db
        .insert(navMenus)
        .values({
          slug: def.slug,
          title: def.title,
          description: def.description,
          status: 'published',
          isSystem: true,
          sortOrder: def.sortOrder,
        })
        .returning();
      menuId = created!.id;
      console.log(`Seeded menu: ${def.slug}`);
    } else {
      console.log(`Menu already exists: ${def.slug}`);
    }

    if (!menuId) continue;

    const [itemCount] = await db
      .select({ count: count() })
      .from(navMenuItems)
      .where(eq(navMenuItems.menuId, menuId));

    if ((itemCount?.count ?? 0) > 0) {
      console.log(`Skipping items for ${def.slug} (already seeded)`);
      continue;
    }

    await insertItemTree(menuId, def.items());
    console.log(`Seeded items for menu: ${def.slug}`);
  }
}
