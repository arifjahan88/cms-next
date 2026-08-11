'use client';

import { useEffect, useState } from 'react';
import type { BlogPostDto } from '@/db/queries/blog';
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
  useCreateBlogPostMutation,
  useDeleteBlogPostMutation,
  useUpdateBlogPostMutation,
} from '@/features/dashboard/hooks/blog/use-blog-mutations';
import { useBlogSuspenseQuery } from '@/features/dashboard/hooks/blog/use-blog-query';
import type { BlogPostInput } from '@/lib/api/blog';
import { slugify } from '@/lib/slugify';
import { actionToast, runWithActionToast } from '@/lib/toast-action';

type BlogFormState = BlogPostInput & { slugManual: boolean };

const emptyForm = (): BlogFormState => ({
  title: '',
  slug: '',
  excerpt: '',
  body: '',
  category: '',
  author: '',
  image: '',
  readTime: '5 min',
  featured: false,
  status: 'draft',
  publishedAt: null,
  slugManual: false,
});

function toForm(post: BlogPostDto): BlogFormState {
  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    body: post.body,
    category: post.category,
    author: post.author,
    image: post.image,
    readTime: post.readTime,
    featured: post.featured,
    status: post.status as BlogPostInput['status'],
    publishedAt: post.publishedAt
      ? new Date(post.publishedAt).toISOString().slice(0, 16)
      : null,
    slugManual: true,
  };
}

function toPayload(form: BlogFormState): BlogPostInput {
  const { slugManual: _, ...rest } = form;
  return rest;
}

export function BlogCms() {
  const { data: posts } = useBlogSuspenseQuery();
  const createPost = useCreateBlogPostMutation();
  const updatePost = useUpdateBlogPostMutation();
  const deletePost = useDeleteBlogPostMutation();

  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<BlogFormState>(emptyForm);

  useEffect(() => {
    if (!sheetOpen) return;
    if (!editingId && !form.slugManual && form.title) {
      setForm((prev) => ({ ...prev, slug: slugify(prev.title) }));
    }
  }, [form.title, form.slugManual, editingId, sheetOpen]);

  function patch(partial: Partial<BlogFormState>) {
    setForm((prev) => ({ ...prev, ...partial }));
  }

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm());
    setSheetOpen(true);
  }

  function openEdit(post: BlogPostDto) {
    setEditingId(post.id);
    setForm(toForm(post));
    setSheetOpen(true);
  }

  async function handleSave() {
    const payload = toPayload(form);
    if (editingId) {
      await runWithActionToast(
        () => updatePost.mutateAsync({ id: editingId, payload }),
        actionToast.updating('blog post')
      );
    } else {
      await runWithActionToast(
        () => createPost.mutateAsync(payload),
        actionToast.adding('blog post')
      );
    }
    setSheetOpen(false);
  }

  async function handleDelete(post: BlogPostDto) {
    await runWithActionToast(
      () => deletePost.mutateAsync(post.id),
      actionToast.deleting('blog post')
    );
  }

  const saving = createPost.isPending || updatePost.isPending;

  return (
    <>
      <EntityListCms
        title='Blog'
        description='Create and manage blog posts.'
        items={posts}
        createLabel='New post'
        emptyMessage='No blog posts yet.'
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
            <SheetTitle>{editingId ? 'Edit post' : 'New post'}</SheetTitle>
          </SheetHeader>

          <div className='space-y-4 px-4'>
            <div className='space-y-2'>
              <Label htmlFor='blog-title'>Title</Label>
              <Input
                id='blog-title'
                value={form.title}
                onChange={(e) => patch({ title: e.target.value })}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='blog-slug'>Slug</Label>
              <Input
                id='blog-slug'
                value={form.slug}
                onChange={(e) => patch({ slug: e.target.value, slugManual: true })}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='blog-excerpt'>Excerpt</Label>
              <Textarea
                id='blog-excerpt'
                value={form.excerpt}
                onChange={(e) => patch({ excerpt: e.target.value })}
                rows={2}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='blog-body'>Body</Label>
              <Textarea
                id='blog-body'
                value={form.body}
                onChange={(e) => patch({ body: e.target.value })}
                rows={8}
              />
            </div>
            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='blog-category'>Category</Label>
                <Input
                  id='blog-category'
                  value={form.category}
                  onChange={(e) => patch({ category: e.target.value })}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='blog-author'>Author</Label>
                <Input
                  id='blog-author'
                  value={form.author}
                  onChange={(e) => patch({ author: e.target.value })}
                />
              </div>
            </div>
            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='blog-image'>Image URL</Label>
                <Input
                  id='blog-image'
                  value={form.image}
                  onChange={(e) => patch({ image: e.target.value })}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='blog-read-time'>Read time</Label>
                <Input
                  id='blog-read-time'
                  value={form.readTime}
                  onChange={(e) => patch({ readTime: e.target.value })}
                />
              </div>
            </div>
            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='space-y-2'>
                <Label>Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(value) =>
                    patch({ status: value as BlogPostInput['status'] })
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
                <Label htmlFor='blog-published'>Published at</Label>
                <Input
                  id='blog-published'
                  type='datetime-local'
                  value={form.publishedAt ?? ''}
                  onChange={(e) =>
                    patch({ publishedAt: e.target.value || null })
                  }
                />
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Checkbox
                id='blog-featured'
                checked={form.featured}
                onCheckedChange={(checked) => patch({ featured: checked === true })}
              />
              <Label htmlFor='blog-featured' className='font-normal'>
                Featured
              </Label>
            </div>
          </div>

          <SheetFooter className='flex-row gap-2'>
            <Button variant='outline' onClick={() => setSheetOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {editingId ? 'Save changes' : 'Create post'}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
