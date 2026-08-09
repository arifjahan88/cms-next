import { Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ImagePlaceholder } from '@/components/shared/image-placeholder';
import { PageHero } from '@/components/shared/page-hero';
import { FadeIn } from '@/components/shared/motion/fade-in';
import { caseStudiesHero } from '@/features/case-studies/data/case-studies';

export function CaseStudiesHero() {
  return (
    <PageHero
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Case Studies' }]}
      title={caseStudiesHero.title}
      highlight={caseStudiesHero.highlight}
      description={caseStudiesHero.description}
    >
      <FadeIn>
        <div className='relative'>
          <ImagePlaceholder
            label='[World Map Background]'
            className='absolute inset-0 rounded-2xl border-0 bg-primary/5 opacity-60'
          />
          <Card className='relative border-primary/15 bg-white/95 shadow-lg shadow-primary/5'>
            <CardContent className='space-y-4 p-6 md:p-8'>
              <span className='flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <Trophy className='size-5' />
              </span>
              <div>
                <h3 className='text-xl font-bold text-primary'>{caseStudiesHero.impact.title}</h3>
                <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
                  {caseStudiesHero.impact.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </FadeIn>
    </PageHero>
  );
}
