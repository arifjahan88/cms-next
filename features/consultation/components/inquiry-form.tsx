'use client';

import { useState } from 'react';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  budgets,
  inquiryFormCopy,
  projectTypes,
  referralSources,
  services,
  timeSlots,
} from '@/features/consultation/data/consultation';
import { consultationSchema } from '@/lib/validations/forms';

type InquiryFormProps = {
  selectedDate?: Date;
  selectedSlot?: string;
  onDateChange?: (date?: Date) => void;
  onSlotChange?: (slot: string) => void;
};

function toDateInputValue(date?: Date) {
  if (!date) return '';
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
}

export function InquiryForm({
  selectedDate,
  selectedSlot,
  onDateChange,
  onSlotChange,
}: InquiryFormProps) {
  const [consent, setConsent] = useState(false);
  const [service, setService] = useState('');
  const [budget, setBudget] = useState('');
  const [referral, setReferral] = useState('');
  const [projectType, setProjectType] = useState<'new' | 'existing' | 'unsure'>('new');

  return (
    <form
      className='rounded-2xl border bg-background p-5 shadow-sm md:p-6'
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);

        const parsed = consultationSchema.safeParse({
          fullName: String(fd.get('fullName') ?? ''),
          email: String(fd.get('email') ?? ''),
          company: String(fd.get('company') ?? ''),
          phone: String(fd.get('phone') ?? ''),
          service,
          projectType,
          description: String(fd.get('description') ?? ''),
          budget: budget || undefined,
          referral: referral || undefined,
          consent,
        });

        if (!parsed.success) {
          toast.error(parsed.error.issues[0]?.message ?? 'Please check the form');
          return;
        }

        const when = [
          selectedDate
            ? selectedDate.toLocaleDateString(undefined, {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })
            : String(fd.get('preferredDate') ?? ''),
          selectedSlot || '',
        ]
          .filter(Boolean)
          .join(' · ');

        toast.success(
          when
            ? `Consultation requested for ${when}. We'll confirm shortly.`
            : "Consultation request received! We'll confirm shortly."
        );
        form.reset();
        setConsent(false);
        setService('');
        setBudget('');
        setReferral('');
        setProjectType('new');
      }}
    >
      <h3 className='text-lg font-semibold'>{inquiryFormCopy.title}</h3>
      <p className='mt-1 text-sm text-muted-foreground'>{inquiryFormCopy.description}</p>

      <div className='mt-5 grid gap-3 sm:grid-cols-2'>
        <div className='space-y-1.5'>
          <Label htmlFor='fullName'>
            Full Name <span className='text-primary'>*</span>
          </Label>
          <Input id='fullName' name='fullName' required className='h-10' />
        </div>
        <div className='space-y-1.5'>
          <Label htmlFor='email'>
            Email <span className='text-primary'>*</span>
          </Label>
          <Input id='email' name='email' type='email' required className='h-10' />
        </div>

        <div className='space-y-1.5 sm:col-span-2'>
          <Label htmlFor='company'>
            Company Name <span className='text-primary'>*</span>
          </Label>
          <Input id='company' name='company' required className='h-10' />
        </div>

        <div className='space-y-1.5'>
          <Label htmlFor='phone'>
            Phone <span className='text-primary'>*</span>
          </Label>
          <Input id='phone' name='phone' required className='h-10' />
        </div>
        <div className='space-y-1.5'>
          <Label>
            Service <span className='text-primary'>*</span>
          </Label>
          <Select name='service' value={service || null} onValueChange={(v) => setService(v ?? '')}>
            <SelectTrigger className='h-10 w-full'>
              <SelectValue placeholder='Select a service' />
            </SelectTrigger>
            <SelectContent>
              {services.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2 sm:col-span-2'>
          <Label>
            Project Type <span className='text-primary'>*</span>
          </Label>
          <RadioGroup
            value={projectType}
            onValueChange={(v) => setProjectType((v as 'new' | 'existing' | 'unsure') ?? 'new')}
            className='grid gap-2 sm:grid-cols-3'
          >
            {projectTypes.map((option) => (
              <label
                key={option.value}
                className='flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-sm has-data-checked:border-primary has-data-checked:bg-primary/5'
              >
                <RadioGroupItem value={option.value} />
                {option.label}
              </label>
            ))}
          </RadioGroup>
        </div>

        <div className='space-y-1.5 sm:col-span-2'>
          <Label htmlFor='description'>
            Tell us about your project <span className='text-primary'>*</span>
          </Label>
          <Textarea
            id='description'
            name='description'
            rows={4}
            required
            placeholder='Goals, timeline, current challenges, and anything else we should know…'
          />
        </div>

        <div className='space-y-1.5 sm:col-span-2'>
          <Label>Preferred Budget</Label>
          <Select name='budget' value={budget || null} onValueChange={(v) => setBudget(v ?? '')}>
            <SelectTrigger className='h-10 w-full'>
              <SelectValue placeholder='Select a budget range' />
            </SelectTrigger>
            <SelectContent>
              {budgets.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-1.5'>
          <Label htmlFor='preferredDate'>Preferred Date</Label>
          <Input
            id='preferredDate'
            name='preferredDate'
            type='date'
            className='h-10'
            value={toDateInputValue(selectedDate)}
            onChange={(e) => {
              const value = e.target.value;
              if (!value) {
                onDateChange?.(undefined);
                return;
              }
              const [y, m, d] = value.split('-').map(Number);
              onDateChange?.(new Date(y, m - 1, d));
            }}
          />
        </div>
        <div className='space-y-1.5'>
          <Label>Preferred Time</Label>
          <Select
            name='preferredTime'
            value={selectedSlot || null}
            onValueChange={(v) => onSlotChange?.(v ?? '')}
          >
            <SelectTrigger className='h-10 w-full'>
              <SelectValue placeholder='Select a time' />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-1.5 sm:col-span-2'>
          <Label>How did you hear about us?</Label>
          <Select
            name='referral'
            value={referral || null}
            onValueChange={(v) => setReferral(v ?? '')}
          >
            <SelectTrigger className='h-10 w-full'>
              <SelectValue placeholder='Select an option' />
            </SelectTrigger>
            <SelectContent>
              {referralSources.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <label className='mt-4 flex items-start gap-2.5 text-sm text-muted-foreground'>
        <Checkbox
          checked={consent}
          onCheckedChange={(checked) => setConsent(checked === true)}
          className='mt-0.5'
          name='consent'
        />
        <span>{inquiryFormCopy.privacy}</span>
      </label>

      <Button type='submit' className='mt-5 h-11 w-full'>
        {inquiryFormCopy.submit}
      </Button>

      <p className='mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground'>
        <Lock className='size-3.5 shrink-0' />
        {inquiryFormCopy.secureNote}
      </p>
    </form>
  );
}
