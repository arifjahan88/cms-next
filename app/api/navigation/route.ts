import { apiError, apiSuccess } from '@/lib/api/response';
import { getPublicMenus } from '@/db/queries/navigation';
import { navMenuSlugSchema } from '@/lib/validations/navigation';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slugParam = searchParams.get('slug');

    if (slugParam) {
      const parsed = navMenuSlugSchema.safeParse(slugParam);
      if (!parsed.success) {
        return apiError(request, {
          message: 'Invalid menu slug',
          statusCode: 400,
          error: parsed.error.flatten(),
        });
      }
    }

    const menus = await getPublicMenus(slugParam ?? undefined);
    return apiSuccess(request, menus, {
      message: 'Navigation menus retrieved',
    });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to load navigation',
      statusCode: 500,
      error,
    });
  }
}
