'use client';

import { LayoutTemplate } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GenericJsonEditor } from '@/features/dashboard/components/pages-cms/generic-json-editor';
import type { PageSectionMeta } from '@/features/dashboard/data/page-seeds';

export function PageSectionEditPanel({
  section,
  content,
  onContentChange,
  onMetaChange,
}: {
  section: PageSectionMeta;
  content: Record<string, unknown>;
  onContentChange: (id: string, next: unknown) => void;
  onMetaChange: (patch: Partial<PageSectionMeta>) => void;
}) {
  return (
    <Card className='border-border/80 shadow-sm'>
      <CardHeader className='flex flex-row items-start justify-between gap-2 space-y-0 pb-3'>
        <div className='flex items-center gap-2'>
          <span className='flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary'>
            <LayoutTemplate className='size-4' />
          </span>
          <div>
            <div className='flex flex-wrap items-center gap-2'>
              <CardTitle className='text-base font-bold'>{section.title}</CardTitle>
              <Badge
                variant='secondary'
                className={
                  section.status === 'Published'
                    ? 'border-0 bg-emerald-500/15 text-emerald-700'
                    : 'border-0'
                }
              >
                {section.status}
              </Badge>
            </div>
            <p className='text-xs text-muted-foreground'>ID: {section.id}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='content'>
          <TabsList className='mb-4 w-full justify-start'>
            <TabsTrigger value='content'>Content</TabsTrigger>
            <TabsTrigger value='settings'>Settings</TabsTrigger>
            <TabsTrigger value='visibility'>Visibility</TabsTrigger>
          </TabsList>

          <TabsContent value='content'>
            <GenericJsonEditor
              value={content[section.id] ?? {}}
              onChange={(next) => onContentChange(section.id, next)}
            />
          </TabsContent>

          <TabsContent value='settings' className='space-y-4'>
            <div className='space-y-1.5'>
              <Label>Section label</Label>
              <Input
                value={section.title}
                onChange={(e) => onMetaChange({ title: e.target.value })}
              />
            </div>
            <div className='space-y-1.5'>
              <Label>Status</Label>
              <select
                className='flex h-9 w-full rounded-lg border bg-background px-3 text-sm'
                value={section.status}
                onChange={(e) =>
                  onMetaChange({
                    status: e.target.value as PageSectionMeta['status'],
                  })
                }
              >
                <option value='Published'>Published</option>
                <option value='Draft'>Draft</option>
              </select>
            </div>
          </TabsContent>

          <TabsContent value='visibility' className='space-y-3'>
            <label className='flex items-center gap-2 text-sm'>
              <Checkbox
                checked={section.visible}
                onCheckedChange={(checked) => onMetaChange({ visible: checked === true })}
              />
              Visible on public page
            </label>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
