'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { LandingContent } from '@/features/dashboard/data/landing-cms';
import { RepeatableList } from '@/features/dashboard/components/landing-cms/shared/repeatable-list';

type Testimonials = LandingContent['testimonials'];

export function TestimonialsEditor({
  value,
  onChange,
}: {
  value: Testimonials;
  onChange: (next: Testimonials) => void;
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
      <div className='space-y-1.5'>
        <Label>Description</Label>
        <Textarea
          rows={2}
          value={value.description}
          onChange={(e) => onChange({ ...value, description: e.target.value })}
        />
      </div>
      <RepeatableList
        title='Testimonials'
        items={value.items}
        onChange={(items) => onChange({ ...value, items })}
        createItem={() => ({
          id: crypto.randomUUID(),
          quote: '',
          name: 'New Client',
          role: '',
          avatar: '',
          rating: 5,
        })}
        renderItem={(item, _i, update) => (
          <div className='space-y-3'>
            <div className='space-y-1.5'>
              <Label>Quote</Label>
              <Textarea
                rows={3}
                value={item.quote}
                onChange={(e) => update({ quote: e.target.value })}
              />
            </div>
            <div className='grid gap-3 sm:grid-cols-2'>
              <div className='space-y-1.5'>
                <Label>Name</Label>
                <Input value={item.name} onChange={(e) => update({ name: e.target.value })} />
              </div>
              <div className='space-y-1.5'>
                <Label>Role</Label>
                <Input value={item.role} onChange={(e) => update({ role: e.target.value })} />
              </div>
            </div>
            <div className='grid gap-3 sm:grid-cols-2'>
              <div className='space-y-1.5'>
                <Label>Avatar path</Label>
                <Input value={item.avatar} onChange={(e) => update({ avatar: e.target.value })} />
              </div>
              <div className='space-y-1.5'>
                <Label>Rating (1–5)</Label>
                <Input
                  type='number'
                  min={1}
                  max={5}
                  value={item.rating}
                  onChange={(e) =>
                    update({
                      rating: Math.min(5, Math.max(1, Number(e.target.value) || 1)),
                    })
                  }
                />
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
}
