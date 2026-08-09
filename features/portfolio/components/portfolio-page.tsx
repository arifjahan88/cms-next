import { PortfolioHero } from "@/features/portfolio/components/portfolio-hero";
import { PortfolioGrid } from "@/features/portfolio/components/portfolio-grid";
import { PortfolioCta } from "@/features/portfolio/components/portfolio-cta";

export function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <PortfolioGrid />
      <PortfolioCta />
    </>
  );
}
