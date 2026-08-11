'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { getSeoSettings } from '@/lib/api/seo-settings';
import { seoKeys } from '@/lib/api/query-keys';

export function useSeoSettingsSuspenseQuery() {
  return useSuspenseQuery({
    queryKey: seoKeys.settings(),
    queryFn: getSeoSettings,
  });
}
