import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

export function PageHero({
  breadcrumb,
  eyebrow,
  title,
  highlight,
  description,
  children,
  className,
  actions,
}: {
  breadcrumb?: { label: string; href?: string }[];
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  actions?: {
    primary?: { label: string; href: string };
    secondary?: { label: string; href: string; download?: boolean };
  };
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-linear-to-br from-surface via-background to-primary/5 py-12 md:py-16",
        className,
      )}
    >
      <Container>
        {breadcrumb ? <PageBreadcrumb items={breadcrumb} /> : null}
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            {eyebrow ? (
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {title} {highlight ? <span className="text-primary">{highlight}</span> : null}
            </h1>
            {description ? (
              <p className="mt-4 max-w-xl text-muted-foreground md:text-lg">{description}</p>
            ) : null}
            {actions ? (
              <div className="mt-6 flex flex-wrap gap-3">
                {actions.primary ? (
                  <Button
                    size="lg"
                    className="h-11 px-5"
                    render={<Link href={actions.primary.href} />}
                  >
                    {actions.primary.label}
                    <ArrowRight data-icon="inline-end" />
                  </Button>
                ) : null}
                {actions.secondary ? (
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-11 px-5 border-primary text-primary hover:bg-primary/5"
                    render={<Link href={actions.secondary.href} />}
                  >
                    {actions.secondary.download ? <Download data-icon="inline-start" /> : null}
                    {actions.secondary.label}
                  </Button>
                ) : null}
              </div>
            ) : null}
          </div>
          {children ? <div>{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
