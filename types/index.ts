export type NavItem = {
  title: string;
  href: string;
  children?: { title: string; href: string; description?: string }[];
};

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
};

export type IndustryItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  color?: string;
};

export type CaseStudyItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  href: string;
  techStack: string[];
  challenge?: string;
  solution?: string;
  metrics?: { value: string; label: string }[];
};

export type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  href: string;
  date: string;
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  href: string;
  author?: string;
  featured?: boolean;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
};

export type JobOpening = {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  description: string;
  href: string;
};

export type StatItem = {
  value: string;
  label: string;
  icon?: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image: string;
  linkedin?: string;
  email?: string;
  featured?: boolean;
};
