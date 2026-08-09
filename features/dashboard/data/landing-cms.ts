export const landingSections = [
  { id: "hero", title: "Hero Section", status: "Published", icon: "layout" },
  { id: "trusted", title: "Trusted By", status: "Published", icon: "users" },
  { id: "about", title: "About Us", status: "Published", icon: "info" },
  { id: "services", title: "Services", status: "Published", icon: "briefcase" },
  { id: "industries", title: "Industries", status: "Published", icon: "building" },
  { id: "cases", title: "Case Studies", status: "Draft", icon: "folder" },
  { id: "testimonials", title: "Testimonials", status: "Published", icon: "message" },
  { id: "cta", title: "Contact CTA", status: "Published", icon: "mail" },
] as const;

export const heroSectionForm = {
  sectionTitle: "Trusted Software Development Partner",
  mainHeading: "Build Digital Products That Drive Business Growth",
  description:
    "We help startups and enterprises design, build, and scale secure software with senior engineering teams.",
  primaryButton: {
    text: "Book Free Consultation",
    url: "/book-consultation",
    newTab: false,
  },
  secondaryButton: {
    text: "View Our Work",
    url: "/portfolio",
    newTab: false,
  },
  background: {
    name: "hero-bg.webp",
    size: "1920 × 1080",
  },
};

export const landingApiSample = `{
  "section": "hero",
  "status": "published",
  "content": {
    "eyebrow": "Trusted Software Development Partner",
    "title": "Build Digital Products That Drive Business Growth",
    "description": "We help startups and enterprises design, build, and scale secure software.",
    "primaryCta": {
      "label": "Book Free Consultation",
      "href": "/book-consultation"
    },
    "secondaryCta": {
      "label": "View Our Work",
      "href": "/portfolio"
    }
  }
}`;

export const landingApiCurl = `curl -X GET \\
  'https://api.zaimahtech.com/v1/pages/landing/hero' \\
  -H 'Authorization: Bearer YOUR_API_KEY'`;
