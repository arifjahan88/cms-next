import type { Metadata } from 'next';
import { BlogPage } from '@/features/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights, ideas, and impact from Zamil Technologies—software, product, and industry perspectives.',
};

export default function Page() {
  return <BlogPage />;
}
