import { cn } from "@/lib/utils";

export function TechIcon({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex size-12 flex-col items-center justify-center rounded-xl border bg-background text-center shadow-sm",
        className
      )}
      title={label}
    >
      <span className="text-[10px] font-semibold leading-tight text-foreground">
        {label.slice(0, 6)}
      </span>
    </div>
  );
}
