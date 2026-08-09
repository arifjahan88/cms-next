import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { trustedBy } from "@/features/home/data/home";
import { FadeIn } from "@/components/shared/motion/fade-in";

export function TrustedBy() {
  return (
    <section className="border-y bg-surface py-12">
      <Container>
        <SectionHeader
          title="Trusted by Startups & Enterprises Worldwide"
          align="center"
          className="mb-8"
        />
        <FadeIn>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
            {trustedBy.map((name) => (
              <div
                key={name}
                className="flex h-12 min-w-[120px] items-center justify-center rounded-lg border bg-background px-4 text-sm font-semibold text-muted-foreground grayscale transition hover:grayscale-0 hover:text-foreground"
              >
                {name}
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
