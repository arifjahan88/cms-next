import { Container } from '@/components/shared/container';
import { FadeIn } from '@/components/shared/motion/fade-in';
import { StaggerChildren, StaggerItem } from '@/components/shared/motion/stagger-children';
import { trustItems } from '@/features/consultation/data/consultation';
import { getIcon } from '@/lib/icons';

export function TrustBar() {
  return (
    <section className='border-y bg-background py-10 md:py-12'>
      <Container>
        <FadeIn>
          <StaggerChildren className='grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8'>
            {trustItems.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <StaggerItem key={item.title} hoverLift={false}>
                  <div className='flex items-start gap-3'>
                    <span className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                      <Icon className='size-5' />
                    </span>
                    <div>
                      <p className='font-semibold text-foreground'>{item.title}</p>
                      <p className='mt-0.5 text-xs text-muted-foreground md:text-sm'>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </FadeIn>
      </Container>
    </section>
  );
}
