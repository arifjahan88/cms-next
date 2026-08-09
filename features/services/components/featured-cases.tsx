import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/shared/container";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { SectionHeader } from "@/components/shared/section-header";
import { TechStackItem } from "@/components/shared/tech-icon";
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
        className={embedded ? "mb-5" : undefined}
      />
      <StaggerChildren
        className={
          embedded
            ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            : "grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        }
      >
        {servicesCaseStudies.map((item) => (
          <StaggerItem key={item.id}>
            <Card className="h-full overflow-hidden rounded-xl border border-border/80 bg-background p-0 shadow-sm transition-shadow hover:shadow-md">
              <div className="relative aspect-16/10 overflow-hidden rounded-t-xl bg-muted">
                <ImagePlaceholder
                  label="[Case Study Image]"
                  className="absolute inset-0 rounded-none border-0"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-primary shadow-sm">
                  {item.category}
                </span>
              </div>
              <CardContent className="flex h-full flex-col gap-2.5 p-4">
                <h3 className="text-sm font-bold leading-snug text-foreground md:text-base">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">
                  {item.description}
                </p>
                <div className="mt-auto flex flex-col gap-3 pt-1">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                    {item.techStack.map((tech) => (
                      <TechStackItem key={tech} name={tech} />
                    ))}
                  </div>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    View Case Study
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
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
