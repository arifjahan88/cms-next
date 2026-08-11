import Link from 'next/link';
import { Globe, Phone, Rocket } from 'lucide-react';
import { Container } from '@/components/shared/container';
import { SITE } from '@/lib/constants';

export function TopBar() {
  return (
    <div className='bg-brand-navy text-brand-navy-foreground'>
      <Container className='flex h-9 items-center justify-between gap-4 text-xs'>
        <p className='flex min-w-0 items-center gap-1.5 truncate'>
          <Rocket className='hidden size-3.5 shrink-0 sm:inline' />
          <span className='truncate'>
            We help businesses worldwide build innovative digital products &amp; transform ideas
            into impact.
          </span>
        </p>
        <div className='flex shrink-0 items-center gap-3 sm:gap-4'>
          <Link href='/careers' className='hover:underline'>
            We&apos;re Hiring!
          </Link>
          <Link href='/contact' className='hidden hover:underline sm:inline'>
            Support
          </Link>
          <button
            type='button'
            className='hidden items-center gap-1 hover:underline sm:inline-flex'
            aria-label='Language'
          >
            <Globe className='size-3.5' />
            EN
          </button>
          <span className='hidden h-3.5 w-px bg-brand-navy-foreground/25 sm:inline' aria-hidden />
          <a
            href={SITE.phoneHref}
            className='inline-flex items-center gap-1.5 font-medium text-brand-navy-foreground hover:underline'
          >
            <Phone className='size-3.5 shrink-0' />
            <span className='hidden md:inline'>{SITE.phone}</span>
            <span className='md:hidden'>Call us</span>
          </a>
        </div>
      </Container>
    </div>
  );
}
