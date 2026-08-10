import { apiFetch } from '@/lib/api/client';
import type { AdminLoginValues } from '@/lib/validations/forms';
import type {
  LoginResponse,
  LogoutResponse,
  MeResponse,
} from '@/types/auth';

export type {
  AuthUser,
  LoginResponse,
  LogoutResponse,
  MeResponse,
} from '@/types/auth';

export function login(payload: AdminLoginValues): Promise<LoginResponse> {
  return apiFetch<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function logout(): Promise<LogoutResponse> {
  return apiFetch<LogoutResponse>('/api/auth/logout', {
    method: 'POST',
  });
}

export function getMe(): Promise<MeResponse> {
  return apiFetch<MeResponse>('/api/auth/me');
}
