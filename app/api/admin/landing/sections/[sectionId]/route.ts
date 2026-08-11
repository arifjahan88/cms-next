import {
  fetchLandingSection,
  fetchLandingSections,
  serializeLandingDocument,
  updateLandingSectionRow,
} from '@/db/queries/landing';
import { apiError, apiSuccess } from '@/lib/api/response';
import { requireAdmin } from '@/lib/auth/require-admin';
import { revalidateLanding } from '@/lib/landing/revalidate';
import type { SectionId } from '@/features/dashboard/data/landing-cms';
import type { LandingContent } from '@/features/dashboard/data/landing-cms';
import {
  landingSectionIdSchema,
  parseLandingSectionContent,
  updateLandingSectionSchema,
} from '@/lib/validations/landing';

type Params = { params: Promise<{ sectionId: string }> };

const PAGE_SLUG = 'home';

export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const { sectionId } = await params;
    const idParsed = landingSectionIdSchema.safeParse(sectionId);
    if (!idParsed.success) {
      return apiError(request, {
        message: 'Invalid section id',
        statusCode: 400,
        error: idParsed.error.flatten(),
      });
    }

    const body = await request.json();
    const parsed = updateLandingSectionSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(request, {
        message: 'Invalid section data',
        statusCode: 400,
        error: parsed.error.flatten(),
      });
    }

    const existing = await fetchLandingSection(PAGE_SLUG, idParsed.data as SectionId);
    if (!existing) {
      return apiError(request, {
        message: 'Section not found',
        statusCode: 404,
      });
    }

    const patch = parsed.data;
    if (patch.content !== undefined) {
      try {
        parseLandingSectionContent(idParsed.data as SectionId, patch.content);
      } catch (error) {
        return apiError(request, {
          message: 'Invalid section content',
          statusCode: 400,
          error,
        });
      }
    }

    await updateLandingSectionRow(PAGE_SLUG, idParsed.data as SectionId, {
      ...(patch.title !== undefined ? { title: patch.title } : {}),
      ...(patch.status !== undefined ? { status: patch.status } : {}),
      ...(patch.icon !== undefined ? { icon: patch.icon } : {}),
      ...(patch.visible !== undefined ? { visible: patch.visible } : {}),
      ...(patch.content !== undefined
        ? { content: patch.content as LandingContent[SectionId] }
        : {}),
    });

    const rows = await fetchLandingSections(PAGE_SLUG);
    const document = serializeLandingDocument(rows);
    revalidateLanding(PAGE_SLUG);

    return apiSuccess(request, document, { message: 'Landing section updated' });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to update landing section',
      statusCode: 500,
      error,
    });
  }
}
