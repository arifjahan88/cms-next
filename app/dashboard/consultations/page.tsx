import { Suspense } from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { ConsultationsCms } from '@/features/dashboard/components/inbox-cms/consultations-cms';
import { EntityCmsSkeleton } from '@/features/dashboard/components/entity-cms/entity-cms-skeleton';
import { listConsultationBookings } from '@/db/queries/consultation-bookings';
import { consultationKeys } from '@/lib/api/query-keys';

async function ConsultationsCmsLoader() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: consultationKeys.admin(),
    queryFn: listConsultationBookings,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ConsultationsCms />
    </HydrationBoundary>
  );
}

export default function ConsultationsPage() {
  return (
    <Suspense fallback={<EntityCmsSkeleton />}>
      <ConsultationsCmsLoader />
    </Suspense>
  );
}
