'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/lib/toast';
import { ApiError } from '@/lib/api/client';
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

function mutationErrorMessage(error: unknown, fallback: string) {
  return error instanceof ApiError ? error.message : fallback;
}

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
    onError: (error) => {
      toast.error({
        title: mutationErrorMessage(error, 'Failed to update menu'),
      });
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
    onError: (error) => {
      toast.error({
        title: mutationErrorMessage(error, 'Failed to create menu item'),
      });
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
    onError: (error) => {
      toast.error({
        title: mutationErrorMessage(error, 'Failed to update menu item'),
      });
    },
  });
}

export function useDeleteMenuItemMutation() {
  const invalidate = useInvalidateMenus();

  return useMutation({
    mutationFn: (id: string) => deleteNavigationMenuItem(id),
    onSuccess: async () => {
      await invalidate();
      toast.success({ title: 'Menu item deleted' });
    },
    onError: (error) => {
      toast.error({
        title: mutationErrorMessage(error, 'Failed to delete menu item'),
      });
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
    onError: (error) => {
      toast.error({
        title: mutationErrorMessage(error, 'Failed to reorder items'),
      });
    },
  });
}
