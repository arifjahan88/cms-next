import { apiError } from '@/lib/api/response';
import { isAdminRole } from '@/lib/auth/roles';
import { getSession, type SessionPayload } from '@/lib/auth/session';

export type RequireAdminResult =
  { ok: true; session: SessionPayload } | { ok: false; response: ReturnType<typeof apiError> };

export async function requireAdmin(request: Request): Promise<RequireAdminResult> {
  const session = await getSession();

  if (!session) {
    return {
      ok: false,
      response: apiError(request, {
        message: 'Authentication required',
        statusCode: 401,
      }),
    };
  }

  if (!isAdminRole(session.role)) {
    return {
      ok: false,
      response: apiError(request, {
        message: 'Admin access required',
        statusCode: 403,
      }),
    };
  }

  return { ok: true, session };
}
