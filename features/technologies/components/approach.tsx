import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { Reveal } from "@/components/shared/motion/reveal";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/shared/motion/stagger-children";
import { approachBenefits } from "@/features/technologies/data/technologies";
import { getIcon } from "@/lib/icons";

export function TechnologiesApproach() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeader
              title="Why Our Technology Approach Matters"
              description="Tooling choices compound. We optimize for long-term product health—velocity today without locking you into brittle platforms tomorrow."
              className="mb-0"
            />
          </Reveal>
          <StaggerChildren className="grid gap-4 sm:grid-cols-2">
            {approachBenefits.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <StaggerItem key={item.title}>
                  <div className="h-full rounded-xl border bg-background p-5 shadow-sm">
                    <span className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </Container>
    </section>
  );
}
