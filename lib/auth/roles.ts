import { UserRole } from '@/db/schema';

export { UserRole };

const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.Admin]: 'Admin',
  [UserRole.User]: 'User',
};

export function roleLabel(role: number): string {
  return ROLE_LABELS[role as UserRole] ?? 'User';
}

export function isAdminRole(role: number): boolean {
  return role === UserRole.Admin;
}
