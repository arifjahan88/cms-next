'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createNavigationMenuItem,
  deleteNavigationMenuItem,
  reorderNavigationMenuItems,
  updateNavigationMenu,
  updateNavigationMenuItem,
} from '@/lib/api/navigation';
import { navigationKeys } from '@/lib/api/query-keys';
import type {
  CreateMenuItemValues,
  ReorderMenuItemsValues,
  UpdateMenuItemValues,
  UpdateMenuValues,
} from '@/lib/validations/navigation';

function useInvalidateMenus() {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({ queryKey: navigationKeys.admin });
}

export function useUpdateMenuMutation() {
  const invalidate = useInvalidateMenus();

  return useMutation({
    mutationFn: ({
      slug,
      payload,
    }: {
      slug: string;
      payload: UpdateMenuValues;
    }) => updateNavigationMenu(slug, payload),
    onSuccess: async () => {
      await invalidate();
    },
  });
}

export function useCreateMenuItemMutation() {
  const invalidate = useInvalidateMenus();

  return useMutation({
    mutationFn: ({
      slug,
      payload,
    }: {
      slug: string;
      payload: CreateMenuItemValues;
    }) => createNavigationMenuItem(slug, payload),
    onSuccess: async () => {
      await invalidate();
    },
  });
}

export function useUpdateMenuItemMutation() {
  const invalidate = useInvalidateMenus();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateMenuItemValues;
    }) => updateNavigationMenuItem(id, payload),
    onSuccess: async () => {
      await invalidate();
    },
  });
}

export function useDeleteMenuItemMutation() {
  const invalidate = useInvalidateMenus();

  return useMutation({
    mutationFn: (id: string) => deleteNavigationMenuItem(id),
    onSuccess: async () => {
      await invalidate();
    },
  });
}

export function useReorderMenuItemsMutation() {
  const invalidate = useInvalidateMenus();

  return useMutation({
    mutationFn: ({
      slug,
      payload,
    }: {
      slug: string;
      payload: ReorderMenuItemsValues;
    }) => reorderNavigationMenuItems(slug, payload),
    onSuccess: async () => {
      await invalidate();
    },
  });
}
