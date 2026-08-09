import type { CaseStudyItem, FaqItem, IndustryItem, ServiceItem } from '@/types';

export const servicesHero = {
  breadcrumb: [{ label: 'Home', href: '/' }, { label: 'Services' }],
  eyebrow: 'Our Services →',
  title: 'Comprehensive Software Engineering Services to',
  highlight: 'Accelerate Your Growth',
  description:
    'From custom software and SaaS products to AI, cloud, and managed IT—Zaimah Technologies delivers end-to-end engineering that helps startups and enterprises ship faster and scale with confidence.',
  actions: {
    primary: { label: 'Book Free Consultation', href: '/book-consultation' },
    secondary: {
      label: 'Download Company Profile',
      href: '#',
      download: true,
    },
  },
};

export const servicesList: ServiceItem[] = [
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    description:
      'Bespoke web and enterprise applications tailored to your workflows and growth goals.',
    icon: 'code',
    href: '/services#custom-software',
  },
  {
    id: 'saas',
    title: 'SaaS Product Development',
    description: 'Multi-tenant SaaS platforms with billing, onboarding, and scalable architecture.',
    icon: 'layers',
    href: '/services#saas',
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile experiences for iOS and Android users.',
    icon: 'smartphone',
    href: '/services#mobile',
  },
  {
    id: 'website',
    title: 'Website Design & Development',
    description: 'High-converting marketing sites and web apps with modern UX and performance.',
    icon: 'globe',
    href: '/services#website',
  },
  {
    id: 'ai',
    title: 'AI & Automation Solutions',
    description: 'Intelligent products powered by ML, automation, and modern data stacks.',
    icon: 'brain',
    href: '/services#ai',
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps Engineering',
    description: 'Reliable cloud architecture, CI/CD, and infrastructure automation.',
    icon: 'cloud',
    href: '/services#cloud',
  },
  {
    id: 'managed-it',
    title: 'Managed IT Services',
    description: 'Proactive monitoring, support, and maintenance so your systems stay healthy.',
    icon: 'headset',
    href: '/services#managed-it',
  },
  {
    id: 'consulting',
    title: 'IT Consulting Services',
    description: 'Strategy, architecture, and roadmap guidance from senior technology advisors.',
    icon: 'briefcase',
    href: '/services#consulting',
  },
];

export const comparisonRows = [
  {
    service: 'Custom Software',
    bestFor: 'Unique business workflows',
    timeline: '3–6 months',
    engagement: 'Fixed / Dedicated',
  },
  {
    service: 'SaaS Products',
    bestFor: 'Scalable multi-tenant apps',
    timeline: '4–9 months',
    engagement: 'Dedicated Team',
  },
  {
    service: 'Mobile Apps',
    bestFor: 'iOS & Android products',
    timeline: '2–5 months',
    engagement: 'Fixed / T&M',
  },
  {
    service: 'AI & Automation',
    bestFor: 'Intelligence & efficiency',
    timeline: '2–4 months',
    engagement: 'T&M / Pilot',
  },
  {
    service: 'Cloud & DevOps',
    bestFor: 'Reliability & scale',
    timeline: '1–3 months',
    engagement: 'Retainer / Project',
  },
  {
    service: 'Managed IT',
    bestFor: 'Ongoing operations',
    timeline: 'Continuous',
    engagement: 'Monthly retainer',
  },
];

export const processSteps = [
  {
    step: '01',
    title: 'Discover',
    description: 'Goals, constraints, and opportunity mapping.',
    icon: 'search',
  },
  {
    step: '02',
    title: 'Plan',
    description: 'Roadmap, milestones, and team shape.',
    icon: 'target',
  },
  {
    step: '03',
    title: 'Design',
    description: 'UX flows, architecture, and prototypes.',
    icon: 'palette',
  },
  {
    step: '04',
    title: 'Develop',
    description: 'Agile sprints with transparent demos.',
    icon: 'code',
  },
  {
    step: '05',
    title: 'Test',
    description: 'QA, performance, and security checks.',
    icon: 'check',
  },
  {
    step: '06',
    title: 'Deploy',
    description: 'Hardened releases and launch readiness.',
    icon: 'rocket',
  },
  {
    step: '07',
    title: 'Support',
    description: 'Optimization and continuous improvement.',
    icon: 'headset',
  },
];

export const servicesHeroChips = [
  'Innovation',
  'Scalability',
  'Security',
  'Performance',
  'Reliability',
  'Growth',
];

