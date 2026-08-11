import Link from 'next/link';
import { ArrowRight, HeartPulse, Landmark, Building2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/shared/container';
import { ImagePlaceholder } from '@/components/shared/image-placeholder';
import { SectionHeader } from '@/components/shared/section-header';
import { TechStackItem } from '@/components/shared/tech-icon';
import { StaggerChildren, StaggerItem } from '@/components/shared/motion/stagger-children';
import { featuredCaseStudies } from '@/features/home/data/home';
import type { LandingContent } from '@/features/dashboard/data/landing-cms';
import type { LucideIcon } from 'lucide-react';

const categoryIcons: Record<string, LucideIcon> = {
  Healthcare: HeartPulse,
  FinTech: Landmark,
  'Real Estate': Building2,
};

const categoryColors: Record<string, string> = {
  Healthcare: 'bg-orange-500',
  FinTech: 'bg-emerald-500',
  'Real Estate': 'bg-blue-500',
};

export function FeaturedCaseStudies({ data }: { data?: LandingContent['caseStudies'] }) {
  const content = data ?? {
    title: 'Featured Case Studies',
    action: { label: 'View all case studies', href: '/case-studies', newTab: false },
    items: featuredCaseStudies.map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      category: c.category,
      image: c.image,
      href: c.href,
      techStack: [...c.techStack],
    })),
  };

  return (
    <section className='bg-surface py-16 md:py-20'>
      <Container>
        <SectionHeader
          title={content.title}
          action={{ label: content.action.label, href: content.action.href }}
          accent
        />
        <StaggerChildren className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {content.items.map((item) => {
            const CategoryIcon = categoryIcons[item.category] ?? HeartPulse;
            const dotColor = categoryColors[item.category] ?? 'bg-primary';

            return (
              <StaggerItem key={item.id}>
                <Card className='h-full overflow-hidden border-0 bg-background p-0 shadow-md transition-shadow hover:shadow-lg'>
                  <div className='relative aspect-16/10 overflow-hidden rounded-t-xl bg-muted'>
                    <ImagePlaceholder
                      label={item.image || '[Case Study Image]'}
                      className='absolute inset-0 rounded-none border-0'
                    />
                    <span className='absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm'>
                      <span
                        className={`flex size-4 items-center justify-center rounded-full ${dotColor} text-white`}
                      >
                        <CategoryIcon className='size-2.5' />
                      </span>
                      {item.category}
                    </span>
                  </div>
                  <CardContent className='flex flex-col gap-3 p-5'>
                    <h3 className='text-lg font-bold leading-snug text-foreground'>{item.title}</h3>
                    <p className='text-sm leading-relaxed text-muted-foreground'>
                      {item.description}
                    </p>
                    <div className='mt-auto flex flex-col gap-3 pt-2'>
                      <div className='min-w-0'>
                        <p className='mb-2 text-[11px] font-semibold tracking-wide text-muted-foreground'>
                          Tech Stack
                        </p>
                        <div className='flex flex-wrap items-center gap-x-3 gap-y-2'>
                          {item.techStack.map((tech) => (
                            <TechStackItem key={tech} name={tech} />
                          ))}
                        </div>
                      </div>
                      <Link
                        href={item.href}
                        className='inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline'
                      >
                        View Case Study
                        <ArrowRight className='size-3.5' />
                      </Link>
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
