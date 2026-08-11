import { fetchMenuBySlug, reorderSiblingItems } from '@/db/queries/navigation';
import { apiError, apiSuccess } from '@/lib/api/response';
import { requireDashboardWrite } from '@/lib/auth/require-admin';
import { revalidateNavigation } from '@/lib/navigation/revalidate';
import { navMenuSlugSchema, reorderMenuItemsSchema } from '@/lib/validations/navigation';

type Params = { params: Promise<{ slug: string }> };

export async function PUT(request: Request, { params }: Params) {
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
    const parsed = reorderMenuItemsSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(request, {
        message: 'Invalid reorder payload',
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

    const { parentId, orderedIds } = parsed.data;
    await reorderSiblingItems(menu.id, parentId, orderedIds);
    revalidateNavigation(slugParsed.data);

    return apiSuccess(request, { orderedIds }, { message: 'Menu items reordered' });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to reorder menu items',
      statusCode: 500,
      error,
    });
  }
}
