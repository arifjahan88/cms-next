import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE_NAME } from '@/lib/auth/constants';
import { verifySessionToken } from '@/lib/auth/jwt';
import { isAdminRole } from '@/lib/auth/roles';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;
  const isDashboard = pathname.startsWith('/dashboard');
  const isLogin = pathname === '/login';

  if (isDashboard) {
    if (!session || !isAdminRole(session.role)) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  if (isLogin && session && isAdminRole(session.role)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
