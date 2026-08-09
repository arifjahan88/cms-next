'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { LandingContent } from '@/features/dashboard/data/landing-cms';
import { CtaFields } from '@/features/dashboard/components/landing-cms/shared/cta-fields';
import { RepeatableList } from '@/features/dashboard/components/landing-cms/shared/repeatable-list';

type Services = LandingContent['services'];

export function ServicesEditor({
  value,
  onChange,
}: {
  value: Services;
  onChange: (next: Services) => void;
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
      <div className='space-y-1.5'>
        <Label>Card CTA Label</Label>
        <Input
          value={value.itemCtaLabel}
          onChange={(e) => onChange({ ...value, itemCtaLabel: e.target.value })}
        />
      </div>
      <RepeatableList
        title='Service Cards'
        items={value.items}
        onChange={(items) => onChange({ ...value, items })}
        createItem={() => ({
          id: crypto.randomUUID(),
          title: 'New Service',
          description: '',
          icon: 'code',
          href: '/services',
        })}
        renderItem={(item, _i, update) => (
          <div className='space-y-3'>
            <div className='grid gap-3 sm:grid-cols-2'>
              <div className='space-y-1.5'>
                <Label>Title</Label>
                <Input value={item.title} onChange={(e) => update({ title: e.target.value })} />
              </div>
              <div className='space-y-1.5'>
                <Label>Icon key</Label>
                <Input value={item.icon} onChange={(e) => update({ icon: e.target.value })} />
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
