'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { listBlogPosts } from '@/lib/api/blog';
import { blogKeys } from '@/lib/api/query-keys';

export function useBlogSuspenseQuery() {
  return useSuspenseQuery({
    queryKey: blogKeys.admin(),
    queryFn: listBlogPosts,
  });
}
