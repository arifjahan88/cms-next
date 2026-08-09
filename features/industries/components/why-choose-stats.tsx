import { Container } from '@/components/shared/container';
import { FadeIn } from '@/components/shared/motion/fade-in';
import { industriesStats, industriesWhyChoose } from '@/features/industries/data/industries';
import { getIcon } from '@/lib/icons';

export function IndustriesWhyChooseStats() {
  return (
    <section className='bg-surface py-16 md:py-20'>
      <Container>
        <FadeIn>
          <div className='grid items-center gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-12'>
            <div>
              <p className='mb-2 text-xs font-semibold uppercase tracking-wider text-primary'>
                {industriesWhyChoose.eyebrow}
              </p>
              <h2 className='text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl'>
                {industriesWhyChoose.title}{' '}
                <span className='text-primary'>{industriesWhyChoose.highlight}</span>
              </h2>
              <p className='mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base'>
                {industriesWhyChoose.description}
              </p>
            </div>

            <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
              {industriesStats.map((stat) => {
                const Icon = getIcon(stat.icon);
                return (
                  <div
                    key={stat.label}
                    className='flex flex-col gap-3 rounded-xl border border-border/80 bg-background p-4 shadow-sm'
                  >
                    <span className='flex size-9 items-center justify-center text-primary'>
                      <Icon className='size-5 stroke-[1.5]' />
                    </span>
                    <p className='text-2xl font-bold tracking-tight text-primary md:text-3xl'>
                      {stat.value}
                    </p>
                    <p className='text-xs font-medium leading-snug text-muted-foreground'>
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
