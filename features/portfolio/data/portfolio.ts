import type { PortfolioItem, StatItem } from '@/types';

export const portfolioFilters = [
  'All Projects',
  'Healthcare',
  'FinTech',
  'Real Estate',
  'E-commerce',
  'Education',
  'Logistics',
  'Manufacturing',
] as const;

export const portfolioSortOptions = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'az', label: 'A-Z' },
] as const;

export const portfolioHero = {
  title: 'Our Work.',
  highlight: 'Real Solutions. Real Impact.',
  description:
    'Explore a selection of our successful projects delivered for startups, enterprises, and industry leaders across the globe.',
  stats: [
    { value: '250+', label: 'Projects Delivered', icon: 'briefcase' },
    { value: '18+', label: 'Industries Served', icon: 'users' },
    { value: '98%', label: 'Client Satisfaction', icon: 'globe' },
    { value: '25+', label: 'Countries Reached', icon: 'award' },
  ] satisfies StatItem[],
};

export const portfolioProjects: PortfolioItem[] = [
  {
    id: '1',
    title: 'MediCare+ Hospital Management System',
    description:
      'A comprehensive hospital management solution with EHR, appointment scheduling, billing & reporting.',
    category: 'Healthcare',
    image: '/images/case-healthcare.svg',
    href: '/case-studies',
    date: '2025-11-12',
  },
  {
    id: '2',
    title: 'FinSmart Digital Banking Platform',
    description:
      'Secure digital banking platform with payments, money transfer, loan management & analytics.',
    category: 'FinTech',
    image: '/images/case-fintech.svg',
    href: '/case-studies',
    date: '2025-09-03',
  },
  {
    id: '3',
    title: 'HabiPro Property Management System',
    description:
      'End-to-end property management solution with tenant portal, maintenance tracking & payment.',
    category: 'Real Estate',
    image: '/images/case-realestate.svg',
    href: '/case-studies',
    date: '2025-07-21',
  },
  {
    id: '4',
    title: 'ShopHub E-commerce Platform',
    description:
      'Scalable e-commerce platform with multi-vendor, inventory management & analytics.',
    category: 'E-commerce',
    image: '/images/case-marketplace.svg',
    href: '/case-studies',
    date: '2025-05-18',
  },
  {
    id: '5',
    title: 'EduLearn Online Learning Platform',
    description:
      'E-learning platform with interactive courses, live classes, quizzes & certificate management.',
    category: 'Education',
    image: '/images/case-education.svg',
    href: '/case-studies',
    date: '2025-03-09',
  },
  {
    id: '6',
    title: 'LogiTrack Fleet Management System',
    description: 'Real-time fleet tracking, route optimization, driver management & reports.',
    category: 'Logistics',
    image: '/images/case-logistics.svg',
    href: '/case-studies',
    date: '2024-12-14',
  },
  {
    id: '7',
    title: 'ManuPro Production Management System',
    description: 'Production planning, quality control, inventory & supply chain management.',
    category: 'Manufacturing',
    image: '/images/case-manufacturing.svg',
    href: '/case-studies',
    date: '2024-10-02',
  },
  {
    id: '8',
    title: 'RetailGO POS & Inventory System',
    description:
      'POS & inventory management system with sales analytics, multi-store & CRM integration.',
    category: 'E-commerce',
    image: '/images/case-retail.svg',
    href: '/case-studies',
    date: '2024-08-27',
  },
  {
    id: '9',
    title: 'TripGenie Travel Booking Platform',
    description:
      'Travel booking platform with hotel, flight, tour packages & itinerary management.',
    category: 'Logistics',
    image: '/images/case-travel.svg',
    href: '/case-studies',
    date: '2024-06-11',
  },
];

export const portfolioCtaFeatures = [
  { title: 'Dedicated Team', description: '', icon: 'users' },
  { title: 'On-time Delivery', description: '', icon: 'clock' },
  { title: 'Secure & Scalable', description: '', icon: 'shield' },
  { title: 'Transparent Process', description: '', icon: 'eye' },
];
