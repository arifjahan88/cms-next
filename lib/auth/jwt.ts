import { SignJWT, jwtVerify } from 'jose';
import type { UserRole } from '@/db/schema';
import {
  SESSION_MAX_AGE_SECONDS,
  SESSION_REMEMBER_MAX_AGE_SECONDS,
} from '@/lib/auth/constants';

export type SessionPayload = {
  sub: string;
  email: string;
  name: string;
  role: UserRole;
};

function getAuthSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error('AUTH_SECRET is not set');
  }
  return new TextEncoder().encode(secret);
}

export function maxAgeSeconds(remember?: boolean): number {
  return remember
    ? SESSION_REMEMBER_MAX_AGE_SECONDS
    : SESSION_MAX_AGE_SECONDS;
}

export async function createSessionToken(
  payload: SessionPayload,
  remember = false
): Promise<string> {
  return new SignJWT({
    email: payload.email,
    name: payload.name,
    role: payload.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${maxAgeSeconds(remember)}s`)
    .sign(getAuthSecret());
}

export async function verifySessionToken(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getAuthSecret());
    const sub = typeof payload.sub === 'string' ? payload.sub : null;
    const email = typeof payload.email === 'string' ? payload.email : null;
    const name = typeof payload.name === 'string' ? payload.name : null;
    const role =
      typeof payload.role === 'number' ? (payload.role as UserRole) : null;

    if (!sub || !email || !name || role == null) {
      return null;
    }

    return { sub, email, name, role };
  } catch {
    return null;
  }
}
