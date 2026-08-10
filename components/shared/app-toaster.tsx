'use client';

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import {
  Toast,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  toast as toastManager,
  useToastManager,
} from '@/components/ui/toast';
import { cn } from '@/lib/utils';

const variantStyles: Record<
  string,
  {
    root: string;
    accent: string;
    icon: string;
    iconBg: string;
  }
> = {
  success: {
    root: 'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950',
    accent: 'bg-emerald-600',
    icon: 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-white dark:bg-emerald-900',
  },
  info: {
    root: 'border-border bg-background',
    accent: 'bg-primary',
    icon: 'text-primary',
    iconBg: 'bg-muted',
  },
  warning: {
    root: 'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950',
    accent: 'bg-amber-600',
    icon: 'text-amber-600 dark:text-amber-400',
    iconBg: 'bg-white dark:bg-amber-900',
  },
  error: {
    root: 'border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950',
    accent: 'bg-destructive',
    icon: 'text-destructive',
    iconBg: 'bg-white dark:bg-red-900',
  },
  loading: {
    root: 'border-border bg-background',
    accent: 'bg-muted-foreground',
    icon: 'text-muted-foreground',
    iconBg: 'bg-muted',
  },
};

function getVariant(type: string | undefined) {
  return variantStyles[type ?? 'info'] ?? variantStyles.info;
}

function AppToastIcon({ type }: { type: string | undefined }) {
  const variant = getVariant(type);
  let icon = null;

  switch (type) {
    case 'success':
      icon = <CircleCheckIcon className='size-4' aria-hidden />;
      break;
    case 'info':
      icon = <InfoIcon className='size-4' aria-hidden />;
      break;
    case 'warning':
      icon = <TriangleAlertIcon className='size-4' aria-hidden />;
      break;
    case 'error':
      icon = <OctagonXIcon className='size-4' aria-hidden />;
      break;
    case 'loading':
      icon = <Loader2Icon className='size-4 animate-spin' aria-hidden />;
      break;
    default:
      icon = <InfoIcon className='size-4' aria-hidden />;
  }

  return (
    <span
      className={cn(
        'flex size-9 shrink-0 items-center justify-center rounded-full border shadow-sm',
        variant.iconBg,
        variant.icon
      )}
    >
      {icon}
    </span>
  );
}

function AppToastList() {
  const { toasts } = useToastManager();

  return toasts.map((toastItem) => {
    const variant = getVariant(toastItem.type);
    const hasDescription = Boolean(toastItem.description);

    return (
      <Toast
        key={toastItem.id}
        toast={toastItem}
        className={cn('overflow-hidden rounded-xl bg-transparent shadow-md', variant.root)}
      >
        <span className={cn('absolute inset-y-0 left-0 w-1', variant.accent)} aria-hidden />
        <ToastContent className='items-start gap-3 pl-5'>
          <AppToastIcon type={toastItem.type} />
          <div className='flex min-w-0 flex-1 flex-col gap-0.5 pt-0.5'>
            <ToastTitle className='font-semibold text-foreground' />
            {hasDescription ? <ToastDescription className='leading-snug' /> : null}
          </div>
          <ToastClose className='mt-0.5' />
        </ToastContent>
      </Toast>
    );
  });
}

export function AppToaster() {
  return (
    <ToastProvider toastManager={toastManager}>
      <ToastPortal>
        <ToastViewport className='fixed bottom-4 left-1/2 right-auto z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 outline-none sm:left-1/2 sm:right-auto sm:w-95'>
          <AppToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  );
}
