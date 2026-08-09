'use client';

import { motion } from 'motion/react';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { cn } from '@/lib/utils';

export function StaggerChildren({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-40px' }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  hoverLift = true,
}: {
  children: React.ReactNode;
  className?: string;
  hoverLift?: boolean;
}) {
  return (
    <motion.div
      className={cn(className)}
      variants={staggerItem}
      whileHover={hoverLift ? { y: -4 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
