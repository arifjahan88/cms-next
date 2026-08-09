"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import type { LandingMedia } from "@/features/dashboard/data/landing-cms";

export function MediaField({
  label = "Media",
  value,
  onChange,
}: {
  label?: string;
  value: LandingMedia;
  onChange: (next: LandingMedia) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-3 rounded-lg border p-3">
        <ImagePlaceholder
          label={value.label}
          className="size-14 shrink-0 rounded-md"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{value.name}</p>
          <p className="text-xs text-muted-foreground">{value.size}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            toast.message("Change media (demo)");
            onChange({
              ...value,
              name: `updated-${value.name}`,
            });
          }}
        >
          Change
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive"
          onClick={() => {
            toast.message("Media cleared (demo)");
            onChange({
              name: "",
              size: "",
              label: "[No media]",
            });
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
