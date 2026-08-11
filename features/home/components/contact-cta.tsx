'use client';

import { useState } from 'react';
import { toast } from '@/lib/toast';
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Container } from '@/components/shared/container';
import { ImagePlaceholder } from '@/components/shared/image-placeholder';
import { SITE } from '@/lib/constants';
import { FadeIn } from '@/components/shared/motion/fade-in';
import { landingContentSeed, type LandingContent } from '@/features/dashboard/data/landing-cms';
import { cn } from '@/lib/utils';

const defaultContactCta = landingContentSeed.contactCta;

const contactItems = [
  {
    icon: Phone,
    label: 'Phone',
    value: SITE.phone,
    href: SITE.phoneHref,
  },
  {
    icon: Mail,
    label: 'Email',
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: MessageCircle,
    label: 'Skype',
    value: SITE.skype,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: SITE.location,
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: SITE.hours,
  },
] as const;

const socialLinks = [
  { href: SITE.social.linkedin, label: 'LinkedIn', short: 'in' },
  { href: SITE.social.facebook, label: 'Facebook', short: 'f' },
  { href: SITE.social.twitter, label: 'Twitter', short: '𝕏' },
  { href: SITE.social.youtube, label: 'YouTube', short: '▶' },
];

function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor?: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <Label htmlFor={htmlFor} className='text-xs font-medium text-foreground/80'>
      {children}
      {required ? <span className='text-destructive'> *</span> : null}
    </Label>
  );
}

