import { apiError, apiSuccess } from '@/lib/api/response';
import { getPublicLandingSection } from '@/db/queries/landing';
import type { SectionId } from '@/features/dashboard/data/landing-cms';
import { landingSectionIdSchema } from '@/lib/validations/landing';

type Params = { params: Promise<{ sectionId: string }> };

export async function GET(request: Request, { params }: Params) {
  try {
    const { sectionId } = await params;
    const parsed = landingSectionIdSchema.safeParse(sectionId);
    if (!parsed.success) {
      return apiError(request, {
        message: 'Invalid section id',
        statusCode: 400,
        error: parsed.error.flatten(),
      });
    }

    const section = await getPublicLandingSection('home', parsed.data as SectionId);
    if (!section) {
      return apiError(request, {
        message: 'Section not found or not published',
        statusCode: 404,
      });
    }

    return apiSuccess(
      request,
      {
        sectionId: section.sectionId,
        status: 'published',
        content: section.content,
      },
      { message: 'Landing section retrieved' }
    );
  } catch (error) {
    return apiError(request, {
      message: 'Failed to load landing section',
      statusCode: 500,
      error,
    });
  }
}
