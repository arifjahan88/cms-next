import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/metadata';
import { BlogPage } from '@/features/blog';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('blog');
}

export default function Page() {
  return <BlogPage />;
}
