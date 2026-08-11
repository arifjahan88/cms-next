import { apiError, apiSuccess } from '@/lib/api/response';
import { getPublicLandingSections } from '@/db/queries/landing';

export async function GET(request: Request) {
  try {
    const sections = await getPublicLandingSections('home');
    return apiSuccess(request, { sections }, { message: 'Landing page sections retrieved' });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to load landing page',
      statusCode: 500,
      error,
    });
  }
}
