import { SITE } from "@/lib/constants";
import type { FaqItem } from "@/types";

export const contactHero = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Contact Us" },
  ],
  title: "Let's Build Something Amazing",
  highlight: "Together.",
  description:
    "Have a project in mind or need expert advice? We'd love to hear from you. Reach out to us and let's start a conversation.",
  features: [
    {
      title: "Quick Response",
      description: "We respond within 24 business hours.",
      icon: "clock",
    },
    {
      title: "Expert Consultation",
      description: "Get advice from our industry experts.",
      icon: "award",
    },
    {
      title: "Secure & Confidential",
      description: "We value your privacy and data security.",
      icon: "shield",
    },
  ],
};

export const contactChannels = [
  {
    id: "call",
    title: "Call Us",
    description: SITE.phone,
    detail: "Mon - Fri, 9:00 AM - 6:00 PM (ICT)",
    href: SITE.phoneHref,
    icon: "phone",
  },
  {
    id: "email",
    title: "Email Us",
    description: SITE.email,
    detail: "We'll get back to you within 24 hours.",
    href: `mailto:${SITE.email}`,
    icon: "mail",
  },
  {
    id: "whatsapp",
    title: "WhatsApp",
    description: SITE.whatsapp,
    detail: "Chat with us for quick assistance.",
    href: `https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`,
    icon: "whatsapp",
  },
  {
    id: "skype",
    title: "Skype",
    description: SITE.skype,
    detail: "Connect with us on Skype.",
    href: `skype:${SITE.skype}?chat`,
    icon: "message",
  },
] as const;

export const followUs = {
  title: "Follow Us",
  detail: "Stay connected for latest updates.",
};

export const offices = [
  {
    id: "thailand",
    country: "Thailand",
    label: "Head Office",
    address:
      "2/123 Sukhumvit 42, Phra Khanong, Khlong Toei, Bangkok 10110, Thailand",
    phone: SITE.phone,
    email: SITE.email,
  },
  {
    id: "bangladesh",
    country: "Bangladesh",
    label: "Development Center",
    address: "House-21, Road-10, Sector-4, Uttara, Dhaka-1230, Bangladesh",
    phone: "+880 2 987 6543",
    email: "bangladesh@zaimahtech.com",
  },
  {
    id: "malaysia",
    country: "Malaysia",
    label: "Business Office",
    address:
      "Level 16, Menara 1 Sentrum, 201 Jalan Tun Sambanthan, 50470 Kuala Lumpur",
    phone: "+60 3 2123 4567",
    email: "malaysia@zaimahtech.com",
  },
  {
    id: "uae",
    country: "United Arab Emirates",
    label: "Representative Office",
    address: "Business Bay, Dubai, United Arab Emirates",
    phone: "+971 4 123 4567",
    email: "uae@zaimahtech.com",
  },
] as const;

export const contactFaqs: (FaqItem & { icon: string })[] = [
  {
    question: "What services does Zaimah Technologies offer?",
    answer:
      "We provide custom software, mobile apps, cloud & DevOps, UI/UX, and dedicated engineering teams.",
    icon: "code",
  },
  {
    question: "Can I schedule a meeting with your team?",
    answer:
      "Yes. Book a free consultation online or message us—we'll find a time that works for you.",
    icon: "calendar",
  },
  {
    question: "How long does it take to start a project?",
    answer:
      "Most engagements kick off within 1–2 weeks after discovery, scoping, and agreement.",
    icon: "clock",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Absolutely. We partner with clients across APAC, EMEA, and North America from our global offices.",
    icon: "globe",
  },
];
