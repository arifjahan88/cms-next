"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FilterPills({
  items,
  value,
  onChange,
  className,
}: {
  items: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => {
        const active = item === value;
        return (
          <Button
            key={item}
            type="button"
            size="sm"
            variant={active ? "default" : "outline"}
            className={cn(
              "h-9 rounded-full px-4",
              !active && "bg-background"
            )}
            onClick={() => onChange(item)}
          >
            {item}
          </Button>
        );
      })}
    </div>
  );
}
