import type { Metadata } from 'next';
import { HomePage } from '@/features/home';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: `${SITE.name} | Software Development Partner`,
  description: SITE.description,
};

export default function Page() {
  return <HomePage />;
}
