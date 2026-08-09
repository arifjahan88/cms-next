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
        />
        <StaggerChildren className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((item) => {
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
      </Container>
    </section>
  );
}
