'use client';

import { useMemo, useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { PUBLIC_PAGES, type PageSlug } from '@/features/dashboard/data/public-pages';
import { useUpdatePageSeoMutation } from '@/features/dashboard/hooks/seo/use-seo-settings-mutations';
import { useSeoSettingsSuspenseQuery } from '@/features/dashboard/hooks/seo/use-seo-settings-query';
import { actionToast, runWithActionToast } from '@/lib/toast-action';

type SeoRowState = {
  title: string;
  description: string;
  ogImage: string;
  noIndex: boolean;
};

function SeoPageRow({
  slug,
  label,
  defaults,
  initial,
}: {
  slug: PageSlug;
  label: string;
  defaults: { title: string; description: string };
  initial: SeoRowState;
}) {
  const [form, setForm] = useState<SeoRowState>(initial);
  const updateSeo = useUpdatePageSeoMutation();

  function patch(partial: Partial<SeoRowState>) {
    setForm((prev) => ({ ...prev, ...partial }));
  }

  async function handleSave() {
    await runWithActionToast(
      () =>
        updateSeo.mutateAsync({
          slug,
          payload: {
            title: form.title.trim() || defaults.title,
            description: form.description.trim() || defaults.description,
            ogImage: form.ogImage.trim() || null,
            noIndex: form.noIndex,
          },
        }),
      actionToast.updating('SEO settings')
    );
  }

  return (
    <TableRow>
      <TableCell className='align-top font-medium whitespace-normal'>{label}</TableCell>
      <TableCell className='align-top whitespace-normal'>
        <Input
          value={form.title}
          onChange={(e) => patch({ title: e.target.value })}
          placeholder={defaults.title}
        />
      </TableCell>
      <TableCell className='align-top whitespace-normal'>
        <Textarea
          value={form.description}
          onChange={(e) => patch({ description: e.target.value })}
          placeholder={defaults.description}
          rows={3}
        />
      </TableCell>
      <TableCell className='align-top whitespace-normal'>
        <Input
          value={form.ogImage}
          onChange={(e) => patch({ ogImage: e.target.value })}
          placeholder='https://…'
        />
      </TableCell>
      <TableCell className='align-top'>
        <div className='flex items-center gap-2'>
          <Checkbox
            id={`noindex-${slug}`}
            checked={form.noIndex}
            onCheckedChange={(checked) => patch({ noIndex: checked === true })}
          />
          <Label htmlFor={`noindex-${slug}`} className='text-sm font-normal'>
            No index
          </Label>
        </div>
      </TableCell>
      <TableCell className='align-top text-right'>
        <Button size='sm' onClick={handleSave} disabled={updateSeo.isPending}>
          <Save data-icon='inline-start' />
          Save
        </Button>
      </TableCell>
    </TableRow>
  );
}

export function SeoSettingsCms() {
  const { data: settings } = useSeoSettingsSuspenseQuery();

  const rows = useMemo(() => {
    return PUBLIC_PAGES.map((page) => {
      const seo = settings.find((s) => s.pageSlug === page.slug);
      return {
        slug: page.slug,
        label: page.label,
        defaults: {
          title: page.defaultTitle,
          description: page.defaultDescription,
        },
        initial: {
          title: seo?.title ?? page.defaultTitle,
          description: seo?.description ?? page.defaultDescription,
          ogImage: seo?.ogImage ?? '',
          noIndex: seo?.noIndex ?? false,
        },
      };
    });
  }, [settings]);

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>SEO Settings</h1>
        <p className='mt-1 text-sm text-muted-foreground'>
          Manage meta titles, descriptions, and Open Graph settings for public pages.
        </p>
      </div>

      <div className='rounded-lg border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Page</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>OG Image</TableHead>
              <TableHead>No Index</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <SeoPageRow
                key={row.slug}
                slug={row.slug}
                label={row.label}
                defaults={row.defaults}
                initial={row.initial}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
