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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SectionEditPanel } from '@/features/dashboard/components/landing-cms/section-edit-panel';
import { SectionsList } from '@/features/dashboard/components/landing-cms/sections-list';
import { PageSectionEditPanel } from '@/features/dashboard/components/pages-cms/page-section-edit-panel';
import type {
  LandingContent,
  LandingPageDocument,
  LandingSectionMeta,
  SectionId,
  SectionStatus,
} from '@/features/dashboard/data/landing-cms';
import type { PageDocument, PageSectionMeta } from '@/features/dashboard/data/page-seeds';
import { PUBLIC_PAGES, type PageSlug } from '@/features/dashboard/data/public-pages';
import { useLandingDocumentSuspenseQuery } from '@/features/dashboard/hooks/landing/use-landing-document-query';
import {
  useReorderLandingSectionsMutation,
  useUpdateLandingSectionMutation,
} from '@/features/dashboard/hooks/landing/use-landing-mutations';

function homeSectionPayload(
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

function pageSectionPayload(
  section: PageSectionMeta,
  content: Record<string, unknown>,
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

export function PagesCms({ initialPage = 'home' }: { initialPage?: PageSlug }) {
  const [pageSlug, setPageSlug] = useState<PageSlug>(initialPage);
  const pageMeta = PUBLIC_PAGES.find((p) => p.slug === pageSlug)!;

  if (pageSlug === 'home') {
    return (
      <div className='space-y-6'>
        <PagePicker pageSlug={pageSlug} onChange={setPageSlug} />
        <HomePageCmsInner />
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <PagePicker pageSlug={pageSlug} onChange={setPageSlug} />
      <GenericPageCmsInner pageSlug={pageSlug} pageLabel={pageMeta.label} />
    </div>
  );
}

function PagePicker({
  pageSlug,
  onChange,
}: {
  pageSlug: PageSlug;
  onChange: (slug: PageSlug) => void;
}) {
  return (
    <Tabs value={pageSlug} onValueChange={(v) => onChange(v as PageSlug)}>
      <TabsList className='h-auto flex-wrap justify-start gap-1'>
        {PUBLIC_PAGES.map((page) => (
          <TabsTrigger key={page.slug} value={page.slug} className='text-xs sm:text-sm'>
            {page.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

function HomePageCmsInner() {
  const pageSlug = 'home' as const;
  const { data: remoteDoc } = useLandingDocumentSuspenseQuery(pageSlug);
  const serverKey =
    remoteDoc.sections.map((s) => `${s.id}:${s.status}:${s.visible}:${s.title}`).join('|') +
    JSON.stringify(remoteDoc.content);

  const [draft, setDraft] = useState<{ serverKey: string; doc: LandingPageDocument } | null>(
    null
  );
  const doc = (draft?.serverKey === serverKey ? draft.doc : remoteDoc) as LandingPageDocument;
  const [activeId, setActiveId] = useState<SectionId>(
    () => (remoteDoc.sections[0]?.id as SectionId) ?? 'hero'
  );

  const updateSection = useUpdateLandingSectionMutation(pageSlug);
  const reorderSections = useReorderLandingSectionsMutation(pageSlug);
  const active = doc.sections.find((s) => s.id === activeId) ?? doc.sections[0]!;
  const pagePublished = doc.sections.every((s) => s.status === 'Published');

  function editableDoc() {
    return draft?.serverKey === serverKey ? draft.doc : structuredClone(remoteDoc);
  }

  function patchDoc(updater: (current: LandingPageDocument) => LandingPageDocument) {
    setDraft({ serverKey, doc: updater(editableDoc() as LandingPageDocument) });
  }

  return (
    <PageCmsShell
      title='Landing Page Content Management'
      description='Manage every home page section with the same fields used on the public landing page.'
      pagePublished={pagePublished}
      isPending={updateSection.isPending}
      onSaveDraft={() =>
        runWithActionToast(
          () =>
            updateSection.mutateAsync({
              sectionId: active.id,
              payload: homeSectionPayload(active, doc.content, 'Draft'),
            }),
          actionToast.savingDraft('section')
        )
      }
      onPublishSection={() =>
        runWithActionToast(
          () =>
            updateSection.mutateAsync({
              sectionId: active.id,
              payload: homeSectionPayload(active, doc.content, 'Published'),
            }),
          actionToast.publishing('section')
        )
      }
      onPublishAll={() =>
        runWithActionToast(
          () =>
            Promise.all(
              doc.sections.map((section) =>
                updateSection.mutateAsync({
                  sectionId: section.id,
                  payload: homeSectionPayload(section, doc.content, 'Published'),
                })
              )
            ),
          {
            loading: 'Publishing all sections…',
            success: 'All sections published',
            error: 'Failed to publish all sections',
          }
        )
      }
      sectionsList={
        <SectionsList
          sections={doc.sections}
          activeId={active.id}
          onReorderComplete={(next) => {
            patchDoc((prev) => ({ ...prev, sections: next }));
            void runWithActionToast(
              () => reorderSections.mutateAsync(next.map((s) => s.id)),
              actionToast.reordering('sections')
            );
          }}
          onSelect={setActiveId}
        />
      }
      editPanel={
        <SectionEditPanel
          section={active}
          content={doc.content}
          onContentChange={(id, next) =>
            patchDoc((prev) => ({
              ...prev,
              content: { ...prev.content, [id]: next },
            }))
          }
          onMetaChange={(patch) =>
            patchDoc((prev) => ({
              ...prev,
              sections: prev.sections.map((s) =>
                s.id === active.id ? { ...s, ...patch } : s
              ),
            }))
          }
        />
      }
    />
  );
}

function GenericPageCmsInner({
  pageSlug,
  pageLabel,
}: {
  pageSlug: PageSlug;
  pageLabel: string;
}) {
  const { data: remoteDoc } = useLandingDocumentSuspenseQuery(pageSlug);
  const serverKey =
    remoteDoc.sections.map((s) => `${s.id}:${s.status}:${s.visible}:${s.title}`).join('|') +
    JSON.stringify(remoteDoc.content);

  const [draft, setDraft] = useState<{ serverKey: string; doc: PageDocument } | null>(null);
  const doc = (draft?.serverKey === serverKey ? draft.doc : remoteDoc) as PageDocument;
  const [activeId, setActiveId] = useState(() => remoteDoc.sections[0]?.id ?? '');
  const updateSection = useUpdateLandingSectionMutation(pageSlug);
  const reorderSections = useReorderLandingSectionsMutation(pageSlug);
  const active = doc.sections.find((s) => s.id === activeId) ?? doc.sections[0]!;
  const pagePublished = doc.sections.every((s) => s.status === 'Published');

  function editableDoc() {
    return draft?.serverKey === serverKey ? draft.doc : structuredClone(remoteDoc);
  }

  function patchDoc(updater: (current: PageDocument) => PageDocument) {
    setDraft({ serverKey, doc: updater(editableDoc() as PageDocument) });
  }

  if (!doc.sections.length) {
    return (
      <div className='rounded-lg border bg-muted/40 px-4 py-10 text-center text-sm text-muted-foreground'>
        No sections seeded for this page. Run <code className='font-mono'>yarn db:seed</code>.
      </div>
    );
  }

  return (
    <PageCmsShell
      title={`${pageLabel} Content Management`}
      description={`Manage section content for the ${pageLabel.toLowerCase()} public page.`}
      pagePublished={pagePublished}
      isPending={updateSection.isPending}
      onSaveDraft={() =>
        runWithActionToast(
          () =>
            updateSection.mutateAsync({
              sectionId: active.id,
              payload: pageSectionPayload(active, doc.content, 'Draft'),
            }),
          actionToast.savingDraft('section')
        )
      }
      onPublishSection={() =>
        runWithActionToast(
          () =>
            updateSection.mutateAsync({
              sectionId: active.id,
              payload: pageSectionPayload(active, doc.content, 'Published'),
            }),
          actionToast.publishing('section')
        )
      }
      onPublishAll={() =>
        runWithActionToast(
          () =>
            Promise.all(
              doc.sections.map((section) =>
                updateSection.mutateAsync({
                  sectionId: section.id,
                  payload: pageSectionPayload(section, doc.content, 'Published'),
                })
              )
            ),
          {
            loading: 'Publishing all sections…',
            success: 'All sections published',
            error: 'Failed to publish all sections',
          }
        )
      }
      sectionsList={
        <SectionsList
          sections={doc.sections as LandingSectionMeta[]}
          activeId={active.id}
          onReorderComplete={(next) => {
            patchDoc((prev) => ({ ...prev, sections: next as PageSectionMeta[] }));
            void runWithActionToast(
              () => reorderSections.mutateAsync(next.map((s) => s.id)),
              actionToast.reordering('sections')
            );
          }}
          onSelect={setActiveId}
        />
      }
      editPanel={
        <PageSectionEditPanel
          section={active}
          content={doc.content}
          onContentChange={(id, next) =>
            patchDoc((prev) => ({
              ...prev,
              content: { ...prev.content, [id]: next },
            }))
          }
          onMetaChange={(patch) =>
            patchDoc((prev) => ({
              ...prev,
              sections: prev.sections.map((s) =>
                s.id === active.id ? { ...s, ...patch } : s
              ),
            }))
          }
        />
      }
    />
  );
}

function PageCmsShell({
  title,
  description,
  pagePublished,
  isPending,
  onSaveDraft,
  onPublishSection,
  onPublishAll,
  sectionsList,
  editPanel,
}: {
  title: string;
  description: string;
  pagePublished: boolean;
  isPending: boolean;
  onSaveDraft: () => void;
  onPublishSection: () => void;
  onPublishAll: () => void;
  sectionsList: React.ReactNode;
  editPanel: React.ReactNode;
}) {
  return (
    <>
      <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
        <div>
          <div className='flex flex-wrap items-center gap-2'>
            <h2 className='text-xl font-bold tracking-tight md:text-2xl'>{title}</h2>
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
          <p className='mt-1 text-sm text-muted-foreground'>{description}</p>
        </div>
        <div className='flex flex-wrap gap-2'>
          <Button
            variant='outline'
            size='sm'
            className='h-9'
            disabled={isPending}
            onClick={onSaveDraft}
          >
            <Save data-icon='inline-start' />
            Save Draft
          </Button>
          <div className='flex'>
            <Button
              size='sm'
              className='h-9 rounded-r-none'
              disabled={isPending}
              onClick={onPublishSection}
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
                <DropdownMenuItem onClick={onPublishAll}>Publish all sections</DropdownMenuItem>
                <DropdownMenuItem onClick={onPublishSection}>
                  Publish selected section
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className='grid gap-4 xl:grid-cols-[0.85fr_1.25fr]'>{sectionsList}{editPanel}</div>

      <div className='rounded-lg border bg-muted/40 px-4 py-3 text-center text-sm text-muted-foreground'>
        Changes are saved as drafts. Click{' '}
        <span className='font-semibold text-foreground'>Publish</span> to make them live.
      </div>
    </>
  );
}
