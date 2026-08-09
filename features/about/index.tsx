import { AboutHero } from "@/features/about/components/hero";
import { AboutCompanyOverview } from "@/features/about/components/company-overview";
import { AboutMilestones } from "@/features/about/components/milestones";
import { AboutMissionVision } from "@/features/about/components/mission-vision";
import { AboutCoreValues } from "@/features/about/components/core-values";
import { AboutLeadership } from "@/features/about/components/leadership";
import { AboutStatsBanner } from "@/features/about/components/stats-banner";
import { AboutPartners } from "@/features/about/components/partners";
import { CtaBanner } from "@/components/shared/cta-banner";

export function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutCompanyOverview />
      <AboutMilestones />
      <AboutMissionVision />
      <AboutCoreValues />
      <AboutLeadership />
      <AboutStatsBanner />
      <AboutPartners />
      <CtaBanner
        variant="navy"
        title="Ready to build with a team that delivers?"
        description="Share your product goals—we’ll help you shape the team, roadmap, and next release."
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "View Careers", href: "/careers" }}
      />
    </>
  );
}
