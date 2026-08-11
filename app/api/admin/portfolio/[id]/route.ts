import {
  deletePortfolioProject,
  getPortfolioProjectById,
  updatePortfolioProject,
} from '@/db/queries/portfolio';
import { apiError, apiSuccess } from '@/lib/api/response';
import { requireAdmin } from '@/lib/auth/require-admin';
import { revalidatePortfolio } from '@/lib/revalidate';
import { normalizeStatus, portfolioProjectSchema } from '@/lib/validations/landing';

type Params = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Params) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    const project = await getPortfolioProjectById(id);
    if (!project) {
      return apiError(request, { message: 'Portfolio project not found', statusCode: 404 });
    }
    return apiSuccess(request, project, { message: 'Portfolio project retrieved' });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to load portfolio project',
      statusCode: 500,
      error,
    });
  }
}

export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    const existing = await getPortfolioProjectById(id);
    if (!existing) {
      return apiError(request, { message: 'Portfolio project not found', statusCode: 404 });
    }

    const body = await request.json();
    const parsed = portfolioProjectSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(request, {
        message: 'Invalid portfolio project data',
        statusCode: 400,
        error: parsed.error.flatten(),
      });
    }

    const data = parsed.data;
    const project = await updatePortfolioProject(id, {
      slug: data.slug,
      title: data.title,
      description: data.description,
      category: data.category,
      image: data.image,
      href: data.href,
      projectDate: data.projectDate,
      status: normalizeStatus(data.status),
      sortOrder: data.sortOrder,
    });

    revalidatePortfolio();
    return apiSuccess(request, project, { message: 'Portfolio project updated' });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to update portfolio project',
      statusCode: 500,
      error,
    });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    const existing = await getPortfolioProjectById(id);
    if (!existing) {
      return apiError(request, { message: 'Portfolio project not found', statusCode: 404 });
    }

    await deletePortfolioProject(id);
    revalidatePortfolio();
    return apiSuccess(request, null, { message: 'Portfolio project deleted' });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to delete portfolio project',
      statusCode: 500,
      error,
    });
  }
}
