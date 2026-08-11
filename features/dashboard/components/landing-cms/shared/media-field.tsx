'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImagePlaceholder } from '@/components/shared/image-placeholder';
import type { LandingMedia } from '@/features/dashboard/data/landing-cms';

export function MediaField({
  label = 'Media',
  value,
  onChange,
}: {
  label?: string;
  value: LandingMedia;
  onChange: (next: LandingMedia) => void;
}) {
  return (
    <div className='space-y-3'>
      <Label>{label}</Label>
      <div className='flex items-center gap-3 rounded-lg border p-3'>
        <ImagePlaceholder label={value.label} className='size-14 shrink-0 rounded-md' />
        <div className='min-w-0 flex-1 text-xs text-muted-foreground'>
          Text-only media fields (no uploads).
        </div>
      </div>
      <div className='grid gap-3 sm:grid-cols-3'>
        <div className='space-y-1.5'>
          <Label>Name</Label>
          <Input
            value={value.name}
            onChange={(e) => onChange({ ...value, name: e.target.value })}
          />
        </div>
        <div className='space-y-1.5'>
          <Label>Size</Label>
          <Input
            value={value.size}
            onChange={(e) => onChange({ ...value, size: e.target.value })}
          />
        </div>
        <div className='space-y-1.5'>
          <Label>Placeholder label</Label>
          <Input
            value={value.label}
            onChange={(e) => onChange({ ...value, label: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
