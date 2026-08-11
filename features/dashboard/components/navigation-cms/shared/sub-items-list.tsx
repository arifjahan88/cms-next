'use client';

import { useState } from 'react';
import { Reorder, useDragControls } from 'motion/react';
import { GripVertical, MoreHorizontal, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { MenuItem } from '@/features/dashboard/data/navigation-cms';
import { useReorderOnDrop } from '@/hooks/use-reorder-on-drop';
import { cn } from '@/lib/utils';

const reorderSpring = {
  type: 'spring' as const,
  stiffness: 420,
  damping: 32,
  mass: 0.65,
};

function SubItemRow({
  item,
  onSelect,
  onDragEnd,
}: {
  item: MenuItem;
  onSelect: () => void;
  onDragEnd: () => void;
}) {
  const controls = useDragControls();
  const [dragging, setDragging] = useState(false);

  return (
    <Reorder.Item
      value={item}
      as='li'
      layout
      initial={false}
      dragListener={false}
      dragControls={controls}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => {
        setDragging(false);
        onDragEnd();
      }}
      transition={reorderSpring}
      whileDrag={{ scale: 1.02, boxShadow: '0 8px 20px rgba(15,23,42,0.12)' }}
      className={cn(
        'flex list-none items-center gap-2 rounded-lg border bg-background px-2.5 py-2',
        dragging && 'z-10 border-primary/40'
      )}
    >
      <button
        type='button'
        aria-label={`Drag ${item.label}`}
        className='flex size-6 shrink-0 touch-none cursor-grab items-center justify-center text-muted-foreground active:cursor-grabbing'
        onPointerDown={(e) => {
          e.preventDefault();
          controls.start(e);
        }}
      >
        <GripVertical className='size-3.5' />
      </button>
      <button type='button' onClick={onSelect} className='min-w-0 flex-1 text-left'>
        <p className='truncate text-sm font-medium'>{item.label}</p>
        <p className='truncate text-[11px] text-muted-foreground'>{item.href}</p>
      </button>
      <Badge
        variant='secondary'
        className={cn(
          'h-5 border-0 px-1.5 text-[10px]',
          item.status === 'Published'
            ? 'bg-emerald-500/15 text-emerald-700'
            : 'bg-muted text-muted-foreground'
        )}
      >
        {item.status}
      </Badge>
      <MoreHorizontal className='size-3.5 text-muted-foreground' />
    </Reorder.Item>
  );
}

export function SubItemsList({
  items,
  onReorderComplete,
  onSelect,
  onAdd,
}: {
  items: MenuItem[];
  onReorderComplete: (next: MenuItem[]) => void;
  onSelect: (id: string) => void;
  onAdd: () => void;
}) {
  const { orderedItems, onReorder, onDragEnd } = useReorderOnDrop(
    items,
    onReorderComplete,
    (item) => item.id
  );

  return (
    <div className='space-y-3 rounded-lg border p-3'>
      <div className='flex items-center justify-between gap-2'>
        <p className='text-sm font-semibold'>Sub Menu Items</p>
        <Button
          type='button'
          variant='link'
          size='sm'
          className='h-7 px-0 text-primary'
          onClick={onAdd}
        >
          <Plus data-icon='inline-start' />
          Add Sub Item
        </Button>
      </div>
      {orderedItems.length === 0 ? (
        <p className='text-xs text-muted-foreground'>No sub items yet.</p>
      ) : (
        <Reorder.Group
          as='ul'
          axis='y'
          values={orderedItems}
          onReorder={onReorder}
          className='flex flex-col gap-2'
        >
          {orderedItems.map((item) => (
            <SubItemRow
              key={item.id}
              item={item}
              onSelect={() => onSelect(item.id)}
              onDragEnd={onDragEnd}
            />
          ))}
        </Reorder.Group>
      )}
    </div>
  );
}
