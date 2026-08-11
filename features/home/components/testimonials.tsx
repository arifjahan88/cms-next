'use client';

import { Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/shared/container';
import { SectionHeader } from '@/components/shared/section-header';
import { FadeIn } from '@/components/shared/motion/fade-in';
import { testimonials } from '@/features/home/data/home';
import type { LandingContent } from '@/features/dashboard/data/landing-cms';

import 'swiper/css';
import 'swiper/css/pagination';

export function Testimonials({ data }: { data?: LandingContent['testimonials'] }) {
  const content = data ?? {
    title: 'What Our Clients Say',
    description: 'Trusted by product leaders and founders across industries.',
    items: testimonials.map((t) => ({ ...t })),
  };

  return (
    <section className='py-16 md:py-20'>
      <Container>
        <SectionHeader
          title={content.title}
          description={content.description}
          align='center'
          accent
        />
        <FadeIn>
          <div className='testimonials-swiper relative'>
            <Swiper
              modules={[Autoplay, Pagination]}
              loop
              speed={800}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className='pb-10!'
            >
              {content.items.map((item) => (
                <SwiperSlide key={item.id} className='h-auto!'>
                  <Card className='h-full shadow-sm p-0 m-1'>
                    <CardContent className='flex h-full flex-col gap-4 p-6'>
                      <div className='flex gap-0.5 text-amber-500'>
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star key={i} className='size-4 fill-current' />
                        ))}
                      </div>
                      <p className='flex-1 text-sm leading-relaxed text-muted-foreground'>
                        “{item.quote}”
                      </p>
                      <div className='flex items-center gap-3 border-t pt-4'>
                        <Avatar>
                          <AvatarFallback className='bg-primary/10 text-primary'>
                            {item.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className='text-sm font-semibold'>{item.name}</p>
                          <p className='text-xs text-muted-foreground'>{item.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
