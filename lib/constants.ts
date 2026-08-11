export const SITE = {
  name: 'Zamil Technologies',
  shortName: 'Zamil',
  tagline: 'Trusted Software Development Partner',
  description:
    'We help businesses worldwide build secure, scalable digital products that drive growth.',
  phone: '+1 (555) 010-1000',
  phoneHref: 'tel:+15550101000',
  email: 'hello@example.com',
  skype: 'demo.company',
  location: 'Demo City, Example Region',
  hours: 'Mon - Fri: 9:00 AM - 6:00 PM (UTC)',
  whatsapp: '+1 (555) 010-1001',
  /** Static copyright year — avoid `new Date()` during prerender. */
  copyrightYear: new Date().getFullYear(),
  social: {
    linkedin: 'https://example.com/social/linkedin',
    facebook: 'https://example.com/social/facebook',
    twitter: 'https://example.com/social/twitter',
    youtube: 'https://example.com/social/youtube',
    instagram: 'https://example.com/social/instagram',
  },
} as const;

export const HEADER_HEIGHT_CLASS = 'pt-[6.2rem]';
