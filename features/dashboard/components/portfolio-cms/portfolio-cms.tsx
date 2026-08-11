'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import type { PortfolioProjectDto } from '@/db/queries/portfolio';
import { Button } from '@/components/ui/button';
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
  createPortfolioProject,
  deletePortfolioProject,
  listPortfolioProjects,
  updatePortfolioProject,
  type PortfolioProjectInput,
} from '@/lib/api/portfolio';
import { portfolioKeys } from '@/lib/api/query-keys';
import { slugify } from '@/lib/slugify';
import { actionToast, runWithActionToast } from '@/lib/toast-action';

type PortfolioFormState = PortfolioProjectInput & { slugManual: boolean };

const emptyForm = (): PortfolioFormState => ({
  title: '',
  slug: '',
  description: '',
  category: '',
  image: '',
  href: '/case-studies',
  projectDate: '',
  status: 'draft',
  slugManual: false,
});

function toForm(item: PortfolioProjectDto): PortfolioFormState {
  return {
    title: item.title,
    slug: item.slug,
    description: item.description,
    category: item.category,
    image: item.image,
    href: item.href,
    projectDate: item.projectDate,
    status: item.status as PortfolioProjectInput['status'],
    slugManual: true,
  };
}

function toPayload(form: PortfolioFormState): PortfolioProjectInput {
  const { slugManual: _, ...rest } = form;
  return rest;
}

export function PortfolioCms() {
  const queryClient = useQueryClient();
  const { data: items } = useSuspenseQuery({
    queryKey: portfolioKeys.admin(),
    queryFn: listPortfolioProjects,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: portfolioKeys.all });

  const createItem = useMutation({
    mutationFn: createPortfolioProject,
    onSuccess: invalidate,
  });
  const updateItem = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: PortfolioProjectInput }) =>
      updatePortfolioProject(id, payload),
    onSuccess: invalidate,
  });
  const removeItem = useMutation({
    mutationFn: deletePortfolioProject,
    onSuccess: invalidate,
  });

  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<PortfolioFormState>(emptyForm);

  useEffect(() => {
    if (!sheetOpen) return;
    if (!editingId && !form.slugManual && form.title) {
      setForm((prev) => ({ ...prev, slug: slugify(prev.title) }));
    }
  }, [form.title, form.slugManual, editingId, sheetOpen]);

  function patch(partial: Partial<PortfolioFormState>) {
    setForm((prev) => ({ ...prev, ...partial }));
  }

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm());
    setSheetOpen(true);
  }

  function openEdit(item: PortfolioProjectDto) {
    setEditingId(item.id);
    setForm(toForm(item));
    setSheetOpen(true);
  }

  async function handleSave() {
    const payload = toPayload(form);
    if (editingId) {
      await runWithActionToast(
        () => updateItem.mutateAsync({ id: editingId, payload }),
        actionToast.updating('portfolio project')
      );
    } else {
      await runWithActionToast(
        () => createItem.mutateAsync(payload),
        actionToast.adding('portfolio project')
      );
    }
    setSheetOpen(false);
  }

  async function handleDelete(item: PortfolioProjectDto) {
    await runWithActionToast(
      () => removeItem.mutateAsync(item.id),
      actionToast.deleting('portfolio project')
    );
  }

  const saving = createItem.isPending || updateItem.isPending;

  return (
    <>
      <EntityListCms
        title='Portfolio'
        description='Manage portfolio projects.'
        items={items}
        createLabel='New project'
        emptyMessage='No portfolio projects yet.'
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
            <SheetTitle>{editingId ? 'Edit project' : 'New project'}</SheetTitle>
          </SheetHeader>

          <div className='space-y-4 px-4'>
            <div className='space-y-2'>
              <Label htmlFor='pf-title'>Title</Label>
              <Input
                id='pf-title'
                value={form.title}
                onChange={(e) => patch({ title: e.target.value })}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='pf-slug'>Slug</Label>
              <Input
                id='pf-slug'
                value={form.slug}
                onChange={(e) => patch({ slug: e.target.value, slugManual: true })}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='pf-description'>Description</Label>
              <Textarea
                id='pf-description'
                value={form.description}
                onChange={(e) => patch({ description: e.target.value })}
                rows={4}
              />
            </div>
            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='pf-category'>Category</Label>
                <Input
                  id='pf-category'
                  value={form.category}
                  onChange={(e) => patch({ category: e.target.value })}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='pf-date'>Project date</Label>
                <Input
                  id='pf-date'
                  value={form.projectDate}
                  onChange={(e) => patch({ projectDate: e.target.value })}
                  placeholder='2024'
                />
              </div>
            </div>
            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='pf-image'>Image URL</Label>
                <Input
                  id='pf-image'
                  value={form.image}
                  onChange={(e) => patch({ image: e.target.value })}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='pf-href'>Link</Label>
                <Input
                  id='pf-href'
                  value={form.href}
                  onChange={(e) => patch({ href: e.target.value })}
                />
              </div>
            </div>
            <div className='space-y-2'>
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(value) =>
                  patch({ status: value as PortfolioProjectInput['status'] })
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
