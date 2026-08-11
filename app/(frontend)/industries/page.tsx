import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/metadata';
import { IndustriesPage } from '@/features/industries';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('industries');
}

export default function Page() {
  return <IndustriesPage />;
}
