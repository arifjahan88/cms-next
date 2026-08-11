import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/metadata';
import { ContactPage } from '@/features/contact';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('contact');
}

export default function Page() {
  return <ContactPage />;
}
