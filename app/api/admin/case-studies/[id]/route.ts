import {
  deleteCaseStudy,
  getCaseStudyById,
  updateCaseStudy,
} from '@/db/queries/case-studies';
import { apiError, apiSuccess } from '@/lib/api/response';
import { requireAdmin } from '@/lib/auth/require-admin';
import { revalidateCaseStudies } from '@/lib/revalidate';
import { caseStudySchema, normalizeStatus } from '@/lib/validations/landing';

type Params = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Params) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    const item = await getCaseStudyById(id);
    if (!item) {
      return apiError(request, { message: 'Case study not found', statusCode: 404 });
    }
    return apiSuccess(request, item, { message: 'Case study retrieved' });
  } catch (error) {
    return apiError(request, { message: 'Failed to load case study', statusCode: 500, error });
  }
}

export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    const existing = await getCaseStudyById(id);
    if (!existing) {
      return apiError(request, { message: 'Case study not found', statusCode: 404 });
    }

    const body = await request.json();
    const parsed = caseStudySchema.safeParse(body);
    if (!parsed.success) {
      return apiError(request, {
        message: 'Invalid case study data',
        statusCode: 400,
        error: parsed.error.flatten(),
      });
    }

    const data = parsed.data;
    const item = await updateCaseStudy(id, {
      slug: data.slug,
      title: data.title,
      description: data.description,
      category: data.category,
      image: data.image,
      challenge: data.challenge,
      solution: data.solution,
      techStack: data.techStack,
      metrics: data.metrics,
      featured: data.featured,
      status: normalizeStatus(data.status),
      seoTitle: data.seoTitle ?? null,
      seoDescription: data.seoDescription ?? null,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
      sortOrder: data.sortOrder,
    });

    revalidateCaseStudies(data.slug);
    return apiSuccess(request, item, { message: 'Case study updated' });
  } catch (error) {
    return apiError(request, { message: 'Failed to update case study', statusCode: 500, error });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    const existing = await getCaseStudyById(id);
    if (!existing) {
      return apiError(request, { message: 'Case study not found', statusCode: 404 });
    }

    await deleteCaseStudy(id);
    revalidateCaseStudies(existing.slug);
    return apiSuccess(request, null, { message: 'Case study deleted' });
  } catch (error) {
    return apiError(request, { message: 'Failed to delete case study', statusCode: 500, error });
  }
}
