'use client';

import Link from 'next/link';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useActivePath } from '@/hooks/use-active-path';
import type { NavItem } from '@/types';
import { cn } from '@/lib/utils';

const MORE_WIDTH = 72;
const GAP = 4;

export function OverflowNav({ items }: { items: NavItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(items.length);
  const { isActive } = useActivePath();

  const recalculate = useCallback(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const available = container.clientWidth;
    const itemEls = Array.from(measure.querySelectorAll<HTMLElement>('[data-nav-measure]'));
    if (itemEls.length === 0) return;

    let used = 0;
    let count = itemEls.length;

    for (let i = 0; i < itemEls.length; i++) {
      const width = itemEls[i].offsetWidth;
      const nextUsed = used + (i > 0 ? GAP : 0) + width;
      const remaining = itemEls.length - (i + 1);
      const needMore = remaining > 0;
      const limit = needMore ? available - MORE_WIDTH - GAP : available;

      if (nextUsed > limit) {
        count = i;
        break;
      }
      used = nextUsed;
    }

    // Always show at least one item if space allows
    if (count === 0 && available > MORE_WIDTH) {
      count = 1;
    }

    setVisibleCount(count);
  }, []);

  useLayoutEffect(() => {
    recalculate();
  }, [recalculate, items]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => recalculate());
    ro.observe(container);
    window.addEventListener('resize', recalculate);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', recalculate);
    };
  }, [recalculate]);

  const visible = items.slice(0, visibleCount);
  const overflow = items.slice(visibleCount);
  const moreActive = overflow.some((item) => isActive(item.href));

  return (
    <div ref={containerRef} className='relative hidden min-w-0 flex-1 lg:block'>
      {/* Hidden measurer */}
      <div
        ref={measureRef}
        className='pointer-events-none absolute -left-[9999px] top-0 flex h-0 overflow-hidden opacity-0'
        aria-hidden
      >
        {items.map((item) => (
          <span
            key={item.title}
            data-nav-measure
            className='inline-flex h-8 shrink-0 items-center whitespace-nowrap px-2 text-xs font-medium xl:text-sm'
          >
            {item.title}
          </span>
        ))}
      </div>

      <nav className='flex flex-nowrap items-center justify-center gap-1 overflow-hidden'>
        {visible.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              'inline-flex h-8 shrink-0 items-center whitespace-nowrap rounded-lg px-2 text-xs font-medium transition-colors hover:bg-muted xl:text-sm',
              isActive(item.href) && 'text-primary underline decoration-2 underline-offset-8'
            )}
          >
            {item.title}
          </Link>
        ))}

        {overflow.length > 0 ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                'inline-flex h-8 shrink-0 items-center gap-0.5 whitespace-nowrap rounded-lg px-2 text-xs font-medium outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring xl:text-sm',
                moreActive && 'text-primary underline decoration-2 underline-offset-8'
              )}
            >
              More
              <ChevronDown className='size-3.5 opacity-70' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='min-w-44'>
              {overflow.map((item) => (
                <DropdownMenuItem
                  key={item.title}
                  className={cn('cursor-pointer', isActive(item.href) && 'text-primary')}
                  render={<Link href={item.href} />}
                >
                  {item.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </nav>
    </div>
  );
}
