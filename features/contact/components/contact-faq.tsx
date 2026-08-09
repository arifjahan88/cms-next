import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/shared/container';
import { SectionHeader } from '@/components/shared/section-header';
import { FadeIn } from '@/components/shared/motion/fade-in';
import { StaggerChildren, StaggerItem } from '@/components/shared/motion/stagger-children';
import { contactFaqs } from '@/features/contact/data/contact';
import { getIcon } from '@/lib/icons';

export function ContactFaq() {
  return (
    <section className='py-16 md:py-20'>
      <Container>
        <SectionHeader
          title='Frequently Asked Questions'
          action={{ label: 'View All FAQs', href: '/services' }}
        />
        <FadeIn>
          <StaggerChildren className='grid gap-4 md:grid-cols-2'>
            {contactFaqs.map((faq) => {
              const Icon = getIcon(faq.icon);
              return (
                <StaggerItem key={faq.question}>
                  <article className='group flex h-full items-start gap-4 rounded-xl border bg-background p-5 shadow-sm transition-shadow hover:shadow-md'>
                    <span className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                      <Icon className='size-5' />
                    </span>
                    <div className='min-w-0 flex-1'>
                      <h3 className='text-base font-semibold leading-snug'>{faq.question}</h3>
                      <p className='mt-1.5 text-sm text-muted-foreground'>{faq.answer}</p>
                    </div>
                    <ArrowRight className='mt-1 size-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary' />
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </FadeIn>
      </Container>
    </section>
  );
}
