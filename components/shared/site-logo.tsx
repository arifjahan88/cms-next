import Link from 'next/link';
import { cn } from '@/lib/utils';
import { SITE } from '@/lib/constants';

export function SiteLogo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <Link
      href='/'
      className={cn('flex items-center gap-2.5 shrink-0', className)}
      aria-label={SITE.name}
    >
      <span
        className={cn(
          'flex size-9 items-center justify-center rounded-lg text-sm font-bold text-white',
          light ? 'bg-white/15 text-white' : 'bg-primary'
        )}
      >
        Z
      </span>
      <span
        className={cn(
          'text-sm font-bold tracking-wide uppercase leading-tight',
          light ? 'text-white' : 'text-foreground'
        )}
      >
        Zaimah
        <br />
        <span className={cn('font-semibold', light ? 'text-white/80' : 'text-muted-foreground')}>
          Technologies
        </span>
      </span>
    </Link>
  );
}
