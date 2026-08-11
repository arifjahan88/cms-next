'use client';

import { useState } from 'react';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import type { ContactMessageDto } from '@/db/queries/contact-messages';
import { ConfirmAlertDialog } from '@/components/shared/confirm-alert-dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  EntityListCms,
  StatusBadge,
} from '@/features/dashboard/components/entity-cms/entity-list-cms';
import {
  deleteContactMessage,
  listContactMessages,
  updateContactMessageStatus,
} from '@/lib/api/contact-messages';
import { contactMessageKeys } from '@/lib/api/query-keys';
import { actionToast, runWithActionToast } from '@/lib/toast-action';

const STATUSES = ['new', 'read', 'archived'] as const;

export function ContactMessagesCms() {
  const queryClient = useQueryClient();
  const { data: messages } = useSuspenseQuery({
    queryKey: contactMessageKeys.admin(),
    queryFn: listContactMessages,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: contactMessageKeys.all });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateContactMessageStatus(id, status),
    onSuccess: invalidate,
  });
  const removeMessage = useMutation({
    mutationFn: deleteContactMessage,
    onSuccess: invalidate,
  });

  const [selected, setSelected] = useState<ContactMessageDto | null>(null);
  const [sheetDeleteOpen, setSheetDeleteOpen] = useState(false);

  async function handleStatusChange(id: string, status: string) {
    await runWithActionToast(
      () => updateStatus.mutateAsync({ id, status }),
      actionToast.updating('message status')
    );
    setSelected((prev) => (prev?.id === id ? { ...prev, status } : prev));
  }

  async function handleDelete(message: ContactMessageDto) {
    await runWithActionToast(
      () => removeMessage.mutateAsync(message.id),
      actionToast.deleting('message')
    );
    if (selected?.id === message.id) setSelected(null);
  }

  return (
    <>
      <EntityListCms
        title='Contact Messages'
        description='View and manage contact form submissions.'
        items={messages}
        emptyMessage='No contact messages yet.'
        onEdit={setSelected}
        onDelete={handleDelete}
        columns={[
          {
            header: 'From',
            searchValue: (m) => `${m.fullName} ${m.email}`,
            cell: (m) => (
              <div>
                <div className='font-medium'>{m.fullName}</div>
                <div className='text-xs text-muted-foreground'>{m.email}</div>
              </div>
            ),
          },
          {
            header: 'Subject',
            searchValue: (m) => m.subject,
            cell: (m) => m.subject,
          },
          {
            header: 'Status',
            searchValue: (m) => m.status,
            cell: (m) => (
              <Select
                value={m.status}
                onValueChange={(value) => {
                  if (value) handleStatusChange(m.id, value);
                }}
              >
                <SelectTrigger size='sm' className='w-28'>
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
            header: 'Received',
            cell: (m) => new Date(m.createdAt).toLocaleString(),
          },
        ]}
      />

      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent side='right' className='w-full overflow-y-auto sm:max-w-lg'>
          {selected ? (
            <>
              <SheetHeader>
                <SheetTitle>{selected.subject}</SheetTitle>
              </SheetHeader>
              <div className='space-y-4 px-4'>
                <div className='flex items-center gap-2'>
                  <StatusBadge status={selected.status} />
                  <span className='text-sm text-muted-foreground'>
                    {new Date(selected.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className='space-y-1'>
                  <Label className='text-muted-foreground'>From</Label>
                  <p className='text-sm'>
                    {selected.fullName} &lt;{selected.email}&gt;
                  </p>
                </div>
                {selected.company ? (
                  <div className='space-y-1'>
                    <Label className='text-muted-foreground'>Company</Label>
                    <p className='text-sm'>{selected.company}</p>
                  </div>
                ) : null}
                {selected.phone ? (
                  <div className='space-y-1'>
                    <Label className='text-muted-foreground'>Phone</Label>
                    <p className='text-sm'>{selected.phone}</p>
                  </div>
                ) : null}
                <div className='space-y-1'>
                  <Label className='text-muted-foreground'>Message</Label>
                  <p className='text-sm whitespace-pre-wrap'>{selected.message}</p>
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
                  onClick={() => setSheetDeleteOpen(true)}
                  disabled={removeMessage.isPending}
                >
                  Delete message
                </Button>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>

      <ConfirmAlertDialog
        open={sheetDeleteOpen}
        onOpenChange={setSheetDeleteOpen}
        title='Delete this message?'
        description='This contact message will be permanently removed.'
        confirmLabel='Delete'
        pending={removeMessage.isPending}
        onConfirm={async () => {
          if (!selected) return;
          await handleDelete(selected);
        }}
      />
    </>
  );
}
