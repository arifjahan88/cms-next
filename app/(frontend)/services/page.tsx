import type { Metadata } from 'next';
import { ServicesPage } from '@/features/services';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Custom software, mobile, cloud, AI, and product engineering services from Zamil Technologies.',
};

export default function Page() {
  return <ServicesPage />;
}
