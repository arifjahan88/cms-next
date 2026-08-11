import { apiFetch } from '@/lib/api/client';
import type { CaseStudyDto } from '@/db/queries/case-studies';
import type { caseStudySchema } from '@/lib/validations/landing';
import type { z } from 'zod';

export type CaseStudyInput = z.infer<typeof caseStudySchema>;

export function listCaseStudies() {
  return apiFetch<CaseStudyDto[]>('/api/admin/case-studies');
}

export function createCaseStudy(payload: CaseStudyInput) {
  return apiFetch<CaseStudyDto>('/api/admin/case-studies', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateCaseStudy(id: string, payload: CaseStudyInput) {
  return apiFetch<CaseStudyDto>(`/api/admin/case-studies/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export function deleteCaseStudy(id: string) {
  return apiFetch<null>(`/api/admin/case-studies/${id}`, { method: 'DELETE' });
}
