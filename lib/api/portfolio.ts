import { apiFetch } from '@/lib/api/client';
import type { PortfolioProjectDto } from '@/db/queries/portfolio';
import type { portfolioProjectSchema } from '@/lib/validations/landing';
import type { z } from 'zod';

export type PortfolioProjectInput = z.infer<typeof portfolioProjectSchema>;

export function listPortfolioProjects() {
  return apiFetch<PortfolioProjectDto[]>('/api/admin/portfolio');
}

export function createPortfolioProject(payload: PortfolioProjectInput) {
  return apiFetch<PortfolioProjectDto>('/api/admin/portfolio', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updatePortfolioProject(id: string, payload: PortfolioProjectInput) {
  return apiFetch<PortfolioProjectDto>(`/api/admin/portfolio/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export function deletePortfolioProject(id: string) {
  return apiFetch<null>(`/api/admin/portfolio/${id}`, { method: 'DELETE' });
}
