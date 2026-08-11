import { SITE } from '@/lib/constants';
import type { FaqItem } from '@/types';

export const contactHero = {
  breadcrumb: [{ label: 'Home', href: '/' }, { label: 'Contact Us' }],
  title: "Let's Build Something Amazing",
  highlight: 'Together.',
  description:
    "Have a project in mind or need expert advice? We'd love to hear from you. Reach out to us and let's start a conversation.",
  features: [
    {
      title: 'Quick Response',
      description: 'We respond within 24 business hours.',
      icon: 'clock',
    },
    {
      title: 'Expert Consultation',
      description: 'Get advice from our industry experts.',
      icon: 'award',
    },
    {
      title: 'Secure & Confidential',
      description: 'We value your privacy and data security.',
      icon: 'shield',
    },
  ],
};

export const contactChannels = [
  {
    id: 'call',
    title: 'Call Us',
    description: SITE.phone,
    detail: SITE.hours,
    href: SITE.phoneHref,
    icon: 'phone',
  },
  {
    id: 'email',
    title: 'Email Us',
    description: SITE.email,
    detail: "We'll get back to you within 24 hours.",
    href: `mailto:${SITE.email}`,
    icon: 'mail',
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp',
    description: SITE.whatsapp,
    detail: 'Chat with us for quick assistance.',
    href: `https://wa.me/${SITE.whatsapp.replace(/\D/g, '')}`,
    icon: 'whatsapp',
  },
  {
    id: 'skype',
    title: 'Skype',
    description: SITE.skype,
    detail: 'Connect with us on Skype.',
    href: `skype:${SITE.skype}?chat`,
    icon: 'message',
  },
] as const;

export const followUs = {
  title: 'Follow Us',
  detail: 'Stay connected for latest updates.',
};

export const offices = [
  {
    id: 'head',
    country: 'Example Region A',
    label: 'Head Office',
    address: '100 Placeholder Ave, Demo City 10001, Example Region',
    phone: SITE.phone,
    email: SITE.email,
  },
  {
    id: 'office-b',
    country: 'Example Region B',
    label: 'Development Center',
    address: '200 Sample Street, Demo Town 20002, Example Region',
    phone: '+1 (555) 010-1002',
    email: 'office-b@example.com',
  },
  {
    id: 'office-c',
    country: 'Example Region C',
    label: 'Business Office',
    address: '300 Mock Boulevard, Demo City 30003, Example Region',
    phone: '+1 (555) 010-1003',
    email: 'office-c@example.com',
  },
  {
    id: 'office-d',
    country: 'Example Region D',
    label: 'Representative Office',
    address: '400 Fictional Road, Demo City 40004, Example Region',
    phone: '+1 (555) 010-1004',
    email: 'office-d@example.com',
  },
] as const;

export const contactFaqs: (FaqItem & { icon: string })[] = [
  {
    question: 'What services does Zamil Technologies offer?',
    answer:
      'We provide custom software, mobile apps, cloud & DevOps, UI/UX, and dedicated engineering teams.',
    icon: 'code',
  },
  {
    question: 'Can I schedule a meeting with your team?',
    answer:
      "Yes. Book a free consultation online or message us—we'll find a time that works for you.",
    icon: 'calendar',
  },
  {
    question: 'How long does it take to start a project?',
    answer: 'Most engagements kick off within 1–2 weeks after discovery, scoping, and agreement.',
    icon: 'clock',
  },
  {
    question: 'Do you work with international clients?',
    answer:
      'Absolutely. We partner with clients across APAC, EMEA, and North America from our global offices.',
    icon: 'globe',
  },
];
