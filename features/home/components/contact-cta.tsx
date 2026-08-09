"use client";

import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Container } from "@/components/shared/container";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { SITE } from "@/lib/constants";
import { FadeIn } from "@/components/shared/motion/fade-in";

const benefits = [
  "Free discovery consultation",
  "NDA available on request",
  "Response within 24 business hours",
  "Dedicated project specialists",
];

export function ContactCta() {
  return (
    <section className="bg-brand-navy py-16 text-brand-navy-foreground md:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.2fr_0.8fr]">
          <FadeIn>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Ready to Build Your Next Digital Product?
            </h2>
            <p className="mt-3 text-sm text-white/70">
              Tell us about your goals—we&apos;ll help you shape the roadmap and
              assemble the right team.
            </p>
            <ul className="mt-6 space-y-2.5">
              {benefits.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="text-white/85">{item}</span>
                </li>
              ))}
            </ul>
            <ImagePlaceholder
              label="[Project Planning Illustration]"
              className="mt-6 min-h-[160px] border-white/20 bg-white/5 text-white/70"
            />
          </FadeIn>

          <FadeIn delay={0.1}>
            <form
              className="rounded-2xl bg-white p-5 text-foreground shadow-xl md:p-6"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Request received! We'll be in touch shortly.");
                (e.target as HTMLFormElement).reset();
              }}
            >
              <h3 className="mb-4 text-lg font-semibold">
                Tell us about your project
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" name="company" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" />
                </div>
                <div className="space-y-1.5">
                  <Label>Service</Label>
                  <Select name="service" defaultValue="custom">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="custom">Custom Software</SelectItem>
                      <SelectItem value="mobile">Mobile Apps</SelectItem>
                      <SelectItem value="cloud">Cloud & DevOps</SelectItem>
                      <SelectItem value="ai">AI Solutions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Budget</Label>
                  <Select name="budget" defaultValue="25-50">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10-25">$10k – $25k</SelectItem>
                      <SelectItem value="25-50">$25k – $50k</SelectItem>
                      <SelectItem value="50-100">$50k – $100k</SelectItem>
                      <SelectItem value="100+">$100k+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Country</Label>
                  <Select name="country" defaultValue="us">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="bd">Bangladesh</SelectItem>
                      <SelectItem value="ae">United Arab Emirates</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Timeline</Label>
                  <Select name="timeline" defaultValue="1-3">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">ASAP</SelectItem>
                      <SelectItem value="1-3">1–3 months</SelectItem>
                      <SelectItem value="3-6">3–6 months</SelectItem>
                      <SelectItem value="6+">6+ months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={4}
                    required
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="attachment">Attachment</Label>
                  <label
                    htmlFor="attachment"
                    className="flex h-10 cursor-pointer items-center gap-3 rounded-lg border border-input bg-background px-3 text-sm text-muted-foreground transition hover:bg-muted/40"
                  >
                    <span className="rounded-md border bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
                      Choose File
                    </span>
                    <span>No file chosen</span>
                    <input
                      id="attachment"
                      name="attachment"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>
              <Button type="submit" className="mt-4 w-full">
                Submit Request
              </Button>
            </form>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Get in Touch</h3>
              <ul className="space-y-3 text-sm text-white/80">
                <li>
                  <span className="block text-xs uppercase tracking-wide text-white/50">
                    Phone
                  </span>
                  {SITE.phone}
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-wide text-white/50">
                    Email
                  </span>
                  {SITE.email}
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-wide text-white/50">
                    Skype
                  </span>
                  {SITE.skype}
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-wide text-white/50">
                    Location
                  </span>
                  {SITE.location}
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-wide text-white/50">
                    Availability
                  </span>
                  {SITE.hours}
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
