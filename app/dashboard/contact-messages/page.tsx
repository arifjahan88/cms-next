import { Suspense } from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { ContactMessagesCms } from '@/features/dashboard/components/inbox-cms/contact-messages-cms';
import { EntityCmsSkeleton } from '@/features/dashboard/components/entity-cms/entity-cms-skeleton';
import { listContactMessages } from '@/db/queries/contact-messages';
import { contactMessageKeys } from '@/lib/api/query-keys';

async function ContactMessagesCmsLoader() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: contactMessageKeys.admin(),
    queryFn: listContactMessages,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ContactMessagesCms />
    </HydrationBoundary>
  );
}

export default function ContactMessagesPage() {
  return (
    <Suspense fallback={<EntityCmsSkeleton />}>
      <ContactMessagesCmsLoader />
    </Suspense>
  );
}
