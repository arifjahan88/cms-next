import { Suspense } from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { EntityCmsSkeleton } from '@/features/dashboard/components/entity-cms/entity-cms-skeleton';
import { UsersCms } from '@/features/dashboard/components/users-cms/users-cms';
import { listUsers } from '@/db/queries/users';
import { userKeys } from '@/lib/api/query-keys';

async function UsersCmsLoader() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: userKeys.admin(),
    queryFn: listUsers,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UsersCms />
    </HydrationBoundary>
  );
}

export default function UsersPage() {
  return (
    <Suspense fallback={<EntityCmsSkeleton />}>
      <UsersCmsLoader />
    </Suspense>
  );
}
