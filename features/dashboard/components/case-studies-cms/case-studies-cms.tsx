'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import type { CaseStudyDto } from '@/db/queries/case-studies';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import {
  EntityListCms,
  StatusBadge,
} from '@/features/dashboard/components/entity-cms/entity-list-cms';
import {
  createCaseStudy,
  deleteCaseStudy,
  listCaseStudies,
  updateCaseStudy,
  type CaseStudyInput,
} from '@/lib/api/case-studies';
import { caseStudyKeys } from '@/lib/api/query-keys';
import { slugify } from '@/lib/slugify';
import { actionToast, runWithActionToast } from '@/lib/toast-action';

type CaseStudyFormState = CaseStudyInput & {
  slugManual: boolean;
  techStackText: string;
  metricsText: string;
};

const emptyForm = (): CaseStudyFormState => ({
  title: '',
  slug: '',
  description: '',
  category: '',
  image: '',
  challenge: '',
  solution: '',
  techStack: [],
  metrics: [],
  featured: false,
  status: 'draft',
  publishedAt: null,
  slugManual: false,
  techStackText: '',
  metricsText: '[]',
});

function toForm(item: CaseStudyDto): CaseStudyFormState {
  return {
    title: item.title,
    slug: item.slug,
    description: item.description,
    category: item.category,
    image: item.image,
    challenge: item.challenge,
    solution: item.solution,
    techStack: item.techStack,
    metrics: item.metrics,
    featured: item.featured,
    status: item.status as CaseStudyInput['status'],
    publishedAt: item.publishedAt
      ? new Date(item.publishedAt).toISOString().slice(0, 16)
      : null,
    slugManual: true,
    techStackText: item.techStack.join(', '),
    metricsText: JSON.stringify(item.metrics, null, 2),
  };
}

function toPayload(form: CaseStudyFormState): CaseStudyInput {
  let metrics = form.metrics;
  try {
    metrics = JSON.parse(form.metricsText) as CaseStudyInput['metrics'];
  } catch {
    metrics = form.metrics;
  }

  return {
    title: form.title,
    slug: form.slug,
    description: form.description,
    category: form.category,
    image: form.image,
    challenge: form.challenge,
    solution: form.solution,
    techStack: form.techStackText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    metrics,
    featured: form.featured,
    status: form.status,
    publishedAt: form.publishedAt,
  };
}

