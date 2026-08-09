import { Container } from '@/components/shared/container';
import { ImagePlaceholder } from '@/components/shared/image-placeholder';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { FadeIn } from '@/components/shared/motion/fade-in';
import { getIcon } from '@/lib/icons';
import { portfolioHero } from '@/features/portfolio/data/portfolio';

export function PortfolioHero() {
  return (
    <section className='relative overflow-hidden bg-linear-to-br from-surface via-background to-primary/5 py-12 md:py-16'>
      <Container>
        <PageBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Portfolio' }]} />
        <div className='grid items-center gap-10 lg:grid-cols-2'>
          <FadeIn>
            <h1 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl'>
              {portfolioHero.title} <span className='text-primary'>{portfolioHero.highlight}</span>
            </h1>
            <p className='mt-4 max-w-xl text-muted-foreground md:text-lg'>
              {portfolioHero.description}
            </p>
            <div className='mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4'>
              {portfolioHero.stats.map((stat) => {
                const Icon = getIcon(stat.icon);
                return (
                  <div key={stat.label} className='flex flex-col gap-2'>
                    <span className='flex size-8 items-center justify-center text-primary'>
                      <Icon className='size-4 stroke-[1.5]' />
                    </span>
                    <p className='text-sm font-bold leading-snug text-foreground'>
                      {stat.value} {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ImagePlaceholder
              label='[Portfolio Device Mockup]'
              className='aspect-4/3 min-h-70 rounded-2xl shadow-xl shadow-primary/10'
            />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
