export function EntityCmsSkeleton() {
  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
        <div className='space-y-2'>
          <div className='h-7 w-40 animate-pulse rounded bg-muted' />
          <div className='h-4 w-72 max-w-full animate-pulse rounded bg-muted' />
        </div>
        <div className='h-9 w-28 animate-pulse rounded-md bg-muted' />
      </div>
      <div className='h-9 w-full max-w-sm animate-pulse rounded-md bg-muted' />
      <div className='space-y-2 rounded-lg border p-4'>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className='h-10 animate-pulse rounded bg-muted/70' />
        ))}
      </div>
    </div>
  );
}
