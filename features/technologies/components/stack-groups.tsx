import { Container } from '@/components/shared/container';
import { SectionHeader } from '@/components/shared/section-header';
import { TechIcon } from '@/components/shared/tech-icon';
import { StaggerChildren, StaggerItem } from '@/components/shared/motion/stagger-children';
import { stackGroups } from '@/features/technologies/data/technologies';

export function TechnologiesStackGroups() {
  return (
    <section className='bg-surface py-16 md:py-20'>
      <Container>
        <SectionHeader
          title='Our Development Stack'
          description='Languages, frameworks, tools, and cloud platforms we use every day.'
          accent
        />
        <StaggerChildren className='grid gap-8 sm:grid-cols-2 xl:grid-cols-4'>
          {stackGroups.map((group) => (
            <StaggerItem key={group.title} hoverLift={false}>
              <div>
                <h3 className='mb-4 text-sm font-semibold text-foreground'>{group.title}</h3>
                <div className='grid grid-cols-2 gap-2'>
                  {group.items.map((item) => (
                    <div key={item} className='flex flex-col items-center gap-1.5'>
                      <TechIcon label={item} className='size-14 w-full' />
                      <span className='text-[10px] font-medium text-muted-foreground'>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
