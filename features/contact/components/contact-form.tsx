'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { toast } from '@/lib/toast';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  contactSchema,
  type ContactFormValues,
} from '@/lib/validations/forms';

export function ContactForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      company: '',
      phone: '',
      subject: '',
      message: '',
      consent: false,
    },
  });

  const onSubmit = handleSubmit(async (values, event) => {
    const form = event?.currentTarget;
    const website =
      form instanceof HTMLFormElement
        ? ((form.elements.namedItem('website') as HTMLInputElement | null)?.value ??
          '')
        : '';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          company: values.company || undefined,
          phone: values.phone || undefined,
          website,
        }),
      });
      const json = (await res.json()) as { status?: boolean; message?: string };
      if (!res.ok || !json.status) {
        throw new Error(json.message ?? 'Failed to send message');
      }
      toast.success({ title: "Message sent! We'll get back to you shortly." });
      reset();
    } catch (error) {
      toast.error({
        title: error instanceof Error ? error.message : 'Failed to send message',
      });
    }
  });

  return (
    <form
      className='rounded-2xl border bg-background p-5 shadow-sm md:p-6'
      onSubmit={onSubmit}
      noValidate
    >
      <input
        type='text'
        name='website'
        className='hidden'
        tabIndex={-1}
        autoComplete='off'
      />
      <h3 className='text-lg font-semibold md:text-xl'>Send Us a Message</h3>
      <p className='mt-1 text-sm text-muted-foreground'>
        Fill out the form below and our team will get in touch with you.
      </p>

      <div className='mt-5 grid gap-3 sm:grid-cols-2'>
        <div className='space-y-1.5'>
          <Label htmlFor='fullName'>Full Name</Label>
          <Input
            id='fullName'
            className='h-10'
            aria-invalid={errors.fullName ? true : undefined}
            {...register('fullName')}
          />
          {errors.fullName ? (
            <p className='text-sm text-destructive'>{errors.fullName.message}</p>
          ) : null}
        </div>
        <div className='space-y-1.5'>
          <Label htmlFor='email'>Email Address</Label>
          <Input
            id='email'
            type='email'
            className='h-10'
            aria-invalid={errors.email ? true : undefined}
            {...register('email')}
          />
          {errors.email ? (
            <p className='text-sm text-destructive'>{errors.email.message}</p>
          ) : null}
        </div>
        <div className='space-y-1.5'>
          <Label htmlFor='company'>Company Name</Label>
          <Input id='company' className='h-10' {...register('company')} />
        </div>
        <div className='space-y-1.5'>
          <Label htmlFor='phone'>Phone Number</Label>
          <Input id='phone' className='h-10' {...register('phone')} />
        </div>
        <div className='space-y-1.5 sm:col-span-2'>
          <Label htmlFor='subject'>Subject</Label>
          <Input
            id='subject'
            className='h-10'
            aria-invalid={errors.subject ? true : undefined}
            {...register('subject')}
          />
          {errors.subject ? (
            <p className='text-sm text-destructive'>{errors.subject.message}</p>
          ) : null}
        </div>
        <div className='space-y-1.5 sm:col-span-2'>
          <Label htmlFor='message'>How can we help you?</Label>
          <Textarea
            id='message'
            rows={5}
            minLength={10}
            aria-invalid={errors.message ? true : undefined}
            placeholder='Tell us about your project, timeline, or questions…'
            {...register('message')}
          />
          <p className='text-xs text-muted-foreground'>
            Please include at least 10 characters so we can help effectively.
          </p>
          {errors.message ? (
            <p className='text-sm text-destructive'>{errors.message.message}</p>
          ) : null}
        </div>
      </div>

      <div className='mt-4 flex items-start gap-2.5 text-sm text-muted-foreground'>
        <Controller
          name='consent'
          control={control}
          render={({ field }) => (
            <Checkbox
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked === true)}
              onBlur={field.onBlur}
              className='mt-0.5'
              aria-invalid={errors.consent ? true : undefined}
            />
          )}
        />
        <span>I agree to the Privacy Policy and Terms of Service.</span>
      </div>
      {errors.consent ? (
        <p className='mt-1 text-sm text-destructive'>{errors.consent.message}</p>
      ) : null}

      <Button
        type='submit'
        className='mt-5 h-11 w-full sm:w-auto sm:px-8'
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending…' : 'Send Message'}
        <Send data-icon='inline-end' className='size-4' />
      </Button>
    </form>
  );
}
