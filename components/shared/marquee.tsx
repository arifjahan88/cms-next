import { cn } from "@/lib/utils";

export function Marquee({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        <div className="flex items-center gap-10">{children}</div>
        <div className="flex items-center gap-10" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
