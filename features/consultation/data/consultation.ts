export const consultationHero = {
  breadcrumb: [{ label: 'Home', href: '/' }, { label: 'Book Consultation' }],
  title: 'Book Your Free Consultation',
  description:
    "Schedule a free session with our experts. We'll discuss your goals, recommend an approach, and outline clear next steps—no obligation.",
  highlights: [
    {
      label: '30-60 Minutes',
      detail: 'Personalized Session',
      icon: 'clock',
    },
    {
      label: 'Expert Consultation',
      detail: 'From our industry experts',
      icon: 'users',
    },
    {
      label: '100% Free',
      detail: 'No obligations',
      icon: 'check',
    },
  ],
};

export const inquiryFormCopy = {
  title: 'Tell us about your project',
  description: "Share a few details and we'll get back to you within 24 hours.",
  privacy: 'I agree to the privacy policy and consent to being contacted about this consultation.',
  submit: 'Book My Free Consultation',
  secureNote: 'Your information is secure and will never be shared with third parties.',
};

export const whyBook = [
  'Clarify scope, timeline, and budget early',
  'Get architecture recommendations from practitioners',
  'Understand team model and engagement options',
  'Identify risks and technical constraints up front',
  'Leave with a clear action plan for next steps',
];

export const timeSlots = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
];

export const services = [
  { value: 'custom', label: 'Custom Software Development' },
  { value: 'mobile', label: 'Mobile App Development' },
  { value: 'cloud', label: 'Cloud & DevOps' },
  { value: 'ai', label: 'AI Solutions' },
  { value: 'uiux', label: 'UI/UX Design' },
  { value: 'qa', label: 'QA & Testing' },
  { value: 'other', label: 'Other / Not sure' },
] as const;

export const projectTypes = [
  { value: 'new', label: 'New Project' },
  { value: 'existing', label: 'Existing Project' },
  { value: 'unsure', label: 'Not Sure Yet' },
] as const;

export const budgets = [
  { value: 'under-25', label: 'Under $25k' },
  { value: '25-50', label: '$25k – $50k' },
  { value: '50-100', label: '$50k – $100k' },
  { value: '100-250', label: '$100k – $250k' },
  { value: '250+', label: '$250k+' },
  { value: 'unsure', label: 'Not sure yet' },
] as const;

export const referralSources = [
  { value: 'google', label: 'Google Search' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'referral', label: 'Referral / Word of mouth' },
  { value: 'event', label: 'Event / Conference' },
  { value: 'social', label: 'Social Media' },
  { value: 'other', label: 'Other' },
] as const;

export const trustItems = [
  {
    title: 'Quick Response',
    description: 'We reply within 24 hours',
    icon: 'zap',
  },
  {
    title: 'Expert Team',
    description: 'Seasoned engineers & advisors',
    icon: 'users',
  },
  {
    title: 'Global Experience',
    description: 'Clients across 20+ countries',
    icon: 'globe',
  },
  {
    title: 'Trusted by Businesses',
    description: '250+ projects delivered',
    icon: 'handshake',
  },
] as const;

export const sidebarHelp = {
  title: 'Need help choosing a time?',
  description: 'Our team is happy to find a slot that works for you. Reach out anytime.',
};
