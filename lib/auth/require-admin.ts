import { apiError } from '@/lib/api/response';
import {
  canWriteDashboard,
  isDashboardRole,
} from '@/lib/auth/roles';
import { getSession, type SessionPayload } from '@/lib/auth/session';

export type RequireAuthResult =
  | { ok: true; session: SessionPayload }
  | { ok: false; response: ReturnType<typeof apiError> };

/** Authenticated dashboard user (Admin or User) — use for GET. */
export async function requireDashboardSession(
  request: Request
): Promise<RequireAuthResult> {
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

  if (!isDashboardRole(session.role)) {
    return {
      ok: false,
      response: apiError(request, {
        message: 'Dashboard access required',
        statusCode: 403,
      }),
    };
  }

  return { ok: true, session };
}

/** Admin-only write access — use for POST / PATCH / DELETE. */
export async function requireDashboardWrite(
  request: Request
): Promise<RequireAuthResult> {
  const auth = await requireDashboardSession(request);
  if (!auth.ok) return auth;

  if (!canWriteDashboard(auth.session.role)) {
    return {
      ok: false,
      response: apiError(request, {
        message:
          'You cannot create, edit, or delete anything. View-only access.',
        statusCode: 403,
      }),
    };
  }

  return auth;
}

/** @deprecated Prefer requireDashboardWrite for mutations. */
export async function requireAdmin(
  request: Request
): Promise<RequireAuthResult> {
  return requireDashboardWrite(request);
}

export type RequireAdminResult = RequireAuthResult;
