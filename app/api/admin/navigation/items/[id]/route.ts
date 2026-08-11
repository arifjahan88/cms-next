import { eq } from 'drizzle-orm';
import { db } from '@/db';
import {
  fetchItemsForMenu,
  serializeMenuItem,
  toDbStatus,
  touchMenu,
} from '@/db/queries/navigation';
import { navMenuItems, navMenus } from '@/db/schema';
import { apiError, apiSuccess } from '@/lib/api/response';
import { requireDashboardWrite } from '@/lib/auth/require-admin';
import { revalidateNavigation } from '@/lib/navigation/revalidate';
import { updateMenuItemSchema } from '@/lib/validations/navigation';

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireDashboardWrite(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = updateMenuItemSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(request, {
        message: 'Invalid menu item data',
        statusCode: 400,
        error: parsed.error.flatten(),
      });
    }

    const [existing] = await db.select().from(navMenuItems).where(eq(navMenuItems.id, id)).limit(1);

    if (!existing) {
      return apiError(request, {
        message: 'Menu item not found',
        statusCode: 404,
      });
    }

    const data = parsed.data;
    const openIn = data.openIn ?? existing.openIn;
    let rel = data.rel !== undefined ? data.rel : existing.rel;

    if (openIn === 'new' && !rel) {
      rel = 'noopener noreferrer';
    }

    const [updated] = await db
      .update(navMenuItems)
      .set({
        ...(data.label !== undefined ? { label: data.label } : {}),
        ...(data.href !== undefined ? { href: data.href } : {}),
        ...(data.icon !== undefined ? { icon: data.icon } : {}),
        ...(data.status !== undefined ? { status: toDbStatus(data.status) } : {}),
        ...(data.openIn !== undefined ? { openIn: data.openIn } : {}),
        ...(data.visible !== undefined ? { visible: data.visible } : {}),
        ...(data.cssClass !== undefined ? { cssClass: data.cssClass } : {}),
        ...(data.rel !== undefined || (openIn === 'new' && !existing.rel) ? { rel } : {}),
        ...(data.description !== undefined ? { description: data.description } : {}),
        updatedAt: new Date(),
      })
      .where(eq(navMenuItems.id, id))
      .returning();

    await touchMenu(existing.menuId);

    const [menu] = await db
      .select({ slug: navMenus.slug })
      .from(navMenus)
      .where(eq(navMenus.id, existing.menuId))
      .limit(1);

    if (menu) revalidateNavigation(menu.slug);

    const allItems = await fetchItemsForMenu(existing.menuId);
    const children = allItems
      .filter((row) => row.parentId === updated!.id)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((row) => {
        const child = serializeMenuItem(row);
        child.children = [];
        return child;
      });

    const item = serializeMenuItem(updated!);
    item.children = children;

    return apiSuccess(request, item, { message: 'Menu item updated' });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to update menu item',
      statusCode: 500,
      error,
    });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const auth = await requireDashboardWrite(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;

    const [existing] = await db.select().from(navMenuItems).where(eq(navMenuItems.id, id)).limit(1);

    if (!existing) {
      return apiError(request, {
        message: 'Menu item not found',
        statusCode: 404,
      });
    }

    await db.delete(navMenuItems).where(eq(navMenuItems.id, id));
    await touchMenu(existing.menuId);

    const [menu] = await db
      .select({ slug: navMenus.slug })
      .from(navMenus)
      .where(eq(navMenus.id, existing.menuId))
      .limit(1);

    if (menu) revalidateNavigation(menu.slug);

    return apiSuccess(request, { id }, { message: 'Menu item deleted' });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to delete menu item',
      statusCode: 500,
      error,
    });
  }
}
