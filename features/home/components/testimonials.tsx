"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn } from "@/components/shared/motion/fade-in";
import { testimonials } from "@/features/home/data/home";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const dotCount = testimonials.length;

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeader
          title="What Our Clients Say"
          description="Trusted by product leaders and founders across industries."
          align="center"
        />
        <FadeIn>
          <Carousel
            opts={{ align: "start", loop: true }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <Card className="h-full border shadow-sm">
                    <CardContent className="flex h-full flex-col gap-4 p-6">
                      <div className="flex gap-0.5 text-amber-500">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star key={i} className="size-4 fill-current" />
                        ))}
                      </div>
                      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                        “{item.quote}”
                      </p>
                      <div className="flex items-center gap-3 border-t pt-4">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {item.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.role}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-3 hidden md:flex" />
            <CarouselNext className="-right-3 hidden md:flex" />
          </Carousel>
          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: dotCount }).map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === current}
                className={cn(
                  "size-2.5 rounded-full transition-colors",
                  index === current
                    ? "bg-primary"
                    : "bg-muted-foreground/25 hover:bg-muted-foreground/40"
                )}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
