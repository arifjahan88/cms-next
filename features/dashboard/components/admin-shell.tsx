'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  Bell,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ExternalLink,
  Maximize,
  Menu,
  Search,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { SiteLogo } from '@/components/shared/site-logo';
import { dashboardNav, getDashboardPageTitle } from '@/features/dashboard/data/nav';
import { SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';

function NavList({
  onNavigate,
  pathname,
  search,
}: {
  onNavigate?: () => void;
  pathname: string;
  search: string;
}) {
  return (
    <nav className='flex flex-1 flex-col gap-6 overflow-y-auto px-3 py-4'>
      {dashboardNav.map((group, gi) => (
        <div key={group.label ?? `g-${gi}`}>
          {group.label ? (
            <p className='mb-2 px-3 text-[10px] font-semibold tracking-wider text-white/40 uppercase'>
              {group.label}
            </p>
          ) : null}
          <ul className='space-y-0.5'>
            {group.items.map((item) => {
              const Icon = item.icon;
              const [itemPath, itemQuery = ''] = item.href.split('?');
              const active =
                item.href === '/dashboard'
                  ? pathname === '/dashboard' || pathname === '/dashboard/'
                  : itemQuery
                    ? pathname === itemPath && search === itemQuery
                    : pathname === itemPath || pathname.startsWith(`${itemPath}/`);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition',
                      active
                        ? 'bg-primary text-primary-foreground'
                        : 'text-white/75 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    <Icon className='size-4 shrink-0 opacity-90' />
                    <span className='flex-1 truncate'>{item.title}</span>
                    {item.chevron ? <ChevronRight className='size-3.5 opacity-50' /> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function SidebarBody({
  onNavigate,
  pathname,
  search,
}: {
  onNavigate?: () => void;
  pathname: string;
  search: string;
}) {
  return (
    <div className='flex h-full flex-col'>
      <div className='border-b border-white/10 px-4 py-4'>
        <SiteLogo light />
      </div>
      <NavList onNavigate={onNavigate} pathname={pathname} search={search} />
      <div className='mt-auto space-y-3 border-t border-white/10 p-4'>
        <Button
          variant='outline'
          size='sm'
          className='h-9 w-full justify-start gap-2 border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white'
          render={<Link href='/' target='_blank' />}
        >
          <ExternalLink className='size-3.5' />
          View Website
        </Button>
        <p className='text-[10px] leading-snug text-white/40'>
          © {new Date().getFullYear()} {SITE.name} Co., Ltd. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const [mobileOpen, setMobileOpen] = useState(false);
  const title = getDashboardPageTitle(pathname);

  return (
    <TooltipProvider>
      <div className='flex min-h-svh bg-surface'>
        {/* Desktop sidebar */}
        <aside className='sticky top-0 hidden h-svh w-64 shrink-0 bg-brand-navy text-brand-navy-foreground lg:flex lg:flex-col'>
          <SidebarBody pathname={pathname} search={search} />
        </aside>

        {/* Mobile sheet */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent
            side='left'
            className='w-72 border-0 bg-brand-navy p-0 text-brand-navy-foreground'
          >
            <SheetHeader className='sr-only'>
              <SheetTitle>Admin navigation</SheetTitle>
            </SheetHeader>
            <SidebarBody
              pathname={pathname}
              search={search}
              onNavigate={() => setMobileOpen(false)}
            />
          </SheetContent>
        </Sheet>

        <div className='flex min-w-0 flex-1 flex-col'>
          <header className='sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background px-4 md:px-6'>
            <Button
              variant='ghost'
              size='icon'
              className='lg:hidden'
              onClick={() => setMobileOpen(true)}
              aria-label='Open menu'
            >
              <Menu className='size-5' />
            </Button>

            <h1 className='shrink-0 text-base font-bold text-foreground md:text-lg'>{title}</h1>

            <div className='mx-auto hidden max-w-md flex-1 md:block lg:max-w-lg'>
              <div className='relative'>
                <Search className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground' />
                <Input
                  placeholder='Search anything...'
                  className='h-9 rounded-full bg-muted/40 pr-16 pl-9'
                />
                <kbd className='pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 rounded border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground'>
                  Ctrl + /
                </kbd>
              </div>
            </div>

            <div className='ml-auto flex items-center gap-1 sm:gap-2'>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant='ghost'
                      size='icon'
                      className='relative'
                      aria-label='Notifications'
                    />
                  }
                >
                  <Bell className='size-4' />
                  <span className='absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-white'>
                    8
                  </span>
                </TooltipTrigger>
                <TooltipContent>Notifications</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger render={<Button variant='ghost' size='icon' aria-label='Help' />}>
                  <CircleHelp className='size-4' />
                </TooltipTrigger>
                <TooltipContent>Help</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant='ghost'
                      size='icon'
                      className='hidden sm:inline-flex'
                      aria-label='Fullscreen'
                      onClick={() => {
                        if (!document.fullscreenElement) {
                          void document.documentElement.requestFullscreen();
                        } else {
                          void document.exitFullscreen();
                        }
                      }}
                    />
                  }
                >
                  <Maximize className='size-4' />
                </TooltipTrigger>
                <TooltipContent>Fullscreen</TooltipContent>
              </Tooltip>

              <button
                type='button'
                className='ml-1 flex items-center gap-2 rounded-lg px-1.5 py-1 transition hover:bg-muted'
              >
                <Avatar size='sm'>
                  <AvatarFallback className='bg-primary text-xs text-primary-foreground'>
                    AU
                  </AvatarFallback>
                </Avatar>
                <span className='hidden text-left sm:block'>
                  <span className='block text-xs font-semibold leading-tight'>Admin User</span>
                  <span className='block text-[10px] text-muted-foreground'>Super Admin</span>
                </span>
                <ChevronDown className='hidden size-3.5 text-muted-foreground sm:block' />
              </button>
            </div>
          </header>

          <main className='flex-1 p-4 md:p-6'>{children}</main>
        </div>
      </div>
    </TooltipProvider>
  );
}
