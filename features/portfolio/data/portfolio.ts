import type { PortfolioItem, StatItem } from "@/types";

export const portfolioFilters = [
  "All Projects",
  "Healthcare",
  "FinTech",
  "Real Estate",
  "E-commerce",
  "Education",
  "Logistics",
  "Manufacturing",
] as const;

export const portfolioSortOptions = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
  { value: "az", label: "A-Z" },
] as const;

export const portfolioHero = {
  title: "Our Work. Real Solutions.",
  highlight: "Real Impact.",
  description:
    "Explore products and platforms we've engineered for clients across industries—built for scale, security, and measurable outcomes.",
  stats: [
    { value: "250+", label: "Projects Delivered", icon: "briefcase" },
    { value: "40+", label: "Industries Served", icon: "globe" },
    { value: "98%", label: "Client Retention", icon: "smile" },
    { value: "25+", label: "Years Experience", icon: "award" },
  ] satisfies StatItem[],
};

export const portfolioProjects: PortfolioItem[] = [
  {
    id: "1",
    title: "MediCare+ Hospital Platform",
    description:
      "Unified clinical workflows, appointments, and billing for a multi-hospital network.",
    category: "Healthcare",
    image: "/images/case-healthcare.svg",
    href: "/case-studies",
    date: "2025-11-12",
  },
  {
    id: "2",
    title: "PayFlow Digital Banking",
    description:
      "Secure multi-currency payments and KYC onboarding for a regional fintech.",
    category: "FinTech",
    image: "/images/case-fintech.svg",
    href: "/case-studies",
    date: "2025-09-03",
  },
  {
    id: "3",
    title: "EstateHub Marketplace",
    description:
      "Listings, virtual tours, and agent CRM for a national real-estate brand.",
    category: "Real Estate",
    image: "/images/case-realestate.svg",
    href: "/case-studies",
    date: "2025-07-21",
  },
  {
    id: "4",
    title: "ShopNova Commerce Suite",
    description:
      "Headless storefront with inventory sync and personalized checkout flows.",
    category: "E-commerce",
    image: "/images/hero-devices.svg",
    href: "/case-studies",
    date: "2025-05-18",
  },
  {
    id: "5",
    title: "LearnSphere LMS",
    description:
      "Interactive learning platform with assessments, certificates, and analytics.",
    category: "Education",
    image: "/images/blog-ai.svg",
    href: "/case-studies",
    date: "2025-03-09",
  },
  {
    id: "6",
    title: "FleetLink Logistics Hub",
    description:
      "Real-time fleet tracking, route optimization, and warehouse orchestration.",
    category: "Logistics",
    image: "/images/office-team.svg",
    href: "/case-studies",
    date: "2024-12-14",
  },
  {
    id: "7",
    title: "ForgeOps Manufacturing MES",
    description:
      "Shop-floor visibility, quality control, and predictive maintenance dashboards.",
    category: "Manufacturing",
    image: "/images/hero-devices.svg",
    href: "/case-studies",
    date: "2024-10-02",
  },
  {
    id: "8",
    title: "CareConnect Telehealth",
    description:
      "Video consultations, e-prescriptions, and patient records in one secure app.",
    category: "Healthcare",
    image: "/images/case-healthcare.svg",
    href: "/case-studies",
    date: "2024-08-27",
  },
  {
    id: "9",
    title: "Ledgerly Wealth App",
    description:
      "Portfolio insights, automated investing, and advisor collaboration tools.",
    category: "FinTech",
    image: "/images/case-fintech.svg",
    href: "/case-studies",
    date: "2024-06-11",
  },
  {
    id: "10",
    title: "CampusGate Portal",
    description:
      "Student admissions, fees, and parent communications for private campuses.",
    category: "Education",
    image: "/images/blog-ai.svg",
    href: "/case-studies",
    date: "2024-04-05",
  },
  {
    id: "11",
    title: "RetailPulse Omnichannel",
    description:
      "Unified POS, loyalty, and fulfillment across stores and digital channels.",
    category: "E-commerce",
    image: "/images/case-realestate.svg",
    href: "/case-studies",
    date: "2024-02-19",
  },
  {
    id: "12",
    title: "RouteWise Dispatch",
    description:
      "AI-assisted dispatching for last-mile delivery networks across ASEAN.",
    category: "Logistics",
    image: "/images/office-team.svg",
    href: "/case-studies",
    date: "2023-11-30",
  },
];

export const portfolioCtaFeatures = [
  {
    title: "Dedicated Squad",
    description: "Cross-functional team aligned to your goals.",
    icon: "users",
  },
  {
    title: "Clear Roadmaps",
    description: "Transparent milestones from discovery to launch.",
    icon: "layers",
  },
  {
    title: "Secure Delivery",
    description: "Enterprise-ready architecture and compliance.",
    icon: "shield",
  },
];
