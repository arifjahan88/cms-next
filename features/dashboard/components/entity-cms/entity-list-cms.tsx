'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

export type EntityColumn<T extends { id: string }> = {
  header: string;
  cell: (item: T) => ReactNode;
  searchValue?: (item: T) => string;
};

type EntityListCmsProps<T extends { id: string }> = {
  title: string;
  description?: string;
  items: T[];
  columns: EntityColumn<T>[];
  onCreate?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  emptyMessage?: string;
  createLabel?: string;
};

export function statusBadgeVariant(status: string) {
  const normalized = status.toLowerCase();
  if (normalized === 'published' || normalized === 'confirmed') {
    return 'bg-emerald-500/15 text-emerald-700';
  }
  if (normalized === 'archived') {
    return 'bg-muted text-muted-foreground';
  }
  if (normalized === 'read') {
    return 'bg-blue-500/15 text-blue-700';
  }
  if (normalized === 'new') {
    return 'bg-amber-500/15 text-amber-700';
  }
  return 'bg-muted text-muted-foreground';
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant='secondary' className={cn('border-0 capitalize', statusBadgeVariant(status))}>
      {status}
    </Badge>
  );
}

export function EntityListCms<T extends { id: string }>({
  title,
  description,
  items,
  columns,
  onCreate,
  onEdit,
  onDelete,
  emptyMessage = 'No items yet.',
  createLabel = 'Create',
}: EntityListCmsProps<T>) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;

    return items.filter((item) =>
      columns.some((col) => col.searchValue?.(item)?.toLowerCase().includes(q))
    );
  }, [columns, items, query]);

  function handleDelete(item: T) {
    if (!onDelete) return;
    if (!window.confirm('Delete this item? This cannot be undone.')) return;
    onDelete(item);
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>{title}</h1>
          {description ? (
            <p className='mt-1 text-sm text-muted-foreground'>{description}</p>
          ) : null}
        </div>
        {onCreate ? (
          <Button onClick={onCreate}>
            <Plus data-icon='inline-start' />
            {createLabel}
          </Button>
        ) : null}
      </div>

      <div className='relative max-w-sm'>
        <Search className='pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground' />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search…'
          className='pl-8'
        />
      </div>

      <div className='rounded-lg border'>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.header}>{col.header}</TableHead>
              ))}
              {onEdit || onDelete ? <TableHead className='w-28 text-right'>Actions</TableHead> : null}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                  className='h-24 text-center text-muted-foreground'
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((item) => (
                <TableRow key={item.id}>
                  {columns.map((col) => (
                    <TableCell key={col.header}>{col.cell(item)}</TableCell>
                  ))}
                  {onEdit || onDelete ? (
                    <TableCell className='text-right'>
                      <div className='flex justify-end gap-1'>
                        {onEdit ? (
                          <Button variant='ghost' size='icon-sm' onClick={() => onEdit(item)}>
                            <Pencil />
                            <span className='sr-only'>Edit</span>
                          </Button>
                        ) : null}
                        {onDelete ? (
                          <Button
                            variant='ghost'
                            size='icon-sm'
                            className='text-destructive hover:text-destructive'
                            onClick={() => handleDelete(item)}
                          >
                            <Trash2 />
                            <span className='sr-only'>Delete</span>
                          </Button>
                        ) : null}
                      </div>
                    </TableCell>
                  ) : null}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
