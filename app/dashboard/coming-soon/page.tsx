import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Coming Soon',
};

export default async function ComingSoonPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string }>;
}) {
  const { section } = await searchParams;
  const label = section ? decodeURIComponent(section) : 'This section';

  return (
    <Card className='mx-auto max-w-lg border-border/80 shadow-sm'>
      <CardContent className='flex flex-col items-center gap-4 p-10 text-center'>
        <h2 className='text-xl font-bold'>{label}</h2>
        <p className='text-sm text-muted-foreground'>
          This admin module is coming soon. The UI shell is ready—content management for this area
          will be wired next.
        </p>
        <Button render={<Link href='/dashboard' />}>Back to Dashboard</Button>
      </CardContent>
    </Card>
  );
}
