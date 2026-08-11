import { Suspense } from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { PortfolioCms } from '@/features/dashboard/components/portfolio-cms/portfolio-cms';
import { EntityCmsSkeleton } from '@/features/dashboard/components/entity-cms/entity-cms-skeleton';
import { listAdminPortfolioProjects } from '@/db/queries/portfolio';
import { portfolioKeys } from '@/lib/api/query-keys';

async function PortfolioCmsLoader() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: portfolioKeys.admin(),
    queryFn: listAdminPortfolioProjects,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PortfolioCms />
    </HydrationBoundary>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={<EntityCmsSkeleton />}>
      <PortfolioCmsLoader />
    </Suspense>
  );
}
