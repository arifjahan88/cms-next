'use client';

import { createElement, useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronsUpDown, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getIcon, LUCIDE_ICON_NAMES, pascalToKebab } from '@/lib/icons';
import { cn } from '@/lib/utils';

const PAGE_SIZE = 100;

export function LucideIconPicker({
  value,
  onChange,
  placeholder = 'Search Lucide icons…',
}: {
  value?: string;
  onChange: (next?: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selectedPascal = useMemo(() => {
    if (!value) return undefined;
    const match = LUCIDE_ICON_NAMES.find(
      (name) =>
        name.toLowerCase() === value.toLowerCase() ||
        pascalToKebab(name) === value.toLowerCase().replace(/^lucide:/, '')
    );
    return match;
  }, [value]);

  const filtered = useMemo(() => {
    const q = query
      .trim()
      .toLowerCase()
      .replace(/^lucide:/, '');
    if (!q) return LUCIDE_ICON_NAMES.slice(0, PAGE_SIZE);
    return LUCIDE_ICON_NAMES.filter((name) => {
      const kebab = pascalToKebab(name);
      return (
        name.toLowerCase().includes(q) ||
        kebab.includes(q) ||
        kebab.replace(/-/g, '').includes(q.replace(/-/g, ''))
      );
    }).slice(0, PAGE_SIZE);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => searchRef.current?.focus(), 0);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  return (
    <div ref={rootRef} className='relative'>
      <div className='flex gap-2'>
        <Button
          type='button'
          variant='outline'
          className='h-9 flex-1 justify-between px-3 font-normal'
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <span className='flex min-w-0 items-center gap-2'>
            {createElement(getIcon(value), {
              className: 'size-4 shrink-0 text-muted-foreground',
            })}
            <span className='truncate text-sm'>
              {selectedPascal ? `lucide:${pascalToKebab(selectedPascal)}` : 'Select an icon'}
            </span>
          </span>
          <ChevronsUpDown className='size-3.5 shrink-0 opacity-50' />
        </Button>
        {value ? (
          <Button
            type='button'
            variant='outline'
            size='icon'
            className='size-9 shrink-0'
            aria-label='Clear icon'
            onClick={() => onChange(undefined)}
          >
            <X className='size-3.5' />
          </Button>
        ) : null}
      </div>

      {open ? (
        <div className='absolute z-50 mt-2 w-full overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-lg'>
          <div className='border-b p-2'>
            <div className='relative'>
              <Search className='pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground' />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className={cn(
                  'h-9 w-full rounded-lg border border-input bg-transparent py-1 pr-2.5 pl-8 text-sm outline-none',
                  'placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50'
                )}
              />
            </div>
            <p className='mt-1.5 px-1 text-[10px] text-muted-foreground'>
              {query.trim()
                ? `Showing ${filtered.length} match${filtered.length === 1 ? '' : 'es'}`
                : `Showing first ${PAGE_SIZE} of ${LUCIDE_ICON_NAMES.length} icons — type to search all`}
            </p>
          </div>
          <ScrollArea className='h-64'>
            <ul className='p-1'>
              {filtered.length === 0 ? (
                <li className='px-3 py-6 text-center text-sm text-muted-foreground'>
                  No icons found
                </li>
              ) : (
                filtered.map((name) => {
                  const kebab = pascalToKebab(name);
                  const selected = selectedPascal === name;
                  return (
                    <li key={name}>
                      <button
                        type='button'
                        className={cn(
                          'flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition hover:bg-muted',
                          selected && 'bg-primary/5 text-primary'
                        )}
                        onClick={() => {
                          onChange(kebab);
                          setOpen(false);
                          setQuery('');
                        }}
                      >
                        {createElement(getIcon(name), {
                          className: 'size-4 shrink-0',
                        })}
                        <span className='min-w-0 flex-1 truncate font-medium'>{name}</span>
                        <span className='truncate font-mono text-[10px] text-muted-foreground'>
                          {kebab}
                        </span>
                        {selected ? (
                          <Check className='size-3.5 shrink-0 text-primary' />
                        ) : (
                          <span className='size-3.5 shrink-0' />
                        )}
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </ScrollArea>
        </div>
      ) : null}
    </div>
  );
}
