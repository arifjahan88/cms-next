'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { LandingContent } from '@/features/dashboard/data/landing-cms';
import { CtaFields } from '@/features/dashboard/components/landing-cms/shared/cta-fields';
import { RepeatableList } from '@/features/dashboard/components/landing-cms/shared/repeatable-list';
import { LucideIconPicker } from '@/features/dashboard/components/navigation-cms/shared/lucide-icon-picker';

type Industries = LandingContent['industries'];

export function IndustriesEditor({
  value,
  onChange,
}: {
  value: Industries;
  onChange: (next: Industries) => void;
}) {
  return (
    <div className='space-y-4'>
      <div className='space-y-1.5'>
        <Label>Section Title</Label>
        <Input
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
        />
      </div>
      <CtaFields
        title='Header Action'
        value={value.action}
        onChange={(action) => onChange({ ...value, action })}
      />
      <RepeatableList
        title='Industries'
        items={value.items}
        onChange={(items) => onChange({ ...value, items })}
        createItem={() => ({
          id: crypto.randomUUID(),
          title: 'New Industry',
          description: '',
          icon: 'building',
          href: '/industries',
        })}
        renderItem={(item, _i, update) => (
          <div className='space-y-3'>
            <div className='grid gap-3 sm:grid-cols-2'>
              <div className='space-y-1.5'>
                <Label>Title</Label>
                <Input value={item.title} onChange={(e) => update({ title: e.target.value })} />
              </div>
              <div className='space-y-1.5'>
                <Label>Icon</Label>
                <LucideIconPicker
                  value={item.icon}
                  onChange={(icon) => update({ icon: icon ?? 'building' })}
                />
              </div>
            </div>
            <div className='space-y-1.5'>
              <Label>Description</Label>
              <Textarea
                rows={2}
                value={item.description}
                onChange={(e) => update({ description: e.target.value })}
              />
            </div>
            <div className='space-y-1.5'>
              <Label>Link</Label>
              <Input value={item.href} onChange={(e) => update({ href: e.target.value })} />
            </div>
          </div>
        )}
      />
    </div>
  );
}
