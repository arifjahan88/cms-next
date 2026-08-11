'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBlogPost, deleteBlogPost, updateBlogPost } from '@/lib/api/blog';
import type { BlogPostInput } from '@/lib/api/blog';
import { blogKeys } from '@/lib/api/query-keys';

function useInvalidateBlog() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: blogKeys.all });
}

export function useCreateBlogPostMutation() {
  const invalidate = useInvalidateBlog();

  return useMutation({
    mutationFn: (payload: BlogPostInput) => createBlogPost(payload),
    onSuccess: async () => {
      await invalidate();
    },
  });
}

export function useUpdateBlogPostMutation() {
  const invalidate = useInvalidateBlog();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: BlogPostInput }) =>
      updateBlogPost(id, payload),
    onSuccess: async () => {
      await invalidate();
    },
  });
}

export function useDeleteBlogPostMutation() {
  const invalidate = useInvalidateBlog();

  return useMutation({
    mutationFn: (id: string) => deleteBlogPost(id),
    onSuccess: async () => {
      await invalidate();
    },
  });
}
