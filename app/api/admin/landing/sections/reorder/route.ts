import {
  fetchLandingSections,
  reorderLandingSections,
  serializeLandingDocument,
} from '@/db/queries/landing';
import { apiError, apiSuccess } from '@/lib/api/response';
import { requireAdmin } from '@/lib/auth/require-admin';
import { revalidateLanding } from '@/lib/landing/revalidate';
import type { SectionId } from '@/features/dashboard/data/landing-cms';
import { reorderLandingSectionsSchema } from '@/lib/validations/landing';

const PAGE_SLUG = 'home';

export async function PUT(request: Request) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const body = await request.json();
    const parsed = reorderLandingSectionsSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(request, {
        message: 'Invalid reorder payload',
        statusCode: 400,
        error: parsed.error.flatten(),
      });
    }

    await reorderLandingSections(
      PAGE_SLUG,
      parsed.data.orderedSectionIds as SectionId[]
    );

    const rows = await fetchLandingSections(PAGE_SLUG);
    const document = serializeLandingDocument(rows);
    revalidateLanding(PAGE_SLUG);

    return apiSuccess(
      request,
      document,
      { message: 'Landing sections reordered' }
    );
  } catch (error) {
    return apiError(request, {
      message: 'Failed to reorder landing sections',
      statusCode: 500,
      error,
    });
  }
}
