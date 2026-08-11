import { apiFetch } from '@/lib/api/client';
import type { JobOpeningDto } from '@/db/queries/jobs';
import type { jobOpeningSchema } from '@/lib/validations/landing';
import type { z } from 'zod';

export type JobOpeningInput = z.infer<typeof jobOpeningSchema>;

export function listJobs() {
  return apiFetch<JobOpeningDto[]>('/api/admin/jobs');
}

export function createJob(payload: JobOpeningInput) {
  return apiFetch<JobOpeningDto>('/api/admin/jobs', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateJob(id: string, payload: JobOpeningInput) {
  return apiFetch<JobOpeningDto>(`/api/admin/jobs/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export function deleteJob(id: string) {
  return apiFetch<null>(`/api/admin/jobs/${id}`, { method: 'DELETE' });
}
