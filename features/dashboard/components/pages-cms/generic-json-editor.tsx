'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function GenericJsonEditor({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (next: unknown) => void;
}) {
  const [text, setText] = useState(() => JSON.stringify(value, null, 2));
  const [error, setError] = useState<string | null>(null);

  return (
    <div className='space-y-2'>
      <Label>Section content (JSON)</Label>
      <Textarea
        rows={16}
        className='font-mono text-xs'
        value={text}
        onChange={(e) => {
          const next = e.target.value;
          setText(next);
          try {
            const parsed = JSON.parse(next) as unknown;
            setError(null);
            onChange(parsed);
          } catch {
            setError('Invalid JSON');
          }
        }}
      />
      {error ? <p className='text-xs text-destructive'>{error}</p> : null}
      <p className='text-xs text-muted-foreground'>
        Edit structured content as JSON. Invalid JSON will not be saved.
      </p>
    </div>
  );
}
