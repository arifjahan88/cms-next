import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/shared/motion/stagger-children";
import { stackGroups } from "@/features/technologies/data/technologies";

export function TechnologiesStackGroups() {
  return (
    <section className="bg-surface py-16 md:py-20">
      <Container>
        <SectionHeader
          title="Development Stack"
          description="Languages, frameworks, tools, and cloud platforms we use every day."
        />
        <StaggerChildren className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stackGroups.map((group) => (
            <StaggerItem key={group.title}>
              <div className="h-full">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                  {group.title}
                </h3>
                <ul className="space-y-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
