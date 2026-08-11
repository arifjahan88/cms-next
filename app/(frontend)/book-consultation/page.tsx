import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/metadata';
import { ConsultationPage } from '@/features/consultation';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('book-consultation');
}

export default function Page() {
  return <ConsultationPage />;
}
