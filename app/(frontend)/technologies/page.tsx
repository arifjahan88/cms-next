import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/metadata';
import { TechnologiesPage } from '@/features/technologies';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('technologies');
}

export default function Page() {
  return <TechnologiesPage />;
}
