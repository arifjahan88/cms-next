import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function DashboardOverviewSkeleton() {
  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div className='space-y-2'>
          <div className='h-7 w-48 animate-pulse rounded bg-muted' />
          <div className='h-4 w-72 max-w-full animate-pulse rounded bg-muted' />
        </div>
        <div className='h-9 w-36 animate-pulse rounded-md bg-muted' />
      </div>

      <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className='border-border/80 shadow-sm'>
            <CardHeader className='pb-2'>
              <div className='h-4 w-24 animate-pulse rounded bg-muted' />
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='h-8 w-20 animate-pulse rounded bg-muted' />
              <div className='h-3 w-28 animate-pulse rounded bg-muted/70' />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='grid gap-4 xl:grid-cols-2'>
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className='border-border/80 shadow-sm'>
            <CardHeader>
              <div className='h-5 w-40 animate-pulse rounded bg-muted' />
            </CardHeader>
            <CardContent>
              <div className='h-56 animate-pulse rounded-lg bg-muted/70' />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
