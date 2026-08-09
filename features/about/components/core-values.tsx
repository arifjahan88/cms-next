import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/shared/motion/stagger-children";
import { coreValues } from "@/features/about/data/about";
import { getIcon } from "@/lib/icons";

export function AboutCoreValues() {
  return (
    <section className="bg-surface py-16 md:py-20">
      <Container>
        <SectionHeader
          title="Our Core Values"
          description="Culture that shows up in how we hire, build, and partner."
          align="center"
        />
        <StaggerChildren className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {coreValues.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <StaggerItem key={item.title}>
                <div className="flex h-full flex-col items-center rounded-xl border bg-background p-5 text-center shadow-sm">
                  <span className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-5 stroke-[1.5]" />
                  </span>
                  <h3 className="text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-snug text-muted-foreground">
                    {item.description}
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
