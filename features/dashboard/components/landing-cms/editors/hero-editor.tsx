'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { LandingContent } from '@/features/dashboard/data/landing-cms';
import { CtaFields } from '@/features/dashboard/components/landing-cms/shared/cta-fields';
import { MediaField } from '@/features/dashboard/components/landing-cms/shared/media-field';
import { RepeatableList } from '@/features/dashboard/components/landing-cms/shared/repeatable-list';

type Hero = LandingContent['hero'];

export function HeroEditor({ value, onChange }: { value: Hero; onChange: (next: Hero) => void }) {
  return (
    <div className='space-y-4'>
      <div className='space-y-1.5'>
        <Label>Badge</Label>
        <Input
          value={value.badge}
          onChange={(e) => onChange({ ...value, badge: e.target.value })}
        />
      </div>
      <div className='space-y-1.5'>
        <Label>Title</Label>
        <Input
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
        />
      </div>
      <div className='space-y-1.5'>
        <Label>Highlight</Label>
        <Input
          value={value.highlight}
          onChange={(e) => onChange({ ...value, highlight: e.target.value })}
        />
      </div>
      <div className='space-y-1.5'>
        <Label>Description</Label>
        <Textarea
          rows={3}
          value={value.description}
          onChange={(e) => onChange({ ...value, description: e.target.value })}
        />
      </div>
      <CtaFields
        title='Primary Button'
        value={value.primaryCta}
        onChange={(primaryCta) => onChange({ ...value, primaryCta })}
      />
      <CtaFields
        title='Secondary Button'
        value={value.secondaryCta}
        onChange={(secondaryCta) => onChange({ ...value, secondaryCta })}
      />
      <MediaField
        label='Hero Visual'
        value={value.media}
        onChange={(media) => onChange({ ...value, media })}
      />
      <RepeatableList
        title='Stats'
        items={value.stats}
        onChange={(stats) => onChange({ ...value, stats })}
        createItem={() => ({
          value: '0',
          label: 'New Stat',
          icon: 'briefcase',
        })}
        renderItem={(item, _i, update) => (
          <div className='grid gap-3 sm:grid-cols-3'>
            <div className='space-y-1.5'>
              <Label>Value</Label>
              <Input value={item.value} onChange={(e) => update({ value: e.target.value })} />
            </div>
            <div className='space-y-1.5'>
              <Label>Label</Label>
              <Input value={item.label} onChange={(e) => update({ label: e.target.value })} />
            </div>
            <div className='space-y-1.5'>
              <Label>Icon key</Label>
              <Input value={item.icon} onChange={(e) => update({ icon: e.target.value })} />
            </div>
          </div>
        )}
      />
    </div>
  );
}
