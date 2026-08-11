import { listContactMessages } from '@/db/queries/contact-messages';
import { apiError, apiSuccess } from '@/lib/api/response';
import { requireAdmin } from '@/lib/auth/require-admin';

export async function GET(request: Request) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const messages = await listContactMessages();
    return apiSuccess(request, messages, { message: 'Contact messages retrieved' });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to load contact messages',
      statusCode: 500,
      error,
    });
  }
}
