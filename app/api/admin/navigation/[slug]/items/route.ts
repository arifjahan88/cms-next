import { db } from '@/db';
import {
  assertParentIsRoot,
  fetchMenuBySlug,
  getNextSortOrder,
  serializeMenuItem,
  toDbStatus,
  touchMenu,
} from '@/db/queries/navigation';
import { navMenuItems } from '@/db/schema';
import { apiError, apiSuccess } from '@/lib/api/response';
import { requireDashboardWrite } from '@/lib/auth/require-admin';
import { revalidateNavigation } from '@/lib/navigation/revalidate';
import { createMenuItemSchema, navMenuSlugSchema } from '@/lib/validations/navigation';

type Params = { params: Promise<{ slug: string }> };

export async function POST(request: Request, { params }: Params) {
  const auth = await requireDashboardWrite(request);
  if (!auth.ok) return auth.response;

  try {
    const { slug } = await params;
    const slugParsed = navMenuSlugSchema.safeParse(slug);
    if (!slugParsed.success) {
      return apiError(request, {
        message: 'Invalid menu slug',
        statusCode: 400,
        error: slugParsed.error.flatten(),
      });
    }

    const body = await request.json();
    const parsed = createMenuItemSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(request, {
        message: 'Invalid menu item data',
        statusCode: 400,
        error: parsed.error.flatten(),
      });
    }

    const menu = await fetchMenuBySlug(slugParsed.data);
    if (!menu) {
      return apiError(request, {
        message: 'Menu not found',
        statusCode: 404,
      });
    }

    const data = parsed.data;
    const parentId = data.parentId ?? null;

    if (parentId) {
      const ok = await assertParentIsRoot(menu.id, parentId);
      if (!ok) {
        return apiError(request, {
          message: 'Submenus can only be added under top-level items (max depth 2)',
          statusCode: 400,
        });
      }
    }

    const sortOrder = await getNextSortOrder(menu.id, parentId);
    const openIn = data.openIn ?? 'same';
    const rel = data.rel ?? (openIn === 'new' ? 'noopener noreferrer' : null);

    const [inserted] = await db
      .insert(navMenuItems)
      .values({
        menuId: menu.id,
        parentId,
        label: data.label,
        href: data.href,
        icon: data.icon ?? 'layers',
        status: toDbStatus(data.status ?? 'Draft'),
        openIn,
        visible: data.visible ?? true,
        cssClass: data.cssClass ?? null,
        rel,
        description: data.description ?? null,
        sortOrder,
      })
      .returning();

    await touchMenu(menu.id);
    revalidateNavigation(slugParsed.data);

    const item = serializeMenuItem(inserted!);
    item.children = [];

    return apiSuccess(request, item, {
      message: 'Menu item created',
      statusCode: 201,
    });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to create menu item',
      statusCode: 500,
      error,
    });
  }
}
