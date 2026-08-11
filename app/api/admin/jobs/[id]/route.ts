import {
  deleteJobOpening,
  getJobOpeningById,
  updateJobOpening,
} from '@/db/queries/jobs';
import { apiError, apiSuccess } from '@/lib/api/response';
import {
  requireDashboardSession,
  requireDashboardWrite,
} from '@/lib/auth/require-admin';
import { revalidateJobs } from '@/lib/revalidate';
import { jobOpeningSchema, normalizeStatus } from '@/lib/validations/landing';

type Params = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Params) {
  const auth = await requireDashboardSession(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    const job = await getJobOpeningById(id);
    if (!job) {
      return apiError(request, { message: 'Job opening not found', statusCode: 404 });
    }
    return apiSuccess(request, job, { message: 'Job opening retrieved' });
  } catch (error) {
    return apiError(request, { message: 'Failed to load job opening', statusCode: 500, error });
  }
}

export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireDashboardWrite(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    const existing = await getJobOpeningById(id);
    if (!existing) {
      return apiError(request, { message: 'Job opening not found', statusCode: 404 });
    }

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
    const job = await updateJobOpening(id, {
      slug: data.slug,
      title: data.title,
      department: data.department,
      type: data.type,
      location: data.location,
      description: data.description,
      applyHref: data.applyHref,
      status: normalizeStatus(data.status),
      sortOrder: data.sortOrder,
    });

    revalidateJobs();
    return apiSuccess(request, job, { message: 'Job opening updated' });
  } catch (error) {
    return apiError(request, { message: 'Failed to update job opening', statusCode: 500, error });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const auth = await requireDashboardWrite(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    const existing = await getJobOpeningById(id);
    if (!existing) {
      return apiError(request, { message: 'Job opening not found', statusCode: 404 });
    }

    await deleteJobOpening(id);
    revalidateJobs();
    return apiSuccess(request, null, { message: 'Job opening deleted' });
  } catch (error) {
    return apiError(request, { message: 'Failed to delete job opening', statusCode: 500, error });
  }
}
