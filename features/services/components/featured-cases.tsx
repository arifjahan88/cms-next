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
import { servicesCaseStudies } from "@/features/services/data/services";

export function ServicesFeaturedCases({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const content = (
    <>
      <SectionHeader
        title="Featured Case Studies"
        description="Recent engagements where our services delivered measurable outcomes."
        action={
          embedded
            ? undefined
            : { label: "View all case studies", href: "/case-studies" }
        }
        className={embedded ? "mb-5" : undefined}
      />
      <StaggerChildren
        className={
          embedded ? "grid gap-4" : "grid gap-6 md:grid-cols-2"
        }
      >
        {servicesCaseStudies.map((item) => (
          <StaggerItem key={item.id}>
            <Card className="h-full overflow-hidden border shadow-sm transition-shadow hover:shadow-md">
              <div className="relative aspect-[16/10] bg-muted">
                <ImagePlaceholder
                  label="[Case Study Image]"
                  className="absolute inset-0 rounded-xl"
                />
                <Badge className="absolute left-3 top-3">{item.category}</Badge>
              </div>
              <CardContent className="flex flex-col gap-3 p-4">
                <h3 className="text-base font-semibold leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.techStack.map((tech) => (
                    <TechIcon key={tech} label={tech} className="size-9" />
                  ))}
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
    </>
  );

  if (embedded) {
    return <div className="min-w-0">{content}</div>;
  }

  return (
    <section className="bg-surface py-16 md:py-20">
      <Container>{content}</Container>
    </section>
  );
}