export const servicesTechCategories = [
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'Vue.js', 'Tailwind'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Laravel', 'NestJS', 'Python'],
  },
  {
    title: 'Mobile',
    items: ['Flutter', 'React', 'Firebase', 'Swift'],
  },
  {
    title: 'Database',
    items: ['PostgreSQL', 'MongoDB', 'Firebase', 'Redis'],
  },
  {
    title: 'Cloud',
    items: ['AWS', 'GCP', 'Azure', 'Vercel'],
  },
  {
    title: 'DevOps',
    items: ['Docker', 'Kubernetes', 'GitHub', 'CI/CD'],
  },
];

export const servicesIndustries: IndustryItem[] = [
  {
    id: '1',
    title: 'Healthcare',
    description: '',
    icon: 'heart',
    href: '/industries',
  },
  {
    id: '2',
    title: 'FinTech',
    description: '',
    icon: 'landmark',
    href: '/industries',
  },
  {
    id: '3',
    title: 'Real Estate',
    description: '',
    icon: 'building',
    href: '/industries',
  },
  {
    id: '4',
    title: 'Retail',
    description: '',
    icon: 'shopping',
    href: '/industries',
  },
  {
    id: '5',
    title: 'Education',
    description: '',
    icon: 'graduation',
    href: '/industries',
  },
  {
    id: '6',
    title: 'Manufacturing',
    description: '',
    icon: 'factory',
    href: '/industries',
  },
  {
    id: '7',
    title: 'Logistics',
    description: '',
    icon: 'truck',
    href: '/industries',
  },
  {
    id: '8',
    title: 'Government',
    description: '',
    icon: 'briefcase',
    href: '/industries',
  },
];

export const servicesCaseStudies: CaseStudyItem[] = [
  {
    id: '1',
    title: 'Healthcare Management Platform',
    description:
      'A comprehensive hospital management system with appointment, EHR, and billing integration.',
    category: 'Healthcare',
    image: '/images/case-healthcare.svg',
    href: '/case-studies',
    techStack: ['React', 'Laravel', 'Flutter'],
  },
  {
    id: '2',
    title: 'Multi-vendor Marketplace',
    description: 'Scalable multi-vendor platform with subscription plans & commission system.',
    category: 'Marketplace',
    image: '/images/case-marketplace.svg',
    href: '/case-studies',
    techStack: ['Next.js', 'Node.js', 'MongoDB'],
  },
  {
    id: '3',
    title: 'Property Management System',
    description:
      'End-to-end property & tenant management platform with payments & maintenance tracking.',
    category: 'Real Estate',
    image: '/images/case-realestate.svg',
    href: '/case-studies',
    techStack: ['React', 'Laravel', 'MySQL'],
  },
];

export const whyChooseServices = [
  'Dedicated Development Teams',
  'Agile & Transparent Process',
  'Daily Progress Reports',
  'NDA & IP Protection',
  'On-time Delivery',
  'Flexible Engagement Models',
  'Enterprise-grade Security',
  'Long-term Support',
];

export const servicesFaqs: FaqItem[] = [
  {
    question: 'How do we start a project with Zaimah?',
    answer:
      'We begin with a free discovery call to understand goals, timeline, and constraints. From there we propose an engagement model, team shape, and kickoff plan—usually within a few business days.',
  },
  {
    question: 'Can you work with our in-house team?',
    answer:
      'Yes. Many clients embed our engineers alongside internal product and engineering teams. We adapt to your tools, ceremonies, and coding standards.',
  },
  {
    question: 'Do you sign NDAs?',
    answer:
      'Absolutely. We can execute mutual NDAs before detailed discussions or access to proprietary materials.',
  },
  {
    question: 'What industries do you specialize in?',
    answer:
      'We have deep experience in healthcare, fintech, real estate, retail, education, logistics, and more—especially regulated and high-growth verticals.',
  },
  {
    question: 'How do you ensure quality and security?',
    answer:
      'Every engagement includes code reviews, automated testing, CI/CD, and security practices aligned to your compliance needs (HIPAA, PCI, SOC2-ready patterns).',
  },
  {
    question: 'What engagement models do you offer?',
    answer:
      "We offer fixed-price projects, time & material, and dedicated teams. We'll recommend the best fit based on scope clarity, timeline, and how fast requirements may evolve.",
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Most MVPs ship in 2–4 months. Larger platforms often take 4–9 months depending on complexity, integrations, and compliance requirements.',
  },
  {
    question: 'Do you provide post-launch support?',
    answer:
      'Yes. We offer managed support retainers covering monitoring, bug fixes, upgrades, and continuous improvement after go-live.',
  },
];

export const servicesMiniCta = {
  title: 'Have a Project in Mind?',
  description:
    "Let's discuss your goals and recommend the right services, team, and roadmap—with no pressure.",
  benefits: ['Free Consultation', 'NDA', 'No Obligation'],
  primary: { label: 'Book Free Consultation', href: '/book-consultation' },
};
