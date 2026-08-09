import type { BlogPost } from "@/types";

export const blogCategories = [
  "All Topics",
  "Technology",
  "Business",
  "Product Development",
  "Industry Insights",
  "Engineering",
] as const;

export const blogHero = {
  title: "Insights. Ideas.",
  highlight: "Impact.",
  description:
    "Practical perspectives on software, product strategy, and digital transformation from the Zaimah team.",
};

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "How AI Is Reshaping Enterprise Product Roadmaps in 2026",
    excerpt:
      "From copilots to decision engines—what leaders should prioritize before investing in AI features.",
    category: "Technology",
    date: "2026-07-18",
    readTime: "8 min",
    image: "/images/blog-ai.svg",
    href: "/blog",
    author: "Nadia Rahman",
    featured: true,
  },
  {
    id: "2",
    title: "Building Secure FinTech Platforms Without Slowing Delivery",
    excerpt:
      "A practical checklist for balancing compliance, speed, and developer experience.",
    category: "Industry Insights",
    date: "2026-07-02",
    readTime: "6 min",
    image: "/images/case-fintech.svg",
    href: "/blog",
    author: "James Okonkwo",
  },
  {
    id: "3",
    title: "Discovery Sprints That Actually Reduce Rework",
    excerpt:
      "How structured product discovery cuts ambiguity before the first sprint starts.",
    category: "Product Development",
    date: "2026-06-20",
    readTime: "5 min",
    image: "/images/office-team.svg",
    href: "/blog",
    author: "Amina Khan",
  },
  {
    id: "4",
    title: "Why Modular Architecture Wins for Healthcare Systems",
    excerpt:
      "Lessons from multi-hospital platforms that need to evolve without downtime.",
    category: "Engineering",
    date: "2026-06-08",
    readTime: "7 min",
    image: "/images/case-healthcare.svg",
    href: "/blog",
    author: "Daniel Cruz",
  },
  {
    id: "5",
    title: "Choosing Between MVP and MLP for Investor Demos",
    excerpt:
      "When a lovable product beats a bare minimum—and how to decide fast.",
    category: "Business",
    date: "2026-05-26",
    readTime: "4 min",
    image: "/images/hero-devices.svg",
    href: "/blog",
    author: "Sarah Chen",
  },
  {
    id: "6",
    title: "Cloud Cost Guardrails Every Startup Should Ship First",
    excerpt:
      "Simple observability and budgeting patterns that prevent surprise invoices.",
    category: "Engineering",
    date: "2026-05-12",
    readTime: "6 min",
    image: "/images/case-realestate.svg",
    href: "/blog",
    author: "Leo Martins",
  },
  {
    id: "7",
    title: "Design Systems That Scale Across Product Squads",
    excerpt:
      "Governance tips for keeping UI consistent without bottlenecking teams.",
    category: "Product Development",
    date: "2026-04-28",
    readTime: "5 min",
    image: "/images/office-team.svg",
    href: "/blog",
    author: "Priya Nair",
  },
  {
    id: "8",
    title: "What Real Estate Tech Buyers Ask Before Signing",
    excerpt:
      "Common evaluation criteria from property platforms evaluating vendors.",
    category: "Industry Insights",
    date: "2026-04-10",
    readTime: "5 min",
    image: "/images/case-realestate.svg",
    href: "/blog",
    author: "Amina Rahman",
  },
  {
    id: "9",
    title: "Event-Driven Microservices: When (Not) to Use Them",
    excerpt:
      "Trade-offs, failure modes, and a decision framework for growing teams.",
    category: "Technology",
    date: "2026-03-22",
    readTime: "9 min",
    image: "/images/blog-ai.svg",
    href: "/blog",
    author: "Nadia Rahman",
  },
];

export const popularPosts = blogPosts.slice(0, 5);

export const exploreTopics = [
  "AI & ML",
  "Cloud",
  "FinTech",
  "Healthcare",
  "Product Strategy",
  "DevOps",
  "UX",
  "Security",
];

export const aboutCard = {
  title: "About Zaimah Insights",
  description:
    "We share what we learn building software for startups and enterprises across Healthcare, FinTech, Real Estate, and more.",
  image: "/images/office-team.svg",
};
