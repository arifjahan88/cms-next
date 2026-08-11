import { Suspense } from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { CaseStudiesCms } from '@/features/dashboard/components/case-studies-cms/case-studies-cms';
import { EntityCmsSkeleton } from '@/features/dashboard/components/entity-cms/entity-cms-skeleton';
import { listAdminCaseStudies } from '@/db/queries/case-studies';
import { caseStudyKeys } from '@/lib/api/query-keys';

async function CaseStudiesCmsLoader() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: caseStudyKeys.admin(),
    queryFn: listAdminCaseStudies,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CaseStudiesCms />
    </HydrationBoundary>
  );
}

export default function CaseStudiesPage() {
  return (
    <Suspense fallback={<EntityCmsSkeleton />}>
      <CaseStudiesCmsLoader />
    </Suspense>
  );
}
