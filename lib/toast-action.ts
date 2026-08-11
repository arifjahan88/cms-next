import { ApiError } from '@/lib/api/client';
import { toast, type ToastPayload } from '@/lib/toast';

export type ActionToastCopy = {
  loading: string;
  success: string;
  error?: string;
};

function toPayload(title: string): ToastPayload {
  return { title };
}

function resolveErrorMessage(error: unknown, fallback: string) {
  if (error instanceof ApiError && error.message) {
    return error.message;
  }
  return fallback;
}

export async function runWithActionToast<T>(
  action: () => Promise<T>,
  copy: ActionToastCopy
): Promise<T> {
  const errorFallback = copy.error ?? 'Something went wrong';

  return toast.promise(action(), {
    loading: toPayload(copy.loading),
    success: toPayload(copy.success),
    error: (error) =>
      toPayload(resolveErrorMessage(error, errorFallback)),
  });
}

export const actionToast = {
  adding: (name = 'item') => ({
    loading: `Adding ${name}…`,
    success: `${name} added`,
    error: `Failed to add ${name}`,
  }),
  updating: (name = 'item') => ({
    loading: `Updating ${name}…`,
    success: `${name} updated`,
    error: `Failed to update ${name}`,
  }),
  deleting: (name = 'item') => ({
    loading: `Deleting ${name}…`,
    success: `${name} deleted`,
    error: `Failed to delete ${name}`,
  }),
  reordering: (name = 'items') => ({
    loading: `Reordering ${name}…`,
    success: 'Order saved',
    error: `Failed to reorder ${name}`,
  }),
  savingDraft: (name = 'changes') => ({
    loading: `Saving ${name}…`,
    success: 'Draft saved',
    error: `Failed to save ${name}`,
  }),
  publishing: (name = 'menu') => ({
    loading: `Publishing ${name}…`,
    success: 'Published successfully',
    error: `Failed to publish ${name}`,
  }),
};
