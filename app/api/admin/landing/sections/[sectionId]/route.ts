import {
  fetchLandingSection,
  fetchLandingSections,
  serializeLandingDocument,
  serializePageDocument,
  updateLandingSectionRow,
} from '@/db/queries/landing';
import { isValidPageSection } from '@/features/dashboard/data/page-configs';
import type { PageSlug } from '@/features/dashboard/data/public-pages';
import { apiError, apiSuccess } from '@/lib/api/response';
import { requireAdmin } from '@/lib/auth/require-admin';
import { revalidateLanding } from '@/lib/landing/revalidate';
import {
  pageSlugSchema,
  parsePageSectionContent,
  updateLandingSectionSchema,
} from '@/lib/validations/landing';

type Params = { params: Promise<{ sectionId: string }> };

function resolvePageSlug(body: { page?: string }, request: Request): PageSlug | null {
  const url = new URL(request.url);
  const page = body.page ?? url.searchParams.get('page') ?? 'home';
  const parsed = pageSlugSchema.safeParse(page);
  return parsed.success ? parsed.data : null;
}

export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const { sectionId } = await params;
    const body = await request.json();
    const pageSlug = resolvePageSlug(body, request);

    if (!pageSlug) {
      return apiError(request, { message: 'Invalid page slug', statusCode: 400 });
    }

    if (!isValidPageSection(pageSlug, sectionId)) {
      return apiError(request, { message: 'Invalid section id', statusCode: 400 });
    }

    const parsed = updateLandingSectionSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(request, {
        message: 'Invalid section data',
        statusCode: 400,
        error: parsed.error.flatten(),
      });
    }

    const existing = await fetchLandingSection(pageSlug, sectionId);
    if (!existing) {
      return apiError(request, { message: 'Section not found', statusCode: 404 });
    }

    const patch = parsed.data;
    if (patch.content !== undefined) {
      try {
        parsePageSectionContent(pageSlug, sectionId, patch.content);
      } catch (error) {
        return apiError(request, {
          message: 'Invalid section content',
          statusCode: 400,
          error,
        });
      }
    }

    await updateLandingSectionRow(pageSlug, sectionId, {
      ...(patch.title !== undefined ? { title: patch.title } : {}),
      ...(patch.status !== undefined ? { status: patch.status } : {}),
      ...(patch.icon !== undefined ? { icon: patch.icon } : {}),
      ...(patch.visible !== undefined ? { visible: patch.visible } : {}),
      ...(patch.content !== undefined ? { content: patch.content } : {}),
    });

    const rows = await fetchLandingSections(pageSlug);
    const document =
      pageSlug === 'home' ? serializeLandingDocument(rows) : serializePageDocument(rows);
    revalidateLanding(pageSlug);

    return apiSuccess(request, document, { message: 'Page section updated' });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to update page section',
      statusCode: 500,
      error,
    });
  }
}
