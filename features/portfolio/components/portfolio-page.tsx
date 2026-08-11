import { loadPublicPortfolio } from '@/lib/public-entities';
import { PortfolioHero } from '@/features/portfolio/components/portfolio-hero';
import { PortfolioGrid } from '@/features/portfolio/components/portfolio-grid';
import { PortfolioCta } from '@/features/portfolio/components/portfolio-cta';

export async function PortfolioPage() {
  const projects = await loadPublicPortfolio();

  return (
    <>
      <PortfolioHero />
      <PortfolioGrid projects={projects} />
      <PortfolioCta />
    </>
  );
}
