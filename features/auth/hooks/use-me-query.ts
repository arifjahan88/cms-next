'use client';

import { useQuery } from '@tanstack/react-query';
import { authKeys, getMe } from '@/lib/api';

export function useMeQuery(enabled = true) {
  return useQuery({
    queryKey: authKeys.me,
    queryFn: getMe,
    enabled,
    retry: false,
  });
}
