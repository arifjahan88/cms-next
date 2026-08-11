'use client';

import { useState } from 'react';
import { toast } from '@/lib/toast';
import { Eye, Save } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ApiPanel } from '@/features/dashboard/components/landing-cms/api-panel';
import { LivePreview } from '@/features/dashboard/components/landing-cms/live-preview';
import { SectionEditPanel } from '@/features/dashboard/components/landing-cms/section-edit-panel';
import { SectionsList } from '@/features/dashboard/components/landing-cms/sections-list';
import {
  createLandingPageDocument,
  type LandingContent,
  type LandingSectionMeta,
  type SectionId,
} from '@/features/dashboard/data/landing-cms';

export function LandingPageCms() {
  const [doc, setDoc] = useState(createLandingPageDocument);
  const [activeId, setActiveId] = useState<SectionId>('hero');
  const active = doc.sections.find((s) => s.id === activeId) ?? doc.sections[0];
  const pagePublished = doc.sections.every((s) => s.status === 'Published');

  function updateContent<K extends SectionId>(id: K, next: LandingContent[K]) {
    setDoc((prev) => ({
      ...prev,
      content: { ...prev.content, [id]: next },
    }));
  }

  function updateMeta(patch: Partial<LandingSectionMeta>) {
    setDoc((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => (s.id === active.id ? { ...s, ...patch } : s)),
    }));
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
        <div>
          <div className='flex flex-wrap items-center gap-2'>
            <h2 className='text-xl font-bold tracking-tight md:text-2xl'>
              Landing Page Content Management
            </h2>
            <Badge
              className={
                pagePublished
                  ? 'border-0 bg-emerald-500/15 font-medium text-emerald-700 hover:bg-emerald-500/15'
                  : 'border-0 bg-muted font-medium text-muted-foreground'
              }
            >
              {pagePublished ? 'Published' : 'Has Drafts'}
            </Badge>
          </div>
          <p className='mt-1 text-sm text-muted-foreground'>
            Manage every home page section with the same fields used on the public landing page.
          </p>
        </div>
        <div className='flex flex-wrap gap-2'>
          <Button
            variant='outline'
            size='sm'
            className='h-9'
            onClick={() => toast.info({ title: 'Preview opening…' })}
          >
            <Eye data-icon='inline-start' />
            Preview
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='h-9'
            onClick={() => toast.success({ title: 'Draft saved' })}
          >
            <Save data-icon='inline-start' />
            Save Draft
          </Button>
          <Button
            size='sm'
            className='h-9'
            onClick={() => toast.success({ title: 'Published successfully' })}
          >
            Publish
          </Button>
        </div>
      </div>

      <div className='grid gap-4 xl:grid-cols-[0.85fr_1.25fr_1fr]'>
        <SectionsList
          sections={doc.sections}
          activeId={active.id}
          onReorder={(sections) => setDoc((prev) => ({ ...prev, sections }))}
          onSelect={setActiveId}
        />
        <SectionEditPanel
          section={active}
          content={doc.content}
          onContentChange={updateContent}
          onMetaChange={updateMeta}
        />
        <LivePreview sectionId={active.id} content={doc.content} />
      </div>

      <ApiPanel sectionId={active.id} content={doc.content} />
    </div>
  );
}
