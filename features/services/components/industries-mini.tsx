import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/shared/motion/stagger-children";
import { servicesIndustries } from "@/features/services/data/services";
import { getIcon } from "@/lib/icons";

export function ServicesIndustriesMini({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const content = (
    <>
      <SectionHeader
        title="Industries We Serve"
        description="Domain expertise that helps us ship compliant, high-impact products faster."
        action={
          embedded
            ? undefined
            : { label: "View all industries", href: "/industries" }
        }
        className={embedded ? "mb-5" : undefined}
      />
      <StaggerChildren
        className={
          embedded
            ? "mb-4 grid gap-3 sm:grid-cols-2"
            : "mb-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        }
      >
        {servicesIndustries.map((item) => {
          const Icon = getIcon(item.icon);
          return (
            <StaggerItem key={item.id}>
              <Link
                href={item.href}
                className="flex h-full flex-col items-center gap-2 rounded-xl border bg-background px-3 py-4 text-center shadow-sm transition hover:border-primary/40 hover:shadow-md"
              >
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <span className="text-sm font-semibold">{item.title}</span>
                <span className="text-xs text-muted-foreground">
                  {item.description}
                </span>
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerChildren>
      <div className={embedded ? "" : "text-center"}>
        <Button
          variant="outline"
          size={embedded ? "sm" : "default"}
          render={<Link href="/industries" />}
        >
          Explore Industries
        </Button>
      </div>
    </>
  );

  if (embedded) {
    return <div className="min-w-0">{content}</div>;
  }

  return (
    <section className="py-16 md:py-20">
      <Container>{content}</Container>
    </section>
  );
}
