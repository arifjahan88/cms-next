import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/shared/motion/stagger-children";
import { milestones } from "@/features/about/data/about";

export function AboutMilestones() {
  return (
    <section className="bg-surface py-16 md:py-20">
      <Container>
        <SectionHeader
          title="Our Journey"
          description="Milestones that shaped Zaimah Technologies from 2000 to today."
        />
        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-border md:left-1/2 md:block" />
          <StaggerChildren className="space-y-6">
            {milestones.map((item, index) => (
              <StaggerItem key={item.year}>
                <div
                  className={`relative grid gap-4 md:grid-cols-2 md:gap-10 ${
                    index % 2 === 1 ? "md:text-right" : ""
                  }`}
                >
                  <div
                    className={
                      index % 2 === 1
                        ? "md:col-start-2"
                        : "md:col-start-1 md:pr-10"
                    }
                  >
                    <div className="rounded-xl border bg-background p-5 shadow-sm">
                      <p className="text-sm font-semibold text-primary">
                        {item.year}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <span className="absolute left-4 top-6 hidden size-3 -translate-x-1/2 rounded-full border-2 border-primary bg-background md:left-1/2 md:block" />
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </Container>
    </section>
  );
}
