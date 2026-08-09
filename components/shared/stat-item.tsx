import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StatItem({
  value,
  label,
  icon: Icon,
  className,
  light = false,
}: {
  value: string;
  label: string;
  icon?: LucideIcon;
  className?: string;
  light?: boolean;
}) {
  return (
    <div className={cn('flex items-start gap-3', className)}>
      {Icon ? (
        <span
          className={cn(
            'flex size-7 shrink-0 items-center justify-center rounded-lg',
            light ? 'bg-white/10 text-white' : 'bg-primary/10 text-primary'
          )}
        >
          <Icon className='size-4' />
        </span>
      ) : null}
      <div>
        <p
          className={cn(
            'text-xl font-bold tracking-tight md:text-xl',
            light ? 'text-white' : 'text-foreground'
          )}
        >
          {value}
        </p>
        <p className={cn('text-xs md:text-xs', light ? 'text-white/70' : 'text-muted-foreground')}>
          {label}
        </p>
      </div>
    </div>
  );
}
