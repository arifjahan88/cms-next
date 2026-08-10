'use client';

import { useMemo, useState } from 'react';
import { toast } from '@/lib/toast';
import { ChevronDown, Eye, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EditMenuItem } from '@/features/dashboard/components/navigation-cms/edit-menu-item';
import { MenuStructure } from '@/features/dashboard/components/navigation-cms/menu-structure';
import { MenusList } from '@/features/dashboard/components/navigation-cms/menus-list';
import {
  createEmptyMenuItem,
  createNavigationDocument,
  findMenuItem,
  removeMenuItemFromTree,
  setChildrenForItem,
  updateMenuItemInTree,
  type MenuItem,
  type NavMenu,
} from '@/features/dashboard/data/navigation-cms';

export function NavigationCms() {
  const [menus, setMenus] = useState<NavMenu[]>(createNavigationDocument);
  const [activeMenuId, setActiveMenuId] = useState('main');
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const activeMenu = menus.find((m) => m.id === activeMenuId) ?? menus[0] ?? null;

  const activeItem = useMemo(() => {
    if (!activeMenu || !activeItemId) return null;
    return findMenuItem(activeMenu.items, activeItemId) ?? null;
  }, [activeMenu, activeItemId]);

  function patchActiveMenu(updater: (menu: NavMenu) => NavMenu) {
    setMenus((prev) => prev.map((m) => (m.id === activeMenuId ? updater(m) : m)));
  }

  function handleCreateMenu() {
    const id = `custom-${Date.now()}`;
    const menu: NavMenu = {
      id,
      title: 'New Menu',
      description: 'Custom navigation menu',
      status: 'Draft',
      updatedAt: 'Just now',
      items: [],
    };
    setMenus((prev) => [...prev, menu]);
    setActiveMenuId(id);
    setActiveItemId(null);
    toast.success({ title: 'Menu created as draft' });
  }

  function handleAddItem() {
    const item = createEmptyMenuItem('New Menu Item');
    patchActiveMenu((menu) => ({
      ...menu,
      items: [...menu.items, item],
      updatedAt: 'Just now',
      status: 'Draft',
    }));
    setActiveItemId(item.id);
    toast.info({ title: 'Menu item added' });
  }

  function handleItemChange(patch: Partial<MenuItem>) {
    if (!activeItemId) return;
    patchActiveMenu((menu) => ({
      ...menu,
      items: updateMenuItemInTree(menu.items, activeItemId, patch),
      updatedAt: 'Just now',
    }));
  }

  function handleDeleteItem() {
    if (!activeItemId) return;
    const id = activeItemId;
    patchActiveMenu((menu) => ({
      ...menu,
      items: removeMenuItemFromTree(menu.items, id),
      updatedAt: 'Just now',
      status: 'Draft',
    }));
    setActiveItemId(null);
  }

  function handleReorderChildren(children: MenuItem[]) {
    if (!activeItemId) return;
    patchActiveMenu((menu) => ({
      ...menu,
      items: setChildrenForItem(menu.items, activeItemId, children),
      updatedAt: 'Just now',
    }));
  }

  function handleAddChild() {
    if (!activeItemId) return;
    const child = createEmptyMenuItem('New Sub Item');
    patchActiveMenu((menu) => {
      const parent = findMenuItem(menu.items, activeItemId);
      const nextChildren = [...(parent?.children ?? []), child];
      return {
        ...menu,
        items: setChildrenForItem(menu.items, activeItemId, nextChildren),
        updatedAt: 'Just now',
        status: 'Draft',
      };
    });
    toast.info({ title: 'Sub item added' });
  }

  function handleSelectMenu(id: string) {
    setActiveMenuId(id);
    setActiveItemId(null);
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
        <div>
          <h2 className='text-xl font-bold tracking-tight md:text-2xl'>Navigation</h2>
          <p className='mt-1 text-sm text-muted-foreground'>
            Manage your website&apos;s navigation menus. Changes are saved as drafts.
          </p>
        </div>
        <div className='flex flex-wrap gap-2'>
          <Button
            variant='outline'
            size='sm'
            className='h-9'
            onClick={() => toast.info({ title: 'Preview opening…' })}
          >
            <Eye data-icon='inline-start' />
            Preview
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='h-9'
            onClick={() => toast.success({ title: 'Draft saved' })}
          >
            <Save data-icon='inline-start' />
            Save Draft
          </Button>
          <div className='flex'>
            <Button
              size='sm'
              className='h-9 rounded-r-none'
              onClick={() => toast.success({ title: 'Published successfully' })}
            >
              Publish
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    size='sm'
                    className='h-9 rounded-l-none border-l border-primary-foreground/20 px-2'
                    aria-label='Publish options'
                  />
                }
              >
                <ChevronDown className='size-3.5' />
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={() => toast.success({ title: 'Published all menus' })}>
                  Publish all menus
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success({ title: 'Published selected menu' })}>
                  Publish selected menu
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className='grid gap-4 xl:grid-cols-[0.9fr_1.15fr_1.1fr]'>
        <MenusList
          menus={menus}
          activeMenuId={activeMenuId}
          onReorder={setMenus}
          onSelect={handleSelectMenu}
          onCreate={handleCreateMenu}
        />
        {activeMenu ? (
          <MenuStructure
            key={activeMenu.id}
            menu={activeMenu}
            activeItemId={activeItemId}
            onSelectItem={setActiveItemId}
            onReorderItems={(items) =>
              patchActiveMenu((menu) => ({
                ...menu,
                items,
                updatedAt: 'Just now',
              }))
            }
            onAddItem={handleAddItem}
          />
        ) : null}
        <EditMenuItem
          item={activeItem}
          onChange={handleItemChange}
          onDelete={handleDeleteItem}
          onSelectChild={setActiveItemId}
          onReorderChildren={handleReorderChildren}
          onAddChild={handleAddChild}
          onSaveDraft={() => {
            handleItemChange({ status: 'Draft' });
            toast.success({ title: 'Saved as draft' });
          }}
          onUpdate={() => {
            handleItemChange({ status: 'Published' });
            toast.success({ title: 'Menu item updated' });
          }}
        />
      </div>

      <div className='rounded-lg border bg-muted/40 px-4 py-3 text-center text-sm text-muted-foreground'>
        Changes are saved as drafts. Click{' '}
        <span className='font-semibold text-foreground'>Publish</span> to make them live on your
        website.
      </div>
    </div>
  );
}
