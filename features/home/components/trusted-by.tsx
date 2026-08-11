import { Container } from '@/components/shared/container';
import { SectionHeader } from '@/components/shared/section-header';
import { FadeIn } from '@/components/shared/motion/fade-in';
import { trustedBy } from '@/features/home/data/trusted-by';
import type { LandingContent } from '@/features/dashboard/data/landing-cms';

const wideLogos = new Set(['AWS', 'Oracle', 'IBM']);

export function TrustedBy({ data }: { data?: LandingContent['trustedBy'] }) {
  const content = data ?? {
    title: 'Trusted by Startups & Enterprises Worldwide',
    brands: trustedBy.map((b) => ({ name: b.name, logo: b.logo })),
  };

  return (
    <section className='border-y bg-white py-12 md:py-14'>
      <Container>
        <SectionHeader title={content.title} align='center' className='mb-8' accent />
        <FadeIn>
          <div className='flex flex-wrap items-center justify-center gap-x-8 gap-y-7 md:gap-x-10 lg:justify-between lg:gap-x-4'>
            {content.brands.map((brand) => {
              const isWide = wideLogos.has(brand.name);
              return (
                <div
                  key={brand.name}
                  className='flex h-11 shrink-0 items-center gap-2.5 opacity-90 transition duration-300 hover:opacity-100'
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    width={isWide ? 96 : 32}
                    height={32}
                    className={
                      isWide
                        ? 'h-7 w-auto max-w-27.5 object-contain md:h-8'
                        : 'size-7 object-contain md:size-8'
                    }
                    loading='lazy'
                  />
                  {!isWide ? (
                    <span className='text-sm font-semibold tracking-tight text-neutral-700 md:text-[15px]'>
                      {brand.name}
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
