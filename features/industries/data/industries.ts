import type { CaseStudyItem, IndustryItem, StatItem } from "@/types";

export const industriesHero = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Industries" },
  ],
  eyebrow: "Domain expertise",
  title: "Industry Solutions That",
  highlight: "Speak Your Language",
  description:
    "We combine deep vertical knowledge with modern engineering to build products that fit real operational workflows.",
  actions: {
    primary: { label: "Discuss Your Industry", href: "/contact" },
    secondary: { label: "View Case Studies", href: "/case-studies" },
  },
};

export const industriesHeroFeatures = [
  {
    title: "Industry Expertise",
    description: "Teams who understand regulations, users, and market nuance.",
    icon: "award",
  },
  {
    title: "Tailored Solutions",
    description: "Architecture and UX shaped around your operating model.",
    icon: "layers",
  },
  {
    title: "Compliance Ready",
    description: "Security patterns for HIPAA, PCI, and enterprise audits.",
    icon: "shield",
  },
  {
    title: "Faster Time-to-Value",
    description: "Reusable accelerators that shorten discovery and delivery.",
    icon: "zap",
  },
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
    title: "FinTech",
    description:
      "Payments, KYC/AML onboarding, lending workflows, and banking dashboards.",
    icon: "landmark",
    href: "/industries#fintech",
  },
  {
    id: "3",
    title: "Real Estate",
    description:
      "Listings marketplaces, CRM, virtual tours, and property management suites.",
    icon: "building",
    href: "/industries#real-estate",
  },
  {
    id: "4",
    title: "E-commerce",
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
    title: "Logistics",
    description:
      "Fleet tracking, warehouse ops, route optimization, and partner portals.",
    icon: "truck",
    href: "/industries#logistics",
  },
  {
    id: "7",
    title: "Manufacturing",
    description:
      "MES dashboards, IoT monitoring, quality control, and supply planning.",
    icon: "factory",
    href: "/industries#manufacturing",
  },
  {
    id: "8",
    title: "Government",
    description:
      "Citizen services, case management, and secure public-sector platforms.",
    icon: "landmark",
    href: "/industries#government",
  },
  {
    id: "9",
    title: "Travel & Hospitality",
    description:
      "Booking engines, guest experiences, and revenue management tools.",
    icon: "globe",
    href: "/industries#travel",
  },
  {
    id: "10",
    title: "Media & Entertainment",
    description:
      "Streaming, content workflows, subscriptions, and audience analytics.",
    icon: "smartphone",
    href: "/industries#media",
  },
];

export const industriesStats: StatItem[] = [
  { value: "40+", label: "Industry Projects", icon: "briefcase" },
  { value: "12", label: "Vertical Domains", icon: "layers" },
  { value: "98%", label: "Client Retention", icon: "smile" },
  { value: "25+", label: "Years Experience", icon: "award" },
];

export const successStories: CaseStudyItem[] = [
  {
    id: "1",
    title: "MediCare+ Hospital Network",
    description:
      "Digitized admissions and clinical workflows across five hospital campuses.",
    category: "Healthcare",
    image: "/images/case-healthcare.svg",
    href: "/case-studies",
    techStack: ["React", "Laravel", "AWS"],
    metrics: [
      { value: "65%", label: "Efficiency gain" },
      { value: "40%", label: "Faster admissions" },
    ],
  },
  {
    id: "2",
    title: "PayFlow Digital Banking",
    description:
      "Launched a multi-currency wallet with KYC and real-time fraud checks.",
    category: "FinTech",
    image: "/images/case-fintech.svg",
    href: "/case-studies",
    techStack: ["Next.js", "Node.js", "PostgreSQL"],
    metrics: [
      { value: "3x", label: "Transaction volume" },
      { value: "99.9%", label: "Uptime" },
    ],
  },
  {
    id: "3",
    title: "EstateHub Marketplace",
    description:
      "National property marketplace with agent CRM and immersive tours.",
    category: "Real Estate",
    image: "/images/case-realestate.svg",
    href: "/case-studies",
    techStack: ["Flutter", "Firebase", "GCP"],
    metrics: [
      { value: "2.1M", label: "Monthly users" },
      { value: "28%", label: "Lead conversion" },
    ],
  },
  {
    id: "4",
    title: "ShopNova Commerce Platform",
    description:
      "Headless storefront and inventory sync for a multi-brand retailer.",
    category: "E-commerce",
    image: "/images/case-fintech.svg",
    href: "/case-studies",
    techStack: ["Next.js", "Shopify", "AWS"],
    metrics: [
      { value: "45%", label: "Faster checkout" },
      { value: "2.4x", label: "Mobile conversion" },
    ],
  },
  {
    id: "5",
    title: "LearnSphere LMS",
    description:
      "Campus-wide learning platform with assessments and live classrooms.",
    category: "Education",
    image: "/images/case-healthcare.svg",
    href: "/case-studies",
    techStack: ["React", "Node.js", "MongoDB"],
    metrics: [
      { value: "120k", label: "Active learners" },
      { value: "35%", label: "Course completion" },
    ],
  },
];

export const industriesCta = {
  title: "Ready to Transform Your Industry Operations?",
  description:
    "Partner with a team that understands your domain and can ship production-ready software.",
  primary: { label: "Book a Consultation", href: "/book-consultation" },
  secondary: { label: "Contact Sales", href: "/contact" },
};

export const industriesCtaValues = [
  {
    title: "Domain experts",
    description: "Teams fluent in your regulations and workflows.",
    icon: "award",
  },
  {
    title: "Faster delivery",
    description: "Reusable accelerators that cut discovery time.",
    icon: "zap",
  },
  {
    title: "Secure by design",
    description: "Compliance-ready patterns from day one.",
    icon: "shield",
  },
  {
    title: "Long-term partnership",
    description: "Support and iteration after launch.",
    icon: "handshake",
  },
];
