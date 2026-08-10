import type { Metadata } from 'next';
import { AboutPage } from '@/features/about';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Zamil Technologies—our mission, values, leadership, and 25+ years of software delivery experience.',
};

export default function Page() {
  return <AboutPage />;
}
