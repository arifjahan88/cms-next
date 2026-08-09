'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { LandingCta } from '@/features/dashboard/data/landing-cms';

export function CtaFields({
  title,
  value,
  onChange,
}: {
  title: string;
  value: LandingCta;
  onChange: (next: LandingCta) => void;
}) {
  return (
    <div className='space-y-3 rounded-lg border p-3'>
      <p className='text-sm font-semibold'>{title}</p>
      <div className='grid gap-3 sm:grid-cols-2'>
        <div className='space-y-1.5'>
          <Label>Label</Label>
          <Input
            value={value.label}
            onChange={(e) => onChange({ ...value, label: e.target.value })}
          />
        </div>
        <div className='space-y-1.5'>
          <Label>URL</Label>
          <Input
            value={value.href}
            onChange={(e) => onChange({ ...value, href: e.target.value })}
          />
        </div>
      </div>
      <label className='flex items-center gap-2 text-sm'>
        <Checkbox
          checked={value.newTab}
          onCheckedChange={(checked) => onChange({ ...value, newTab: Boolean(checked) })}
        />
        Open in new tab
      </label>
    </div>
  );
}
