'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { LandingContent } from '@/features/dashboard/data/landing-cms';
import { RepeatableList } from '@/features/dashboard/components/landing-cms/shared/repeatable-list';
import { SITE } from '@/lib/constants';

type ContactCta = LandingContent['contactCta'];

export function ContactCtaEditor({
  value,
  onChange,
}: {
  value: ContactCta;
  onChange: (next: ContactCta) => void;
}) {
  return (
    <div className='space-y-4'>
      <div className='space-y-1.5'>
        <Label>Headline</Label>
        <Input
          value={value.headline}
          onChange={(e) => onChange({ ...value, headline: e.target.value })}
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
      <RepeatableList
        title='Benefits'
        items={value.benefits.map((text) => ({ text }))}
        onChange={(rows) => onChange({ ...value, benefits: rows.map((r) => r.text) })}
        createItem={() => ({ text: 'New benefit' })}
        renderItem={(item, _i, update) => (
          <div className='space-y-1.5'>
            <Label>Benefit</Label>
            <Input value={item.text} onChange={(e) => update({ text: e.target.value })} />
          </div>
        )}
      />
      <div className='space-y-1.5'>
        <Label>Form Title</Label>
        <Input
          value={value.formTitle}
          onChange={(e) => onChange({ ...value, formTitle: e.target.value })}
        />
      </div>
      <div className='space-y-1.5'>
        <Label>Submit Label</Label>
        <Input
          value={value.submitLabel}
          onChange={(e) => onChange({ ...value, submitLabel: e.target.value })}
        />
      </div>
      <div className='space-y-1.5'>
        <Label>Contact Panel Title</Label>
        <Input
          value={value.contactPanelTitle}
          onChange={(e) => onChange({ ...value, contactPanelTitle: e.target.value })}
        />
      </div>
      <div className='rounded-lg border bg-muted/30 p-3 text-xs text-muted-foreground'>
        <p className='mb-2 font-medium text-foreground'>
          Contact details (Site Settings — read-only)
        </p>
        <p>{SITE.phone}</p>
        <p>{SITE.email}</p>
        <p>{SITE.location}</p>
      </div>
    </div>
  );
}
