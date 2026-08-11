import { ConsultationHero } from '@/features/consultation/components/consultation-hero';
import { ConsultationBooking } from '@/features/consultation/components/consultation-booking';
import { TrustBar } from '@/features/consultation/components/trust-bar';
import { Suspense } from 'react';

export function ConsultationPage() {
  return (
    <>
      <ConsultationHero />
      <Suspense fallback={<div>Loading...</div>}>
        <ConsultationBooking />
      </Suspense>
      <TrustBar />
    </>
  );
}
