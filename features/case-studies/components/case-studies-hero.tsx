import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/shared/page-hero";
import { FadeIn } from "@/components/shared/motion/fade-in";
import { caseStudiesHero } from "@/features/case-studies/data/case-studies";

export function CaseStudiesHero() {
  return (
    <PageHero
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Case Studies" },
      ]}
      title={caseStudiesHero.title}
      highlight={caseStudiesHero.highlight}
      description={caseStudiesHero.description}
    >
      <FadeIn>
        <Card className="border-primary/15 bg-white shadow-lg shadow-primary/5">
          <CardContent className="space-y-5 p-6 md:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {caseStudiesHero.impact.title}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {caseStudiesHero.impact.description}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {caseStudiesHero.impact.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl bg-primary/5 px-4 py-3"
                >
                  <p className="text-2xl font-bold text-foreground">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </PageHero>
  );
}
