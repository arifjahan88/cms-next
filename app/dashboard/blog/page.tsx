import { Suspense } from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { BlogCms } from '@/features/dashboard/components/blog-cms/blog-cms';
import { EntityCmsSkeleton } from '@/features/dashboard/components/entity-cms/entity-cms-skeleton';
import { listAdminBlogPosts } from '@/db/queries/blog';
import { blogKeys } from '@/lib/api/query-keys';

async function BlogCmsLoader() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: blogKeys.admin(),
    queryFn: listAdminBlogPosts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogCms />
    </HydrationBoundary>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<EntityCmsSkeleton />}>
      <BlogCmsLoader />
    </Suspense>
  );
}
