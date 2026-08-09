import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { servicesMiniCta } from "@/features/services/data/services";

export function ServicesMiniCta() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-primary/5 px-6 py-10 md:px-12 md:py-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_auto]">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                {servicesMiniCta.title}
              </h2>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
                {servicesMiniCta.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {servicesMiniCta.benefits.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="size-3 stroke-[2.5]" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button
                  size="lg"
                  className="h-11 px-5"
                  render={<Link href={servicesMiniCta.primary.href} />}
                >
                  {servicesMiniCta.primary.label}
                  <ArrowRight data-icon="inline-end" />
                </Button>
              </div>
            </div>
            <ImagePlaceholder
              label="[Handshake Illustration]"
              className="mx-auto min-h-36 w-full max-w-xs border-primary/15 bg-white/60 lg:min-h-40 lg:w-56"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
