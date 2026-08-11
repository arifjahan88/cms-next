'use client';

import { useState } from 'react';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Eye } from 'lucide-react';
import type { UserDto } from '@/db/queries/users';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  EntityListCms,
} from '@/features/dashboard/components/entity-cms/entity-list-cms';
import {
  createAdminUser,
  deleteAdminUser,
  listAdminUsers,
  updateAdminUser,
  type UserCreateInput,
  type UserUpdateInput,
} from '@/lib/api/users';
import { userKeys } from '@/lib/api/query-keys';
import { roleLabel, UserRole } from '@/lib/auth/roles';
import { actionToast, runWithActionToast } from '@/lib/toast-action';

type UserFormState = {
  name: string;
  email: string;
  password: string;
  role: typeof UserRole.Admin | typeof UserRole.User;
};

const emptyForm = (): UserFormState => ({
  name: '',
  email: '',
  password: '',
  role: UserRole.User,
});

function toForm(user: UserDto): UserFormState {
  return {
    name: user.name,
    email: user.email,
    password: '',
    role: user.role === UserRole.Admin ? UserRole.Admin : UserRole.User,
  };
}

function formatDate(value: Date | string) {
  const date = typeof value === 'string' ? new Date(value) : value;
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function UsersCms() {
  const queryClient = useQueryClient();
  const { data: items } = useSuspenseQuery({
    queryKey: userKeys.admin(),
    queryFn: listAdminUsers,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: userKeys.all });

  const createItem = useMutation({ mutationFn: createAdminUser, onSuccess: invalidate });
  const updateItem = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UserUpdateInput }) =>
      updateAdminUser(id, payload),
    onSuccess: invalidate,
  });
  const removeItem = useMutation({ mutationFn: deleteAdminUser, onSuccess: invalidate });

  const [sheetOpen, setSheetOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewing, setViewing] = useState<UserDto | null>(null);
  const [form, setForm] = useState<UserFormState>(emptyForm);

  function patch(partial: Partial<UserFormState>) {
    setForm((prev) => ({ ...prev, ...partial }));
  }

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm());
    setSheetOpen(true);
  }

  function openEdit(user: UserDto) {
    setEditingId(user.id);
    setForm(toForm(user));
    setSheetOpen(true);
  }

  function openView(user: UserDto) {
    setViewing(user);
    setViewOpen(true);
  }

  async function handleSave() {
    if (editingId) {
      const payload: UserUpdateInput = {
        name: form.name,
        email: form.email,
        role: form.role,
        password: form.password || undefined,
      };
      await runWithActionToast(
        () => updateItem.mutateAsync({ id: editingId, payload }),
        actionToast.updating('user')
      );
    } else {
      const payload: UserCreateInput = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      };
      await runWithActionToast(
        () => createItem.mutateAsync(payload),
        actionToast.adding('user')
      );
    }
    setSheetOpen(false);
  }

  async function handleDelete(user: UserDto) {
    await runWithActionToast(
      () => removeItem.mutateAsync(user.id),
      actionToast.deleting('user')
    );
  }

  const saving = createItem.isPending || updateItem.isPending;

  return (
    <>
      <EntityListCms
        title='Users'
        description='Manage dashboard users and roles.'
        items={items}
        createLabel='New user'
        emptyMessage='No users yet.'
        onCreate={openCreate}
        onEdit={openEdit}
        onDelete={handleDelete}
        columns={[
          {
            header: 'Name',
            searchValue: (u) => u.name,
            cell: (u) => (
              <div className='flex items-center gap-2'>
                <span className='font-medium'>{u.name}</span>
                <Button
                  variant='ghost'
                  size='icon-sm'
                  onClick={() => openView(u)}
                  aria-label={`View ${u.name}`}
                >
                  <Eye className='size-3.5' />
                </Button>
              </div>
            ),
          },
          {
            header: 'Email',
            searchValue: (u) => u.email,
            cell: (u) => u.email,
          },
          {
            header: 'Role',
            searchValue: (u) => roleLabel(u.role),
            cell: (u) => (
              <Badge variant='secondary' className='border-0 capitalize'>
                {roleLabel(u.role)}
              </Badge>
            ),
          },
          {
            header: 'Created',
            searchValue: (u) => formatDate(u.createdAt),
            cell: (u) => (
              <span className='text-muted-foreground'>{formatDate(u.createdAt)}</span>
            ),
          },
        ]}
      />

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side='right' className='w-full overflow-y-auto sm:max-w-lg'>
          <SheetHeader>
            <SheetTitle>{editingId ? 'Edit user' : 'New user'}</SheetTitle>
          </SheetHeader>

          <div className='space-y-4 px-4'>
            <div className='space-y-2'>
              <Label htmlFor='user-name'>Name</Label>
              <Input
                id='user-name'
                value={form.name}
                onChange={(e) => patch({ name: e.target.value })}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='user-email'>Email</Label>
              <Input
                id='user-email'
                type='email'
                value={form.email}
                onChange={(e) => patch({ email: e.target.value })}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='user-password'>
                Password{editingId ? ' (leave blank to keep)' : ''}
              </Label>
              <Input
                id='user-password'
                type='password'
                value={form.password}
                onChange={(e) => patch({ password: e.target.value })}
                autoComplete='new-password'
              />
            </div>
            <div className='space-y-2'>
              <Label>Role</Label>
              <Select
                value={String(form.role)}
                onValueChange={(v) =>
                  patch({
                    role:
                      Number(v) === UserRole.Admin ? UserRole.Admin : UserRole.User,
                  })
                }
              >
                <SelectTrigger className='w-full'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={String(UserRole.Admin)}>Admin</SelectItem>
                  <SelectItem value={String(UserRole.User)}>User (view-only writes)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <SheetFooter>
            <Button variant='outline' onClick={() => setSheetOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving…' : editingId ? 'Save changes' : 'Create user'}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet open={viewOpen} onOpenChange={setViewOpen}>
        <SheetContent side='right' className='w-full overflow-y-auto sm:max-w-md'>
          <SheetHeader>
            <SheetTitle>User details</SheetTitle>
          </SheetHeader>
          {viewing ? (
            <div className='space-y-4 px-4 text-sm'>
              <div>
                <p className='text-muted-foreground'>Name</p>
                <p className='font-medium'>{viewing.name}</p>
              </div>
              <div>
                <p className='text-muted-foreground'>Email</p>
                <p className='font-medium'>{viewing.email}</p>
              </div>
              <div>
                <p className='text-muted-foreground'>Role</p>
                <p className='font-medium'>{roleLabel(viewing.role)}</p>
              </div>
              <div>
                <p className='text-muted-foreground'>Created</p>
                <p className='font-medium'>{formatDate(viewing.createdAt)}</p>
              </div>
              <div>
                <p className='text-muted-foreground'>Updated</p>
                <p className='font-medium'>{formatDate(viewing.updatedAt)}</p>
              </div>
            </div>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  );
}
