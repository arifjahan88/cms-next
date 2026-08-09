import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/container';
import { cn } from '@/lib/utils';

export function CtaBanner({
  title,
  description,
  primary,
  secondary,
  children,
  className,
  variant = 'navy',
}: {
  title: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  children?: React.ReactNode;
  className?: string;
  variant?: 'navy' | 'light' | 'blue';
}) {
  const styles = {
    navy: 'bg-brand-navy text-brand-navy-foreground',
    light: 'bg-primary/5 text-foreground',
    blue: 'bg-primary text-primary-foreground',
  };

  return (
    <section className={cn('py-12 md:py-16', className)}>
      <Container>
        <div
          className={cn(
            'relative overflow-hidden rounded-2xl px-6 py-10 md:px-12 md:py-14',
            styles[variant]
          )}
        >
          <div className='grid items-center gap-8 lg:grid-cols-[1fr_auto]'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight md:text-3xl'>{title}</h2>
              {description ? (
                <p
                  className={cn(
                    'mt-3 max-w-xl text-sm md:text-base',
                    variant === 'light' ? 'text-muted-foreground' : 'text-white/80'
                  )}
                >
                  {description}
                </p>
              ) : null}
              {(primary || secondary) && (
                <div className='mt-6 flex flex-wrap gap-3'>
                  {primary ? (
                    <Button
                      size='lg'
                      className={cn(
                        'h-11 px-5',
                        variant === 'navy' || variant === 'blue'
                          ? 'bg-white text-primary hover:bg-white/90'
                          : undefined
                      )}
                      render={<Link href={primary.href} />}
                    >
                      {primary.label}
                      <ArrowRight data-icon='inline-end' />
                    </Button>
                  ) : null}
                  {secondary ? (
                    <Button
                      size='lg'
                      variant='outline'
                      className={cn(
                        'h-11 px-5',
                        variant !== 'light' &&
                          'border-white/40 bg-transparent text-white hover:bg-white/10'
                      )}
                      render={<Link href={secondary.href} />}
                    >
                      {secondary.label}
                    </Button>
                  ) : null}
                </div>
              )}
            </div>
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}
