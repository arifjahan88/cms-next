import type {
  CaseStudyItem,
  IndustryItem,
  ServiceItem,
  StatItem,
  Testimonial,
} from "@/types";

export const homeHero = {
  badge: "Trusted Software Development Partner",
  title: "Build Digital Products That Drive",
  highlight: "Business Growth",
  description:
    "Zaimah Technologies partners with startups and enterprises worldwide to design, build, and scale secure software products—from MVP to enterprise platforms.",
  stats: [
    { value: "250+", label: "Projects Delivered", icon: "briefcase" },
    { value: "25+", label: "Years of Experience", icon: "award" },
    { value: "120+", label: "Team Members", icon: "users" },
    { value: "98%", label: "Client Satisfaction", icon: "smile" },
  ] satisfies StatItem[],
};

export const techLogos = [
  "React",
  "Next.js",
  "Node.js",
  "Laravel",
  "Python",
  "Flutter",
  "AWS",
  "Docker",
  "PostgreSQL",
  "MongoDB",
];

export const trustedBy = [
  "Google Cloud",
  "Microsoft",
  "AWS",
  "Oracle",
  "Meta",
  "Adobe",
  "Salesforce",
  "Shopify",
];

export const coreServices: ServiceItem[] = [
  {
    id: "1",
    title: "Custom Software Development",
    description:
      "Bespoke web and enterprise applications tailored to your workflows and growth goals.",
    icon: "code",
    href: "/services",
  },
  {
    id: "2",
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile experiences for iOS and Android users.",
    icon: "smartphone",
    href: "/services",
  },
  {
    id: "3",
    title: "UI/UX Design",
    description:
      "Research-driven interfaces that convert visitors into loyal customers.",
    icon: "palette",
    href: "/services",
  },
  {
    id: "4",
    title: "Cloud & DevOps",
    description:
      "Reliable cloud architecture, CI/CD, and infrastructure automation.",
    icon: "cloud",
    href: "/services",
  },
  {
    id: "5",
    title: "QA & Testing",
    description:
      "Manual and automated testing to ship quality releases with confidence.",
    icon: "shield",
    href: "/services",
  },
  {
    id: "6",
    title: "AI & Data Solutions",
    description:
      "Intelligent products powered by ML, analytics, and modern data stacks.",
    icon: "brain",
    href: "/services",
  },
  {
    id: "7",
    title: "Product Engineering",
    description:
      "End-to-end product teams that own discovery, delivery, and iteration.",
    icon: "layers",
    href: "/services",
  },
  {
    id: "8",
    title: "Support & Maintenance",
    description:
      "24/7 monitoring, upgrades, and continuous improvement for live systems.",
    icon: "headset",
    href: "/services",
  },
];

export const industriesStrip: IndustryItem[] = [
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
  {
    id: "6",
    title: "Logistics",
    description: "Supply chain systems",
    icon: "truck",
    href: "/industries",
  },
  {
    id: "7",
    title: "Manufacturing",
    description: "Industry 4.0 software",
    icon: "factory",
    href: "/industries",
  },
  {
    id: "8",
    title: "Government",
    description: "Civic digital services",
    icon: "landmark",
    href: "/industries",
  },
];

export const whyChoose = [
  {
    title: "Expert Team",
    description: "Senior engineers across frontend, backend, mobile, and cloud.",
    icon: "users",
  },
  {
    title: "Agile Methodology",
    description: "Transparent sprints, demos, and continuous delivery.",
    icon: "zap",
  },
  {
    title: "Transparent Communication",
    description: "Clear reporting, shared roadmaps, and dedicated managers.",
    icon: "message",
  },
  {
    title: "On-time Delivery",
    description: "Reliable timelines backed by proven project governance.",
    icon: "clock",
  },
  {
    title: "Secure & Scalable",
    description: "Security-first architecture ready for enterprise growth.",
    icon: "shield",
  },
  {
    title: "Global Delivery",
    description: "Follow-the-sun teams serving clients across 25+ countries.",
    icon: "globe",
  },
];

export const featuredCaseStudies: CaseStudyItem[] = [
  {
    id: "1",
    title: "MediCare+ Hospital Management System",
    description:
      "Unified clinical workflows, appointments, and billing for a multi-hospital network.",
    category: "Healthcare",
    image: "/images/case-healthcare.svg",
    href: "/case-studies",
    techStack: ["React", "Laravel", "AWS", "Docker"],
    metrics: [
      { value: "65%", label: "Operational efficiency" },
      { value: "40%", label: "Faster admissions" },
    ],
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
    metrics: [
      { value: "3x", label: "Transaction volume" },
      { value: "99.9%", label: "Uptime" },
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
    techStack: ["Flutter", "Firebase", "GCP"],
    metrics: [
      { value: "2.1M", label: "Monthly users" },
      { value: "28%", label: "Lead conversion" },
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Zaimah delivered our hospital platform ahead of schedule. Communication was clear and the engineering quality exceeded expectations.",
    name: "Sarah Chen",
    role: "CTO, MediCare Group",
    avatar: "",
    rating: 5,
  },
  {
    id: "2",
    quote:
      "They became an extension of our product team. The fintech release was stable from day one and scaled with our growth.",
    name: "James Okonkwo",
    role: "Head of Product, PayFlow",
    avatar: "",
    rating: 5,
  },
  {
    id: "3",
    quote:
      "From discovery to launch, the process was transparent. Our marketplace now serves millions of users monthly.",
    name: "Amina Rahman",
    role: "CEO, EstateHub",
    avatar: "",
    rating: 5,
  },
  {
    id: "4",
    quote:
      "Reliable partners who understand both product and compliance. Our retail platform launched on time and keeps improving.",
    name: "Daniel Park",
    role: "VP Engineering, ShopNova",
    avatar: "",
    rating: 5,
  },
];
