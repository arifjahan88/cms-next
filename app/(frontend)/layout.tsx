import { SiteHeader } from '@/features/layout/components/site-header';
import { SiteFooter } from '@/features/layout/components/site-footer';
import { HEADER_HEIGHT_CLASS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id='main-content' className={cn('flex-1', HEADER_HEIGHT_CLASS)}>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
