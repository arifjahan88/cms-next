import type { BlogPost } from '@/types';

export const blogHero = {
  breadcrumb: [{ label: 'Home', href: '/' }, { label: 'Blog' }],
  title: 'Insights. Ideas.',
  highlight: 'Impact.',
  description:
    'Practical perspectives on software, product strategy, and digital transformation from the Zaimah team.',
  searchPlaceholder: 'Search articles...',
  categoryPlaceholder: 'All Categories',
  illustrationLabel: '[Blog Hero Illustration]',
};

export const blogCategories = [
  { label: 'All Topics', icon: 'layers' },
  { label: 'Technology', icon: 'code' },
  { label: 'Business', icon: 'briefcase' },
  { label: 'Product Development', icon: 'rocket' },
  { label: 'Industry Insights', icon: 'trending' },
  { label: 'Engineering', icon: 'settings' },
] as const;

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How AI Is Reshaping Enterprise Product Roadmaps in 2026',
    excerpt:
      'From copilots to decision engines—what leaders should prioritize before investing in AI features.',
    category: 'Technology',
    date: 'Jul 18, 2026',
    readTime: '8 min',
    image: '/images/blog-ai.svg',
    href: '/blog',
    author: 'Nadia Rahman',
    featured: true,
  },
  {
    id: '2',
    title: 'Building Secure FinTech Platforms Without Slowing Delivery',
    excerpt: 'A practical checklist for balancing compliance, speed, and developer experience.',
    category: 'Industry Insights',
    date: 'Jul 2, 2026',
    readTime: '6 min',
    image: '/images/case-fintech.svg',
    href: '/blog',
    author: 'James Okonkwo',
  },
  {
    id: '3',
    title: 'Discovery Sprints That Actually Reduce Rework',
    excerpt: 'How structured product discovery cuts ambiguity before the first sprint starts.',
    category: 'Product Development',
    date: 'Jun 20, 2026',
    readTime: '5 min',
    image: '/images/office-team.svg',
    href: '/blog',
    author: 'Amina Khan',
  },
  {
    id: '4',
    title: 'Why Modular Architecture Wins for Healthcare Systems',
    excerpt: 'Lessons from multi-hospital platforms that need to evolve without downtime.',
    category: 'Engineering',
    date: 'Jun 8, 2026',
    readTime: '7 min',
    image: '/images/case-healthcare.svg',
    href: '/blog',
    author: 'Daniel Cruz',
  },
  {
    id: '5',
    title: 'Choosing Between MVP and MLP for Investor Demos',
    excerpt: 'When a lovable product beats a bare minimum—and how to decide fast.',
    category: 'Business',
    date: 'May 26, 2026',
    readTime: '4 min',
    image: '/images/hero-devices.svg',
    href: '/blog',
    author: 'Sarah Chen',
  },
  {
    id: '6',
    title: 'Cloud Cost Guardrails Every Startup Should Ship First',
    excerpt: 'Simple observability and budgeting patterns that prevent surprise invoices.',
    category: 'Engineering',
    date: 'May 12, 2026',
    readTime: '6 min',
    image: '/images/case-realestate.svg',
    href: '/blog',
    author: 'Leo Martins',
  },
  {
    id: '7',
    title: 'Design Systems That Scale Across Product Squads',
    excerpt: 'Governance tips for keeping UI consistent without bottlenecking teams.',
    category: 'Product Development',
    date: 'Apr 28, 2026',
    readTime: '5 min',
    image: '/images/office-team.svg',
    href: '/blog',
    author: 'Priya Nair',
  },
  {
    id: '8',
    title: 'What Real Estate Tech Buyers Ask Before Signing',
    excerpt: 'Common evaluation criteria from property platforms evaluating vendors.',
    category: 'Industry Insights',
    date: 'Apr 10, 2026',
    readTime: '5 min',
    image: '/images/case-realestate.svg',
    href: '/blog',
    author: 'Amina Rahman',
  },
  {
    id: '9',
    title: 'Event-Driven Microservices: When (Not) to Use Them',
    excerpt: 'Trade-offs, failure modes, and a decision framework for growing teams.',
    category: 'Technology',
    date: 'Mar 22, 2026',
    readTime: '9 min',
    image: '/images/blog-ai.svg',
    href: '/blog',
    author: 'Nadia Rahman',
  },
];

export const featuredPost = blogPosts.find((post) => post.featured) ?? blogPosts[0];

export const latestPosts = blogPosts.filter((post) => !post.featured).slice(0, 3);

export const popularPosts = blogPosts.slice(0, 5);

export const exploreTopics = [
  'AI & ML',
  'Cloud',
  'FinTech',
  'Healthcare',
  'Product Strategy',
  'DevOps',
  'UX',
  'Security',
];

export const aboutCard = {
  title: 'About Our Blog',
  description:
    'We share what we learn building software for startups and enterprises across Healthcare, FinTech, Real Estate, and more.',
  imageLabel: '[About Blog Thumbnail]',
};

export const subscribeCard = {
  title: 'Subscribe',
  description: 'Get product and engineering insights in your inbox.',
  placeholder: 'you@company.com',
  buttonLabel: 'Subscribe',
};

export const latestSection = {
  title: 'Latest Articles',
  description: 'Fresh perspectives from our product and engineering teams.',
  actionLabel: 'View All Articles',
  actionHref: '/blog',
};
