"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  budgets,
  services,
} from "@/features/consultation/data/consultation";
import { consultationSchema } from "@/lib/validations/forms";

type InquiryFormProps = {
  selectedDate?: Date;
  selectedSlot?: string;
};

export function InquiryForm({ selectedDate, selectedSlot }: InquiryFormProps) {
  const [consent, setConsent] = useState(false);
  const [service, setService] = useState("custom");
  const [budget, setBudget] = useState("25-50");
  const [projectType, setProjectType] = useState<"new" | "existing" | "unsure">(
    "new"
  );

  return (
    <form
      className="rounded-2xl border bg-background p-5 shadow-sm md:p-6"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);

        const parsed = consultationSchema.safeParse({
          fullName: String(fd.get("fullName") ?? ""),
          email: String(fd.get("email") ?? ""),
          company: String(fd.get("company") ?? "") || undefined,
          phone: String(fd.get("phone") ?? ""),
          service,
          projectType,
          description: String(fd.get("description") ?? ""),
          budget: budget || undefined,
          referral: String(fd.get("referral") ?? "") || undefined,
          consent,
        });

        if (!parsed.success) {
          toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
          return;
        }

        const when = [
          selectedDate
            ? selectedDate.toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })
            : String(fd.get("preferredDate") ?? ""),
          selectedSlot || String(fd.get("preferredTime") ?? ""),
        ]
          .filter(Boolean)
          .join(" · ");

        toast.success(
          when
            ? `Consultation requested for ${when}. We'll confirm shortly.`
            : "Consultation request received! We'll confirm shortly."
        );
        form.reset();
        setConsent(false);
        setService("custom");
        setBudget("25-50");
        setProjectType("new");
      }}
    >
      <h3 className="text-lg font-semibold">Project Inquiry</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Share a bit about your project so we can prepare for the call.
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
          <Input id="phone" name="phone" required className="h-10" />
        </div>
        <div className="space-y-1.5">
          <Label>Service Needed</Label>
          <Select
            name="service"
            value={service}
            onValueChange={(v) => setService(v ?? "custom")}
          >
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder="Select service" />
            </SelectTrigger>
            <SelectContent>
              {services.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Budget Range</Label>
          <Select
            name="budget"
            value={budget}
            onValueChange={(v) => setBudget(v ?? "25-50")}
          >
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder="Select budget" />
            </SelectTrigger>
            <SelectContent>
              {budgets.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label>Project Type</Label>
          <RadioGroup
            value={projectType}
            onValueChange={(v) =>
              setProjectType((v as "new" | "existing" | "unsure") ?? "new")
            }
            className="grid gap-2 sm:grid-cols-3"
          >
            {[
              { value: "new", label: "New product" },
              { value: "existing", label: "Existing product" },
              { value: "unsure", label: "Not sure yet" },
            ].map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-sm has-data-checked:border-primary has-data-checked:bg-primary/5"
              >
                <RadioGroupItem value={option.value} />
                {option.label}
              </label>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="description">Project Description</Label>
          <Textarea id="description" name="description" rows={4} required />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="preferredDate">Preferred Date</Label>
          <Input
            id="preferredDate"
            name="preferredDate"
            type="date"
            className="h-10"
            defaultValue={
              selectedDate
                ? [
                    selectedDate.getFullYear(),
                    String(selectedDate.getMonth() + 1).padStart(2, "0"),
                    String(selectedDate.getDate()).padStart(2, "0"),
                  ].join("-")
                : undefined
            }
            key={
              selectedDate
                ? `${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${selectedDate.getDate()}`
                : "date-empty"
            }
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="preferredTime">Preferred Time</Label>
          <Input
            id="preferredTime"
            name="preferredTime"
            type="text"
            placeholder="e.g. 10:00 AM ICT"
            className="h-10"
            defaultValue={selectedSlot}
            key={selectedSlot ?? "time-empty"}
          />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="referral">How did you hear about us?</Label>
          <Input id="referral" name="referral" className="h-10" />
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
          I agree to be contacted about this consultation and related project
          discussions.
        </span>
      </label>

      <Button type="submit" className="mt-5 h-11 w-full">
        Request Free Consultation
      </Button>
    </form>
  );
}
