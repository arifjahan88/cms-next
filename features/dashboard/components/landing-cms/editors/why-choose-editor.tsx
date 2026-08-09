'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { LandingContent } from '@/features/dashboard/data/landing-cms';
import { CtaFields } from '@/features/dashboard/components/landing-cms/shared/cta-fields';
import { MediaField } from '@/features/dashboard/components/landing-cms/shared/media-field';
import { RepeatableList } from '@/features/dashboard/components/landing-cms/shared/repeatable-list';

type WhyChoose = LandingContent['whyChoose'];

export function WhyChooseEditor({
  value,
  onChange,
}: {
  value: WhyChoose;
  onChange: (next: WhyChoose) => void;
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
        <Label>Experience Badge</Label>
        <Input
          value={value.experienceBadge}
          onChange={(e) => onChange({ ...value, experienceBadge: e.target.value })}
        />
      </div>
      <MediaField
        label='Section Media'
        value={value.media}
        onChange={(media) => onChange({ ...value, media })}
      />
      <RepeatableList
        title='Reasons'
        items={value.items}
        onChange={(items) => onChange({ ...value, items })}
        createItem={() => ({
          title: 'New Reason',
          description: '',
          icon: 'users',
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
          </div>
        )}
      />
    </div>
  );
}
