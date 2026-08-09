import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { offices } from "@/features/contact/data/contact";

export function OfficesMap() {
  return (
    <div className="space-y-5">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border bg-muted shadow-sm">
        <ImagePlaceholder
          label="[Interactive Map Image]"
          className="absolute inset-0 rounded-xl"
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-brand-navy/50 to-transparent p-4">
          <p className="text-sm font-medium text-white">
            Global offices across APAC & the Middle East
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold">Our Offices</h3>
        <ul className="mt-4 space-y-4">
          {offices.map((office) => (
            <li
              key={office.id}
              className="rounded-xl border bg-background p-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
                  <ImagePlaceholder
                    label="[Office Photo]"
                    className="absolute inset-0 min-h-0 rounded-lg text-[10px]"
                  />
                </div>
                <div>
                  <p className="font-semibold">
                    {office.country}{" "}
                    <span className="text-xs font-medium text-primary">
                      · {office.label}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {office.address}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {office.phone} · {office.email}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
