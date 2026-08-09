import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { getIcon } from "@/lib/icons";
import { portfolioCtaFeatures } from "@/features/portfolio/data/portfolio";

export function PortfolioCta() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="overflow-hidden rounded-2xl bg-primary/5 px-6 py-10 md:px-10 md:py-12">
          <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
            <ImagePlaceholder
              label="[Rocket Illustration]"
              className="min-h-[200px] w-full"
            />
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Have a Project in Mind?
              </h2>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
                Partner with Zaimah to design, build, and scale software that
                delivers measurable results.
              </p>
              <div className="mt-6">
                <Button
                  size="lg"
                  className="h-11 px-5"
                  render={<Link href="/book-consultation" />}
                >
                  Book a Consultation
                  <ArrowRight data-icon="inline-end" />
                </Button>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {portfolioCtaFeatures.map((feature) => {
                  const Icon = getIcon(feature.icon);
                  return (
                    <div key={feature.title} className="flex gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{feature.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
