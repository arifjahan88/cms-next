import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/shared/motion/stagger-children";
import { missionVision } from "@/features/about/data/about";
import { getIcon } from "@/lib/icons";

export function AboutMissionVision() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeader
          title="Mission & Vision"
          description="The principles that guide every engagement and product decision."
          align="center"
        />
        <StaggerChildren className="grid gap-6 md:grid-cols-2">
          {missionVision.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <StaggerItem key={item.title}>
                <div className="h-full rounded-2xl border bg-background p-6 shadow-sm md:p-8">
                  <span className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-muted-foreground">{item.description}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </Container>
    </section>
  );
}
