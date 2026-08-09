import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/shared/container';
import { SectionHeader } from '@/components/shared/section-header';
import { StaggerChildren, StaggerItem } from '@/components/shared/motion/stagger-children';
import { servicesList } from '@/features/services/data/services';
import { getIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';

const cardAccents = [
  {
    fill: 'bg-sky-50',
    icon: 'bg-sky-500/10 text-sky-600 group-hover:bg-sky-500 group-hover:text-white',
    link: 'text-sky-600 group-hover:text-sky-700',
  },
  {
    fill: 'bg-violet-50',
    icon: 'bg-violet-500/10 text-violet-600 group-hover:bg-violet-600 group-hover:text-white',
    link: 'text-violet-600 group-hover:text-violet-700',
  },
  {
    fill: 'bg-emerald-50',
    icon: 'bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white',
    link: 'text-emerald-600 group-hover:text-emerald-700',
  },
  {
    fill: 'bg-amber-50',
    icon: 'bg-amber-500/10 text-amber-600 group-hover:bg-amber-500 group-hover:text-white',
    link: 'text-amber-600 group-hover:text-amber-700',
  },
  {
    fill: 'bg-blue-50',
    icon: 'bg-blue-500/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
    link: 'text-blue-600 group-hover:text-blue-700',
  },
  {
    fill: 'bg-cyan-50',
    icon: 'bg-cyan-500/10 text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white',
    link: 'text-cyan-600 group-hover:text-cyan-700',
  },
  {
    fill: 'bg-indigo-50',
    icon: 'bg-indigo-500/10 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white',
    link: 'text-indigo-600 group-hover:text-indigo-700',
  },
  {
    fill: 'bg-rose-50',
    icon: 'bg-rose-500/10 text-rose-600 group-hover:bg-rose-500 group-hover:text-white',
    link: 'text-rose-600 group-hover:text-rose-700',
  },
] as const;

export function ServicesCoreGrid() {
  return (
    <section className='py-16 md:py-20'>
      <Container>
        <SectionHeader
          title='Our Core Services'
          action={{ label: 'Explore all services', href: '#custom-software' }}
          accent
        />
        <StaggerChildren className='grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
          {servicesList.map((service, index) => {
            const Icon = getIcon(service.icon);
            const accent = cardAccents[index % cardAccents.length];

            return (
              <StaggerItem key={service.id} hoverLift={false}>
                <Card
                  id={service.id}
                  className='group relative h-full scroll-mt-28 overflow-hidden border border-border/80 bg-card p-0 shadow-sm'
                >
                  <span
                    className={cn(
                      'pointer-events-none absolute inset-0 origin-bottom-left scale-0 rounded-xl',
                      'transition-transform duration-700 ease-[cubic-bezier(0.34,1.45,0.64,1)]',
                      'group-hover:scale-100',
                      accent.fill
                    )}
                    aria-hidden
                  />
                  <CardContent className='relative z-1 flex h-full flex-col gap-3 p-5 pt-6'>
                    <span
                      className={cn(
                        'flex size-12 items-center justify-center rounded-2xl transition-all duration-500 ease-out',
                        accent.icon
                      )}
                    >
                      <Icon className='size-6 stroke-[1.5]' />
                    </span>
                    <h3 className='text-base font-bold leading-snug text-foreground'>
                      {service.title}
                    </h3>
                    <p className='flex-1 text-sm leading-relaxed text-muted-foreground'>
                      {service.description}
                    </p>
                    <Link
                      href={service.href}
                      className={cn(
                        'mt-1 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-500',
                        accent.link
                      )}
                    >
                      Learn More
                      <ArrowRight className='size-3.5' />
                    </Link>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </Container>
    </section>
  );
}
