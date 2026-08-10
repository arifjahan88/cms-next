import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { UserRole, users } from '@/db/schema';
import { verifyPassword } from '@/lib/auth/password';
import { isAdminRole } from '@/lib/auth/roles';
import { createSessionToken, setSessionCookie } from '@/lib/auth/session';
import { adminLoginSchema } from '@/lib/validations/forms';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = adminLoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 400 }
      );
    }

    const { email, password, remember } = parsed.data;

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    if (!isAdminRole(user.role)) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const role =
      user.role === UserRole.Admin ? UserRole.Admin : UserRole.User;

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

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Unable to sign in. Please try again.' },
      { status: 500 }
    );
  }
}
