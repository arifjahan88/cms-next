'use client';

import { useState } from 'react';
import { Reorder } from 'motion/react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MenuItemRow } from '@/features/dashboard/components/navigation-cms/shared/menu-item-row';
import type { MenuItem, NavMenu } from '@/features/dashboard/data/navigation-cms';

function TreeBranch({
  items,
  depth,
  activeItemId,
  expanded,
  onToggle,
  onSelect,
  onReorder,
}: {
  items: MenuItem[];
  depth: number;
  activeItemId: string | null;
  expanded: Record<string, boolean>;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
  onReorder: (next: MenuItem[]) => void;
}) {
  return (
    <Reorder.Group
      as='ul'
      axis='y'
      values={items}
      onReorder={onReorder}
      className='flex flex-col gap-2'
    >
      {items.map((item) => {
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
          >
            {hasChildren && isOpen ? (
              <div className='mt-2 w-full'>
                <TreeBranch
                  items={children}
                  depth={depth + 1}
                  activeItemId={activeItemId}
                  expanded={expanded}
                  onToggle={onToggle}
                  onSelect={onSelect}
                  onReorder={(nextChildren) => {
                    onReorder(
                      items.map((row) =>
                        row.id === item.id ? { ...row, children: nextChildren } : row
                      )
                    );
                  }}
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
  onReorderItems,
  onAddItem,
}: {
  menu: NavMenu;
  activeItemId: string | null;
  onSelectItem: (id: string) => void;
  onReorderItems: (items: MenuItem[]) => void;
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
          depth={0}
          activeItemId={activeItemId}
          expanded={expanded}
          onToggle={(id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))}
          onSelect={onSelectItem}
          onReorder={onReorderItems}
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
