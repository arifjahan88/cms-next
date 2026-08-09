import { Container } from '@/components/shared/container';
import { ImagePlaceholder } from '@/components/shared/image-placeholder';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { StaggerChildren, StaggerItem } from '@/components/shared/motion/stagger-children';
import { TechIcon } from '@/components/shared/tech-icon';
import {
  techHeroBadges,
  techHeroPillars,
  technologiesHero,
} from '@/features/technologies/data/technologies';
import { getIcon } from '@/lib/icons';

const badgePositions = [
  'left-3 top-6',
  'right-4 top-10',
  'left-8 bottom-24',
  'right-6 top-1/2',
  'right-8 bottom-12',
  'left-1/3 bottom-8',
];

export function TechnologiesHero() {
  return (
    <section className='relative overflow-hidden bg-linear-to-br from-surface via-background to-primary/5 py-12 md:py-16'>
      <Container>
        <PageBreadcrumb items={technologiesHero.breadcrumb} />
        <div className='grid items-center gap-10 lg:grid-cols-2'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl'>
              {technologiesHero.title}{' '}
              <span className='text-primary'>{technologiesHero.highlight}</span>
            </h1>
            <p className='mt-4 max-w-xl text-muted-foreground md:text-lg'>
              {technologiesHero.description}
            </p>
            <StaggerChildren className='mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4'>
              {techHeroPillars.map((pillar) => {
                const Icon = getIcon(pillar.icon);
                return (
                  <StaggerItem key={pillar.title} hoverLift={false}>
                    <div className='flex h-full flex-col gap-2 rounded-xl border border-border/80 bg-background p-3 shadow-sm'>
                      <span className='flex size-8 items-center justify-center text-primary'>
                        <Icon className='size-4 stroke-[1.5]' />
                      </span>
                      <h3 className='text-xs font-bold sm:text-sm'>{pillar.title}</h3>
                      <p className='text-[11px] leading-snug text-muted-foreground'>
                        {pillar.description}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>
          </div>

          <div className='relative'>
            <ImagePlaceholder
              label='[Technologies Hero Illustration]'
              className='aspect-4/3 min-h-70 rounded-2xl shadow-xl shadow-primary/10'
            />
            {techHeroBadges.map((tech, index) => (
              <span
                key={tech}
                className={`absolute z-10 ${badgePositions[index] ?? badgePositions[0]}`}
              >
                <TechIcon label={tech} className='size-11 shadow-md' />
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
