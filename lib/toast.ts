import { toast as toastManager } from '@/components/ui/toast';

export type ToastPayload = {
  title: string;
  description?: string;
};

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export type ToastPromiseOptions<T> = {
  loading: ToastPayload;
  success: ToastPayload | ((result: T) => ToastPayload);
  error: ToastPayload | ((error: unknown) => ToastPayload);
};

function assertTitle(title: string) {
  if (!title.trim()) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error('Toast title is required');
    }
  }
}

function toToastOptions(payload: ToastPayload) {
  assertTitle(payload.title);
  return {
    type: undefined as string | undefined,
    title: payload.title,
    description: payload.description,
    timeout: 2500,
  };
}

function show(type: ToastType, payload: ToastPayload) {
  assertTitle(payload.title);

  toastManager.add({
    type,
    title: payload.title,
    description: payload.description,
    timeout: 2500,
  });
}

function resolvePromisePayload<T>(
  value: ToastPayload | ((arg: T) => ToastPayload),
  arg: T,
  type: ToastType
) {
  const payload = typeof value === 'function' ? value(arg) : value;
  assertTitle(payload.title);
  return {
    type,
    title: payload.title,
    description: payload.description,
    timeout: 2500,
  };
}

export const toast = {
  success(payload: ToastPayload) {
    show('success', payload);
  },
  error(payload: ToastPayload) {
    show('error', payload);
  },
  info(payload: ToastPayload) {
    show('info', payload);
  },
  warning(payload: ToastPayload) {
    show('warning', payload);
  },
  promise<T>(promise: Promise<T>, options: ToastPromiseOptions<T>) {
    return toastManager.promise(promise, {
      loading: {
        ...toToastOptions(options.loading),
        type: 'loading',
        timeout: 0,
      },
      success: (result) =>
        resolvePromisePayload(options.success, result, 'success'),
      error: (error) => resolvePromisePayload(options.error, error, 'error'),
    });
  },
};
