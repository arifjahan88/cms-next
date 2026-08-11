import { Suspense } from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { SeoSettingsCms } from '@/features/dashboard/components/seo-settings-cms/seo-settings-cms';
import { EntityCmsSkeleton } from '@/features/dashboard/components/entity-cms/entity-cms-skeleton';
import { getAllPageSeo } from '@/db/queries/page-seo';
import { seoKeys } from '@/lib/api/query-keys';

async function SeoSettingsCmsLoader() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: seoKeys.settings(),
    queryFn: getAllPageSeo,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SeoSettingsCms />
    </HydrationBoundary>
  );
}

export default function SeoSettingsPage() {
  return (
    <Suspense fallback={<EntityCmsSkeleton />}>
      <SeoSettingsCmsLoader />
    </Suspense>
  );
}
