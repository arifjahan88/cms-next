'use client';

import { useState } from 'react';
import { Reorder } from 'motion/react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MenuItemRow } from '@/features/dashboard/components/navigation-cms/shared/menu-item-row';
import type { MenuItem, NavMenu } from '@/features/dashboard/data/navigation-cms';
import { useReorderOnDrop } from '@/hooks/use-reorder-on-drop';

function TreeBranch({
  items,
  parentId,
  depth,
  activeItemId,
  expanded,
  onToggle,
  onSelect,
  onReorderComplete,
}: {
  items: MenuItem[];
  parentId: string | null;
  depth: number;
  activeItemId: string | null;
  expanded: Record<string, boolean>;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
  onReorderComplete: (parentId: string | null, next: MenuItem[]) => void;
}) {
  const { orderedItems, onReorder, onDragEnd } = useReorderOnDrop(
    items,
    (next) => onReorderComplete(parentId, next),
    (item) => item.id
  );

  return (
    <Reorder.Group
      as='ul'
      axis='y'
      values={orderedItems}
      onReorder={onReorder}
      className='flex flex-col gap-2'
    >
      {orderedItems.map((item) => {
        const isOpen = expanded[item.id] ?? false;
        const children = item.children ?? [];
        const hasChildren = children.length > 0;

        return (
          <MenuItemRow
            key={item.id}
            item={item}
            depth={depth}
            isActive={item.id === activeItemId}
            expanded={isOpen}
            onToggleExpand={() => onToggle(item.id)}
            onSelect={() => onSelect(item.id)}
            onDragEnd={onDragEnd}
          >
            {hasChildren && isOpen ? (
              <div className='mt-2 w-full'>
                <TreeBranch
                  items={children}
                  parentId={item.id}
                  depth={depth + 1}
                  activeItemId={activeItemId}
                  expanded={expanded}
                  onToggle={onToggle}
                  onSelect={onSelect}
                  onReorderComplete={onReorderComplete}
                />
              </div>
            ) : null}
          </MenuItemRow>
        );
      })}
    </Reorder.Group>
  );
}

export function MenuStructure({
  menu,
  activeItemId,
  onSelectItem,
  onReorderComplete,
  onAddItem,
}: {
  menu: NavMenu;
  activeItemId: string | null;
  onSelectItem: (id: string) => void;
  onReorderComplete: (parentId: string | null, items: MenuItem[]) => void;
  onAddItem: () => void;
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const item of menu.items) {
      if (item.children?.length) init[item.id] = true;
    }
    return init;
  });

  return (
    <Card className='border-border/80 shadow-sm'>
      <CardHeader className='pb-3'>
        <CardTitle className='text-base font-bold'>{menu.title}</CardTitle>
        <p className='text-xs text-muted-foreground'>Last updated: {menu.updatedAt}</p>
      </CardHeader>
      <CardContent>
        <TreeBranch
          items={menu.items}
          parentId={null}
          depth={0}
          activeItemId={activeItemId}
          expanded={expanded}
          onToggle={(id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))}
          onSelect={onSelectItem}
          onReorderComplete={onReorderComplete}
        />
        <Button
          variant='outline'
          className='mt-3 h-10 w-full border-dashed border-primary/40 text-primary'
          onClick={onAddItem}
        >
          <Plus data-icon='inline-start' />
          Add Menu Item
        </Button>
      </CardContent>
    </Card>
  );
}