export function ContactCta({ data = defaultContactCta }: { data?: LandingContent['contactCta'] }) {
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <section className='pb-10 md:pb-16'>
      <Container>
        <FadeIn>
          <div className='overflow-hidden rounded-2xl border bg-white shadow-lg lg:grid lg:grid-cols-[0.95fr_1.35fr_0.85fr]'>
            {/* Left — blue info panel */}
            <div className='flex flex-col bg-primary p-6 text-primary-foreground md:p-8'>
              <h2 className='text-2xl font-bold tracking-tight md:text-[1.75rem] md:leading-snug'>
                {data.headline}
              </h2>
              <p className='mt-3 text-sm leading-relaxed text-white/85'>{data.description}</p>
              <ul className='mt-6 space-y-3'>
                {data.benefits.map((item) => (
                  <li key={item} className='flex items-center gap-2.5 text-sm'>
                    <span className='flex size-5 shrink-0 items-center justify-center rounded-full bg-white/20'>
                      <Target className='size-3' />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <ImagePlaceholder
                label='[Project Planning Illustration]'
                className='mt-auto min-h-40 border-white/25 bg-white/10 text-white/80'
              />
            </div>

            {/* Middle — form */}
            <div className='border-y border-border p-5 md:p-7 lg:border-y-0 lg:border-x'>
              <h3 className='mb-5 flex items-center gap-2.5 text-lg font-bold text-foreground'>
                <span className='h-5 w-1 shrink-0 rounded-full bg-primary' />
                {data.formTitle}
              </h3>
              <form
                className='space-y-3.5'
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success({ title: "Request received! We'll be in touch shortly." });
                  setFileName(null);
                  (e.target as HTMLFormElement).reset();
                }}
              >
                <div className='grid gap-3.5 sm:grid-cols-2'>
                  <div className='space-y-1.5'>
                    <FieldLabel htmlFor='fullName' required>
                      Full Name
                    </FieldLabel>
                    <Input id='fullName' name='fullName' required placeholder='John Doe' />
                  </div>
                  <div className='space-y-1.5'>
                    <FieldLabel htmlFor='company' required>
                      Company Name
                    </FieldLabel>
                    <Input id='company' name='company' required placeholder='Company Inc.' />
                  </div>
                  <div className='space-y-1.5'>
                    <FieldLabel htmlFor='email' required>
                      Business Email
                    </FieldLabel>
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      required
                      placeholder='john@company.com'
                    />
                  </div>
                  <div className='space-y-1.5'>
                    <FieldLabel htmlFor='phone' required>
                      Phone / WhatsApp
                    </FieldLabel>
                    <Input id='phone' name='phone' required placeholder='+1 (555) 010-0000' />
                  </div>
                  <div className='space-y-1.5'>
                    <FieldLabel required>Country</FieldLabel>
                    <Select name='country' defaultValue='th'>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select country' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='th'>Thailand</SelectItem>
                        <SelectItem value='bd'>Bangladesh</SelectItem>
                        <SelectItem value='my'>Malaysia</SelectItem>
                        <SelectItem value='ae'>United Arab Emirates</SelectItem>
                        <SelectItem value='us'>United States</SelectItem>
                        <SelectItem value='uk'>United Kingdom</SelectItem>
                        <SelectItem value='other'>Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-1.5'>
                    <FieldLabel required>Service Interested In</FieldLabel>
                    <Select name='service' defaultValue='custom'>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select service' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='custom'>Custom Software Development</SelectItem>
                        <SelectItem value='mobile'>Mobile App Development</SelectItem>
                        <SelectItem value='cloud'>Cloud & DevOps</SelectItem>
                        <SelectItem value='ai'>AI Solutions</SelectItem>
                        <SelectItem value='uiux'>UI/UX Design</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-1.5'>
                    <FieldLabel>Project Budget</FieldLabel>
                    <Select name='budget' defaultValue='25-50'>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select budget' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='10-25'>$10k – $25k</SelectItem>
                        <SelectItem value='25-50'>$25k – $50k</SelectItem>
                        <SelectItem value='50-100'>$50k – $100k</SelectItem>
                        <SelectItem value='100+'>$100k+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-1.5'>
                    <FieldLabel>Timeline</FieldLabel>
                    <Select name='timeline' defaultValue='1-3'>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select timeline' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='asap'>ASAP</SelectItem>
                        <SelectItem value='1-3'>1–3 months</SelectItem>
                        <SelectItem value='3-6'>3–6 months</SelectItem>
                        <SelectItem value='6+'>6+ months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className='space-y-1.5'>
                  <FieldLabel htmlFor='description' required>
                    Project Description
                  </FieldLabel>
                  <Textarea
                    id='description'
                    name='description'
                    rows={4}
                    required
                    placeholder='Tell us about your project goals, scope, and any requirements...'
                  />
                </div>

                <div className='space-y-1.5'>
                  <FieldLabel htmlFor='attachment'>Upload File (RFP, Doc, etc.)</FieldLabel>
                  <div className='flex flex-wrap items-center gap-3 rounded-lg border border-input px-3 py-2'>
                    <label
                      htmlFor='attachment'
                      className='inline-flex cursor-pointer items-center rounded-md border bg-muted px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted/80'
                    >
                      Choose File
                      <input
                        id='attachment'
                        name='attachment'
                        type='file'
                        className='sr-only'
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          setFileName(file?.name ?? null);
                        }}
                      />
                    </label>
                    <span className='min-w-0 flex-1 truncate text-sm text-muted-foreground'>
                      {fileName ?? 'No file chosen'}
                    </span>
                    <span className='text-xs text-muted-foreground'>Max file size: 10MB</span>
                  </div>
                </div>

                <Button type='submit' size='lg' className='mt-2 h-11 w-full'>
                  {data.submitLabel}
                  <ArrowRight data-icon='inline-end' />
                </Button>
              </form>
            </div>

            {/* Right — get in touch */}
            <div className='flex flex-col bg-[#EEF3FA] p-6 md:p-7'>
              <h3 className='mb-5 text-lg font-bold text-foreground'>{data.contactPanelTitle}</h3>
              <ul className='space-y-4'>
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <>
                      <span className='flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                        <Icon className='size-4' />
                      </span>
                      <span className='min-w-0'>
                        <span className='block text-xs text-muted-foreground'>{item.label}</span>
                        <span className='block text-sm font-medium text-foreground wrap-break-word'>
                          {item.value}
                        </span>
                      </span>
                    </>
                  );

                  return (
                    <li key={item.label}>
                      {'href' in item && item.href ? (
                        <a
                          href={item.href}
                          className='flex items-start gap-3 transition-opacity hover:opacity-80'
                        >
                          {content}
                        </a>
                      ) : (
                        <div className='flex items-start gap-3'>{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className='mt-auto flex gap-2.5 pt-8'>
                {socialLinks.map(({ href, label, short }) => (
                  <a
                    key={label}
                    href={href}
                    target='_blank'
                    rel='noreferrer'
                    aria-label={label}
                    className={cn(
                      'flex size-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground transition hover:bg-primary/90'
                    )}
                  >
                    {short}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
