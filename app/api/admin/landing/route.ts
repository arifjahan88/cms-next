import { getAdminPage, getAdminLanding } from '@/db/queries/landing';
import { apiError, apiSuccess } from '@/lib/api/response';
import { requireDashboardSession } from '@/lib/auth/require-admin';
import { pageSlugSchema } from '@/lib/validations/landing';

function resolvePageSlug(request: Request) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') ?? 'home';
  const parsed = pageSlugSchema.safeParse(page);
  if (!parsed.success) return null;
  return parsed.data;
}

export async function GET(request: Request) {
  const auth = await requireDashboardSession(request);
  if (!auth.ok) return auth.response;

  try {
    const pageSlug = resolvePageSlug(request);
    if (!pageSlug) {
      return apiError(request, {
        message: 'Invalid page slug',
        statusCode: 400,
      });
    }

    const document =
      pageSlug === 'home' ? await getAdminLanding(pageSlug) : await getAdminPage(pageSlug);

    return apiSuccess(request, document, {
      message: 'Admin page document retrieved',
    });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to load page document',
      statusCode: 500,
      error,
    });
  }
}
