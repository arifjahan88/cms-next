import { apiFetch } from '@/lib/api/client';
import type { UserDto } from '@/db/queries/users';
import type { UserCreateInput, UserUpdateInput } from '@/lib/validations/users';

export type { UserCreateInput, UserUpdateInput };

export function listAdminUsers() {
  return apiFetch<UserDto[]>('/api/admin/users');
}

export function getAdminUser(id: string) {
  return apiFetch<UserDto>(`/api/admin/users/${id}`);
}

export function createAdminUser(payload: UserCreateInput) {
  return apiFetch<UserDto>('/api/admin/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateAdminUser(id: string, payload: UserUpdateInput) {
  return apiFetch<UserDto>(`/api/admin/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export function deleteAdminUser(id: string) {
  return apiFetch<null>(`/api/admin/users/${id}`, { method: 'DELETE' });
}