export function CaseStudiesCms() {
  const queryClient = useQueryClient();
  const { data: items } = useSuspenseQuery({
    queryKey: caseStudyKeys.admin(),
    queryFn: listCaseStudies,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: caseStudyKeys.all });

  const createItem = useMutation({
    mutationFn: createCaseStudy,
    onSuccess: invalidate,
  });
  const updateItem = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: CaseStudyInput }) =>
      updateCaseStudy(id, payload),
    onSuccess: invalidate,
  });
  const removeItem = useMutation({
    mutationFn: deleteCaseStudy,
    onSuccess: invalidate,
  });

  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CaseStudyFormState>(emptyForm);

  useEffect(() => {
    if (!sheetOpen) return;
    if (!editingId && !form.slugManual && form.title) {
      setForm((prev) => ({ ...prev, slug: slugify(prev.title) }));
    }
  }, [form.title, form.slugManual, editingId, sheetOpen]);

  function patch(partial: Partial<CaseStudyFormState>) {
    setForm((prev) => ({ ...prev, ...partial }));
  }

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm());
    setSheetOpen(true);
  }

  function openEdit(item: CaseStudyDto) {
    setEditingId(item.id);
    setForm(toForm(item));
    setSheetOpen(true);
  }

  async function handleSave() {
    const payload = toPayload(form);
    if (editingId) {
      await runWithActionToast(
        () => updateItem.mutateAsync({ id: editingId, payload }),
        actionToast.updating('case study')
      );
    } else {
      await runWithActionToast(
        () => createItem.mutateAsync(payload),
        actionToast.adding('case study')
      );
    }
    setSheetOpen(false);
  }

  async function handleDelete(item: CaseStudyDto) {
    await runWithActionToast(
      () => removeItem.mutateAsync(item.id),
      actionToast.deleting('case study')
    );
  }

  const saving = createItem.isPending || updateItem.isPending;

  return (
    <>
      <EntityListCms
        title='Case Studies'
        description='Manage case study content.'
        items={items}
        createLabel='New case study'
        emptyMessage='No case studies yet.'
        onCreate={openCreate}
        onEdit={openEdit}
        onDelete={handleDelete}
        columns={[
          {
            header: 'Title',
            searchValue: (p) => p.title,
            cell: (p) => <span className='font-medium'>{p.title}</span>,
          },
          {
            header: 'Category',
            searchValue: (p) => p.category,
            cell: (p) => p.category,
          },
          {
            header: 'Status',
            searchValue: (p) => p.status,
            cell: (p) => <StatusBadge status={p.status} />,
          },
          {
            header: 'Updated',
            cell: (p) => new Date(p.updatedAt).toLocaleDateString(),
          },
        ]}
      />

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side='right' className='w-full overflow-y-auto sm:max-w-lg'>
          <SheetHeader>
            <SheetTitle>{editingId ? 'Edit case study' : 'New case study'}</SheetTitle>
          </SheetHeader>

          <div className='space-y-4 px-4'>
            <div className='space-y-2'>
              <Label htmlFor='cs-title'>Title</Label>
              <Input
                id='cs-title'
                value={form.title}
                onChange={(e) => patch({ title: e.target.value })}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='cs-slug'>Slug</Label>
              <Input
                id='cs-slug'
                value={form.slug}
                onChange={(e) => patch({ slug: e.target.value, slugManual: true })}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='cs-description'>Description</Label>
              <Textarea
                id='cs-description'
                value={form.description}
                onChange={(e) => patch({ description: e.target.value })}
                rows={3}
              />
            </div>
            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='cs-category'>Category</Label>
                <Input
                  id='cs-category'
                  value={form.category}
                  onChange={(e) => patch({ category: e.target.value })}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='cs-image'>Image URL</Label>
                <Input
                  id='cs-image'
                  value={form.image}
                  onChange={(e) => patch({ image: e.target.value })}
                />
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='cs-challenge'>Challenge</Label>
              <Textarea
                id='cs-challenge'
                value={form.challenge}
                onChange={(e) => patch({ challenge: e.target.value })}
                rows={3}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='cs-solution'>Solution</Label>
              <Textarea
                id='cs-solution'
                value={form.solution}
                onChange={(e) => patch({ solution: e.target.value })}
                rows={3}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='cs-tech'>Tech stack (comma-separated)</Label>
              <Input
                id='cs-tech'
                value={form.techStackText}
                onChange={(e) => patch({ techStackText: e.target.value })}
                placeholder='React, Node.js, AWS'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='cs-metrics'>Metrics (JSON)</Label>
              <Textarea
                id='cs-metrics'
                value={form.metricsText}
                onChange={(e) => patch({ metricsText: e.target.value })}
                rows={4}
                placeholder='[{"value":"40%","label":"Cost reduction"}]'
              />
            </div>
            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='space-y-2'>
                <Label>Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(value) =>
                    patch({ status: value as CaseStudyInput['status'] })
                  }
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='draft'>Draft</SelectItem>
                    <SelectItem value='published'>Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='cs-published'>Published at</Label>
                <Input
                  id='cs-published'
                  type='datetime-local'
                  value={form.publishedAt ?? ''}
                  onChange={(e) => patch({ publishedAt: e.target.value || null })}
                />
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Checkbox
                id='cs-featured'
                checked={form.featured}
                onCheckedChange={(checked) => patch({ featured: checked === true })}
              />
              <Label htmlFor='cs-featured' className='font-normal'>
                Featured
              </Label>
            </div>
          </div>

          <SheetFooter className='flex-row gap-2'>
            <Button variant='outline' onClick={() => setSheetOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {editingId ? 'Save changes' : 'Create'}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
