'use client';

import { Button } from '@/components/ui/button';

export default function PagesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center'>
      <p className='font-medium text-destructive'>Failed to load pages CMS</p>
      <p className='mt-1 text-sm text-muted-foreground'>{error.message}</p>
      <Button variant='outline' size='sm' className='mt-4' onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
