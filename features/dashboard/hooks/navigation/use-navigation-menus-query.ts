'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { getAdminNavigationMenus } from '@/lib/api/navigation';
import { navigationKeys } from '@/lib/api/query-keys';

export function useNavigationMenusSuspenseQuery() {
  return useSuspenseQuery({
    queryKey: navigationKeys.menus(),
    queryFn: getAdminNavigationMenus,
  });
}
