import { eq } from 'drizzle-orm';
import { db } from '@/db';
import {
  fetchItemsForMenu,
  fetchMenuBySlug,
  serializeMenu,
  toDbStatus,
} from '@/db/queries/navigation';
import { navMenus } from '@/db/schema';
import { apiError, apiSuccess } from '@/lib/api/response';
import { requireAdmin } from '@/lib/auth/require-admin';
import { revalidateNavigation } from '@/lib/navigation/revalidate';
import {
  navMenuSlugSchema,
  updateMenuSchema,
} from '@/lib/validations/navigation';

type Params = { params: Promise<{ slug: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireAdmin(request);
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
    const parsed = updateMenuSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(request, {
        message: 'Invalid menu data',
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

    const patch = parsed.data;
    const [updated] = await db
      .update(navMenus)
      .set({
        ...(patch.title !== undefined ? { title: patch.title } : {}),
        ...(patch.description !== undefined
          ? { description: patch.description }
          : {}),
        ...(patch.status !== undefined
          ? { status: toDbStatus(patch.status) }
          : {}),
        updatedAt: new Date(),
      })
      .where(eq(navMenus.id, menu.id))
      .returning();

    const items = await fetchItemsForMenu(menu.id);
    const serialized = serializeMenu(updated!, items);
    revalidateNavigation(slugParsed.data);

    return apiSuccess(request, serialized, {
      message: 'Menu updated',
    });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to update menu',
      statusCode: 500,
      error,
    });
  }
}
