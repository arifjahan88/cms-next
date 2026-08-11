import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/metadata';
import { CareersPage } from '@/features/careers';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('careers');
}

export default function Page() {
  return <CareersPage />;
}
