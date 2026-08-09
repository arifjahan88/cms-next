'use client';

import { CheckCircle2, Headphones } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { sidebarHelp, timeSlots, whyBook } from '@/features/consultation/data/consultation';
import { SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';

type BookingSidebarProps = {
  date?: Date;
  onDateChange: (date?: Date) => void;
  slot?: string;
  onSlotChange: (slot: string) => void;
};

export function BookingSidebar({ date, onDateChange, slot, onSlotChange }: BookingSidebarProps) {
  return (
    <aside className='space-y-5'>
      <div className='rounded-2xl border bg-background p-5 shadow-sm'>
        <h3 className='font-semibold'>Why Book a Consultation?</h3>
        <ul className='mt-4 space-y-2.5'>
          {whyBook.map((item) => (
            <li key={item} className='flex items-start gap-2 text-sm'>
              <CheckCircle2 className='mt-0.5 size-4 shrink-0 text-primary' />
              <span className='text-muted-foreground'>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className='rounded-2xl border bg-background p-5 shadow-sm'>
        <h3 className='font-semibold'>Select a Date & Time</h3>
        <p className='mt-1 text-xs text-muted-foreground'>
          Choose a preferred day. We&apos;ll confirm availability by email.
        </p>
        <div className='mt-4 flex justify-center'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={onDateChange}
            disabled={{ before: new Date() }}
            className='rounded-xl border bg-background'
          />
        </div>

        <div className='mt-5 border-t pt-5'>
          <h4 className='text-sm font-semibold'>Available Time Slots</h4>
          <p className='mt-0.5 text-xs text-muted-foreground'>ICT (Bangkok time)</p>
          <div className='mt-3 grid grid-cols-2 gap-2'>
            {timeSlots.map((time) => (
              <Button
                key={time}
                type='button'
                size='sm'
                variant={slot === time ? 'default' : 'outline'}
                className={cn('h-9', slot !== time && 'bg-background')}
                onClick={() => onSlotChange(time)}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className='rounded-2xl border bg-primary/5 p-5'>
        <div className='flex items-start gap-3'>
          <span className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary'>
            <Headphones className='size-5' />
          </span>
          <div>
            <h3 className='font-semibold'>{sidebarHelp.title}</h3>
            <p className='mt-1 text-sm text-muted-foreground'>
              {sidebarHelp.description} Call{' '}
              <a href={SITE.phoneHref} className='font-medium text-primary'>
                {SITE.phone}
              </a>{' '}
              or email{' '}
              <a href={`mailto:${SITE.email}`} className='font-medium text-primary'>
                {SITE.email}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
