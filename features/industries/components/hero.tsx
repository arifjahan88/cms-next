import { Container } from '@/components/shared/container';
import { ImagePlaceholder } from '@/components/shared/image-placeholder';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { StaggerChildren, StaggerItem } from '@/components/shared/motion/stagger-children';
import {
  industriesHero,
  industriesHeroChips,
  industriesHeroFeatures,
} from '@/features/industries/data/industries';
import { getIcon } from '@/lib/icons';

const chipPositions = [
  'left-3 top-6 sm:left-4 sm:top-8',
  'right-4 top-10 sm:right-6 sm:top-12',
  'left-8 top-1/3 sm:left-10',
  'right-3 top-[42%] sm:right-5',
  'left-4 bottom-24 sm:left-6 sm:bottom-28',
  'right-8 bottom-20 sm:right-10 sm:bottom-24',
  'left-1/3 bottom-10',
  'right-1/4 bottom-8 sm:right-1/3',
];

export function IndustriesHero() {
  return (
    <section className='relative overflow-hidden bg-linear-to-br from-surface via-background to-primary/5 py-12 md:py-16'>
      <Container>
        <PageBreadcrumb items={industriesHero.breadcrumb} />
        <div className='grid items-center gap-10 lg:grid-cols-2'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl'>
              {industriesHero.title}{' '}
              <span className='text-primary'>{industriesHero.highlight}</span>
            </h1>
            <p className='mt-4 max-w-xl text-muted-foreground md:text-lg'>
              {industriesHero.description}
            </p>

            <StaggerChildren className='mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4'>
              {industriesHeroFeatures.map((feature) => {
                const Icon = getIcon(feature.icon);
                return (
                  <StaggerItem key={feature.title} hoverLift={false}>
                    <div className='flex h-full flex-col gap-2 rounded-xl border border-border/80 bg-background p-3 shadow-sm sm:p-3.5'>
                      <span className='flex size-8 items-center justify-center text-primary'>
                        <Icon className='size-4 stroke-[1.5]' />
                      </span>
                      <h3 className='text-xs font-bold leading-snug text-foreground sm:text-sm'>
                        {feature.title}
                      </h3>
                      <p className='text-[11px] leading-snug text-muted-foreground sm:text-xs'>
                        {feature.description}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>
          </div>

          <div className='relative'>
            <ImagePlaceholder
              label='[Industries City Illustration]'
              className='aspect-16/10 min-h-70 rounded-2xl shadow-lg shadow-primary/10'
            />
            {industriesHeroChips.map((chip, index) => {
              const Icon = getIcon(chip.icon);
              return (
                <span
                  key={chip.label}
                  className={`absolute z-10 inline-flex items-center gap-1.5 rounded-full border bg-background px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-md ${chipPositions[index] ?? chipPositions[0]}`}
                >
                  <span className='flex size-4 items-center justify-center rounded-full bg-primary/10 text-primary'>
                    <Icon className='size-2.5' />
                  </span>
                  {chip.label}
                </span>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
