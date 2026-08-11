import { Suspense } from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { LandingPageCms } from '@/features/dashboard/components/landing-cms/landing-page-cms';
import { LandingPageCmsSkeleton } from '@/features/dashboard/components/landing-cms/landing-page-cms-skeleton';
import { getAdminLanding } from '@/db/queries/landing';
import { landingKeys } from '@/lib/api/query-keys';

async function LandingPageCmsLoader() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: landingKeys.document(),
    queryFn: () => getAdminLanding('home'),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LandingPageCms />
    </HydrationBoundary>
  );
}

export default function LandingPageCmsPage() {
  return (
    <Suspense fallback={<LandingPageCmsSkeleton />}>
      <LandingPageCmsLoader />
    </Suspense>
  );
}
