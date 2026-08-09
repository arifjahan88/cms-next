import { ImagePlaceholder } from '@/components/shared/image-placeholder';
import { offices } from '@/features/contact/data/contact';

export function OfficesMap() {
  return (
    <div className='space-y-5'>
      <div className='relative aspect-16/10 overflow-hidden rounded-2xl border bg-muted shadow-sm'>
        <ImagePlaceholder
          label='[Office Map — Bangkok Location]'
          className='absolute inset-0 rounded-xl'
        />
      </div>

      <div>
        <h3 className='text-lg font-semibold'>Our Offices</h3>
        <ul className='mt-4 space-y-3'>
          {offices.map((office) => (
            <li key={office.id} className='rounded-xl border bg-background p-4 shadow-sm'>
              <div className='flex items-start gap-3'>
                <div className='relative size-12 shrink-0 overflow-hidden rounded-lg'>
                  <ImagePlaceholder
                    label='[City]'
                    className='absolute inset-0 min-h-0 rounded-lg text-[10px]'
                  />
                </div>
                <div>
                  <p className='font-semibold'>
                    {office.country}{' '}
                    <span className='text-xs font-medium text-primary'>· {office.label}</span>
                  </p>
                  <p className='mt-1 text-sm text-muted-foreground'>{office.address}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
