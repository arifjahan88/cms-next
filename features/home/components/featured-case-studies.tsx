import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/shared/container";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { SectionHeader } from "@/components/shared/section-header";
import { TechIcon } from "@/components/shared/tech-icon";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/shared/motion/stagger-children";
import { featuredCaseStudies } from "@/features/home/data/home";

export function FeaturedCaseStudies() {
  return (
    <section className="bg-surface py-16 md:py-20">
      <Container>
        <SectionHeader
          title="Featured Case Studies"
          description="Real solutions delivering measurable business impact."
          action={{ label: "View all case studies", href: "/case-studies" }}
        />
        <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredCaseStudies.map((item) => (
            <StaggerItem key={item.id}>
              <Card className="h-full overflow-hidden border shadow-sm transition-shadow hover:shadow-md">
                <div className="relative aspect-[16/10] bg-muted">
                  <ImagePlaceholder
                    label="[Case Study Image]"
                    className="absolute inset-0 rounded-xl"
                  />
                  <Badge className="absolute left-3 top-3">{item.category}</Badge>
                </div>
                <CardContent className="flex flex-col gap-3 p-5">
                  <h3 className="text-lg font-semibold leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.techStack.map((tech) => (
                        <TechIcon key={tech} label={tech} className="size-10" />
                      ))}
                    </div>
                  </div>
                  <Link
                    href={item.href}
                    className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    View Case Study <ArrowRight className="size-3.5" />
                  </Link>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
