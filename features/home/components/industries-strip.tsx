import Link from 'next/link';
import { Container } from '@/components/shared/container';
import { SectionHeader } from '@/components/shared/section-header';
import { StaggerChildren, StaggerItem } from '@/components/shared/motion/stagger-children';
import { industriesStrip } from '@/features/home/data/home';
import { getIcon } from '@/lib/icons';

export function IndustriesStrip() {
  return (
    <section className='bg-surface py-16 md:py-20'>
      <Container>
        <SectionHeader
          title='Industries We Serve'
          action={{ label: 'View all industries', href: '/industries' }}
          accent
        />
        <StaggerChildren className='mb-8 flex flex-wrap justify-center gap-3 md:gap-4'>
          {industriesStrip.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <StaggerItem key={item.id}>
                <Link
                  href={item.href}
                  className='flex min-w-30 flex-col items-center gap-2 rounded-xl border bg-background px-4 py-4 text-center shadow-sm transition hover:border-primary/40 hover:shadow-md'
                >
                  <span className='flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                    <Icon className='size-5' />
                  </span>
                  <span className='text-sm font-medium'>{item.title}</span>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </Container>
    </section>
  );
}
