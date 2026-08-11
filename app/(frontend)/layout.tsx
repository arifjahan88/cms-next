import { Suspense } from 'react';
import { SiteFooter } from '@/features/layout/components/site-footer';
import { SiteHeaderServer } from '@/features/layout/components/site-header-server';
import { HEADER_HEIGHT_CLASS } from '@/lib/constants';
import { cn } from '@/lib/utils';

function HeaderFallback() {
  return (
    <header className='fixed top-0 inset-x-0 z-50'>
      <div className='h-8 border-b bg-muted/40' />
      <div className='h-16 border-b bg-background' />
    </header>
  );
}

function FooterFallback() {
  return (
    <footer className='min-h-64 bg-brand-navy' aria-hidden>
      <div className='mx-auto max-w-6xl px-4 py-14' />
    </footer>
  );
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<HeaderFallback />}>
        <SiteHeaderServer />
      </Suspense>
      <main id='main-content' className={cn('flex-1', HEADER_HEIGHT_CLASS)}>
        {children}
      </main>
      <Suspense fallback={<FooterFallback />}>
        <SiteFooter />
      </Suspense>
    </>
  );
}
