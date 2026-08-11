'use client';

import Link from 'next/link';
import { Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { SiteLogo } from '@/components/shared/site-logo';
import { useActivePath } from '@/hooks/use-active-path';
import { SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types';

export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const { isActive } = useActivePath();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant='outline' size='icon' className='lg:hidden' aria-label='Open menu' />
        }
      >
        <Menu className='size-5' />
      </SheetTrigger>
      <SheetContent side='right' className='w-full max-w-sm p-0'>
        <SheetHeader className='border-b px-4 py-4 text-left'>
          <SheetTitle className='sr-only'>Navigation</SheetTitle>
          <div className='flex items-center justify-between'>
            <SiteLogo />
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setOpen(false)}
              aria-label='Close menu'
            >
              <X className='size-5' />
            </Button>
          </div>
        </SheetHeader>
        <nav className='flex flex-col gap-1 p-4'>
          {items.map((item) => (
            <Link
              key={item.href + item.title}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                'rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive(item.href)
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground hover:bg-muted'
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className='mt-auto space-y-3 border-t p-4'>
          <Button variant='outline' className='w-full' render={<a href={SITE.phoneHref} />}>
            <Phone data-icon='inline-start' />
            {SITE.phone}
          </Button>
          <Button
            className='w-full'
            render={<Link href='/book-consultation' />}
            onClick={() => setOpen(false)}
          >
            Book Free Consultation
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
