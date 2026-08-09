"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LandingContent } from "@/features/dashboard/data/landing-cms";
import { RepeatableList } from "@/features/dashboard/components/landing-cms/shared/repeatable-list";

type TrustedBy = LandingContent["trustedBy"];

export function TrustedByEditor({
  value,
  onChange,
}: {
  value: TrustedBy;
  onChange: (next: TrustedBy) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label>Section Title</Label>
        <Input
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
        />
      </div>
      <RepeatableList
        title="Brands"
        items={value.brands}
        onChange={(brands) => onChange({ ...value, brands })}
        createItem={() => ({ name: "New Brand", logo: "/logos/trusted/new.svg" })}
        renderItem={(item, _i, update) => (
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Name</Label>
              <Input
                value={item.name}
                onChange={(e) => update({ name: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Logo path</Label>
              <Input
                value={item.logo}
                onChange={(e) => update({ logo: e.target.value })}
              />
            </div>
          </div>
        )}
      />
    </div>
  );
}
