import { cn } from '@/lib/utils';

const TECH_LOGOS: Record<string, string> = {
  Flutter: '/logos/tech/flutter.svg',
  Laravel: '/logos/tech/laravel.svg',
  PostgreSQL: '/logos/tech/postgresql.svg',
  React: '/logos/tech/react.svg',
  'Next.js': '/logos/tech/nextjs.svg',
  'Node.js': '/logos/tech/nodejs.svg',
  AWS: '/logos/tech/aws.svg',
  Docker: '/logos/tech/docker.svg',
  Firebase: '/logos/tech/firebase.svg',
  GCP: '/logos/tech/gcp.svg',
};

export function getTechLogo(name: string) {
  return TECH_LOGOS[name] ?? null;
}

/** Logo + label row (case study cards) */
export function TechStackItem({ name, className }: { name: string; className?: string }) {
  const logo = getTechLogo(name);

  return (
    <span
      className={cn('inline-flex items-center gap-1.5 text-xs text-foreground/80', className)}
      title={name}
    >
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt='' width={16} height={16} className='size-4 shrink-0 object-contain' />
      ) : (
        <span className='flex size-4 shrink-0 items-center justify-center rounded-sm bg-muted text-[8px] font-bold'>
          {name.slice(0, 1)}
        </span>
      )}
      <span className='font-medium'>{name}</span>
    </span>
  );
}

/** Square logo tile (grids / marquee-style stacks) */
export function TechIcon({ label, className }: { label: string; className?: string }) {
  const logo = getTechLogo(label);

  return (
    <div
      className={cn(
        'flex size-12 flex-col items-center justify-center rounded-xl border bg-background text-center shadow-sm',
        className
      )}
      title={label}
    >
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt={label} width={24} height={24} className='size-6 object-contain' />
      ) : (
        <span className='text-[10px] font-semibold leading-tight text-foreground'>
          {label.slice(0, 6)}
        </span>
      )}
    </div>
  );
}
