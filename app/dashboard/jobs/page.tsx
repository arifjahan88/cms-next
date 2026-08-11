import { Suspense } from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { JobsCms } from '@/features/dashboard/components/jobs-cms/jobs-cms';
import { EntityCmsSkeleton } from '@/features/dashboard/components/entity-cms/entity-cms-skeleton';
import { listAdminJobOpenings } from '@/db/queries/jobs';
import { jobKeys } from '@/lib/api/query-keys';

async function JobsCmsLoader() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: jobKeys.admin(),
    queryFn: listAdminJobOpenings,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JobsCms />
    </HydrationBoundary>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={<EntityCmsSkeleton />}>
      <JobsCmsLoader />
    </Suspense>
  );
}
