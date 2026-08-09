import { Container } from "@/components/shared/container";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { SectionHeader } from "@/components/shared/section-header";
import { StaggerChildren, StaggerItem } from "@/components/shared/motion/stagger-children";
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
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border bg-background shadow-sm">
                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    <span className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-6 stroke-[1.5]" />
                    </span>
                    <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {item.description}
                    </p>
                  </div>
                  <div className="border-t bg-surface/50 p-4 md:p-5">
                    <ImagePlaceholder
                      label={item.illustration}
                      className="aspect-video min-h-28 rounded-xl"
                    />
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </Container>
    </section>
  );
}
