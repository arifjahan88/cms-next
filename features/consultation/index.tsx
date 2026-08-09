import { ConsultationHero } from '@/features/consultation/components/consultation-hero';
import { ConsultationBooking } from '@/features/consultation/components/consultation-booking';
import { TrustBar } from '@/features/consultation/components/trust-bar';

export function ConsultationPage() {
  return (
    <>
      <ConsultationHero />
      <ConsultationBooking />
      <TrustBar />
    </>
  );
}
