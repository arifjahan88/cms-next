import { Suspense } from 'react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { NavigationCms } from '@/features/dashboard/components/navigation-cms/navigation-cms';
import { NavigationCmsSkeleton } from '@/features/dashboard/components/navigation-cms/navigation-cms-skeleton';
import { getAdminMenus } from '@/db/queries/navigation';
import { navigationKeys } from '@/lib/api/query-keys';

async function NavigationCmsLoader() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: navigationKeys.menus(),
    queryFn: getAdminMenus,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NavigationCms />
    </HydrationBoundary>
  );
}

export default function NavigationPage() {
  return (
    <Suspense fallback={<NavigationCmsSkeleton />}>
      <NavigationCmsLoader />
    </Suspense>
  );
}
