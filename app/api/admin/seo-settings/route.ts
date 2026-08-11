import { getAllPageSeo } from '@/db/queries/page-seo';
import { apiError, apiSuccess } from '@/lib/api/response';
import { requireDashboardSession } from '@/lib/auth/require-admin';

export async function GET(request: Request) {
  const auth = await requireDashboardSession(request);
  if (!auth.ok) return auth.response;

  try {
    const rows = await getAllPageSeo();
    return apiSuccess(request, rows, { message: 'SEO settings retrieved' });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to load SEO settings',
      statusCode: 500,
      error,
    });
  }
}
