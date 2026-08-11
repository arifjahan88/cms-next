'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from '@/lib/toast';
import { ApiError, authKeys, logout } from '@/lib/api';

export function useLogoutMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authKeys.all });
      router.push('/login');
      router.refresh();
    },
    onError: (error) => {
      const message = error instanceof ApiError ? error.message : 'Unable to sign out';
      toast.error({ title: message });
    },
  });
}
