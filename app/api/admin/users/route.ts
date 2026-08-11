import {
  createUser,
  getUserByEmail,
  listUsers,
} from '@/db/queries/users';
import { apiError, apiSuccess } from '@/lib/api/response';
import { hashPassword } from '@/lib/auth/password';
import {
  requireDashboardSession,
  requireDashboardWrite,
} from '@/lib/auth/require-admin';
import { UserRole } from '@/lib/auth/roles';
import { userCreateSchema } from '@/lib/validations/users';

export async function GET(request: Request) {
  const auth = await requireDashboardSession(request);
  if (!auth.ok) return auth.response;

  try {
    const items = await listUsers();
    return apiSuccess(request, items, { message: 'Users retrieved' });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to load users',
      statusCode: 500,
      error,
    });
  }
}

export async function POST(request: Request) {
  const auth = await requireDashboardWrite(request);
  if (!auth.ok) return auth.response;

  try {
    const body = await request.json();
    const parsed = userCreateSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(request, {
        message: 'Invalid user data',
        statusCode: 400,
        error: parsed.error.flatten(),
      });
    }

    const existing = await getUserByEmail(parsed.data.email);
    if (existing) {
      return apiError(request, {
        message: 'A user with this email already exists',
        statusCode: 409,
      });
    }

    const passwordHash = await hashPassword(parsed.data.password);
    const user = await createUser({
      email: parsed.data.email,
      name: parsed.data.name,
      passwordHash,
      role: parsed.data.role as typeof UserRole.Admin | typeof UserRole.User,
    });

    return apiSuccess(request, user, {
      message: 'User created',
      statusCode: 201,
    });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to create user',
      statusCode: 500,
      error,
    });
  }
}
