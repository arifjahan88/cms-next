import {
  createCaseStudy,
  deleteCaseStudy,
  listAdminCaseStudies,
  updateCaseStudy,
} from '@/db/queries/case-studies';
import { apiError, apiSuccess } from '@/lib/api/response';
import {
  requireDashboardSession,
  requireDashboardWrite,
} from '@/lib/auth/require-admin';
import { revalidateCaseStudies } from '@/lib/revalidate';
import { caseStudySchema, normalizeStatus } from '@/lib/validations/landing';

export async function GET(request: Request) {
  const auth = await requireDashboardSession(request);
  if (!auth.ok) return auth.response;

  try {
    const items = await listAdminCaseStudies();
    return apiSuccess(request, items, { message: 'Case studies retrieved' });
  } catch (error) {
    return apiError(request, { message: 'Failed to load case studies', statusCode: 500, error });
  }
}

export async function POST(request: Request) {
  const auth = await requireDashboardWrite(request);
  if (!auth.ok) return auth.response;

  try {
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
    const item = await createCaseStudy({
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
      sortOrder: data.sortOrder ?? 0,
    });

    revalidateCaseStudies(data.slug);
    return apiSuccess(request, item, { message: 'Case study created', statusCode: 201 });
  } catch (error) {
    return apiError(request, { message: 'Failed to create case study', statusCode: 500, error });
  }
}
