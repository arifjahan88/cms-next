import { Container } from "@/components/shared/container";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { StatItem } from "@/components/shared/stat-item";
import { FadeIn } from "@/components/shared/motion/fade-in";
import { getIcon } from "@/lib/icons";
import { portfolioHero } from "@/features/portfolio/data/portfolio";

export function PortfolioHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-surface via-background to-primary/5 py-12 md:py-16">
      <Container>
        <PageBreadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Portfolio" }]}
        />
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <FadeIn>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {portfolioHero.title}{" "}
              <span className="text-primary">{portfolioHero.highlight}</span>
            </h1>
            <p className="mt-4 max-w-xl text-muted-foreground md:text-lg">
              {portfolioHero.description}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {portfolioHero.stats.map((stat) => (
                <StatItem
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  icon={getIcon(stat.icon)}
                />
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-white shadow-xl shadow-primary/10">
              <ImagePlaceholder
                label="[Portfolio Device Mockup]"
                className="absolute inset-0 rounded-xl"
              />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
