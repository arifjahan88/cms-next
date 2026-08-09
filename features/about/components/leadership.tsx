import { Link2, Mail } from 'lucide-react';
import { Container } from '@/components/shared/container';
import { ImagePlaceholder } from '@/components/shared/image-placeholder';
import { SectionHeader } from '@/components/shared/section-header';
import { FadeIn } from '@/components/shared/motion/fade-in';
import { StaggerChildren, StaggerItem } from '@/components/shared/motion/stagger-children';
import { leadership } from '@/features/about/data/about';

export function AboutLeadership() {
  const featured = leadership.find((member) => member.featured);
  const others = leadership.filter((member) => !member.featured);

  return (
    <section className='py-16 md:py-20'>
      <Container>
        <SectionHeader
          title='Leadership Team'
          description='Experienced leaders guiding strategy, delivery, and craftsmanship.'
        />
        <div className='grid gap-6 lg:grid-cols-[1.1fr_1.4fr] lg:gap-8'>
          {featured ? (
            <FadeIn>
              <div className='flex h-full flex-col overflow-hidden rounded-2xl border bg-background shadow-sm'>
                <div className='relative aspect-4/5 bg-muted sm:aspect-square lg:aspect-4/5'>
                  <ImagePlaceholder
                    label={`[${featured.name} Portrait]`}
                    className='absolute inset-0 rounded-none border-0'
                  />
                </div>
                <div className='flex flex-1 flex-col gap-2 p-5 md:p-6'>
                  <h3 className='text-xl font-bold text-foreground md:text-2xl'>{featured.name}</h3>
                  <p className='text-sm font-medium text-primary'>{featured.role}</p>
                  {featured.bio ? (
                    <p className='mt-1 text-sm leading-relaxed text-muted-foreground'>
                      {featured.bio}
                    </p>
                  ) : null}
                  <div className='mt-3 flex gap-2'>
                    {featured.linkedin ? (
                      <a
                        href={featured.linkedin}
                        className='flex size-9 items-center justify-center rounded-lg border text-primary transition hover:bg-primary/5'
                        aria-label={`${featured.name} on LinkedIn`}
                      >
                        <Link2 className='size-4' />
                      </a>
                    ) : null}
                    {featured.email ? (
                      <a
                        href={`mailto:${featured.email}`}
                        className='flex size-9 items-center justify-center rounded-lg border text-primary transition hover:bg-primary/5'
                        aria-label={`Email ${featured.name}`}
                      >
                        <Mail className='size-4' />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </FadeIn>
          ) : null}

          <StaggerChildren className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {others.map((member) => (
              <StaggerItem key={member.id}>
                <div className='flex h-full flex-col overflow-hidden rounded-xl border bg-background shadow-sm'>
                  <div className='relative aspect-4/3 bg-muted'>
                    <ImagePlaceholder
                      label={`[${member.name} Portrait]`}
                      className='absolute inset-0 rounded-none border-0'
                    />
                  </div>
                  <div className='flex flex-1 flex-col p-4'>
                    <h3 className='font-semibold text-foreground'>{member.name}</h3>
                    <p className='mt-0.5 text-xs font-medium text-primary sm:text-sm'>
                      {member.role}
                    </p>
                    {member.bio ? (
                      <p className='mt-2 text-xs leading-snug text-muted-foreground'>
                        {member.bio}
                      </p>
                    ) : null}
                    {member.linkedin ? (
                      <a
                        href={member.linkedin}
                        className='mt-3 inline-flex size-8 items-center justify-center rounded-md border text-primary transition hover:bg-primary/5'
                        aria-label={`${member.name} on LinkedIn`}
                      >
                        <Link2 className='size-3.5' />
                      </a>
                    ) : null}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </Container>
    </section>
  );
}
