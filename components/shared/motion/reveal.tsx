'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function Reveal({
  children,
  className,
  direction = 'up',
}: {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right';
}) {
  const offset =
    direction === 'left'
      ? { x: -40, y: 0 }
      : direction === 'right'
        ? { x: 40, y: 0 }
        : { x: 0, y: 24 };

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
