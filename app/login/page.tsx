import type { Metadata } from 'next';
import { Suspense } from 'react';
import { AdminLogin } from '@/features/auth/components/admin-login';

export const metadata: Metadata = {
  title: 'Admin Login',
  description: 'Sign in to the Zamil Technologies admin panel.',
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className='min-h-svh bg-background' />}>
      <AdminLogin />
    </Suspense>
  );
}
