import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/shared/motion/stagger-children";
import { cultureCards, cultureIntro } from "@/features/careers/data/careers";
import { getIcon } from "@/lib/icons";

export function CultureSection() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeader
          eyebrow={cultureIntro.eyebrow}
          title={cultureIntro.title}
          description={cultureIntro.description}
          align="center"
        />
        <StaggerChildren className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cultureCards.map((card) => {
            const Icon = getIcon(card.icon);
            return (
              <StaggerItem key={card.title}>
                <div className="h-full rounded-xl border bg-background p-5 shadow-sm">
                  <span className="mb-3 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-semibold">{card.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </Container>
    </section>
  );
}
