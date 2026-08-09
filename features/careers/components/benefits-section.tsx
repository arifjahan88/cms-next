import { Container } from '@/components/shared/container';
import { SectionHeader } from '@/components/shared/section-header';
import { FadeIn } from '@/components/shared/motion/fade-in';
import { benefits, benefitsIntro } from '@/features/careers/data/careers';
import { getIcon } from '@/lib/icons';

export function BenefitsSection() {
  return (
    <section className='bg-surface py-16 md:py-20'>
      <Container>
        <SectionHeader
          eyebrow={benefitsIntro.eyebrow}
          title={benefitsIntro.title}
          description={benefitsIntro.description}
          align='center'
        />
        <FadeIn>
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6'>
            {benefits.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <div
                  key={item.title}
                  className='flex flex-col items-center gap-3 rounded-xl border bg-background px-3 py-6 text-center shadow-sm'
                >
                  <span className='flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary'>
                    <Icon className='size-5 stroke-[1.5]' />
                  </span>
                  <p className='text-sm font-medium text-foreground'>{item.title}</p>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
