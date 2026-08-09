import type { StatItem, TeamMember } from "@/types";

export const aboutHero = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "About Us" },
  ],
  eyebrow: "About Zaimah",
  title: "Building Digital Products for",
  highlight: "25+ Years",
  description:
    "Zaimah Technologies is a trusted software development partner helping startups and enterprises design, build, and scale secure digital products worldwide.",
  actions: {
    primary: { label: "Work With Us", href: "/contact" },
    secondary: { label: "Join Our Team", href: "/careers" },
  },
  floatingStats: [
    { value: "250+", label: "Projects" },
    { value: "120+", label: "Experts" },
    { value: "25+", label: "Countries" },
  ],
};

export const companyFeatures = [
  {
    title: "Global Delivery",
    description: "Follow-the-sun teams across time zones.",
    icon: "globe",
  },
  {
    title: "Senior Talent",
    description: "Experienced engineers and product leaders.",
    icon: "users",
  },
  {
    title: "Outcome Focus",
    description: "Roadmaps tied to measurable business goals.",
    icon: "target",
  },
  {
    title: "Security First",
    description: "Compliance-aware architecture from day one.",
    icon: "shield",
  },
  {
    title: "Transparent Process",
    description: "Clear reporting, demos, and shared tools.",
    icon: "message",
  },
  {
    title: "Long-term Partnership",
    description: "Support and iteration after launch.",
    icon: "handshake",
  },
];

export const milestones = [
  {
    year: "2000",
    title: "Founded",
    description: "Started as a boutique engineering studio in Bangkok.",
  },
  {
    year: "2008",
    title: "Regional Expansion",
    description: "Opened delivery partnerships across Southeast Asia.",
  },
  {
    year: "2014",
    title: "Enterprise Focus",
    description: "Scaled teams for regulated healthcare and fintech clients.",
  },
  {
    year: "2019",
    title: "Cloud & AI Practice",
    description: "Launched dedicated cloud, DevOps, and data engineering units.",
  },
  {
    year: "2023",
    title: "Global Clients",
    description: "Surpassed 200 delivered products across 25+ countries.",
  },
  {
    year: "2026",
    title: "Next Chapter",
    description: "Investing in AI-assisted delivery and product accelerators.",
  },
];

export const missionVision = [
  {
    title: "Our Mission",
    description:
      "To help ambitious companies ship secure, scalable software that creates lasting customer value—through craftsmanship, clarity, and partnership.",
    icon: "target",
  },
  {
    title: "Our Vision",
    description:
      "To be the most trusted digital product partner for teams who want enterprise-grade quality with startup velocity.",
    icon: "eye",
  },
];

export const coreValues = [
  {
    title: "Integrity",
    description: "We say what we mean and deliver what we promise.",
    icon: "shield",
  },
  {
    title: "Craftsmanship",
    description: "Quality code and thoughtful UX are non-negotiable.",
    icon: "award",
  },
  {
    title: "Curiosity",
    description: "We keep learning so our clients stay ahead.",
    icon: "lightbulb",
  },
  {
    title: "Collaboration",
    description: "We work as one team with our clients and partners.",
    icon: "users",
  },
  {
    title: "Ownership",
    description: "We take responsibility from discovery through support.",
    icon: "handshake",
  },
  {
    title: "Impact",
    description: "Success is measured by outcomes, not output alone.",
    icon: "trending",
  },
];

export const leadership: TeamMember[] = [
  {
    id: "1",
    name: "Rashid Rahman",
    role: "Chief Executive Officer",
    bio: "Rashid has led Zaimah’s growth for over a decade, partnering with founders and enterprise leaders to turn product vision into scalable platforms.",
    image: "/images/office-team.svg",
    featured: true,
    linkedin: "https://linkedin.com",
    email: "rashid@zaimah.tech",
  },
  {
    id: "2",
    name: "Maya Chen",
    role: "Chief Technology Officer",
    bio: "Leads architecture and engineering excellence across all practices.",
    image: "/images/office-team.svg",
    linkedin: "https://linkedin.com",
  },
  {
    id: "3",
    name: "Daniel Okonkwo",
    role: "VP of Delivery",
    bio: "Owns project governance, quality, and client success programs.",
    image: "/images/office-team.svg",
    linkedin: "https://linkedin.com",
  },
  {
    id: "4",
    name: "Priya Nair",
    role: "Head of Design",
    bio: "Shapes research-driven product experiences for global markets.",
    image: "/images/office-team.svg",
    linkedin: "https://linkedin.com",
  },
  {
    id: "5",
    name: "Lucas Meyer",
    role: "Head of Cloud & DevOps",
    bio: "Builds resilient infrastructure and release automation practices.",
    image: "/images/office-team.svg",
    linkedin: "https://linkedin.com",
  },
];

export const aboutStats: StatItem[] = [
  { value: "250+", label: "Projects Delivered", icon: "briefcase" },
  { value: "120+", label: "Team Members", icon: "users" },
  { value: "25+", label: "Years Experience", icon: "award" },
  { value: "98%", label: "Client Satisfaction", icon: "smile" },
];

export const certifications = [
  "ISO 27001",
  "AWS Partner",
  "Google Cloud Partner",
  "Microsoft Solutions Partner",
  "SOC 2 Ready",
  "GDPR Aligned",
];
