'use client';

import { useState } from 'react';
import { Reorder, useDragControls } from 'motion/react';
import { toast } from '@/lib/toast';
import {
  Briefcase,
  Building2,
  ChevronRight,
  FolderKanban,
  GripVertical,
  Info,
  LayoutTemplate,
  Mail,
  MessageSquare,
  Plus,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { LandingSectionMeta } from '@/features/dashboard/data/landing-cms';
import { cn } from '@/lib/utils';

const sectionIcons: Record<string, LucideIcon> = {
  layout: LayoutTemplate,
  users: Users,
  info: Info,
  briefcase: Briefcase,
  building: Building2,
  folder: FolderKanban,
  message: MessageSquare,
  mail: Mail,
};

const reorderSpring = {
  type: 'spring' as const,
  stiffness: 420,
  damping: 32,
  mass: 0.65,
};

function SectionListItem({
  section,
  isActive,
  onSelect,
}: {
  section: LandingSectionMeta;
  isActive: boolean;
  onSelect: () => void;
}) {
  const controls = useDragControls();
  const [dragging, setDragging] = useState(false);
  const Icon = sectionIcons[section.icon] ?? LayoutTemplate;

  return (
    <Reorder.Item
      value={section}
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
        scale: 1.035,
        boxShadow: '0 12px 28px -8px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(15, 23, 42, 0.06)',
        cursor: 'grabbing',
      }}
      style={{
        position: 'relative',
        zIndex: dragging ? 20 : 0,
        borderRadius: 10,
      }}
      className={cn(
        'flex w-full list-none items-center gap-2 border bg-card px-2.5 py-2.5 text-left outline-none',
        dragging && 'border-primary/50 bg-background',
        !dragging && isActive && 'border-primary/40 bg-primary/5',
        !dragging && !isActive && 'border-border hover:bg-muted/40'
      )}
    >
      <button
        type='button'
        aria-label={`Drag ${section.title}`}
        className={cn(
          'flex size-8 shrink-0 touch-none items-center justify-center rounded-md text-muted-foreground',
          'cursor-grab active:cursor-grabbing',
          'hover:bg-muted hover:text-foreground',
          dragging && 'bg-primary/10 text-primary'
        )}
        onPointerDown={(e) => {
          e.preventDefault();
          controls.start(e);
        }}
      >
        <GripVertical className='size-4' />
      </button>
      <button
        type='button'
        onClick={onSelect}
        className='flex min-w-0 flex-1 items-center gap-2 text-left'
      >
        <span
          className={cn(
            'flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground',
            isActive && 'bg-primary/10 text-primary'
          )}
        >
          <Icon className='size-3.5' />
        </span>
        <span className='min-w-0 flex-1'>
          <span className='block truncate text-sm font-semibold'>{section.title}</span>
          <Badge
            variant='secondary'
            className={cn(
              'mt-1 h-5 border-0 px-1.5 text-[10px]',
              section.status === 'Published'
                ? 'bg-emerald-500/15 text-emerald-700'
                : 'bg-muted text-muted-foreground'
            )}
          >
            {section.status}
          </Badge>
        </span>
        <ChevronRight className='size-3.5 shrink-0 text-muted-foreground' />
      </button>
    </Reorder.Item>
  );
}

export function SectionsList({
  sections,
  activeId,
  onReorder,
  onSelect,
}: {
  sections: LandingSectionMeta[];
  activeId: string;
  onReorder: (next: LandingSectionMeta[]) => void;
  onSelect: (id: LandingSectionMeta['id']) => void;
}) {
  return (
    <Card className='border-border/80 shadow-sm'>
      <CardHeader className='pb-3'>
        <CardTitle className='text-base font-bold'>Sections</CardTitle>
        <p className='text-xs text-muted-foreground'>Reorder sections by drag & drop</p>
      </CardHeader>
      <CardContent>
        <Reorder.Group
          as='ul'
          axis='y'
          values={sections}
          onReorder={onReorder}
          layoutScroll
          className='flex flex-col gap-2'
        >
          {sections.map((section) => (
            <SectionListItem
              key={section.id}
              section={section}
              isActive={section.id === activeId}
              onSelect={() => onSelect(section.id)}
            />
          ))}
        </Reorder.Group>
        <Button
          variant='outline'
          className='mt-3 h-10 w-full border-dashed border-primary/40 text-primary'
          onClick={() => toast.info({ title: 'Add section coming soon' })}
        >
          <Plus data-icon='inline-start' />
          Add New Section
        </Button>
      </CardContent>
    </Card>
  );
}
