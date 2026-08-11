import {
  aboutHero,
  aboutHeroStats,
  aboutStats,
  certifications,
  companyFeatures,
  companyOverview,
  coreValues,
  leadership,
  milestones,
  missionVision,
  partners,
} from '@/features/about/data/about';
import {
  aboutCard,
  blogCategories,
  blogHero,
  exploreTopics,
  latestSection,
  subscribeCard,
} from '@/features/blog/data/blog';
import {
  careersCta,
  careersHero,
  careersStats,
  benefits,
  benefitsIntro,
  cultureCards,
  cultureIntro,
  jobDepartments,
  jobLocations,
  openPositionsIntro,
} from '@/features/careers/data/careers';
import {
  caseStudiesHero,
  caseStudiesStats,
} from '@/features/case-studies/data/case-studies';
import {
  consultationHero,
  inquiryFormCopy,
  budgets,
  projectTypes,
  referralSources,
  services as consultationServices,
  sidebarHelp,
  timeSlots,
  trustItems,
  whyBook,
} from '@/features/consultation/data/consultation';
import {
  contactChannels,
  contactFaqs,
  contactHero,
  followUs,
  offices,
} from '@/features/contact/data/contact';
import {
  createLandingPageDocument,
  landingContentSeed,
} from '@/features/dashboard/data/landing-cms';
import type { PageSlug } from '@/features/dashboard/data/public-pages';
import {
  industriesCta,
  industriesCtaValues,
  industriesHero,
  industriesHeroChips,
  industriesHeroFeatures,
  industriesStats,
  industriesWeServe,
  industriesWhyChoose,
} from '@/features/industries/data/industries';
import {
  portfolioCtaFeatures,
  portfolioFilters,
  portfolioHero,
  portfolioSortOptions,
} from '@/features/portfolio/data/portfolio';
import {
  comparisonRows,
  processSteps,
  servicesFaqs,
  servicesHero,
  servicesHeroChips,
  servicesIndustries,
  servicesList,
  servicesMiniCta,
  servicesTechCategories,
  whyChooseServices,
} from '@/features/services/data/services';
import {
  approachBenefits,
  approachIntro,
  expertiseAreas,
  stackGroups,
  techHeroBadges,
  techHeroPillars,
  technologiesHero,
  techPartners,
} from '@/features/technologies/data/technologies';

export type PageSectionMeta = {
  id: string;
  title: string;
  status: 'Published' | 'Draft';
  icon: string;
  visible: boolean;
};

export type PageDocument = {
  sections: PageSectionMeta[];
  content: Record<string, unknown>;
};

function section(id: string, title: string, icon: string): PageSectionMeta {
  return { id, title, status: 'Published', icon, visible: true };
}

const genericContactCta = landingContentSeed.contactCta;

function createAboutDocument(): PageDocument {
  return {
    sections: [
      section('hero', 'Hero Section', 'layout'),
      section('companyOverview', 'Company Overview', 'building'),
      section('milestones', 'Milestones', 'clock'),
      section('missionVision', 'Mission & Vision', 'target'),
      section('coreValues', 'Core Values', 'heart'),
      section('leadership', 'Leadership Team', 'users'),
      section('statsBanner', 'Stats Banner', 'bar-chart'),
      section('partners', 'Partners & Certifications', 'handshake'),
      section('cta', 'Call to Action', 'mail'),
    ],
    content: {
      hero: {
        ...aboutHero,
        stats: aboutHeroStats.map((s) => ({ ...s })),
      },
      companyOverview: {
        ...companyOverview,
        features: companyFeatures.map((f) => ({ ...f })),
      },
      milestones: milestones.map((m) => ({ ...m })),
      missionVision: missionVision.map((m) => ({ ...m })),
      coreValues: coreValues.map((v) => ({ ...v })),
      leadership: leadership.map((l) => ({ ...l })),
      statsBanner: aboutStats.map((s) => ({ ...s })),
      partners: {
        partners: partners.map((p) => ({ ...p })),
        certifications: [...certifications],
      },
      cta: {
        variant: 'navy',
        title: 'Ready to build with a team that delivers?',
        description:
          'Share your product goals—we\u2019ll help you shape the team, roadmap, and next release.',
        primary: { label: 'Contact Us', href: '/contact' },
        secondary: { label: 'View Careers', href: '/careers' },
      },
    },
  };
}

