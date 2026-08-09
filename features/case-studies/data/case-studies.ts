import type { CaseStudyItem, StatItem } from '@/types';

export const caseStudyFilters = [
  'All Case Studies',
  'Healthcare',
  'FinTech',
  'Real Estate',
  'E-commerce',
  'Education',
  'Logistics',
  'Manufacturing',
] as const;

export const caseStudySortOptions = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'az', label: 'A-Z' },
] as const;

export const caseStudiesHero = {
  title: 'Real Challenges.',
  highlight: 'Proven Results.',
  description:
    'We partner with ambitious teams to solve complex problems and deliver digital products that drive measurable growth.',
  impact: {
    title: 'Delivering Impact',
    description:
      'From operational efficiency to market growth—our case studies show how software creates lasting business value.',
  },
};

export type CaseStudyDetail = CaseStudyItem & {
  date: string;
};

export const caseStudies: CaseStudyDetail[] = [
  {
    id: '1',
    title: 'MediCare+ Hospital Management System',
    description:
      'A multi-hospital platform that unified clinical, administrative, and billing workflows.',
    category: 'Healthcare',
    image: '/images/case-healthcare.svg',
    href: '/case-studies',
    date: '2025-11-12',
    challenge: 'Manual processes, data silos and inefficient workflows.',
    solution:
      'Built an integrated platform to streamline clinical, admin, and financial operations.',
    techStack: ['Laravel', 'React', 'MySQL', 'AWS', 'Docker', 'Redis'],
    metrics: [
      { value: '65%', label: 'Increase in Operational Efficiency' },
      { value: '40%', label: 'Admin Workload Reduction' },
      { value: '98%', label: 'Patient Satisfaction' },
    ],
  },
  {
    id: '2',
    title: 'FinSmart Digital Banking Platform',
    description: 'Secure multi-currency payments and KYC onboarding for a regional fintech.',
    category: 'FinTech',
    image: '/images/case-fintech.svg',
    href: '/case-studies',
    date: '2025-09-03',
    challenge: 'Providing a secure, scalable platform while ensuring compliance.',
    solution: 'Developed a robust platform with advanced security and real-time transactions.',
    techStack: ['Node.js', 'React', 'PostgreSQL', 'AWS', 'Kubernetes', 'Firebase'],
    metrics: [
      { value: '150K+', label: 'Active Users' },
      { value: '3.5M+', label: 'Transactions' },
      { value: '99.99%', label: 'Uptime' },
    ],
  },
  {
    id: '3',
    title: 'HabiPro Property Management System',
    description: 'End-to-end property and tenant management with payments and maintenance.',
    category: 'Real Estate',
    image: '/images/case-realestate.svg',
    href: '/case-studies',
    date: '2025-07-21',
    challenge: 'Time-consuming manual tracking and poor tenant communication.',
    solution: 'Delivered a centralized platform for properties, tenants, and maintenance.',
    techStack: ['Next.js', 'React', 'MongoDB', 'AWS', 'Flutter', 'Firebase'],
    metrics: [
      { value: '50%', label: 'Faster Maintenance' },
      { value: '35%', label: 'Increase in On-time Payments' },
      { value: '90%', label: 'Tenant Retention' },
    ],
  },
  {
    id: '4',
    title: 'ShopHub E-commerce Platform',
    description: 'Scalable multi-vendor commerce with real-time analytics and inventory.',
    category: 'E-commerce',
    image: '/images/case-marketplace.svg',
    href: '/case-studies',
    date: '2025-05-18',
    challenge: 'Scaling the platform and managing multiple vendors.',
    solution: 'Built a scalable multi-vendor solution with real-time analytics.',
    techStack: ['React', 'Laravel', 'MySQL', 'AWS', 'Redis', 'Docker'],
    metrics: [
      { value: '200%', label: 'Increase in Sales' },
      { value: '120+', label: 'Active Vendors' },
      { value: '4.8/5', label: 'Customer Rating' },
    ],
  },
];

export const caseStudiesStats: StatItem[] = [
  { value: '250+', label: 'Projects Delivered', icon: 'briefcase' },
  { value: '18+', label: 'Industries Served', icon: 'layers' },
  { value: '98%', label: 'Client Satisfaction', icon: 'smile' },
  { value: '25+', label: 'Countries Reached', icon: 'globe' },
];
