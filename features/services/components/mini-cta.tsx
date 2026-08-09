import { CtaBanner } from "@/components/shared/cta-banner";
import { servicesMiniCta } from "@/features/services/data/services";

export function ServicesMiniCta() {
  return (
    <CtaBanner
      variant="light"
      title={servicesMiniCta.title}
      description={servicesMiniCta.description}
      primary={servicesMiniCta.primary}
      secondary={servicesMiniCta.secondary}
    />
  );
}
