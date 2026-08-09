export const consultationHero = {
  title: "Book Your Free Consultation",
  description:
    "Tell us about your product goals. We’ll map next steps, recommend an approach, and answer your questions—no obligation.",
  highlights: [
    { label: "30–60 min", detail: "Focused working session", icon: "clock" },
    { label: "Expert Advisors", detail: "Engineers & product leads", icon: "users" },
    { label: "100% Free", detail: "No sales pressure", icon: "check" },
  ],
};

export const whyBook = [
  "Clarify scope, timeline, and budget early",
  "Get architecture recommendations from practitioners",
  "Understand team model and engagement options",
  "Leave with a clear action plan for next steps",
];

export const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

export const services = [
  { value: "custom", label: "Custom Software" },
  { value: "mobile", label: "Mobile Apps" },
  { value: "cloud", label: "Cloud & DevOps" },
  { value: "ai", label: "AI Solutions" },
  { value: "uiux", label: "UI/UX Design" },
  { value: "other", label: "Other / Not sure" },
] as const;

export const budgets = [
  { value: "under-25", label: "Under $25k" },
  { value: "25-50", label: "$25k – $50k" },
  { value: "50-100", label: "$50k – $100k" },
  { value: "100+", label: "$100k+" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const trustItems = [
  { value: "250+", label: "Projects Delivered", icon: "briefcase" },
  { value: "25+", label: "Years Experience", icon: "award" },
  { value: "98%", label: "Client Satisfaction", icon: "smile" },
  { value: "4", label: "Global Offices", icon: "globe" },
] as const;
