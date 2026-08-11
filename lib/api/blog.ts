import { apiFetch } from '@/lib/api/client';
import type { BlogPostDto } from '@/db/queries/blog';
import type { blogPostSchema } from '@/lib/validations/landing';
import type { z } from 'zod';

export type BlogPostInput = z.infer<typeof blogPostSchema>;

export function listBlogPosts() {
  return apiFetch<BlogPostDto[]>('/api/admin/blog');
}

export function createBlogPost(payload: BlogPostInput) {
  return apiFetch<BlogPostDto>('/api/admin/blog', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateBlogPost(id: string, payload: BlogPostInput) {
  return apiFetch<BlogPostDto>(`/api/admin/blog/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export function deleteBlogPost(id: string) {
  return apiFetch<null>(`/api/admin/blog/${id}`, { method: 'DELETE' });
}
