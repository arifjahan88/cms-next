'use client';

import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type ConfirmAlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: 'default' | 'destructive';
  pending?: boolean;
  onConfirm: () => void | Promise<void>;
};

export function ConfirmAlertDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  confirmVariant = 'destructive',
  pending = false,
  onConfirm,
}: ConfirmAlertDialogProps) {
  const [busy, setBusy] = useState(false);
  const isPending = pending || busy;

  async function handleConfirm() {
    if (isPending) return;
    setBusy(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } finally {
      setBusy(false);
    }
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (isPending && !nextOpen) return;
        onOpenChange(nextOpen);
      }}
    >
      <AlertDialogContent size='sm'>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction
            variant={confirmVariant}
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              void handleConfirm();
            }}
          >
            {isPending ? 'Please wait…' : confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
