import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { UserRole, users } from '@/db/schema';
import { apiError, apiSuccess } from '@/lib/api/response';
import { verifyPassword } from '@/lib/auth/password';
import { isDashboardRole } from '@/lib/auth/roles';
import { createSessionToken, setSessionCookie } from '@/lib/auth/session';
import { adminLoginSchema } from '@/lib/validations/forms';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = adminLoginSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(request, {
        message: 'Invalid email or password',
        statusCode: 400,
        error: parsed.error.flatten(),
      });
    }

    const { email, password, remember } = parsed.data;

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    if (!user) {
      return apiError(request, {
        message: 'Invalid email or password',
        statusCode: 401,
      });
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return apiError(request, {
        message: 'Invalid email or password',
        statusCode: 401,
      });
    }

    if (!isDashboardRole(user.role)) {
      return apiError(request, {
        message: 'Dashboard access required',
        statusCode: 403,
      });
    }

    const role = user.role === UserRole.Admin ? UserRole.Admin : UserRole.User;

    const token = await createSessionToken(
      {
        sub: user.id,
        email: user.email,
        name: user.name,
        role,
      },
      remember === true
    );

    await setSessionCookie(token, remember === true);

    return apiSuccess(request, {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.log('Login error:', error);
    return apiError(request, {
      message: 'Unable to sign in. Please try again.',
      statusCode: 500,
      error,
    });
  }
}
