import { apiFetch } from '@/lib/api/client';
import type { ContactMessageDto } from '@/db/queries/contact-messages';

export function listContactMessages() {
  return apiFetch<ContactMessageDto[]>('/api/admin/contact-messages');
}

export function updateContactMessageStatus(id: string, status: string) {
  return apiFetch<ContactMessageDto>(`/api/admin/contact-messages/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export function deleteContactMessage(id: string) {
  return apiFetch<null>(`/api/admin/contact-messages/${id}`, { method: 'DELETE' });
}
