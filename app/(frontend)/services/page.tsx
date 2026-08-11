import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/metadata';
import { ServicesPage } from '@/features/services';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('services');
}

export default function Page() {
  return <ServicesPage />;
}
