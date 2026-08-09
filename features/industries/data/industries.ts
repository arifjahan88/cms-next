import type { CaseStudyItem, IndustryItem, StatItem } from "@/types";

export const industriesHero = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Industries" },
  ],
  title: "Technology Solutions Built for",
  highlight: "Every Industry",
  description:
    "We deliver industry-focused software solutions that solve real business challenges, automate operations and accelerate growth.",
};

export const industriesHeroFeatures = [
  {
    title: "Industry Expertise",
    description: "Deep domain knowledge",
    icon: "settings",
  },
  {
    title: "Tailored Solutions",
    description: "Custom-built for you",
    icon: "laptop",
  },
  {
    title: "Scalable & Secure",
    description: "Built for long-term growth",
    icon: "shield",
  },
  {
    title: "Proven Results",
    description: "Delivering real business impact",
    icon: "trending",
  },
];

export const industriesHeroChips = [
  { label: "Healthcare", icon: "heart" },
  { label: "Real Estate", icon: "building" },
  { label: "Retail", icon: "shopping" },
  { label: "Manufacturing", icon: "factory" },
  { label: "Education", icon: "graduation" },
  { label: "Finance", icon: "landmark" },
  { label: "Logistics", icon: "truck" },
  { label: "Government", icon: "briefcase" },
];

export const industriesWeServe: IndustryItem[] = [
  {
    id: "1",
    title: "Healthcare",
    description:
      "EHR integrations, patient portals, telehealth, and hospital operations platforms.",
    icon: "heart",
    href: "/industries#healthcare",
  },
  {
    id: "2",
    title: "Real Estate",
    description:
      "Listings marketplaces, CRM, virtual tours, and property management suites.",
    icon: "building",
    href: "/industries#real-estate",
  },
  {
    id: "3",
    title: "FinTech",
    description:
      "Payments, KYC/AML onboarding, lending workflows, and banking dashboards.",
    icon: "landmark",
    href: "/industries#fintech",
  },
  {
    id: "4",
    title: "Retail & E-commerce",
    description:
      "Headless storefronts, inventory, fulfillment, and personalization engines.",
    icon: "shopping",
    href: "/industries#ecommerce",
  },
  {
    id: "5",
    title: "Education",
    description:
      "LMS platforms, student portals, assessments, and campus administration.",
    icon: "graduation",
    href: "/industries#education",
  },
  {
    id: "6",
    title: "Manufacturing",
    description:
      "MES dashboards, IoT monitoring, quality control, and supply planning.",
    icon: "factory",
    href: "/industries#manufacturing",
  },
  {
    id: "7",
    title: "Logistics & Supply Chain",
    description:
      "Fleet tracking, warehouse ops, route optimization, and partner portals.",
    icon: "truck",
    href: "/industries#logistics",
  },
  {
    id: "8",
    title: "Government",
    description:
      "Citizen services, case management, and secure public-sector platforms.",
    icon: "briefcase",
    href: "/industries#government",
  },
  {
    id: "9",
    title: "Hospitality",
    description:
      "Booking engines, guest experiences, and revenue management tools.",
    icon: "globe",
    href: "/industries#hospitality",
  },
  {
    id: "10",
    title: "Agriculture",
    description:
      "Farm management, supply tracking, IoT sensors, and marketplace platforms.",
    icon: "layers",
    href: "/industries#agriculture",
  },
];

export const industriesWhyChoose = {
  eyebrow: "Why Choose Zaimah",
  title: "We Understand Your Industry, We Deliver",
  highlight: "Real Impact",
  description:
    "From regulated healthcare to high-growth fintech, we bring domain expertise and engineering excellence to every engagement.",
};

export const industriesStats: StatItem[] = [
  { value: "250+", label: "Projects Delivered", icon: "cloud" },
  { value: "18+", label: "Industries Served", icon: "layers" },
  { value: "25+", label: "Years of Experience", icon: "users" },
  { value: "99%", label: "Client Satisfaction", icon: "target" },
];

export const successStories: CaseStudyItem[] = [
  {
    id: "1",
    title: "Hospital Management System",
    description:
      "Unified clinical workflows, appointments, and billing for a multi-hospital network.",
    category: "Healthcare",
    image: "/images/case-healthcare.svg",
    href: "/case-studies",
    techStack: ["React", "Laravel", "AWS"],
  },
  {
    id: "2",
    title: "Property Management Platform",
    description:
      "End-to-end listings, tenant portals, and maintenance tracking for real estate teams.",
    category: "Real Estate",
    image: "/images/case-realestate.svg",
    href: "/case-studies",
    techStack: ["Flutter", "Firebase", "GCP"],
  },
  {
    id: "3",
    title: "Digital Banking Wallet",
    description:
      "Secure multi-currency payments and KYC onboarding for a regional fintech.",
    category: "FinTech",
    image: "/images/case-fintech.svg",
    href: "/case-studies",
    techStack: ["Next.js", "Node.js", "PostgreSQL"],
  },
  {
    id: "4",
    title: "Multi-vendor Marketplace",
    description:
      "Scalable commerce platform with subscriptions, commissions, and inventory sync.",
    category: "Retail",
    image: "/images/case-marketplace.svg",
    href: "/case-studies",
    techStack: ["Next.js", "Node.js", "AWS"],
  },
  {
    id: "5",
    title: "Campus Learning Platform",
    description:
      "LMS with assessments, live classrooms, and student administration tools.",
    category: "Education",
    image: "/images/case-education.svg",
    href: "/case-studies",
    techStack: ["React", "Node.js", "MongoDB"],
  },
];

export const industriesCta = {
  title: "Let's Build the Right Solution for Your Industry",
  description:
    "Talk with our experts about your goals—we'll recommend the right approach, team, and roadmap.",
  primary: { label: "Book Free Consultation", href: "/book-consultation" },
  secondary: { label: "Talk to Our Experts", href: "/contact" },
};

export const industriesCtaValues = [
  {
    title: "Industry-focused approach",
    description: "",
    icon: "target",
  },
  {
    title: "Custom-built solutions",
    description: "",
    icon: "layers",
  },
  {
    title: "Agile & transparent process",
    description: "",
    icon: "zap",
  },
  {
    title: "Long-term partnership",
    description: "",
    icon: "handshake",
  },
];
