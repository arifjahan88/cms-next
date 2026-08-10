import { apiSuccess } from '@/lib/api/response';
import { clearSessionCookie } from '@/lib/auth/session';

export async function POST(request: Request) {
  await clearSessionCookie();
  return apiSuccess(request, { ok: true as const });
}
