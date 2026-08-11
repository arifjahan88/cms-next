import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/metadata';
import { AboutPage } from '@/features/about';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('about');
}

export default function Page() {
  return <AboutPage />;
}
