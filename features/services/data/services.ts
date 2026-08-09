import type {
  CaseStudyItem,
  FaqItem,
  IndustryItem,
  ServiceItem,
} from "@/types";
import { techLogos } from "@/features/home/data/home";

export const servicesHero = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Services" },
  ],
  eyebrow: "What we deliver",
  title: "Software Services Built to",
  highlight: "Accelerate Growth",
  description:
    "From product discovery to long-term support, Zaimah Technologies provides end-to-end engineering services for startups and enterprises.",
  actions: {
    primary: { label: "Book Free Consultation", href: "/book-consultation" },
    secondary: { label: "View Case Studies", href: "/case-studies" },
  },
};

export const servicesList: ServiceItem[] = [
  {
    id: "custom-software",
    title: "Custom Software Development",
    description:
      "Bespoke web and enterprise applications tailored to your workflows and growth goals.",
    icon: "code",
    href: "/services#custom-software",
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile experiences for iOS and Android users.",
    icon: "smartphone",
    href: "/services#mobile",
  },
  {
    id: "uiux",
    title: "UI/UX Design",
    description:
      "Research-driven interfaces that convert visitors into loyal customers.",
    icon: "palette",
    href: "/services#uiux",
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    description:
      "Reliable cloud architecture, CI/CD, and infrastructure automation.",
    icon: "cloud",
    href: "/services#cloud",
  },
  {
    id: "qa",
    title: "QA & Testing",
    description:
      "Manual and automated testing to ship quality releases with confidence.",
    icon: "shield",
    href: "/services#qa",
  },
  {
    id: "ai",
    title: "AI & Data Solutions",
    description:
      "Intelligent products powered by ML, analytics, and modern data stacks.",
    icon: "brain",
    href: "/services#ai",
  },
  {
    id: "enterprise",
    title: "Product Engineering",
    description:
      "End-to-end product teams that own discovery, delivery, and iteration.",
    icon: "layers",
    href: "/services#enterprise",
  },
  {
    id: "support",
    title: "Support & Maintenance",
    description:
      "24/7 monitoring, upgrades, and continuous improvement for live systems.",
    icon: "headset",
    href: "/services#support",
  },
];

export const comparisonRows = [
  {
    feature: "Best for",
    fixed: "Defined scope projects",
    timeMaterial: "Evolving requirements",
    dedicated: "Long-term product ownership",
  },
  {
    feature: "Pricing model",
    fixed: "Fixed budget & timeline",
    timeMaterial: "Hourly / sprint-based",
    dedicated: "Monthly team retainer",
  },
  {
    feature: "Team structure",
    fixed: "Project-based squad",
    timeMaterial: "Flexible specialists",
    dedicated: "Embedded product team",
  },
  {
    feature: "Change flexibility",
    fixed: "Change requests scoped",
    timeMaterial: "High flexibility",
    dedicated: "Full backlog ownership",
  },
  {
    feature: "Communication",
    fixed: "Milestone updates",
    timeMaterial: "Sprint reviews",
    dedicated: "Daily standups & SLAs",
  },
  {
    feature: "Ideal duration",
    fixed: "1–4 months",
    timeMaterial: "2–12 months",
    dedicated: "6+ months",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    description:
      "Workshops, stakeholder interviews, and technical audits to clarify goals and constraints.",
    icon: "search",
  },
  {
    step: "02",
    title: "Plan",
    description:
      "Roadmaps, milestones, team shape, and delivery plans aligned to your budget and risk.",
    icon: "target",
  },
  {
    step: "03",
    title: "Design",
    description:
      "UX flows, system architecture, and clickable prototypes validated with real users.",
    icon: "palette",
  },
  {
    step: "04",
    title: "Develop",
    description:
      "Agile sprints with transparent demos, code reviews, and continuous integration.",
    icon: "code",
  },
  {
    step: "05",
    title: "Test",
    description:
      "Manual and automated QA, performance checks, and security validation before release.",
    icon: "check",
  },
  {
    step: "06",
    title: "Deploy",
    description:
      "Hardened releases, cloud provisioning, monitoring, and launch readiness checks.",
    icon: "rocket",
  },
  {
    step: "07",
    title: "Support",
    description:
      "Ongoing optimization, SLA-backed support, and roadmap planning for the next phase.",
    icon: "headset",
  },
];

export const servicesHeroChips = [
  "Innovation",
  "Scalability",
  "Security",
  "Agility",
  "Quality",
];

export const servicesTechLogos = techLogos;

export const servicesIndustries: IndustryItem[] = [
  {
    id: "1",
    title: "Healthcare",
    description: "HIPAA-ready platforms",
    icon: "heart",
    href: "/industries",
  },
  {
    id: "2",
    title: "FinTech",
    description: "Secure financial apps",
    icon: "landmark",
    href: "/industries",
  },
  {
    id: "3",
    title: "Real Estate",
    description: "Property tech suites",
    icon: "building",
    href: "/industries",
  },
  {
    id: "4",
    title: "E-commerce",
    description: "Scalable storefronts",
    icon: "shopping",
    href: "/industries",
  },
  {
    id: "5",
    title: "Education",
    description: "Learning platforms",
    icon: "graduation",
    href: "/industries",
  },
];

export const servicesCaseStudies: CaseStudyItem[] = [
  {
    id: "1",
    title: "MediCare+ Hospital Management System",
    description:
      "Unified clinical workflows, appointments, and billing for a multi-hospital network.",
    category: "Healthcare",
    image: "/images/case-healthcare.svg",
    href: "/case-studies",
    techStack: ["React", "Laravel", "AWS", "Docker"],
  },
  {
    id: "2",
    title: "PayFlow Digital Banking Platform",
    description:
      "Secure multi-currency payments and KYC onboarding for a regional fintech.",
    category: "FinTech",
    image: "/images/case-fintech.svg",
    href: "/case-studies",
    techStack: ["Next.js", "Node.js", "PostgreSQL"],
  },
];

export const whyChooseServices = [
  "Senior engineers across every major stack",
  "Predictable delivery with clear milestones",
  "Security and compliance baked into delivery",
  "Flexible engagement models that scale with you",
  "Transparent reporting and dedicated managers",
  "Post-launch support that protects your investment",
];

export const servicesFaqs: FaqItem[] = [
  {
    question: "How do we start a project with Zaimah?",
    answer:
      "We begin with a free discovery call to understand goals, timeline, and constraints. From there we propose an engagement model, team shape, and kickoff plan—usually within a few business days.",
  },
  {
    question: "Can you work with our in-house team?",
    answer:
      "Yes. Many clients embed our engineers alongside internal product and engineering teams. We adapt to your tools, ceremonies, and coding standards.",
  },
  {
    question: "Do you sign NDAs?",
    answer:
      "Absolutely. We can execute mutual NDAs before detailed discussions or access to proprietary materials.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We have deep experience in healthcare, fintech, real estate, e-commerce, education, logistics, and more—especially regulated and high-growth verticals.",
  },
  {
    question: "How do you ensure quality and security?",
    answer:
      "Every engagement includes code reviews, automated testing, CI/CD, and security practices aligned to your compliance needs (HIPAA, PCI, SOC2-ready patterns).",
  },
];

export const servicesMiniCta = {
  title: "Not sure which service fits?",
  description:
    "Share your goals and we’ll recommend the right engagement model, team, and roadmap.",
  primary: { label: "Talk to an Expert", href: "/contact" },
  secondary: { label: "Explore Technologies", href: "/technologies" },
};
