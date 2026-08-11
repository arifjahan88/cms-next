'use client';

import { createElement, useState } from 'react';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Briefcase,
  Eye,
  EyeOff,
  LayoutGrid,
  Lock,
  LogIn,
  Settings,
  Shield,
  ShieldCheck,
  User,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { SiteLogo } from '@/components/shared/site-logo';
import { loginFeatures } from '@/features/auth/data/login';
import { useLoginMutation } from '@/features/auth/hooks';
import { SITE } from '@/lib/constants';
import { adminLoginSchema, type AdminLoginValues } from '@/lib/validations/forms';

const featureIcons: Record<string, LucideIcon> = {
  layers: LayoutGrid,
  users: Users,
  briefcase: Briefcase,
  settings: Settings,
};

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox='0 0 24 24' aria-hidden>
      <path
        fill='#4285F4'
        d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
      />
      <path
        fill='#34A853'
        d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
      />
      <path
        fill='#FBBC05'
        d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
      />
      <path
        fill='#EA4335'
        d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
      />
    </svg>
  );
}

export function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLoginMutation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const isPending = isSubmitting || loginMutation.isPending;

  const onSubmit = handleSubmit(async (values) => {
    try {
      await loginMutation.mutateAsync(values);
    } catch {
      // Toast handled in mutation onError
    }
  });

  return (
    <div className='flex min-h-svh flex-col lg:flex-row'>
      {/* Left panel */}
      <aside className='relative flex w-full flex-col justify-center overflow-hidden bg-brand-navy px-8 py-10 text-brand-navy-foreground lg:w-[46%] lg:px-12 lg:py-14'>
        <div
          className='pointer-events-none absolute inset-0 opacity-[0.12]'
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden
        />
        <div
          className='pointer-events-none absolute -right-16 bottom-0 text-[20rem] font-black leading-none text-primary/25 select-none'
          aria-hidden
        >
          Z
        </div>
        <div
          className='pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-primary/30 via-primary/5 to-transparent'
          aria-hidden
        />
        <div
          className='pointer-events-none absolute inset-x-0 bottom-0 h-28 opacity-40'
          style={{
            backgroundImage:
              'linear-gradient(transparent, transparent), repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(255,255,255,0.08) 18px, rgba(255,255,255,0.08) 20px)',
            maskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 100%)',
          }}
          aria-hidden
        />

        <div className='relative z-10 flex h-full flex-col justify-center'>
          <SiteLogo light className='origin-left scale-110' />

          <span className='mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-primary/20 px-3.5 py-1.5 text-sm font-semibold text-white ring-1 ring-primary/40'>
            <Shield className='size-4' />
            Admin Panel
          </span>

          <h1 className='mt-10 text-4xl font-bold tracking-tight text-white md:text-5xl'>
            Welcome Back!
          </h1>
          <p className='mt-3 text-xl font-semibold text-primary md:text-2xl'>
            Sign in to your admin account
          </p>
          <p className='mt-4 max-w-md text-base leading-relaxed text-white/75 md:text-lg'>
            Access your dashboard to manage users, projects, and system settings efficiently.
          </p>

          <ul className='mt-12 space-y-5'>
            {loginFeatures.map((item) => (
              <li key={item.title} className='flex items-start gap-4'>
                <span className='flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/10'>
                  {createElement(featureIcons[item.icon] ?? LayoutGrid, {
                    className: 'size-5 stroke-[1.5]',
                  })}
                </span>
                <div>
                  <p className='text-base font-semibold text-white md:text-lg'>{item.title}</p>
                  <p className='mt-1 text-sm text-white/65 md:text-[15px]'>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Right panel */}
      <div className='relative flex flex-1 flex-col items-center justify-center bg-surface px-4 py-10 sm:px-8'>
        <div className='w-full max-w-md'>
          <div className='rounded-2xl border border-border/80 bg-background p-6 shadow-lg sm:p-8'>
            <div className='mb-6 text-center'>
              <span className='mx-auto mb-3 flex size-12 items-center justify-center rounded-full border-2 border-primary/30 text-primary'>
                <Lock className='size-5' />
              </span>
              <h2 className='text-xl font-bold text-foreground'>Admin Login</h2>
              <p className='mt-1 text-sm text-muted-foreground'>
                Please enter your credentials to continue
              </p>
            </div>

            <form className='space-y-4' onSubmit={onSubmit} noValidate>
              <Field data-invalid={errors.email ? true : undefined}>
                <FieldLabel htmlFor='email' className='font-semibold'>
                  Email Address
                </FieldLabel>
                <div className='relative'>
                  <User className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground' />
                  <Input
                    id='email'
                    type='email'
                    placeholder='admin@example.com'
                    className='h-11 pl-9'
                    autoComplete='email'
                    aria-invalid={errors.email ? true : undefined}
                    {...register('email')}
                  />
                </div>
                <FieldError errors={[errors.email]} />
              </Field>

              <Field data-invalid={errors.password ? true : undefined}>
                <FieldLabel htmlFor='password' className='font-semibold'>
                  Password
                </FieldLabel>
                <div className='relative'>
                  <Lock className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground' />
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter your password'
                    className='h-11 pr-10 pl-9'
                    autoComplete='current-password'
                    aria-invalid={errors.password ? true : undefined}
                    {...register('password')}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword((v) => !v)}
                    className='absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition hover:text-foreground'
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
                  </button>
                </div>
                <FieldError errors={[errors.password]} />
              </Field>

              <div className='flex items-center justify-between gap-3'>
                <Controller
                  control={control}
                  name='remember'
                  render={({ field }) => (
                    <label className='flex cursor-pointer items-center gap-2 text-sm text-foreground'>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked === true)}
                      />
                      Remember me
                    </label>
                  )}
                />
                <Link href='#' className='text-sm font-medium text-primary hover:underline'>
                  Forgot Password?
                </Link>
              </div>

              <Button type='submit' size='lg' className='h-11 w-full' disabled={isPending}>
                <LogIn data-icon='inline-start' />
                {isPending ? 'Signing in…' : 'Login to Dashboard'}
              </Button>
            </form>

            <div className='relative my-5'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-3 text-muted-foreground'>Or</span>
              </div>
            </div>

            <Button
              type='button'
              variant='outline'
              size='lg'
              className='h-11 w-full'
              disabled
              title='Coming soon'
            >
              <GoogleIcon className='size-4' />
              Sign in with Google (Coming soon)
            </Button>
          </div>

          <div className='mt-6 text-center'>
            <p className='inline-flex items-center gap-1.5 text-sm font-medium text-foreground'>
              <ShieldCheck className='size-4 text-primary' />
              Secure admin access
            </p>
            <p className='mt-1 text-xs text-muted-foreground'>
              Your data is protected with enterprise-grade security.
            </p>
          </div>
        </div>

        <p className='mt-10 text-center text-xs text-muted-foreground'>
          © {SITE.copyrightYear} {SITE.name} Co., Ltd. All rights reserved.
        </p>
      </div>
    </div>
  );
}
