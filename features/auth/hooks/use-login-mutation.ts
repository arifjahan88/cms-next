'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from '@/lib/toast';
import { ApiError, authKeys, login } from '@/lib/api';
import { resolveAuthRedirect } from '@/lib/auth/redirect';
import type { AdminLoginValues } from '@/lib/validations/forms';

export function useLoginMutation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AdminLoginValues) => login(payload),
    onSuccess: (data) => {
      const redirectTo = resolveAuthRedirect(searchParams.get('from'));
      queryClient.setQueryData(authKeys.me, data);
      toast.success({ title: 'Signed in. Redirecting…' });
      router.push(redirectTo);
      router.refresh();
    },
    onError: (error) => {
      const message =
        error instanceof ApiError ? error.message : 'Unable to sign in. Please try again.';
      toast.error({ title: message });
    },
  });
}
