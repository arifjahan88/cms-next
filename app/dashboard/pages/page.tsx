import { Suspense } from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { PagesCms } from '@/features/dashboard/components/pages-cms/pages-cms';
import { LandingPageCmsSkeleton } from '@/features/dashboard/components/landing-cms/landing-page-cms-skeleton';
import { getAdminLanding, getAdminPage } from '@/db/queries/landing';
import { PUBLIC_PAGES, type PageSlug } from '@/features/dashboard/data/public-pages';
import { landingKeys } from '@/lib/api/query-keys';

type SearchParams = Promise<{ page?: string }>;

async function PagesCmsLoader({ page }: { page: PageSlug }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: landingKeys.document(page),
    queryFn: () => (page === 'home' ? getAdminLanding(page) : getAdminPage(page)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PagesCms initialPage={page} />
    </HydrationBoundary>
  );
}

export default async function PagesCmsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const slug = params.page ?? 'home';
  const page = PUBLIC_PAGES.some((p) => p.slug === slug) ? (slug as PageSlug) : 'home';

  return (
    <Suspense fallback={<LandingPageCmsSkeleton />}>
      <PagesCmsLoader page={page} />
    </Suspense>
  );
}
