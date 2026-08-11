'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import type { JobOpeningDto } from '@/db/queries/jobs';
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
  createJob,
  deleteJob,
  listJobs,
  updateJob,
  type JobOpeningInput,
} from '@/lib/api/jobs';
import { jobKeys } from '@/lib/api/query-keys';
import { slugify } from '@/lib/slugify';
import { actionToast, runWithActionToast } from '@/lib/toast-action';

type JobFormState = JobOpeningInput & { slugManual: boolean };

const emptyForm = (): JobFormState => ({
  title: '',
  slug: '',
  department: '',
  type: '',
  location: '',
  description: '',
  applyHref: '/careers#apply',
  status: 'draft',
  slugManual: false,
});

function toForm(item: JobOpeningDto): JobFormState {
  return {
    title: item.title,
    slug: item.slug,
    department: item.department,
    type: item.type,
    location: item.location,
    description: item.description,
    applyHref: item.applyHref,
    status: item.status as JobOpeningInput['status'],
    slugManual: true,
  };
}

function toPayload(form: JobFormState): JobOpeningInput {
  const { slugManual: _, ...rest } = form;
  return rest;
}

export function JobsCms() {
  const queryClient = useQueryClient();
  const { data: items } = useSuspenseQuery({
    queryKey: jobKeys.admin(),
    queryFn: listJobs,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: jobKeys.all });

  const createItem = useMutation({ mutationFn: createJob, onSuccess: invalidate });
  const updateItem = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: JobOpeningInput }) =>
      updateJob(id, payload),
    onSuccess: invalidate,
  });
  const removeItem = useMutation({ mutationFn: deleteJob, onSuccess: invalidate });

  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<JobFormState>(emptyForm);

  useEffect(() => {
    if (!sheetOpen) return;
    if (!editingId && !form.slugManual && form.title) {
      setForm((prev) => ({ ...prev, slug: slugify(prev.title) }));
    }
  }, [form.title, form.slugManual, editingId, sheetOpen]);

  function patch(partial: Partial<JobFormState>) {
    setForm((prev) => ({ ...prev, ...partial }));
  }

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm());
    setSheetOpen(true);
  }

  function openEdit(item: JobOpeningDto) {
    setEditingId(item.id);
    setForm(toForm(item));
    setSheetOpen(true);
  }

  async function handleSave() {
    const payload = toPayload(form);
    if (editingId) {
      await runWithActionToast(
        () => updateItem.mutateAsync({ id: editingId, payload }),
        actionToast.updating('job')
      );
    } else {
      await runWithActionToast(
        () => createItem.mutateAsync(payload),
        actionToast.adding('job')
      );
    }
    setSheetOpen(false);
  }

  async function handleDelete(item: JobOpeningDto) {
    await runWithActionToast(
      () => removeItem.mutateAsync(item.id),
      actionToast.deleting('job')
    );
  }

  const saving = createItem.isPending || updateItem.isPending;

  return (
    <>
      <EntityListCms
        title='Jobs'
        description='Manage job openings.'
        items={items}
        createLabel='New job'
        emptyMessage='No job openings yet.'
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
            header: 'Department',
            searchValue: (p) => p.department,
            cell: (p) => p.department,
          },
          {
            header: 'Location',
            searchValue: (p) => p.location,
            cell: (p) => p.location,
          },
          {
            header: 'Status',
            searchValue: (p) => p.status,
            cell: (p) => <StatusBadge status={p.status} />,
          },
        ]}
      />

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side='right' className='w-full overflow-y-auto sm:max-w-lg'>
          <SheetHeader>
            <SheetTitle>{editingId ? 'Edit job' : 'New job'}</SheetTitle>
          </SheetHeader>

          <div className='space-y-4 px-4'>
            <div className='space-y-2'>
              <Label htmlFor='job-title'>Title</Label>
              <Input
                id='job-title'
                value={form.title}
                onChange={(e) => patch({ title: e.target.value })}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='job-slug'>Slug</Label>
              <Input
                id='job-slug'
                value={form.slug}
                onChange={(e) => patch({ slug: e.target.value, slugManual: true })}
              />
            </div>
            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='job-department'>Department</Label>
                <Input
                  id='job-department'
                  value={form.department}
                  onChange={(e) => patch({ department: e.target.value })}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='job-type'>Type</Label>
                <Input
                  id='job-type'
                  value={form.type}
                  onChange={(e) => patch({ type: e.target.value })}
                  placeholder='Full-time'
                />
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='job-location'>Location</Label>
              <Input
                id='job-location'
                value={form.location}
                onChange={(e) => patch({ location: e.target.value })}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='job-description'>Description</Label>
              <Textarea
                id='job-description'
                value={form.description}
                onChange={(e) => patch({ description: e.target.value })}
                rows={6}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='job-apply'>Apply link</Label>
              <Input
                id='job-apply'
                value={form.applyHref}
                onChange={(e) => patch({ applyHref: e.target.value })}
              />
            </div>
            <div className='space-y-2'>
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(value) =>
                  patch({ status: value as JobOpeningInput['status'] })
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
