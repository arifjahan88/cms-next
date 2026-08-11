import { apiError, apiSuccess } from '@/lib/api/response';
import { getPublicMenu } from '@/db/queries/navigation';
import { navMenuSlugSchema } from '@/lib/validations/navigation';

type Params = { params: Promise<{ slug: string }> };

export async function GET(request: Request, { params }: Params) {
  try {
    const { slug } = await params;
    const parsed = navMenuSlugSchema.safeParse(slug);

    if (!parsed.success) {
      return apiError(request, {
        message: 'Invalid menu slug',
        statusCode: 400,
        error: parsed.error.flatten(),
      });
    }

    const menu = await getPublicMenu(parsed.data);
    if (!menu) {
      return apiError(request, {
        message: 'Menu not found or not published',
        statusCode: 404,
      });
    }

    return apiSuccess(request, menu, {
      message: 'Navigation menu retrieved',
    });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to load navigation menu',
      statusCode: 500,
      error,
    });
  }
}
