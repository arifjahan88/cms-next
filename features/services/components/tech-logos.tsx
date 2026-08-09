import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { TechIcon } from "@/components/shared/tech-icon";
import { FadeIn } from "@/components/shared/motion/fade-in";
import { servicesTechCategories } from "@/features/services/data/services";

export function ServicesTechLogos() {
  return (
    <section className="border-y bg-surface py-12 md:py-16">
      <Container>
        <SectionHeader
          title="Technologies We Work With"
          action={{ label: "View all technologies", href: "/technologies" }}
          className="mb-8"
        />
        <FadeIn>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {servicesTechCategories.map((group) => (
              <div key={group.title} className="min-w-0">
                <h3 className="mb-3 text-sm font-semibold text-foreground">
                  {group.title}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {group.items.map((tech) => (
                    <TechIcon
                      key={tech}
                      label={tech}
                      className="size-auto h-12 w-full"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
