import { Link2, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/shared/container";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { SectionHeader } from "@/components/shared/section-header";
import { Reveal } from "@/components/shared/motion/reveal";
import { StaggerChildren, StaggerItem } from "@/components/shared/motion/stagger-children";
import { leadership } from "@/features/about/data/about";

export function AboutLeadership() {
  const featured = leadership.find((member) => member.featured);
  const others = leadership.filter((member) => !member.featured);

  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeader
          title="Leadership Team"
          description="Experienced leaders guiding strategy, delivery, and craftsmanship."
        />
        {featured ? (
          <Reveal className="mb-8">
            <Card className="overflow-hidden border shadow-sm">
              <CardContent className="grid gap-0 p-0 md:grid-cols-[0.9fr_1.1fr]">
                <div className="relative min-h-60 bg-muted md:min-h-full">
                  <ImagePlaceholder
                    label="[Leadership Photo]"
                    className="absolute inset-0 rounded-xl"
                  />
                </div>
                <div className="flex flex-col justify-center gap-3 p-6 md:p-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Featured Leader
                  </p>
                  <h3 className="text-2xl font-bold">{featured.name}</h3>
                  <p className="font-medium text-muted-foreground">{featured.role}</p>
                  <p className="text-sm text-muted-foreground md:text-base">{featured.bio}</p>
                  <div className="mt-2 flex gap-3">
                    {featured.linkedin ? (
                      <a
                        href={featured.linkedin}
                        className="text-primary hover:opacity-80"
                        aria-label={`${featured.name} on LinkedIn`}
                      >
                        <Link2 className="size-5" />
                      </a>
                    ) : null}
                    {featured.email ? (
                      <a
                        href={`mailto:${featured.email}`}
                        className="text-primary hover:opacity-80"
                        aria-label={`Email ${featured.name}`}
                      >
                        <Mail className="size-5" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ) : null}
        <StaggerChildren className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((member) => (
            <StaggerItem key={member.id}>
              <Card className="h-full overflow-hidden border shadow-sm">
                <div className="relative aspect-4/3 bg-muted">
                  <ImagePlaceholder
                    label="[Leadership Photo]"
                    className="absolute inset-0 rounded-xl"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                  {member.bio ? (
                    <p className="mt-2 text-xs text-muted-foreground">{member.bio}</p>
                  ) : null}
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
