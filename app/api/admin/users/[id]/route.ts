import {
  deleteUser,
  getUserByEmail,
  getUserById,
  updateUser,
} from '@/db/queries/users';
import { apiError, apiSuccess } from '@/lib/api/response';
import { hashPassword } from '@/lib/auth/password';
import {
  requireDashboardWrite,
} from '@/lib/auth/require-admin';
import { UserRole } from '@/lib/auth/roles';
import { userUpdateSchema } from '@/lib/validations/users';

type Params = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Params) {
  const auth = await requireDashboardWrite(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    const user = await getUserById(id);
    if (!user) {
      return apiError(request, { message: 'User not found', statusCode: 404 });
    }
    return apiSuccess(request, user, { message: 'User retrieved' });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to load user',
      statusCode: 500,
      error,
    });
  }
}

export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireDashboardWrite(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    const existing = await getUserById(id);
    if (!existing) {
      return apiError(request, { message: 'User not found', statusCode: 404 });
    }

    const body = await request.json();
    const parsed = userUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(request, {
        message: 'Invalid user data',
        statusCode: 400,
        error: parsed.error.flatten(),
      });
    }

    const data = parsed.data;

    if (data.email && data.email.toLowerCase() !== existing.email.toLowerCase()) {
      const conflict = await getUserByEmail(data.email);
      if (conflict && conflict.id !== id) {
        return apiError(request, {
          message: 'A user with this email already exists',
          statusCode: 409,
        });
      }
    }

    const passwordHash =
      data.password && data.password.length > 0
        ? await hashPassword(data.password)
        : undefined;

    const user = await updateUser(id, {
      email: data.email,
      name: data.name,
      role: data.role as typeof UserRole.Admin | typeof UserRole.User | undefined,
      passwordHash,
    });

    return apiSuccess(request, user, { message: 'User updated' });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to update user',
      statusCode: 500,
      error,
    });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const auth = await requireDashboardWrite(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;

    if (id === auth.session.sub) {
      return apiError(request, {
        message: 'You cannot delete your own account',
        statusCode: 400,
      });
    }

    const existing = await getUserById(id);
    if (!existing) {
      return apiError(request, { message: 'User not found', statusCode: 404 });
    }

    await deleteUser(id);
    return apiSuccess(request, null, { message: 'User deleted' });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to delete user',
      statusCode: 500,
      error,
    });
  }
}
