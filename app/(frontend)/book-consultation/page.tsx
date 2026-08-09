import type { Metadata } from 'next';
import { ConsultationPage } from '@/features/consultation';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Book Free Consultation',
  description: `Book a free 30–60 minute consultation with ${SITE.name}. Get expert guidance on your next digital product.`,
};

export default function Page() {
  return <ConsultationPage />;
}
