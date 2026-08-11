'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

function orderKey<T>(items: T[], getId: (item: T) => string) {
  return items.map(getId).join('|');
}

export function useReorderOnDrop<T>(
  items: T[],
  onCommit: (next: T[]) => void,
  getId: (item: T) => string = (item) =>
    String((item as { id: string }).id)
) {
  const itemsKey = orderKey(items, getId);
  const committedKeyRef = useRef(itemsKey);
  const orderedRef = useRef(items);

  const [override, setOverride] = useState<{
    key: string;
    items: T[];
  } | null>(null);

  const orderedItems =
    override?.key === itemsKey ? override.items : items;

  useEffect(() => {
    orderedRef.current = items;
    committedKeyRef.current = itemsKey;
  }, [items, itemsKey]);

  const onReorder = useCallback(
    (next: T[]) => {
      orderedRef.current = next;
      setOverride({ key: itemsKey, items: next });
    },
    [itemsKey]
  );

  const onDragEnd = useCallback(() => {
    const next = orderedRef.current;
    const nextKey = orderKey(next, getId);
    if (nextKey === committedKeyRef.current) {
      setOverride(null);
      return;
    }
    committedKeyRef.current = nextKey;
    onCommit(next);
  }, [getId, onCommit]);

  return { orderedItems, onReorder, onDragEnd };
}
