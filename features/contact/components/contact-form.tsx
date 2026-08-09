"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema } from "@/lib/validations/forms";

export function ContactForm() {
  const [consent, setConsent] = useState(false);

  return (
    <form
      className="rounded-2xl border bg-background p-5 shadow-sm md:p-6"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        const parsed = contactSchema.safeParse({
          fullName: String(fd.get("fullName") ?? ""),
          email: String(fd.get("email") ?? ""),
          company: String(fd.get("company") ?? "") || undefined,
          phone: String(fd.get("phone") ?? "") || undefined,
          subject: String(fd.get("subject") ?? ""),
          message: String(fd.get("message") ?? ""),
          consent,
        });

        if (!parsed.success) {
          toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
          return;
        }

        toast.success("Message sent! We'll get back to you shortly.");
        form.reset();
        setConsent(false);
      }}
    >
      <h3 className="text-lg font-semibold">Send Us a Message</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Share a few details and we&apos;ll follow up within one business day.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" name="fullName" required className="h-10" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="h-10"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="company">Company</Label>
          <Input id="company" name="company" className="h-10" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" className="h-10" />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" name="subject" required className="h-10" />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" rows={5} required />
        </div>
      </div>

      <label className="mt-4 flex items-start gap-2.5 text-sm text-muted-foreground">
        <Checkbox
          checked={consent}
          onCheckedChange={(checked) => setConsent(checked === true)}
          className="mt-0.5"
          name="consent"
        />
        <span>
          I agree to the processing of my personal data for the purpose of
          responding to this inquiry.
        </span>
      </label>

      <Button type="submit" className="mt-5 h-11 w-full">
        Send Message
      </Button>
    </form>
  );
}