function createServicesDocument(): PageDocument {
  return {
    sections: [
      section('hero', 'Hero Section', 'layout'),
      section('coreGrid', 'Core Services', 'briefcase'),
      section('comparison', 'Service Comparison', 'table'),
      section('process', 'Our Process', 'list'),
      section('techLogos', 'Technologies', 'layers'),
      section('industries', 'Industries', 'building'),
      section('featuredCases', 'Featured Case Studies', 'folder'),
      section('whyChoose', 'Why Choose Us', 'check'),
      section('faq', 'FAQ', 'help-circle'),
      section('miniCta', 'Mini CTA', 'zap'),
      section('contactCta', 'Contact CTA', 'mail'),
    ],
    content: {
      hero: {
        ...servicesHero,
        chips: [...servicesHeroChips],
      },
      coreGrid: servicesList.map((s) => ({ ...s })),
      comparison: comparisonRows.map((r) => ({ ...r })),
      process: processSteps.map((p) => ({ ...p })),
      techLogos: servicesTechCategories.map((c) => ({
        ...c,
        items: [...c.items],
      })),
      industries: servicesIndustries.map((i) => ({ ...i })),
      featuredCases: {
        title: 'Featured Case Studies',
        action: {
          label: 'View all case studies',
          href: '/case-studies',
          newTab: false,
        },
        items: [],
      },
      whyChoose: [...whyChooseServices],
      faq: servicesFaqs.map((f) => ({ ...f })),
      miniCta: { ...servicesMiniCta },
      contactCta: structuredClone(genericContactCta),
    },
  };
}

function createIndustriesDocument(): PageDocument {
  return {
    sections: [
      section('hero', 'Hero Section', 'layout'),
      section('grid', 'Industries Grid', 'grid'),
      section('whyChooseStats', 'Why Choose & Stats', 'trending'),
      section('successStories', 'Success Stories', 'folder'),
      section('cta', 'Call to Action', 'mail'),
    ],
    content: {
      hero: {
        ...industriesHero,
        features: industriesHeroFeatures.map((f) => ({ ...f })),
        chips: industriesHeroChips.map((c) => ({ ...c })),
      },
      grid: industriesWeServe.map((i) => ({ ...i })),
      whyChooseStats: {
        ...industriesWhyChoose,
        stats: industriesStats.map((s) => ({ ...s })),
      },
      successStories: {
        title: 'Industry Success Stories',
        action: {
          label: 'View all case studies',
          href: '/case-studies',
          newTab: false,
        },
        items: [],
      },
      cta: {
        ...industriesCta,
        values: industriesCtaValues.map((v) => ({ ...v })),
      },
    },
  };
}

function createTechnologiesDocument(): PageDocument {
  return {
    sections: [
      section('hero', 'Hero Section', 'layout'),
      section('expertise', 'Expertise Areas', 'code'),
      section('stackGroups', 'Tech Stack', 'layers'),
      section('approach', 'Our Approach', 'target'),
      section('partners', 'Technology Partners', 'handshake'),
      section('cta', 'Contact CTA', 'mail'),
    ],
    content: {
      hero: {
        ...technologiesHero,
        pillars: techHeroPillars.map((p) => ({ ...p })),
        badges: [...techHeroBadges],
      },
      expertise: expertiseAreas.map((a) => ({
        ...a,
        techs: [...a.techs],
      })),
      stackGroups: stackGroups.map((g) => ({
        ...g,
        items: [...g.items],
      })),
      approach: {
        intro: { ...approachIntro },
        benefits: approachBenefits.map((b) => ({ ...b })),
      },
      partners: [...techPartners],
      cta: structuredClone(genericContactCta),
    },
  };
}

function createCareersDocument(): PageDocument {
  return {
    sections: [
      section('hero', 'Hero Section', 'layout'),
      section('stats', 'Stats', 'bar-chart'),
      section('culture', 'Culture', 'users'),
      section('benefits', 'Benefits & Perks', 'award'),
      section('jobList', 'Open Positions', 'briefcase'),
      section('cta', 'Call to Action', 'mail'),
    ],
    content: {
      hero: { ...careersHero },
      stats: careersStats.map((s) => ({ ...s })),
      culture: {
        ...cultureIntro,
        cards: cultureCards.map((c) => ({ ...c })),
      },
      benefits: {
        ...benefitsIntro,
        items: benefits.map((b) => ({ ...b })),
      },
      jobList: {
        ...openPositionsIntro,
        departments: [...jobDepartments],
        locations: [...jobLocations],
      },
      cta: { ...careersCta },
    },
  };
}

function createPortfolioDocument(): PageDocument {
  return {
    sections: [
      section('hero', 'Hero Section', 'layout'),
      section('grid', 'Project Grid', 'grid'),
      section('cta', 'Call to Action', 'rocket'),
    ],
    content: {
      hero: {
        ...portfolioHero,
        stats: portfolioHero.stats.map((s) => ({ ...s })),
      },
      grid: {
        filters: [...portfolioFilters],
        sortOptions: portfolioSortOptions.map((o) => ({ ...o })),
        projects: [],
      },
      cta: {
        title: 'Have a Project in Mind?',
        description:
          'Let\u2019s turn your idea into a powerful digital solution. We\u2019re ready to help you build, scale and grow.',
        features: portfolioCtaFeatures.map((f) => ({ ...f })),
        primary: {
          label: 'Book Free Consultation',
          href: '/book-consultation',
        },
      },
    },
  };
}

