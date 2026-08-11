import { apiError, apiSuccess } from '@/lib/api/response';
import { requireAdmin } from '@/lib/auth/require-admin';
import { getAdminLanding } from '@/db/queries/landing';

export async function GET(request: Request) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const document = await getAdminLanding('home');
    return apiSuccess(request, document, {
      message: 'Admin landing page document retrieved',
    });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to load landing page document',
      statusCode: 500,
      error,
    });
  }
}
