import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/metadata';
import { CaseStudiesPage } from '@/features/case-studies';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('case-studies');
}

export default function Page() {
  return <CaseStudiesPage />;
}
