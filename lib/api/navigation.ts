import { apiFetch } from '@/lib/api/client';
import type { MenuItem, NavMenu } from '@/features/dashboard/data/navigation-cms';
import type {
  CreateMenuItemValues,
  ReorderMenuItemsValues,
  UpdateMenuItemValues,
  UpdateMenuValues,
} from '@/lib/validations/navigation';

export function getAdminNavigationMenus(): Promise<NavMenu[]> {
  return apiFetch<NavMenu[]>('/api/admin/navigation');
}

export function updateNavigationMenu(slug: string, payload: UpdateMenuValues): Promise<NavMenu> {
  return apiFetch<NavMenu>(`/api/admin/navigation/${slug}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export function createNavigationMenuItem(
  slug: string,
  payload: CreateMenuItemValues
): Promise<MenuItem> {
  return apiFetch<MenuItem>(`/api/admin/navigation/${slug}/items`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateNavigationMenuItem(
  id: string,
  payload: UpdateMenuItemValues
): Promise<MenuItem> {
  return apiFetch<MenuItem>(`/api/admin/navigation/items/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export function deleteNavigationMenuItem(id: string): Promise<{ id: string }> {
  return apiFetch<{ id: string }>(`/api/admin/navigation/items/${id}`, {
    method: 'DELETE',
  });
}

export function reorderNavigationMenuItems(
  slug: string,
  payload: ReorderMenuItemsValues
): Promise<{ orderedIds: string[] }> {
  return apiFetch<{ orderedIds: string[] }>(`/api/admin/navigation/${slug}/items/reorder`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}
