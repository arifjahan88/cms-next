'use client';

import { createElement, useState, type ReactNode } from 'react';
import { Reorder, useDragControls } from 'motion/react';
import { ChevronDown, ChevronRight, GripVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { MenuItem } from '@/features/dashboard/data/navigation-cms';
import { getIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';

const reorderSpring = {
  type: 'spring' as const,
  stiffness: 420,
  damping: 32,
  mass: 0.65,
};

export function MenuItemRow({
  item,
  depth = 0,
  isActive,
  expanded,
  onToggleExpand,
  onSelect,
  children,
}: {
  item: MenuItem;
  depth?: number;
  isActive: boolean;
  expanded?: boolean;
  onToggleExpand?: () => void;
  onSelect: () => void;
  children?: ReactNode;
}) {
  const controls = useDragControls();
  const [dragging, setDragging] = useState(false);
  const hasChildren = Boolean(item.children?.length);

  return (
    <Reorder.Item
      value={item}
      as='li'
      layout
      initial={false}
      dragListener={false}
      dragControls={controls}
      dragElastic={0.08}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      transition={reorderSpring}
      whileDrag={{
        scale: 1.02,
        boxShadow: '0 12px 28px -8px rgba(15, 23, 42, 0.16), 0 0 0 1px rgba(15, 23, 42, 0.06)',
        cursor: 'grabbing',
      }}
      style={{
        position: 'relative',
        zIndex: dragging ? 20 : 0,
        borderRadius: 10,
        marginLeft: depth * 16,
      }}
      className='list-none'
    >
      <div
        className={cn(
          'flex items-center gap-2 border bg-card px-2.5 py-2.5 outline-none',
          dragging && 'border-primary/50 bg-background',
          !dragging && isActive && 'border-primary/40 bg-primary/5',
          !dragging && !isActive && 'border-border hover:bg-muted/40',
          'rounded-[inherit]'
        )}
      >
        <button
          type='button'
          aria-label={`Drag ${item.label}`}
          className={cn(
            'flex size-7 shrink-0 touch-none items-center justify-center rounded-md text-muted-foreground',
            'cursor-grab active:cursor-grabbing hover:bg-muted',
            dragging && 'bg-primary/10 text-primary'
          )}
          onPointerDown={(e) => {
            e.preventDefault();
            controls.start(e);
          }}
        >
          <GripVertical className='size-3.5' />
        </button>

        <button
          type='button'
          onClick={onSelect}
          className='flex min-w-0 flex-1 items-center gap-2 text-left'
        >
          <span
            className={cn(
              'flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground',
              isActive && 'bg-primary/10 text-primary'
            )}
          >
            {createElement(getIcon(item.icon), { className: 'size-3.5' })}
          </span>
          <span className='min-w-0 flex-1 truncate text-sm font-semibold'>{item.label}</span>
          <Badge
            variant='secondary'
            className={cn(
              'h-5 shrink-0 border-0 px-1.5 text-[10px]',
              item.status === 'Published'
                ? 'bg-emerald-500/15 text-emerald-700'
                : 'bg-muted text-muted-foreground'
            )}
          >
            {item.status}
          </Badge>
        </button>

        {hasChildren ? (
          <button
            type='button'
            aria-label={expanded ? 'Collapse' : 'Expand'}
            className='flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted'
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand?.();
            }}
          >
            {expanded ? (
              <ChevronDown className='size-3.5' />
            ) : (
              <ChevronRight className='size-3.5' />
            )}
          </button>
        ) : (
          <span className='size-7 shrink-0' />
        )}
      </div>
      {children}
    </Reorder.Item>
  );
}
