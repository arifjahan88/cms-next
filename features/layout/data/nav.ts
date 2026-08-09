import type { NavItem } from "@/types";

/** Desktop overflow nav — Contact Us is CTA only, not listed here */
export const mainNav: NavItem[] = [
  {
    title: "Services",
    href: "/services",
    children: [
      {
        title: "Custom Software",
        href: "/services#custom-software",
        description: "Tailored applications for your business",
      },
      {
        title: "Mobile Apps",
        href: "/services#mobile",
        description: "iOS & Android product development",
      },
      {
        title: "Cloud & DevOps",
        href: "/services#cloud",
        description: "Scalable infrastructure and CI/CD",
      },
    ],
  },
  // {
  //   title: "Solutions",
  //   href: "/services",
  //   children: [
  //     {
  //       title: "Enterprise Solutions",
  //       href: "/services#enterprise",
  //     },
  //     { title: "SaaS Products", href: "/services#saas" },
  //     { title: "Digital Transformation", href: "/services#digital" },
  //   ],
  // },
  { title: "Industries", href: "/industries" },
  { title: "Technologies", href: "/technologies" },
  { title: "Portfolio", href: "/portfolio" },
  { title: "Case Studies", href: "/case-studies" },
  { title: "Blog", href: "/blog" },
  { title: "About Us", href: "/about" },
  { title: "Careers", href: "/careers" },
];

export const footerLinks = {
  services: [
    { title: "Custom Software", href: "/services" },
    { title: "Mobile Development", href: "/services" },
    { title: "UI/UX Design", href: "/services" },
    { title: "QA & Testing", href: "/services" },
    { title: "DevOps", href: "/services" },
  ],
  solutions: [
    { title: "Enterprise Apps", href: "/services" },
    { title: "SaaS Platforms", href: "/services" },
    { title: "AI Solutions", href: "/technologies" },
    { title: "Cloud Migration", href: "/technologies" },
  ],
  industries: [
    { title: "Healthcare", href: "/industries" },
    { title: "FinTech", href: "/industries" },
    { title: "Real Estate", href: "/industries" },
    { title: "E-commerce", href: "/industries" },
    { title: "Education", href: "/industries" },
  ],
  company: [
    { title: "About Us", href: "/about" },
    { title: "Our Team", href: "/about" },
    { title: "Careers", href: "/careers" },
    { title: "Contact", href: "/contact" },
  ],
  resources: [
    { title: "Blog", href: "/blog" },
    { title: "Case Studies", href: "/case-studies" },
    { title: "Portfolio", href: "/portfolio" },
    { title: "FAQs", href: "/contact" },
  ],
};
