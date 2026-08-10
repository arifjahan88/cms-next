import type { JobOpening, StatItem } from '@/types';

export const careersHero = {
  breadcrumb: [{ label: 'Home', href: '/' }, { label: 'Careers' }],
  titleBefore: 'Build Your ',
  highlight1: 'Career.',
  titleMiddle: ' Make a Bigger ',
  highlight2: 'Impact.',
  description:
    'Join a global engineering team shipping products for startups and enterprises. Grow your skills, own outcomes, and work with people who care about craft.',
  actions: {
    primary: { label: 'View Open Positions', href: '#open-positions' },
    secondary: { label: 'Life at Zamil', href: '#culture' },
  },
  overlay: {
    title: 'Great People. Meaningful Work. Limitless Opportunities.',
  },
};

export const careersStats: StatItem[] = [
  { value: '100+', label: 'Team Members', icon: 'users' },
  { value: '25+', label: 'Open Positions', icon: 'briefcase' },
  { value: '12+', label: 'Countries Served', icon: 'globe' },
  { value: '98%', label: 'Employee Satisfaction', icon: 'smile' },
  { value: 'Fast', label: 'Career Growth', icon: 'trending' },
];

export const cultureIntro = {
  eyebrow: 'Our Culture',
  title: "We're more than colleagues, we're a family.",
  description:
    'We combine ownership, curiosity, and collaboration so every teammate can do the best work of their career.',
};

export const cultureCards = [
  {
    title: 'Ownership Mindset',
    description:
      'You own problems end-to-end—from discovery to delivery—and celebrate outcomes with the team.',
    icon: 'target',
  },
  {
    title: 'Continuous Learning',
    description:
      'Budgets for courses, certifications, and conference time keep skills sharp and careers moving.',
    icon: 'graduation',
  },
  {
    title: 'Transparent Collaboration',
    description:
      'Open communication, clear goals, and honest feedback across squads and time zones.',
    icon: 'handshake',
  },
  {
    title: 'Craft Over Hype',
    description:
      'We ship thoughtfully: clean architecture, measurable quality, and products users trust.',
    icon: 'sparkles',
  },
  {
    title: 'Customer Empathy',
    description:
      'We partner closely with clients and stay curious about the businesses we help grow.',
    icon: 'heartOutline',
  },
  {
    title: 'Inclusive by Default',
    description:
      'Diverse voices, respectful debate, and equal opportunity across every office and role.',
    icon: 'users',
  },
] as const;

export const benefitsIntro = {
  eyebrow: 'Benefits & Perks',
  title: 'Support that goes beyond the paycheck',
  description: 'We invest in wellbeing, growth, and the flexibility people need to do great work.',
};

export const benefits = [
  { title: 'Competitive Pay', icon: 'award' },
  { title: 'Health Coverage', icon: 'heartOutline' },
  { title: 'Remote Flexibility', icon: 'laptop' },
  { title: 'Learning Budget', icon: 'graduation' },
  { title: 'Paid Time Off', icon: 'plane' },
  { title: 'Career Paths', icon: 'rocket' },
] as const;

export const openPositionsIntro = {
  eyebrow: 'Open Positions',
  title: 'Find a role that fits',
  description: 'Search by keyword or filter by department and location.',
};

export const jobDepartments = [
  'All Departments',
  'Engineering',
  'Design',
  'Product',
  'QA',
  'DevOps',
  'Sales',
] as const;

export const jobLocations = [
  'All Locations',
  'Bangkok, Thailand',
  'Dhaka, Bangladesh',
  'Kuala Lumpur, Malaysia',
  'Dubai, UAE',
  'Remote',
] as const;

export const jobs: JobOpening[] = [
  {
    id: '1',
    title: 'Senior Full-Stack Engineer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Bangkok, Thailand',
    description:
      'Lead feature delivery across React/Next.js and Node services for enterprise clients.',
    href: '/careers#apply',
  },
  {
    id: '2',
    title: 'Mobile Engineer (Flutter)',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Dhaka, Bangladesh',
    description: 'Build high-quality iOS and Android apps with a focus on performance and polish.',
    href: '/careers#apply',
  },
  {
    id: '3',
    title: 'Product Designer',
    department: 'Design',
    type: 'Full-time',
    location: 'Remote',
    description: 'Shape product experiences from research to high-fidelity UI for SaaS platforms.',
    href: '/careers#apply',
  },
  {
    id: '4',
    title: 'QA Automation Engineer',
    department: 'QA',
    type: 'Full-time',
    location: 'Kuala Lumpur, Malaysia',
    description: 'Own test strategy, automation frameworks, and release confidence across squads.',
    href: '/careers#apply',
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    department: 'DevOps',
    type: 'Full-time',
    location: 'Dubai, UAE',
    description:
      'Improve CI/CD, cloud infrastructure, and observability for multi-tenant products.',
    href: '/careers#apply',
  },
  {
    id: '6',
    title: 'Product Manager',
    department: 'Product',
    type: 'Full-time',
    location: 'Bangkok, Thailand',
    description: 'Drive roadmaps, discovery, and delivery with engineering and design partners.',
    href: '/careers#apply',
  },
  {
    id: '7',
    title: 'Business Development Manager',
    department: 'Sales',
    type: 'Full-time',
    location: 'Remote',
    description: 'Grow partnerships across APAC and the Middle East with consultative selling.',
    href: '/careers#apply',
  },
  {
    id: '8',
    title: 'UI Engineer',
    department: 'Engineering',
    type: 'Contract',
    location: 'Remote',
    description: 'Implement accessible, motion-rich interfaces in React with design-system rigor.',
    href: '/careers#apply',
  },
];

export const careersCta = {
  title: "Don't see the right role?",
  description:
    "Send us your CV and tell us what you're great at. We'll reach out when a matching opportunity opens.",
  primary: { label: 'Send Your CV', href: '/contact' },
};
