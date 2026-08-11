import {
  createJobOpening,
  listAdminJobOpenings,
} from '@/db/queries/jobs';
import { apiError, apiSuccess } from '@/lib/api/response';
import { requireAdmin } from '@/lib/auth/require-admin';
import { revalidateJobs } from '@/lib/revalidate';
import { jobOpeningSchema, normalizeStatus } from '@/lib/validations/landing';

export async function GET(request: Request) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const jobs = await listAdminJobOpenings();
    return apiSuccess(request, jobs, { message: 'Job openings retrieved' });
  } catch (error) {
    return apiError(request, { message: 'Failed to load job openings', statusCode: 500, error });
  }
}

export async function POST(request: Request) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const body = await request.json();
    const parsed = jobOpeningSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(request, {
        message: 'Invalid job opening data',
        statusCode: 400,
        error: parsed.error.flatten(),
      });
    }

    const data = parsed.data;
    const job = await createJobOpening({
      slug: data.slug,
      title: data.title,
      department: data.department,
      type: data.type,
      location: data.location,
      description: data.description,
      applyHref: data.applyHref,
      status: normalizeStatus(data.status),
      sortOrder: data.sortOrder ?? 0,
    });

    revalidateJobs();
    return apiSuccess(request, job, { message: 'Job opening created', statusCode: 201 });
  } catch (error) {
    return apiError(request, { message: 'Failed to create job opening', statusCode: 500, error });
  }
}
