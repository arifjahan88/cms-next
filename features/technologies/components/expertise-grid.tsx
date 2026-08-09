import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/shared/motion/stagger-children";
import { expertiseAreas } from "@/features/technologies/data/technologies";
import { getIcon } from "@/lib/icons";

export function TechnologiesExpertise() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeader
          title="Our Technology Expertise"
          description="Specialist teams across the full product stack—from interfaces to infrastructure."
        />
        <StaggerChildren className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {expertiseAreas.map((area) => {
            const Icon = getIcon(area.icon);
            return (
              <StaggerItem key={area.id}>
                <Card className="h-full border shadow-sm transition-shadow hover:shadow-md">
                  <CardContent className="flex h-full flex-col gap-3 p-5">
                    <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <div className="space-y-1.5">
                      <h3 className="font-semibold">{area.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {area.description}
                      </p>
                    </div>
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                      {area.techs.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="font-normal"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </Container>
    </section>
  );
}
