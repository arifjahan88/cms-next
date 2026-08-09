import { cn } from "@/lib/utils";

export function ImagePlaceholder({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex size-full min-h-[120px] items-center justify-center rounded-xl border border-dashed border-primary/25 bg-primary/5 px-4 text-center",
        className
      )}
      role="img"
      aria-label={label}
    >
      <span className="max-w-[90%] text-xs font-medium leading-relaxed text-muted-foreground sm:text-sm">
        {label}
      </span>
    </div>
  );
}
