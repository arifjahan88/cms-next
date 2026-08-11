import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('home');
}

export { HomePage as default } from '@/features/home';
