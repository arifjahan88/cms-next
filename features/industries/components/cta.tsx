import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import {
  industriesCta,
  industriesCtaValues,
} from "@/features/industries/data/industries";
import { getIcon } from "@/lib/icons";

export function IndustriesCta() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="overflow-hidden rounded-2xl bg-brand-navy text-brand-navy-foreground">
          <div className="grid items-center gap-8 p-6 md:p-10 lg:grid-cols-[0.9fr_1.1fr_1fr] lg:gap-10">
            <ImagePlaceholder
              label="[CTA Illustration]"
              className="min-h-[200px] border-white/20 bg-white/5 text-white/70"
            />

            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                {industriesCta.title}
              </h2>
              <p className="mt-3 text-sm text-white/80 md:text-base">
                {industriesCta.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="h-11 bg-white px-5 text-primary hover:bg-white/90"
                  render={<Link href={industriesCta.primary.href} />}
                >
                  {industriesCta.primary.label}
                  <ArrowRight data-icon="inline-end" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 border-white/40 bg-transparent px-5 text-white hover:bg-white/10"
                  render={<Link href={industriesCta.secondary.href} />}
                >
                  {industriesCta.secondary.label}
                </Button>
              </div>
            </div>

            <ul className="space-y-4">
              {industriesCtaValues.map((item) => {
                const Icon = getIcon(item.icon);
                return (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-xs text-white/70">{item.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
