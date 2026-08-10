import type { StatItem, TeamMember } from '@/types';

export const aboutHero = {
  breadcrumb: [{ label: 'Home', href: '/' }, { label: 'About Us' }],
  title: 'Engineering Digital Success for Businesses',
  highlight: 'Worldwide',
  description:
    'Zamil Technologies is a trusted software development partner helping startups and enterprises design, build, and scale secure digital products across industries and markets.',
  actions: {
    primary: { label: 'Work With Us', href: '/contact' },
    secondary: { label: 'Join Our Team', href: '/careers' },
  },
};

export const aboutHeroStats: StatItem[] = [
  { value: '250+', label: 'Projects Delivered', icon: 'briefcase' },
  { value: '18+', label: 'Industries Served', icon: 'building' },
  { value: '25+', label: 'Years Experience', icon: 'award' },
  { value: '99%', label: 'Client Satisfaction', icon: 'smile' },
];

export const companyOverview = {
  eyebrow: 'Who We Are',
  title: 'Company Overview',
  description:
    'For over two decades we have partnered with ambitious organizations to turn complex ideas into reliable software—combining senior engineering, product thinking, and transparent delivery.',
};

export const companyFeatures = [
  {
    title: 'Global Delivery',
    description: 'Follow-the-sun teams across time zones.',
    icon: 'globe',
  },
  {
    title: 'Senior Talent',
    description: 'Experienced engineers and product leaders.',
    icon: 'users',
  },
  {
    title: 'Outcome Focus',
    description: 'Roadmaps tied to measurable business goals.',
    icon: 'target',
  },
  {
    title: 'Security First',
    description: 'Compliance-aware architecture from day one.',
    icon: 'shield',
  },
  {
    title: 'Transparent Process',
    description: 'Clear reporting, demos, and shared tools.',
    icon: 'message',
  },
  {
    title: 'Long-term Partnership',
    description: 'Support and iteration after launch.',
    icon: 'handshake',
  },
];

export const milestones = [
  {
    year: '2000',
    title: 'Founded',
    description: 'Started as a boutique engineering studio in Bangkok.',
  },
  {
    year: '2005',
    title: 'First Enterprise Wins',
    description: 'Delivered mission-critical systems for regional clients.',
  },
  {
    year: '2010',
    title: 'Product Practice',
    description: 'Expanded into UX, product strategy, and agile delivery.',
  },
  {
    year: '2015',
    title: 'Cloud Native',
    description: 'Scaled cloud, DevOps, and modern stack capabilities.',
  },
  {
    year: '2020',
    title: 'Global Footprint',
    description: 'Partnered with teams across 25+ countries worldwide.',
  },
  {
    year: '2026',
    title: 'AI-Accelerated',
    description: 'Investing in AI-assisted delivery and product accelerators.',
  },
];

export const missionVision = [
  {
    title: 'Our Mission',
    description:
      'To help ambitious companies ship secure, scalable software that creates lasting customer value—through craftsmanship, clarity, and partnership.',
    icon: 'target',
    illustration: '[Mission Illustration]',
  },
  {
    title: 'Our Vision',
    description:
      'To be the most trusted digital product partner for teams who want enterprise-grade quality with startup velocity.',
    icon: 'eye',
    illustration: '[Vision Illustration]',
  },
];

export const coreValues = [
  {
    title: 'Innovation',
    description: 'We explore new ideas and technologies that move clients forward.',
    icon: 'lightbulb',
  },
  {
    title: 'Integrity',
    description: 'We say what we mean and deliver what we promise.',
    icon: 'shield',
  },
  {
    title: 'Excellence',
    description: 'Quality code and thoughtful UX are non-negotiable.',
    icon: 'award',
  },
  {
    title: 'Collaboration',
    description: 'We work as one team with our clients and partners.',
    icon: 'users',
  },
  {
    title: 'Ownership',
    description: 'We take responsibility from discovery through support.',
    icon: 'handshake',
  },
  {
    title: 'Impact',
    description: 'Success is measured by outcomes, not output alone.',
    icon: 'trending',
  },
];

export const leadership: TeamMember[] = [
  {
    id: '1',
    name: 'Rashid Rahman',
    role: 'Chief Executive Officer',
    bio: 'Rashid has led Zamil’s growth for over a decade, partnering with founders and enterprise leaders to turn product vision into scalable platforms.',
    image: '/images/office-team.svg',
    featured: true,
    linkedin: 'https://linkedin.com',
    email: 'rashid@zamil.tech',
  },
  {
    id: '2',
    name: 'Maya Chen',
    role: 'Chief Technology Officer',
    bio: 'Leads architecture and engineering excellence across all practices.',
    image: '/images/office-team.svg',
    linkedin: 'https://linkedin.com',
  },
  {
    id: '3',
    name: 'Daniel Okonkwo',
    role: 'VP of Delivery',
    bio: 'Owns project governance, quality, and client success programs.',
    image: '/images/office-team.svg',
    linkedin: 'https://linkedin.com',
  },
  {
    id: '4',
    name: 'Priya Nair',
    role: 'Head of Design',
    bio: 'Shapes research-driven product experiences for global markets.',
    image: '/images/office-team.svg',
    linkedin: 'https://linkedin.com',
  },
  {
    id: '5',
    name: 'Lucas Meyer',
    role: 'Head of Cloud & DevOps',
    bio: 'Builds resilient infrastructure and release automation practices.',
    image: '/images/office-team.svg',
    linkedin: 'https://linkedin.com',
  },
  {
    id: '6',
    name: 'Aisha Rahman',
    role: 'Head of People & Culture',
    bio: 'Grows high-performing teams and an inclusive engineering culture.',
    image: '/images/office-team.svg',
    linkedin: 'https://linkedin.com',
  },
];

export const aboutStats: StatItem[] = [
  { value: '250+', label: 'Projects Delivered', icon: 'briefcase' },
  { value: '120+', label: 'Team Members', icon: 'users' },
  { value: '18+', label: 'Industries Served', icon: 'building' },
  { value: '25+', label: 'Years Experience', icon: 'award' },
  { value: '99%', label: 'Client Satisfaction', icon: 'smile' },
];

export const partners = [
  { name: 'AWS', label: '[AWS Logo]' },
  { name: 'Google Cloud', label: '[Google Cloud Logo]' },
  { name: 'Microsoft', label: '[Microsoft Logo]' },
  { name: 'Salesforce', label: '[Salesforce Logo]' },
  { name: 'Stripe', label: '[Stripe Logo]' },
  { name: 'Shopify', label: '[Shopify Logo]' },
];

export const certifications = [
  'ISO 27001',
  'AWS Partner',
  'Google Cloud Partner',
  'Microsoft Solutions Partner',
  'SOC 2 Ready',
  'GDPR Aligned',
];
