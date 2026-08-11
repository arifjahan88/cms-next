'use client';

import { createElement } from 'react';
import { toast } from '@/lib/toast';
import {
  Menu,
  MoreHorizontal,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { NavMenu } from '@/features/dashboard/data/navigation-cms';
import { cn } from '@/lib/utils';

function menuIcon(slug: string): LucideIcon {
  if (slug === 'mobile') return Smartphone;
  return Menu;
}

function MenuCard({
  menu,
  isActive,
  onSelect,
}: {
  menu: NavMenu;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <li
      className={cn(
        'list-none rounded-xl border bg-card p-3',
        isActive && 'border-primary/40 bg-primary/5',
        !isActive && 'hover:bg-muted/30'
      )}
    >
      <div className='flex items-start gap-2'>
        <button
          type='button'
          onClick={onSelect}
          className='flex min-w-0 flex-1 gap-2.5 text-left'
        >
          <span
            className={cn(
              'flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground',
              isActive && 'bg-primary/10 text-primary'
            )}
          >
            {createElement(menuIcon(menu.slug), { className: 'size-4' })}
          </span>
          <span className='min-w-0 flex-1'>
            <span className='flex flex-wrap items-center gap-2'>
              <span className='text-sm font-bold'>{menu.title}</span>
              <Badge
                variant='secondary'
                className={cn(
                  'h-5 border-0 px-1.5 text-[10px]',
                  menu.status === 'Published'
                    ? 'bg-emerald-500/15 text-emerald-700'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {menu.status}
              </Badge>
            </span>
            <span className='mt-0.5 block text-xs text-muted-foreground'>
              {menu.description}
            </span>
          </span>
        </button>
        <button
          type='button'
          className='rounded-md p-1 text-muted-foreground hover:bg-muted'
          onClick={() =>
            toast.info({
              title: 'System menu',
              description: 'Title and status are edited via Save Draft / Publish.',
            })
          }
          aria-label='Menu options'
        >
          <MoreHorizontal className='size-4' />
        </button>
      </div>
    </li>
  );
}

export function MenusList({
  menus,
  activeMenuId,
  onSelect,
}: {
  menus: NavMenu[];
  activeMenuId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <Card className='border-border/80 shadow-sm'>
      <CardHeader className='pb-3'>
        <CardTitle className='text-base font-bold'>Menus</CardTitle>
        <p className='text-xs text-muted-foreground'>
          System menus (Main, Footer, Mobile). Item editing is available on the
          right.
        </p>
      </CardHeader>
      <CardContent>
        <ul className='flex flex-col gap-2'>
          {menus.map((menu) => (
            <MenuCard
              key={menu.id}
              menu={menu}
              isActive={menu.id === activeMenuId}
              onSelect={() => onSelect(menu.id)}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
