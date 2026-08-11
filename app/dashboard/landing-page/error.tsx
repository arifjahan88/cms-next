'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function LandingPageError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Landing page CMS error:', error);
  }, [error]);

  return (
    <div className='flex min-h-64 flex-col items-center justify-center gap-4 rounded-lg border bg-muted/30 px-6 py-12 text-center'>
      <div>
        <h2 className='text-lg font-semibold'>Failed to load landing page CMS</h2>
        <p className='mt-1 text-sm text-muted-foreground'>
          {error.message || 'Something went wrong loading the landing page CMS.'}
        </p>
      </div>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
