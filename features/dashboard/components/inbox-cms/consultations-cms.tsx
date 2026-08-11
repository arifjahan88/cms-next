'use client';

import { useState } from 'react';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import type { ConsultationBookingDto } from '@/db/queries/consultation-bookings';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  EntityListCms,
  StatusBadge,
} from '@/features/dashboard/components/entity-cms/entity-list-cms';
import {
  deleteConsultationBooking,
  listConsultationBookings,
  updateConsultationStatus,
} from '@/lib/api/consultations';
import { consultationKeys } from '@/lib/api/query-keys';
import { actionToast, runWithActionToast } from '@/lib/toast-action';

const STATUSES = ['new', 'confirmed', 'archived'] as const;

export function ConsultationsCms() {
  const queryClient = useQueryClient();
  const { data: bookings } = useSuspenseQuery({
    queryKey: consultationKeys.admin(),
    queryFn: listConsultationBookings,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: consultationKeys.all });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateConsultationStatus(id, status),
    onSuccess: invalidate,
  });
  const removeBooking = useMutation({
    mutationFn: deleteConsultationBooking,
    onSuccess: invalidate,
  });

  const [selected, setSelected] = useState<ConsultationBookingDto | null>(null);

  async function handleStatusChange(id: string, status: string) {
    await runWithActionToast(
      () => updateStatus.mutateAsync({ id, status }),
      actionToast.updating('consultation status')
    );
    setSelected((prev) => (prev?.id === id ? { ...prev, status } : prev));
  }

  async function handleDelete(booking: ConsultationBookingDto) {
    await runWithActionToast(
      () => removeBooking.mutateAsync(booking.id),
      actionToast.deleting('consultation')
    );
    if (selected?.id === booking.id) setSelected(null);
  }

  return (
    <>
      <EntityListCms
        title='Consultations'
        description='View and manage consultation booking requests.'
        items={bookings}
        emptyMessage='No consultation requests yet.'
        onEdit={setSelected}
        onDelete={handleDelete}
        columns={[
          {
            header: 'Contact',
            searchValue: (b) => `${b.fullName} ${b.email} ${b.company}`,
            cell: (b) => (
              <div>
                <div className='font-medium'>{b.fullName}</div>
                <div className='text-xs text-muted-foreground'>{b.company}</div>
              </div>
            ),
          },
          {
            header: 'Service',
            searchValue: (b) => b.service,
            cell: (b) => b.service,
          },
          {
            header: 'Status',
            searchValue: (b) => b.status,
            cell: (b) => (
              <Select
                value={b.status}
                onValueChange={(value) => {
                  if (value) handleStatusChange(b.id, value);
                }}
              >
                <SelectTrigger size='sm' className='w-32'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ),
          },
          {
            header: 'Submitted',
            cell: (b) => new Date(b.createdAt).toLocaleString(),
          },
        ]}
      />

      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent side='right' className='w-full overflow-y-auto sm:max-w-lg'>
          {selected ? (
            <>
              <SheetHeader>
                <SheetTitle>{selected.fullName}</SheetTitle>
              </SheetHeader>
              <div className='space-y-4 px-4'>
                <div className='flex items-center gap-2'>
                  <StatusBadge status={selected.status} />
                  <span className='text-sm text-muted-foreground'>
                    {new Date(selected.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className='grid gap-3 sm:grid-cols-2'>
                  <div className='space-y-1'>
                    <Label className='text-muted-foreground'>Email</Label>
                    <p className='text-sm'>{selected.email}</p>
                  </div>
                  <div className='space-y-1'>
                    <Label className='text-muted-foreground'>Phone</Label>
                    <p className='text-sm'>{selected.phone}</p>
                  </div>
                  <div className='space-y-1'>
                    <Label className='text-muted-foreground'>Company</Label>
                    <p className='text-sm'>{selected.company}</p>
                  </div>
                  <div className='space-y-1'>
                    <Label className='text-muted-foreground'>Service</Label>
                    <p className='text-sm'>{selected.service}</p>
                  </div>
                  <div className='space-y-1'>
                    <Label className='text-muted-foreground'>Project type</Label>
                    <p className='text-sm capitalize'>{selected.projectType}</p>
                  </div>
                  {selected.budget ? (
                    <div className='space-y-1'>
                      <Label className='text-muted-foreground'>Budget</Label>
                      <p className='text-sm'>{selected.budget}</p>
                    </div>
                  ) : null}
                  {selected.preferredDate ? (
                    <div className='space-y-1'>
                      <Label className='text-muted-foreground'>Preferred date</Label>
                      <p className='text-sm'>{selected.preferredDate}</p>
                    </div>
                  ) : null}
                  {selected.preferredTime ? (
                    <div className='space-y-1'>
                      <Label className='text-muted-foreground'>Preferred time</Label>
                      <p className='text-sm'>{selected.preferredTime}</p>
                    </div>
                  ) : null}
                  {selected.referral ? (
                    <div className='space-y-1'>
                      <Label className='text-muted-foreground'>Referral</Label>
                      <p className='text-sm'>{selected.referral}</p>
                    </div>
                  ) : null}
                </div>
                <div className='space-y-1'>
                  <Label className='text-muted-foreground'>Description</Label>
                  <p className='text-sm whitespace-pre-wrap'>{selected.description}</p>
                </div>
                <div className='space-y-2'>
                  <Label>Status</Label>
                  <Select
                    value={selected.status}
                    onValueChange={(value) => {
                      if (value) handleStatusChange(selected.id, value);
                    }}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant='destructive'
                  onClick={() => handleDelete(selected)}
                  disabled={removeBooking.isPending}
                >
                  Delete consultation
                </Button>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  );
}
