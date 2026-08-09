'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { LandingContent } from '@/features/dashboard/data/landing-cms';
import { CtaFields } from '@/features/dashboard/components/landing-cms/shared/cta-fields';
import { RepeatableList } from '@/features/dashboard/components/landing-cms/shared/repeatable-list';

type CaseStudies = LandingContent['caseStudies'];

export function CaseStudiesEditor({
  value,
  onChange,
}: {
  value: CaseStudies;
  onChange: (next: CaseStudies) => void;
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
        title='Featured Cases'
        items={value.items}
        onChange={(items) => onChange({ ...value, items })}
        createItem={() => ({
          id: crypto.randomUUID(),
          title: 'New Case Study',
          description: '',
          category: 'General',
          image: '',
          href: '/case-studies',
          techStack: [],
        })}
        renderItem={(item, _i, update) => (
          <div className='space-y-3'>
            <div className='grid gap-3 sm:grid-cols-2'>
              <div className='space-y-1.5'>
                <Label>Title</Label>
                <Input value={item.title} onChange={(e) => update({ title: e.target.value })} />
              </div>
              <div className='space-y-1.5'>
                <Label>Category</Label>
                <Input
                  value={item.category}
                  onChange={(e) => update({ category: e.target.value })}
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
            <div className='grid gap-3 sm:grid-cols-2'>
              <div className='space-y-1.5'>
                <Label>Link</Label>
                <Input value={item.href} onChange={(e) => update({ href: e.target.value })} />
              </div>
              <div className='space-y-1.5'>
                <Label>Image path</Label>
                <Input value={item.image} onChange={(e) => update({ image: e.target.value })} />
              </div>
            </div>
            <div className='space-y-1.5'>
              <Label>Tech stack (comma-separated)</Label>
              <Input
                value={item.techStack.join(', ')}
                onChange={(e) =>
                  update({
                    techStack: e.target.value
                      .split(',')
                      .map((t) => t.trim())
                      .filter(Boolean),
                  })
                }
              />
            </div>
          </div>
        )}
      />
    </div>
  );
}
