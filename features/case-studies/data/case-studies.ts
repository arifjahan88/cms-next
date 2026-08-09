import type { CaseStudyItem, StatItem } from "@/types";

export const caseStudyFilters = [
  "All Industries",
  "Healthcare",
  "FinTech",
  "Real Estate",
  "E-commerce",
  "Education",
] as const;

export const caseStudySortOptions = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
  { value: "az", label: "A-Z" },
] as const;

export const caseStudiesHero = {
  title: "Real Challenges.",
  highlight: "Proven Results.",
  description:
    "Deep-dive stories of how Zaimah partners with ambitious teams to ship durable products and measurable business outcomes.",
  impact: {
    title: "Impact Snapshot",
    description:
      "Average outcomes across recent enterprise engagements.",
    metrics: [
      { value: "3.2x", label: "Avg. efficiency gain" },
      { value: "45%", label: "Faster time-to-market" },
      { value: "99.9%", label: "Platform uptime" },
    ],
  },
};

export type CaseStudyDetail = CaseStudyItem & {
  date: string;
};

export const caseStudies: CaseStudyDetail[] = [
  {
    id: "1",
    title: "MediCare+ Hospital Management System",
    description:
      "A multi-hospital platform that unified clinical, administrative, and billing workflows.",
    category: "Healthcare",
    image: "/images/case-healthcare.svg",
    href: "/case-studies",
    date: "2025-11-12",
    challenge:
      "Fragmented legacy systems caused delayed admissions, duplicate records, and billing leakage across five campuses.",
    solution:
      "We delivered a modular hospital OS with role-based access, HL7/FHIR integrations, and real-time operational dashboards.",
    techStack: ["React", "Laravel", "AWS", "Docker"],
    metrics: [
      { value: "65%", label: "Operational efficiency" },
      { value: "40%", label: "Faster admissions" },
      { value: "22%", label: "Billing accuracy" },
    ],
  },
  {
    id: "2",
    title: "PayFlow Digital Banking Platform",
    description:
      "Secure multi-currency payments and KYC onboarding for a regional fintech scale-up.",
    category: "FinTech",
    image: "/images/case-fintech.svg",
    href: "/case-studies",
    date: "2025-09-03",
    challenge:
      "Manual KYC and brittle payment rails limited growth and raised compliance risk across new markets.",
    solution:
      "Built a cloud-native banking core with automated KYC, ledger reconciliation, and fraud monitoring pipelines.",
    techStack: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
    metrics: [
      { value: "3x", label: "Transaction volume" },
      { value: "99.9%", label: "Uptime" },
      { value: "70%", label: "Faster onboarding" },
    ],
  },
  {
    id: "3",
    title: "EstateHub Property Marketplace",
    description:
      "Listings, virtual tours, and agent CRM for a national real-estate brand.",
    category: "Real Estate",
    image: "/images/case-realestate.svg",
    href: "/case-studies",
    date: "2025-07-21",
    challenge:
      "Agents struggled with outdated listing tools and inconsistent lead follow-up across regions.",
    solution:
      "Launched a marketplace with 3D tours, smart matching, and CRM automation that synced mobile and desktop workflows.",
    techStack: ["Flutter", "Firebase", "GCP", "Node.js"],
    metrics: [
      { value: "2.1M", label: "Monthly users" },
      { value: "28%", label: "Lead conversion" },
      { value: "15%", label: "Faster closings" },
    ],
  },
  {
    id: "4",
    title: "ShopNova Omnichannel Commerce",
    description:
      "Headless commerce and fulfillment orchestration for a growing retail brand.",
    category: "E-commerce",
    image: "/images/hero-devices.svg",
    href: "/case-studies",
    date: "2025-05-18",
    challenge:
      "Disconnected online and store inventory created stockouts, cart abandonment, and support overload.",
    solution:
      "Implemented a headless storefront with unified inventory, personalized checkout, and warehouse sync.",
    techStack: ["Next.js", "Shopify", "Node.js", "Redis"],
    metrics: [
      { value: "34%", label: "Higher conversion" },
      { value: "50%", label: "Fewer stockouts" },
      { value: "2x", label: "Peak traffic capacity" },
    ],
  },
  {
    id: "5",
    title: "LearnSphere Campus Platform",
    description:
      "Interactive learning, assessments, and parent portals for a private education group.",
    category: "Education",
    image: "/images/blog-ai.svg",
    href: "/case-studies",
    date: "2025-03-09",
    challenge:
      "Teachers and administrators juggled spreadsheets while students lacked a cohesive digital classroom.",
    solution:
      "Built an LMS with live classes, adaptive quizzes, certificates, and school-wide analytics.",
    techStack: ["React", "Python", "PostgreSQL", "AWS"],
    metrics: [
      { value: "120k", label: "Active learners" },
      { value: "38%", label: "Engagement lift" },
      { value: "25%", label: "Admin time saved" },
    ],
  },
];

export const caseStudiesStats: StatItem[] = [
  { value: "250+", label: "Projects Delivered", icon: "briefcase" },
  { value: "25+", label: "Years of Experience", icon: "award" },
  { value: "120+", label: "Specialists", icon: "users" },
  { value: "98%", label: "Client Satisfaction", icon: "smile" },
];
