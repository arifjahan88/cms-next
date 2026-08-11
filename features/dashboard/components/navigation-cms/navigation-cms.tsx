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
  findMenuItem,
  removeMenuItemFromTree,
  setChildrenForItem,
  updateMenuItemInTree,
  type MenuItem,
  type NavMenu,
} from '@/features/dashboard/data/navigation-cms';
import { useNavigationMenusSuspenseQuery } from '@/features/dashboard/hooks/navigation/use-navigation-menus-query';
import {
  useCreateMenuItemMutation,
  useDeleteMenuItemMutation,
  useReorderMenuItemsMutation,
  useUpdateMenuItemMutation,
  useUpdateMenuMutation,
} from '@/features/dashboard/hooks/navigation/use-navigation-mutations';

function itemPayload(item: MenuItem, status?: MenuItem['status']) {
  return {
    label: item.label,
    href: item.href,
    icon: item.icon,
    status: status ?? item.status,
    openIn: item.openIn,
    visible: item.visible,
    cssClass: item.cssClass,
    rel: item.rel,
    description: item.description,
  };
}

export function NavigationCms() {
  const { data: remoteMenus } = useNavigationMenusSuspenseQuery();
  const serverKey = remoteMenus
    .map((m) => `${m.id}:${m.updatedAt}:${m.items.length}`)
    .join('|');

  const [draft, setDraft] = useState<{
    serverKey: string;
    menus: NavMenu[];
  } | null>(null);

  const menus =
    draft?.serverKey === serverKey ? draft.menus : remoteMenus;

  const [activeMenuId, setActiveMenuId] = useState(
    () => remoteMenus[0]?.id ?? ''
  );
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const createItem = useCreateMenuItemMutation();
  const updateItem = useUpdateMenuItemMutation();
  const deleteItem = useDeleteMenuItemMutation();
  const reorderItems = useReorderMenuItemsMutation();
  const updateMenu = useUpdateMenuMutation();

  const activeMenu =
    menus.find((m) => m.id === activeMenuId) ?? menus[0] ?? null;

  const activeItem = useMemo(() => {
    if (!activeMenu || !activeItemId) return null;
    return findMenuItem(activeMenu.items, activeItemId) ?? null;
  }, [activeMenu, activeItemId]);

  function editableMenus(): NavMenu[] {
    return draft?.serverKey === serverKey
      ? draft.menus
      : structuredClone(remoteMenus);
  }

  function patchActiveMenu(updater: (menu: NavMenu) => NavMenu) {
    const base = editableMenus();
    const id = activeMenu?.id ?? activeMenuId;
    setDraft({
      serverKey,
      menus: base.map((m) => (m.id === id ? updater(m) : m)),
    });
  }

  function handleSelectMenu(id: string) {
    setActiveMenuId(id);
    setActiveItemId(null);
  }

  async function handleAddItem() {
    if (!activeMenu) return;
    try {
      const item = await createItem.mutateAsync({
        slug: activeMenu.slug,
        payload: {
          label: 'New Menu Item',
          href: '/',
          status: 'Draft',
          icon: 'layers',
        },
      });
      setActiveItemId(item.id);
      toast.info({ title: 'Menu item added' });
    } catch {
      /* toast in mutation */
    }
  }

  function handleItemChange(patch: Partial<MenuItem>) {
    if (!activeItemId) return;
    patchActiveMenu((menu) => ({
      ...menu,
      items: updateMenuItemInTree(menu.items, activeItemId, patch),
      updatedAt: 'Just now',
    }));
  }

  async function handleDeleteItem() {
    if (!activeItemId) return;
    const id = activeItemId;
    setActiveItemId(null);
    patchActiveMenu((menu) => ({
      ...menu,
      items: removeMenuItemFromTree(menu.items, id),
      updatedAt: 'Just now',
    }));
    await deleteItem.mutateAsync(id);
  }

  async function handleReorderSiblings(
    parentId: string | null,
    siblings: MenuItem[]
  ) {
    if (!activeMenu) return;

    if (parentId === null) {
      patchActiveMenu((menu) => ({
        ...menu,
        items: siblings,
        updatedAt: 'Just now',
      }));
    } else {
      patchActiveMenu((menu) => ({
        ...menu,
        items: setChildrenForItem(menu.items, parentId, siblings),
        updatedAt: 'Just now',
      }));
    }

    await reorderItems.mutateAsync({
      slug: activeMenu.slug,
      payload: {
        parentId,
        orderedIds: siblings.map((c) => c.id),
      },
    });
  }

  async function handleAddChild() {
    if (!activeItemId || !activeMenu) return;
    const isRoot = activeMenu.items.some((i) => i.id === activeItemId);
    if (!isRoot) {
      toast.error({ title: 'Cannot nest deeper than one submenu level' });
      return;
    }
    try {
      await createItem.mutateAsync({
        slug: activeMenu.slug,
        payload: {
          label: 'New Sub Item',
          href: '/',
          status: 'Draft',
          parentId: activeItemId,
          icon: 'layers',
        },
      });
      toast.info({ title: 'Sub item added' });
    } catch {
      /* toast in mutation */
    }
  }

  async function handleSaveItemDraft() {
    if (!activeItem) return;
    const next = { ...activeItem, status: 'Draft' as const };
    handleItemChange({ status: 'Draft' });
    await updateItem.mutateAsync({
      id: next.id,
      payload: itemPayload(next, 'Draft'),
    });
    toast.success({ title: 'Saved as draft' });
  }

  async function handleUpdateItem() {
    if (!activeItem) return;
    const next = { ...activeItem, status: 'Published' as const };
    handleItemChange({ status: 'Published' });
    await updateItem.mutateAsync({
      id: next.id,
      payload: itemPayload(next, 'Published'),
    });
    toast.success({ title: 'Menu item updated' });
  }

  async function handleSaveMenuDraft() {
    if (!activeMenu) return;
    await updateMenu.mutateAsync({
      slug: activeMenu.slug,
      payload: { status: 'Draft' },
    });
    toast.success({ title: 'Draft saved' });
  }

  async function handlePublishMenu() {
    if (!activeMenu) return;
    await updateMenu.mutateAsync({
      slug: activeMenu.slug,
      payload: { status: 'Published' },
    });
    toast.success({ title: 'Published successfully' });
  }

  async function handlePublishAll() {
    await Promise.all(
      menus.map((menu) =>
        updateMenu.mutateAsync({
          slug: menu.slug,
          payload: { status: 'Published' },
        })
      )
    );
    toast.success({ title: 'Published all menus' });
  }

  if (!menus.length) {
    return (
      <div className='rounded-lg border bg-muted/40 px-4 py-10 text-center text-sm text-muted-foreground'>
        No menus seeded yet. Run <code className='font-mono'>pnpm db:seed</code>{' '}
        to create Main, Footer, and Mobile menus.
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
        <div>
          <h2 className='text-xl font-bold tracking-tight md:text-2xl'>
            Navigation
          </h2>
          <p className='mt-1 text-sm text-muted-foreground'>
            Manage your website&apos;s navigation menus. Changes are saved as
            drafts.
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
            disabled={updateMenu.isPending}
            onClick={handleSaveMenuDraft}
          >
            <Save data-icon='inline-start' />
            Save Draft
          </Button>
          <div className='flex'>
            <Button
              size='sm'
              className='h-9 rounded-r-none'
              disabled={updateMenu.isPending}
              onClick={handlePublishMenu}
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
                <DropdownMenuItem onClick={handlePublishAll}>
                  Publish all menus
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handlePublishMenu}>
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
          activeMenuId={activeMenu?.id ?? ''}
          onSelect={handleSelectMenu}
        />
        {activeMenu ? (
          <MenuStructure
            key={activeMenu.id}
            menu={activeMenu}
            activeItemId={activeItemId}
            onSelectItem={setActiveItemId}
            onReorderSiblings={handleReorderSiblings}
            onAddItem={handleAddItem}
          />
        ) : null}
        <EditMenuItem
          item={activeItem}
          onChange={handleItemChange}
          onDelete={handleDeleteItem}
          onSelectChild={setActiveItemId}
          onReorderChildren={(children) =>
            handleReorderSiblings(activeItemId, children)
          }
          onAddChild={handleAddChild}
          onSaveDraft={handleSaveItemDraft}
          onUpdate={handleUpdateItem}
        />
      </div>

      <div className='rounded-lg border bg-muted/40 px-4 py-3 text-center text-sm text-muted-foreground'>
        Changes are saved as drafts. Click{' '}
        <span className='font-semibold text-foreground'>Publish</span> to make
        them live on your website.
      </div>
    </div>
  );
}
