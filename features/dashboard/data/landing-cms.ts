import {
  coreServices,
  featuredCaseStudies,
  homeHero,
  industriesStrip,
  testimonials,
  whyChoose,
} from "@/features/home/data/home";
import { trustedBy } from "@/features/home/data/trusted-by";

export type SectionStatus = "Published" | "Draft";

export type SectionId =
  | "hero"
  | "trustedBy"
  | "services"
  | "industries"
  | "whyChoose"
  | "caseStudies"
  | "testimonials"
  | "contactCta";

export type LandingCta = {
  label: string;
  href: string;
  newTab: boolean;
};

export type LandingMedia = {
  name: string;
  size: string;
  label: string;
};

export type LandingSectionMeta = {
  id: SectionId;
  title: string;
  status: SectionStatus;
  icon: string;
  visible: boolean;
  seoTitle: string;
  seoDescription: string;
};

export type LandingContent = {
  hero: {
    badge: string;
    title: string;
    highlight: string;
    description: string;
    primaryCta: LandingCta;
    secondaryCta: LandingCta;
    media: LandingMedia;
    stats: { value: string; label: string; icon: string }[];
  };
  trustedBy: {
    title: string;
    brands: { name: string; logo: string }[];
  };
  services: {
    title: string;
    action: LandingCta;
    itemCtaLabel: string;
    items: {
      id: string;
      title: string;
      description: string;
      icon: string;
      href: string;
    }[];
  };
  industries: {
    title: string;
    action: LandingCta;
    items: {
      id: string;
      title: string;
      description: string;
      icon: string;
      href: string;
    }[];
  };
  whyChoose: {
    title: string;
    action: LandingCta;
    experienceBadge: string;
    media: LandingMedia;
    items: { title: string; description: string; icon: string }[];
  };
  caseStudies: {
    title: string;
    action: LandingCta;
    items: {
      id: string;
      title: string;
      description: string;
      category: string;
      image: string;
      href: string;
      techStack: string[];
    }[];
  };
  testimonials: {
    title: string;
    description: string;
    items: {
      id: string;
      quote: string;
      name: string;
      role: string;
      avatar: string;
      rating: number;
    }[];
  };
  contactCta: {
    headline: string;
    description: string;
    benefits: string[];
    formTitle: string;
    submitLabel: string;
    contactPanelTitle: string;
  };
};

export type LandingPageDocument = {
  sections: LandingSectionMeta[];
  content: LandingContent;
};

export const landingSectionsSeed: LandingSectionMeta[] = [
  {
    id: "hero",
    title: "Hero Section",
    status: "Published",
    icon: "layout",
    visible: true,
    seoTitle: "Zaimah Technologies | Software Development Partner",
    seoDescription: homeHero.description,
  },
  {
    id: "trustedBy",
    title: "Trusted By",
    status: "Published",
    icon: "users",
    visible: true,
    seoTitle: "",
    seoDescription: "",
  },
  {
    id: "services",
    title: "Core Services",
    status: "Published",
    icon: "briefcase",
    visible: true,
    seoTitle: "",
    seoDescription: "",
  },
  {
    id: "industries",
    title: "Industries",
    status: "Published",
    icon: "building",
    visible: true,
    seoTitle: "",
    seoDescription: "",
  },
  {
    id: "whyChoose",
    title: "Why Choose Us",
    status: "Published",
    icon: "info",
    visible: true,
    seoTitle: "",
    seoDescription: "",
  },
  {
    id: "caseStudies",
    title: "Case Studies",
    status: "Published",
    icon: "folder",
    visible: true,
    seoTitle: "",
    seoDescription: "",
  },
  {
    id: "testimonials",
    title: "Testimonials",
    status: "Published",
    icon: "message",
    visible: true,
    seoTitle: "",
    seoDescription: "",
  },
  {
    id: "contactCta",
    title: "Contact CTA",
    status: "Published",
    icon: "mail",
    visible: true,
    seoTitle: "",
    seoDescription: "",
  },
];

export const landingContentSeed: LandingContent = {
  hero: {
    badge: homeHero.badge,
    title: homeHero.title,
    highlight: homeHero.highlight,
    description: homeHero.description,
    primaryCta: {
      label: "Book Free Consultation",
      href: "/book-consultation",
      newTab: false,
    },
    secondaryCta: {
      label: "View Case Studies",
      href: "/case-studies",
      newTab: false,
    },
    media: {
      name: "hero-visual.webp",
      size: "1200 × 900",
      label: "[Hero Visual]",
    },
    stats: homeHero.stats.map((s) => ({
      value: s.value,
      label: s.label,
      icon: s.icon ?? "briefcase",
    })),
  },
  trustedBy: {
    title: "Trusted by Startups & Enterprises Worldwide",
    brands: trustedBy.map((b) => ({ name: b.name, logo: b.logo })),
  },
  services: {
    title: "Our Core Services",
    action: {
      label: "Explore all services",
      href: "/services",
      newTab: false,
    },
    itemCtaLabel: "Learn More",
    items: coreServices.map((s) => ({ ...s })),
  },
  industries: {
    title: "Industries We Serve",
    action: {
      label: "View all industries",
      href: "/industries",
      newTab: false,
    },
    items: industriesStrip.map((i) => ({ ...i })),
  },
  whyChoose: {
    title: "Why Choose Zaimah Technologies?",
    action: {
      label: "More About Us",
      href: "/about",
      newTab: false,
    },
    experienceBadge: "25+ Years of Experience",
    media: {
      name: "why-choose.webp",
      size: "960 × 720",
      label: "[Team / Office Visual]",
    },
    items: whyChoose.map((i) => ({ ...i })),
  },
  caseStudies: {
    title: "Featured Case Studies",
    action: {
      label: "View all case studies",
      href: "/case-studies",
      newTab: false,
    },
    items: featuredCaseStudies.map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      category: c.category,
      image: c.image,
      href: c.href,
      techStack: [...c.techStack],
    })),
  },
  testimonials: {
    title: "What Our Clients Say",
    description: "Trusted by product leaders and founders across industries.",
    items: testimonials.map((t) => ({ ...t })),
  },
  contactCta: {
    headline: "Ready to Build Your Next Digital Product?",
    description:
      "Let's discuss your project and turn your ideas into reality with our expert team.",
    benefits: [
      "Free Consultation",
      "NDA Protection",
      "Flexible Engagement Models",
      "Transparent Pricing",
      "On-time Delivery",
    ],
    formTitle: "Tell Us About Your Project",
    submitLabel: "Submit Request",
    contactPanelTitle: "Get In Touch",
  },
};

export function createLandingPageDocument(): LandingPageDocument {
  return {
    sections: landingSectionsSeed.map((s) => ({ ...s })),
    content: structuredClone(landingContentSeed),
  };
}

export function landingApiEndpoint(sectionId: SectionId) {
  return `https://api.zaimahtech.com/v1/pages/landing/${sectionId}`;
}

export function landingApiCurl(sectionId: SectionId) {
  return `curl -X GET \\
  '${landingApiEndpoint(sectionId)}' \\
  -H 'Authorization: Bearer YOUR_API_KEY'`;
}

export function landingApiJson(
  sectionId: SectionId,
  content: LandingContent
): string {
  return JSON.stringify(
    {
      section: sectionId,
      status: "published",
      content: content[sectionId],
    },
    null,
    2
  );
}
