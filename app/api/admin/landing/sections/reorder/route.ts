import {
  fetchLandingSections,
  reorderLandingSections,
  serializeLandingDocument,
  serializePageDocument,
} from '@/db/queries/landing';
import { apiError, apiSuccess } from '@/lib/api/response';
import { requireAdmin } from '@/lib/auth/require-admin';
import { revalidateLanding } from '@/lib/landing/revalidate';
import type { PageSlug } from '@/features/dashboard/data/public-pages';
import { createReorderSchema, pageSlugSchema } from '@/lib/validations/landing';

function resolvePageSlug(body: { page?: string }, request: Request): PageSlug | null {
  const url = new URL(request.url);
  const page = body.page ?? url.searchParams.get('page') ?? 'home';
  const parsed = pageSlugSchema.safeParse(page);
  return parsed.success ? parsed.data : null;
}

export async function PUT(request: Request) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const body = await request.json();
    const pageSlug = resolvePageSlug(body, request);

    if (!pageSlug) {
      return apiError(request, { message: 'Invalid page slug', statusCode: 400 });
    }

    const parsed = createReorderSchema(pageSlug).safeParse(body);
    if (!parsed.success) {
      return apiError(request, {
        message: 'Invalid reorder payload',
        statusCode: 400,
        error: parsed.error.flatten(),
      });
    }

    await reorderLandingSections(pageSlug, parsed.data.orderedSectionIds);

    const rows = await fetchLandingSections(pageSlug);
    const document =
      pageSlug === 'home' ? serializeLandingDocument(rows) : serializePageDocument(rows);
    revalidateLanding(pageSlug);

    return apiSuccess(request, document, { message: 'Page sections reordered' });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to reorder page sections',
      statusCode: 500,
      error,
    });
  }
}
