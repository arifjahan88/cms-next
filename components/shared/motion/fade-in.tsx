'use client';

import { motion, type HTMLMotionProps } from 'motion/react';
import { fadeInUp } from '@/lib/animations';
import { cn } from '@/lib/utils';

type FadeInProps = HTMLMotionProps<'div'> & {
  delay?: number;
};

export function FadeIn({ children, className, delay = 0, ...props }: FadeInProps) {
  return (
    <motion.div
      className={cn(className)}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: fadeInUp.hidden,
        visible: {
          ...fadeInUp.visible,
          transition: {
            ...fadeInUp.visible.transition,
            delay,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
