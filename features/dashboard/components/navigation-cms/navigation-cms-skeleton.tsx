import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function NavigationCmsSkeleton() {
  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
        <div className='space-y-2'>
          <div className='h-7 w-40 animate-pulse rounded bg-muted' />
          <div className='h-4 w-72 max-w-full animate-pulse rounded bg-muted' />
        </div>
        <div className='flex gap-2'>
          <div className='h-9 w-24 animate-pulse rounded-md bg-muted' />
          <div className='h-9 w-28 animate-pulse rounded-md bg-muted' />
          <div className='h-9 w-24 animate-pulse rounded-md bg-muted' />
        </div>
      </div>
      <div className='grid gap-4 xl:grid-cols-[0.9fr_1.15fr_1.1fr]'>
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className='border-border/80 shadow-sm'>
            <CardHeader className='pb-3'>
              <div className='h-5 w-28 animate-pulse rounded bg-muted' />
              <div className='mt-2 h-3 w-40 animate-pulse rounded bg-muted' />
            </CardHeader>
            <CardContent className='space-y-2'>
              {Array.from({ length: 4 }).map((__, j) => (
                <div
                  key={j}
                  className='h-14 animate-pulse rounded-xl bg-muted/70'
                />
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
