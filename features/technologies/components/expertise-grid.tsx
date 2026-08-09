import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/shared/container';
import { SectionHeader } from '@/components/shared/section-header';
import { TechStackItem } from '@/components/shared/tech-icon';
import { StaggerChildren, StaggerItem } from '@/components/shared/motion/stagger-children';
import { expertiseAreas } from '@/features/technologies/data/technologies';
import { getIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';

const cardAccents = [
  {
    fill: 'bg-sky-50',
    icon: 'bg-sky-500/10 text-sky-600 group-hover:bg-sky-500 group-hover:text-white',
  },
  {
    fill: 'bg-violet-50',
    icon: 'bg-violet-500/10 text-violet-600 group-hover:bg-violet-600 group-hover:text-white',
  },
  {
    fill: 'bg-emerald-50',
    icon: 'bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white',
  },
  {
    fill: 'bg-amber-50',
    icon: 'bg-amber-500/10 text-amber-600 group-hover:bg-amber-500 group-hover:text-white',
  },
  {
    fill: 'bg-blue-50',
    icon: 'bg-blue-500/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
  },
  {
    fill: 'bg-cyan-50',
    icon: 'bg-cyan-500/10 text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white',
  },
  {
    fill: 'bg-indigo-50',
    icon: 'bg-indigo-500/10 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white',
  },
  {
    fill: 'bg-rose-50',
    icon: 'bg-rose-500/10 text-rose-600 group-hover:bg-rose-500 group-hover:text-white',
  },
  {
    fill: 'bg-teal-50',
    icon: 'bg-teal-500/10 text-teal-600 group-hover:bg-teal-500 group-hover:text-white',
  },
  {
    fill: 'bg-orange-50',
    icon: 'bg-orange-500/10 text-orange-600 group-hover:bg-orange-500 group-hover:text-white',
  },
] as const;

export function TechnologiesExpertise() {
  return (
    <section className='py-16 md:py-20'>
      <Container>
        <SectionHeader
          title='Our Technology Expertise'
          description='Specialist teams across the full product stack—from interfaces to infrastructure.'
          accent
        />
        <StaggerChildren className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
          {expertiseAreas.map((area, index) => {
            const Icon = getIcon(area.icon);
            const accent = cardAccents[index % cardAccents.length];
            return (
              <StaggerItem key={area.id} hoverLift={false}>
                <Card className='group relative h-full overflow-hidden border border-border/80 bg-card p-0 shadow-sm'>
                  <span
                    className={cn(
                      'pointer-events-none absolute inset-0 origin-bottom-left scale-0 rounded-xl',
                      'transition-transform duration-700 ease-[cubic-bezier(0.34,1.45,0.64,1)]',
                      'group-hover:scale-100',
                      accent.fill
                    )}
                    aria-hidden
                  />
                  <CardContent className='relative z-1 flex h-full flex-col gap-3 p-5'>
                    <span
                      className={cn(
                        'flex size-11 items-center justify-center rounded-2xl transition-all duration-500',
                        accent.icon
                      )}
                    >
                      <Icon className='size-5 stroke-[1.5]' />
                    </span>
                    <h3 className='font-bold text-foreground'>{area.title}</h3>
                    <p className='text-sm text-muted-foreground'>{area.description}</p>
                    <div className='mt-auto flex flex-col gap-1.5 pt-1'>
                      {area.techs.map((tech) => (
                        <TechStackItem key={tech} name={tech} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </Container>
    </section>
  );
}
