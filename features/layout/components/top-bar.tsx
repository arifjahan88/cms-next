import Link from 'next/link';
import { Globe, Rocket } from 'lucide-react';
import { Container } from '@/components/shared/container';

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
        <div className='flex shrink-0 items-center gap-4'>
          <Link href='/careers' className='hover:underline'>
            We&apos;re Hiring!
          </Link>
          <Link href='/contact' className='hover:underline'>
            Support
          </Link>
          <button
            type='button'
            className='inline-flex items-center gap-1 hover:underline'
            aria-label='Language'
          >
            <Globe className='size-3.5' />
            EN
          </button>
        </div>
      </Container>
    </div>
  );
}
