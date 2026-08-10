import type { Metadata } from 'next';
import { PortfolioPage } from '@/features/portfolio';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Explore Zamil Technologies portfolio—real software solutions delivering measurable impact across industries.',
};

export default function Page() {
  return <PortfolioPage />;
}
