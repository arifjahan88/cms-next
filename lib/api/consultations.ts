import { apiFetch } from '@/lib/api/client';
import type { ConsultationBookingDto } from '@/db/queries/consultation-bookings';

export function listConsultationBookings() {
  return apiFetch<ConsultationBookingDto[]>('/api/admin/consultations');
}

export function updateConsultationStatus(id: string, status: string) {
  return apiFetch<ConsultationBookingDto>(`/api/admin/consultations/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export function deleteConsultationBooking(id: string) {
  return apiFetch<null>(`/api/admin/consultations/${id}`, { method: 'DELETE' });
}
