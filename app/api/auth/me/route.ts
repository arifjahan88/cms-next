import { apiError, apiSuccess } from '@/lib/api/response';
import { getSession } from '@/lib/auth/session';

export async function GET(request: Request) {
  const session = await getSession();

  if (!session) {
    return apiError(request, {
      message: 'Unauthorized',
      statusCode: 401,
    });
  }

  return apiSuccess(request, {
    user: {
      id: session.sub,
      email: session.email,
      name: session.name,
      role: session.role,
    },
  });
}
