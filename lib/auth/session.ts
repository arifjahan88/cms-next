import { cookies } from 'next/headers';
import type { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME } from '@/lib/auth/constants';
import {
  createSessionToken,
  maxAgeSeconds,
  verifySessionToken,
  type SessionPayload,
} from '@/lib/auth/jwt';

export type { SessionPayload };
export { createSessionToken, verifySessionToken };

function cookieOptions(remember = false) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: maxAgeSeconds(remember),
  };
}

export async function setSessionCookie(token: string, remember = false): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, cookieOptions(remember));
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, '', {
    ...cookieOptions(false),
    maxAge: 0,
  });
}

export function applySessionCookie(response: NextResponse, token: string, remember = false): void {
  response.cookies.set(SESSION_COOKIE_NAME, token, cookieOptions(remember));
}

export function clearSessionCookieOnResponse(response: NextResponse): void {
  response.cookies.set(SESSION_COOKIE_NAME, '', {
    ...cookieOptions(false),
    maxAge: 0,
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function getSessionFromRequest(request: NextRequest): Promise<SessionPayload | null> {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
