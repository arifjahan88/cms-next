import type { Metadata } from 'next';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { AdminShell } from '@/features/dashboard/components/admin-shell';
import { isAdminRole } from '@/lib/auth/roles';
import { getSession } from '@/lib/auth/session';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Zamil Technologies admin panel',
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session || !isAdminRole(session.role)) {
    redirect('/login');
  }

  return (
    <Suspense fallback={<div className='min-h-svh bg-surface' />}>
      <AdminShell
        user={{
          name: session.name,
          email: session.email,
          role: session.role,
        }}
      >
        {children}
      </AdminShell>
    </Suspense>
  );
}