function createBlogDocument(): PageDocument {
  return {
    sections: [
      section('hero', 'Hero Section', 'layout'),
      section('sidebar', 'Sidebar', 'sidebar'),
    ],
    content: {
      hero: { ...blogHero },
      sidebar: {
        categories: blogCategories.map((c) => ({ ...c })),
        aboutCard: { ...aboutCard },
        subscribeCard: { ...subscribeCard },
        latestSection: { ...latestSection },
        exploreTopics: [...exploreTopics],
      },
    },
  };
}

function createCaseStudiesDocument(): PageDocument {
  return {
    sections: [
      section('hero', 'Hero Section', 'layout'),
      section('stats', 'Stats', 'bar-chart'),
    ],
    content: {
      hero: { ...caseStudiesHero },
      stats: caseStudiesStats.map((s) => ({ ...s })),
    },
  };
}

function createContactDocument(): PageDocument {
  return {
    sections: [
      section('hero', 'Hero Section', 'layout'),
      section('infoCards', 'Contact Info', 'phone'),
      section('formSection', 'Contact Form', 'file-text'),
      section('faq', 'FAQ', 'help-circle'),
      section('cta', 'Call to Action', 'mail'),
    ],
    content: {
      hero: {
        ...contactHero,
        features: contactHero.features.map((f) => ({ ...f })),
      },
      infoCards: {
        channels: contactChannels.map((c) => ({ ...c })),
        followUs: { ...followUs },
        offices: offices.map((o) => ({ ...o })),
      },
      formSection: {
        title: 'Send Us a Message',
        description: 'Fill out the form below and our team will get in touch with you.',
        labels: {
          fullName: 'Full Name',
          email: 'Email Address',
          company: 'Company Name',
          phone: 'Phone Number',
          subject: 'Subject',
          message: 'How can we help you?',
        },
        consent:
          'I agree to the Privacy Policy and Terms of Service.',
        submitLabel: 'Send Message',
      },
      faq: contactFaqs.map((f) => ({ ...f })),
      cta: {
        variant: 'navy',
        title: 'Ready to Start Your Project?',
        description:
          'Book a free consultation with our experts and turn your idea into a successful digital solution.',
        primary: {
          label: 'Book Free Consultation',
          href: '/book-consultation',
        },
        illustrationLabel: '[CTA Envelope Illustration]',
      },
    },
  };
}

function createBookConsultationDocument(): PageDocument {
  return {
    sections: [
      section('hero', 'Hero Section', 'layout'),
      section('formOptions', 'Consultation Form', 'clipboard'),
      section('trustBar', 'Trust Bar', 'shield'),
      section('sidebarHelp', 'Sidebar Help', 'help-circle'),
    ],
    content: {
      hero: {
        ...consultationHero,
        highlights: consultationHero.highlights.map((h) => ({ ...h })),
      },
      formOptions: {
        copy: { ...inquiryFormCopy },
        services: consultationServices.map((s) => ({ ...s })),
        projectTypes: projectTypes.map((p) => ({ ...p })),
        budgets: budgets.map((b) => ({ ...b })),
        timeSlots: [...timeSlots],
        referralSources: referralSources.map((r) => ({ ...r })),
        whyBook: [...whyBook],
      },
      trustBar: trustItems.map((t) => ({ ...t })),
      sidebarHelp: { ...sidebarHelp },
    },
  };
}

export function createPageDocument(pageSlug: PageSlug): PageDocument {
  switch (pageSlug) {
    case 'home': {
      const doc = createLandingPageDocument();
      return {
        sections: doc.sections.map((s) => ({ ...s })),
        content: structuredClone(doc.content),
      };
    }
    case 'about':
      return createAboutDocument();
    case 'services':
      return createServicesDocument();
    case 'industries':
      return createIndustriesDocument();
    case 'technologies':
      return createTechnologiesDocument();
    case 'careers':
      return createCareersDocument();
    case 'portfolio':
      return createPortfolioDocument();
    case 'blog':
      return createBlogDocument();
    case 'case-studies':
      return createCaseStudiesDocument();
    case 'contact':
      return createContactDocument();
    case 'book-consultation':
      return createBookConsultationDocument();
    default: {
      const _exhaustive: never = pageSlug;
      throw new Error(`Unknown page slug: ${_exhaustive}`);
    }
  }
}
