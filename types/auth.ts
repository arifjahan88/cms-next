import type { UserRole } from '@/db/schema';

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
};

export type LoginResponse = {
  user: AuthUser;
};

export type LogoutResponse = {
  ok: true;
};

export type MeResponse = {
  user: AuthUser;
};
