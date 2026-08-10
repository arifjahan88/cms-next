import { toast as toastManager } from '@/components/ui/toast';

export type ToastPayload = {
  title: string;
  description?: string;
};

export type ToastType = 'success' | 'error' | 'info' | 'warning';

function assertTitle(title: string) {
  if (!title.trim()) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error('Toast title is required');
    }
  }
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
};
