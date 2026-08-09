import Link from 'next/link';
import { cn } from '@/lib/utils';

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
  align = 'left',
  accent = false,
  size = 'default',
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  action?: { label: string; href: string };
  className?: string;
  align?: 'left' | 'center';
  /** Short thick blue underline under the title (matches section label design) */
  accent?: boolean;
  size?: 'default' | 'sm';
}) {
  const compact = size === 'sm';

  return (
    <div
      className={cn(
        'mb-10 flex flex-col gap-3',
        compact && 'mb-4 gap-2',
        align === 'center' && 'items-center text-center',
        action && align === 'left' && !compact && 'sm:flex-row sm:items-end sm:justify-between',
        action && align === 'left' && compact && 'gap-1.5',
        className
      )}
    >
      <div className={cn(align === 'center' && 'max-w-2xl')}>
        {eyebrow ? (
          <p className='mb-2 text-xs font-semibold uppercase tracking-wider text-primary'>
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn(
            'font-bold tracking-tight text-foreground',
            compact ? 'text-base leading-snug sm:text-lg' : 'text-2xl sm:text-3xl md:text-4xl'
          )}
        >
          {title}
        </h2>
        {accent ? (
          <span
            className={cn(
              'mt-2.5 block h-1 w-12 rounded-full bg-primary',
              compact && 'mt-1.5 h-0.5 w-8',
              align === 'center' && 'mx-auto'
            )}
            aria-hidden
          />
        ) : null}
        {description ? (
          <p className={cn('mt-3 max-w-2xl text-muted-foreground', compact && 'mt-1.5 text-xs')}>
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className={cn(
            'shrink-0 font-medium text-primary hover:underline',
            compact ? 'text-[11px] leading-tight' : 'text-sm'
          )}
        >
          {action.label} →
        </Link>
      ) : null}
    </div>
  );
}
