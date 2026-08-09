'use client';

import type { ReactNode } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function RepeatableList<T extends object>({
  title,
  items,
  onChange,
  createItem,
  renderItem,
  className,
}: {
  title: string;
  items: T[];
  onChange: (next: T[]) => void;
  createItem: () => T;
  renderItem: (item: T, index: number, update: (patch: Partial<T>) => void) => ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('space-y-3', className)}>
      <div className='flex items-center justify-between gap-2'>
        <p className='text-sm font-semibold'>{title}</p>
        <Button
          type='button'
          variant='outline'
          size='sm'
          className='h-8'
          onClick={() => onChange([...items, createItem()])}
        >
          <Plus data-icon='inline-start' />
          Add
        </Button>
      </div>
      <div className='space-y-3'>
        {items.map((item, index) => (
          <div key={index} className='space-y-3 rounded-lg border bg-muted/20 p-3'>
            <div className='flex items-center justify-between'>
              <span className='text-xs font-medium text-muted-foreground'>Item {index + 1}</span>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className='h-7 text-destructive'
                disabled={items.length <= 1}
                onClick={() => onChange(items.filter((_, i) => i !== index))}
              >
                <Trash2 data-icon='inline-start' />
                Remove
              </Button>
            </div>
            {renderItem(item, index, (patch) => {
              const next = items.map((row, i) => (i === index ? { ...row, ...patch } : row));
              onChange(next);
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
