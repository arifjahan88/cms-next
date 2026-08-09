import { Container } from "@/components/shared/container";
import { StatItem } from "@/components/shared/stat-item";
import { FadeIn } from "@/components/shared/motion/fade-in";
import { trustItems } from "@/features/consultation/data/consultation";
import { getIcon } from "@/lib/icons";

export function TrustBar() {
  return (
    <section className="border-y bg-surface py-10">
      <Container>
        <FadeIn>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {trustItems.map((item) => (
              <StatItem
                key={item.label}
                value={item.value}
                label={item.label}
                icon={getIcon(item.icon)}
              />
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
