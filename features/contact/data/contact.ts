import { SITE } from "@/lib/constants";
import type { FaqItem } from "@/types";

export const contactHero = {
  title: "Let's Build Something",
  highlight: "Amazing Together.",
  description:
    "Whether you need a discovery call, a project estimate, or partnership details—our team is ready to help.",
  trustBadges: [
    "Free consultation",
    "NDA on request",
    "24h response time",
    "Global delivery",
  ],
};

export const contactChannels = [
  {
    id: "call",
    title: "Call Us",
    description: SITE.phone,
    detail: SITE.hours,
    href: SITE.phoneHref,
    icon: "phone",
  },
  {
    id: "email",
    title: "Email Us",
    description: SITE.email,
    detail: "We reply within one business day",
    href: `mailto:${SITE.email}`,
    icon: "mail",
  },
  {
    id: "whatsapp",
    title: "WhatsApp",
    description: SITE.whatsapp,
    detail: "Chat with our team anytime",
    href: `https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`,
    icon: "whatsapp",
  },
  {
    id: "skype",
    title: "Skype",
    description: SITE.skype,
    detail: "Schedule a live conversation",
    href: `skype:${SITE.skype}?chat`,
    icon: "message",
  },
] as const;

export const offices = [
  {
    id: "thailand",
    country: "Thailand",
    label: "Headquarters",
    address: "88 Wireless Road, Lumpini, Pathumwan, Bangkok 10330",
    phone: "+66 2 123 4567",
    email: "thailand@zaimah.tech",
  },
  {
    id: "bangladesh",
    country: "Bangladesh",
    label: "Delivery Center",
    address: "Level 8, Gulshan Avenue, Dhaka 1212",
    phone: "+880 2 987 6543",
    email: "bangladesh@zaimah.tech",
  },
  {
    id: "malaysia",
    country: "Malaysia",
    label: "Regional Office",
    address: "Menara Exchange 106, Tun Razak Exchange, Kuala Lumpur",
    phone: "+60 3 2123 4567",
    email: "malaysia@zaimah.tech",
  },
  {
    id: "uae",
    country: "United Arab Emirates",
    label: "Business Hub",
    address: "DIFC Gate Avenue, Dubai",
    phone: "+971 4 123 4567",
    email: "uae@zaimah.tech",
  },
] as const;

export const contactFaqs: (FaqItem & { icon: string })[] = [
  {
    question: "How quickly will you respond?",
    answer:
      "We typically reply within one business day. Urgent inquiries via WhatsApp often get a same-day response.",
    icon: "clock",
  },
  {
    question: "Do you sign NDAs?",
    answer:
      "Yes. We can execute a mutual NDA before detailed discovery or any sensitive materials are shared.",
    icon: "lock",
  },
  {
    question: "Can we start with a small pilot?",
    answer:
      "Absolutely. Many clients begin with a discovery sprint or MVP engagement before scaling the team.",
    icon: "rocket",
  },
  {
    question: "Which time zones do you support?",
    answer:
      "Our teams across Thailand, Bangladesh, Malaysia, and the UAE cover APAC, EMEA, and overlapping US hours.",
    icon: "globe",
  },
];
