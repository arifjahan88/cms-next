import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/metadata';
import { PortfolioPage } from '@/features/portfolio';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('portfolio');
}

export default function Page() {
  return <PortfolioPage />;
}
