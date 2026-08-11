'use client';

import { useMemo, useState } from 'react';
import { actionToast, runWithActionToast } from '@/lib/toast-action';
import { ChevronDown, Save } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ApiPanel } from '@/features/dashboard/components/landing-cms/api-panel';
import { LivePreview } from '@/features/dashboard/components/landing-cms/live-preview';
import { SectionEditPanel } from '@/features/dashboard/components/landing-cms/section-edit-panel';
import { SectionsList } from '@/features/dashboard/components/landing-cms/sections-list';
import type {
  LandingContent,
  LandingPageDocument,
  LandingSectionMeta,
  SectionId,
  SectionStatus,
} from '@/features/dashboard/data/landing-cms';
import { useLandingDocumentSuspenseQuery } from '@/features/dashboard/hooks/landing/use-landing-document-query';
import {
  useReorderLandingSectionsMutation,
  useUpdateLandingSectionMutation,
} from '@/features/dashboard/hooks/landing/use-landing-mutations';

function sectionPayload(
  section: LandingSectionMeta,
  content: LandingContent,
  status?: SectionStatus
) {
  return {
    title: section.title,
    status: status ?? section.status,
    icon: section.icon,
    visible: section.visible,
    content: content[section.id],
  };
}

export function LandingPageCms() {
  const { data: remoteDoc } = useLandingDocumentSuspenseQuery();
  const serverKey =
    remoteDoc.sections.map((s) => `${s.id}:${s.status}:${s.visible}:${s.title}`).join('|') +
    JSON.stringify(remoteDoc.content);

  const [draft, setDraft] = useState<{
    serverKey: string;
    doc: LandingPageDocument;
  } | null>(null);

  const doc = draft?.serverKey === serverKey ? draft.doc : remoteDoc;

  const [activeId, setActiveId] = useState<SectionId>(() => remoteDoc.sections[0]?.id ?? 'hero');

  const updateSection = useUpdateLandingSectionMutation();
  const reorderSections = useReorderLandingSectionsMutation();

  const active = doc.sections.find((s) => s.id === activeId) ?? doc.sections[0]!;
  const pagePublished = doc.sections.every((s) => s.status === 'Published');

  function editableDoc(): LandingPageDocument {
    return draft?.serverKey === serverKey ? draft.doc : structuredClone(remoteDoc);
  }

  function patchDoc(updater: (current: LandingPageDocument) => LandingPageDocument) {
    setDraft({ serverKey, doc: updater(editableDoc()) });
  }

  function updateContent<K extends SectionId>(id: K, next: LandingContent[K]) {
    patchDoc((prev) => ({
      ...prev,
      content: { ...prev.content, [id]: next },
    }));
  }

  function updateMeta(patch: Partial<LandingSectionMeta>) {
    patchDoc((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => (s.id === active.id ? { ...s, ...patch } : s)),
    }));
  }

  async function handleSaveDraft() {
    if (!active) return;
    const nextStatus: SectionStatus = 'Draft';
    patchDoc((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === active.id ? { ...s, status: nextStatus } : s
      ),
    }));
    await runWithActionToast(
      () =>
        updateSection.mutateAsync({
          sectionId: active.id,
          payload: sectionPayload(active, doc.content, nextStatus),
        }),
      actionToast.savingDraft('section')
    );
  }

  async function handlePublishSection() {
    if (!active) return;
    const nextStatus: SectionStatus = 'Published';
    patchDoc((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === active.id ? { ...s, status: nextStatus } : s
      ),
    }));
    await runWithActionToast(
      () =>
        updateSection.mutateAsync({
          sectionId: active.id,
          payload: sectionPayload(active, doc.content, nextStatus),
        }),
      actionToast.publishing('section')
    );
  }

  async function handlePublishAll() {
    await runWithActionToast(
      () =>
        Promise.all(
          doc.sections.map((section) =>
            updateSection.mutateAsync({
              sectionId: section.id,
              payload: sectionPayload(section, doc.content, 'Published'),
            })
          )
        ),
      {
        loading: 'Publishing all sections…',
        success: 'All sections published',
        error: 'Failed to publish all sections',
      }
    );
  }

  async function handleReorderComplete(next: LandingSectionMeta[]) {
    patchDoc((prev) => ({ ...prev, sections: next }));
    await runWithActionToast(
      () =>
        reorderSections.mutateAsync({
          orderedSectionIds: next.map((section) => section.id),
        }),
      actionToast.reordering('sections')
    );
  }

  const previewContent = useMemo(() => doc.content, [doc.content]);

  if (!doc.sections.length) {
    return (
      <div className='rounded-lg border bg-muted/40 px-4 py-10 text-center text-sm text-muted-foreground'>
        No landing sections seeded yet. Run <code className='font-mono'>yarn db:seed</code> to
        create the home page sections.
      </div>
    );
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
            disabled={updateSection.isPending}
            onClick={handleSaveDraft}
          >
            <Save data-icon='inline-start' />
            Save Draft
          </Button>
          <div className='flex'>
            <Button
              size='sm'
              className='h-9 rounded-r-none'
              disabled={updateSection.isPending}
              onClick={handlePublishSection}
            >
              Publish
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    size='sm'
                    className='h-9 rounded-l-none border-l border-primary-foreground/20 px-2'
                    aria-label='Publish options'
                  />
                }
              >
                <ChevronDown className='size-3.5' />
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={handlePublishAll}>Publish all sections</DropdownMenuItem>
                <DropdownMenuItem onClick={handlePublishSection}>
                  Publish selected section
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className='grid gap-4 xl:grid-cols-[0.85fr_1.25fr_1fr]'>
        <SectionsList
          sections={doc.sections}
          activeId={active.id}
          onReorderComplete={handleReorderComplete}
          onSelect={setActiveId}
        />
        <SectionEditPanel
          section={active}
          content={doc.content}
          onContentChange={updateContent}
          onMetaChange={updateMeta}
        />
        <LivePreview sectionId={active.id} content={previewContent} />
      </div>

      <ApiPanel sectionId={active.id} content={previewContent} />

      <div className='rounded-lg border bg-muted/40 px-4 py-3 text-center text-sm text-muted-foreground'>
        Changes are saved as drafts. Click{' '}
        <span className='font-semibold text-foreground'>Publish</span> to make them live on your
        website.
      </div>
    </div>
  );
}
