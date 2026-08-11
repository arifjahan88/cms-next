import { apiError, apiSuccess } from '@/lib/api/response';
import { requireAdmin } from '@/lib/auth/require-admin';
import { getAdminMenus } from '@/db/queries/navigation';

export async function GET(request: Request) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const menus = await getAdminMenus();
    return apiSuccess(request, menus, {
      message: 'Admin navigation menus retrieved',
    });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to load navigation menus',
      statusCode: 500,
      error,
    });
  }
}
