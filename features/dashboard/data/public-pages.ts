import { SITE } from '@/lib/constants';

export const PUBLIC_PAGES = [
  {
    slug: 'home',
    label: 'Landing Page',
    path: '/',
    defaultTitle: `${SITE.name} | Software Development Partner`,
    defaultDescription: SITE.description,
  },
  {
    slug: 'about',
    label: 'About Us',
    path: '/about',
    defaultTitle: 'About Us',
    defaultDescription:
      'Learn about Zamil Technologies—our mission, values, leadership, and 25+ years of software delivery experience.',
  },
  {
    slug: 'services',
    label: 'Services',
    path: '/services',
    defaultTitle: 'Services',
    defaultDescription:
      'Custom software, mobile apps, cloud & DevOps, UI/UX, and dedicated engineering teams from Zamil Technologies.',
  },
  {
    slug: 'industries',
    label: 'Industries',
    path: '/industries',
    defaultTitle: 'Industries',
    defaultDescription:
      'Software solutions for Healthcare, FinTech, Real Estate, E-commerce, Education, Logistics, and more.',
  },
  {
    slug: 'technologies',
    label: 'Technologies',
    path: '/technologies',
    defaultTitle: 'Technologies',
    defaultDescription:
      'Modern stacks and cloud platforms we use to build secure, scalable digital products.',
  },
  {
    slug: 'careers',
    label: 'Careers',
    path: '/careers',
    defaultTitle: 'Careers',
    defaultDescription:
      'Join Zamil Technologies—build your career with a global engineering team shipping products worldwide.',
  },
  {
    slug: 'portfolio',
    label: 'Portfolio',
    path: '/portfolio',
    defaultTitle: 'Portfolio',
    defaultDescription:
      'Explore successful software projects delivered for startups, enterprises, and industry leaders.',
  },
  {
    slug: 'blog',
    label: 'Blog',
    path: '/blog',
    defaultTitle: 'Blog',
    defaultDescription:
      'Insights, ideas, and impact from Zamil Technologies—software, product, and industry perspectives.',
  },
  {
    slug: 'case-studies',
    label: 'Case Studies',
    path: '/case-studies',
    defaultTitle: 'Case Studies',
    defaultDescription:
      'Real challenges and proven results—how we help teams solve complex problems with software.',
  },
  {
    slug: 'contact',
    label: 'Contact',
    path: '/contact',
    defaultTitle: 'Contact Us',
    defaultDescription:
      'Get in touch with Zamil Technologies—book a consultation or send us a message about your project.',
  },
  {
    slug: 'book-consultation',
    label: 'Book Consultation',
    path: '/book-consultation',
    defaultTitle: 'Book Free Consultation',
    defaultDescription:
      'Schedule a free session with our experts to discuss your goals and outline clear next steps.',
  },
] as const;

export type PageSlug = (typeof PUBLIC_PAGES)[number]['slug'];

export const PAGE_SLUGS = PUBLIC_PAGES.map((p) => p.slug);

export function getPublicPage(slug: PageSlug) {
  return PUBLIC_PAGES.find((p) => p.slug === slug);
}
