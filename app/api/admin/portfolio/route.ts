import {
  createPortfolioProject,
  listAdminPortfolioProjects,
} from '@/db/queries/portfolio';
import { apiError, apiSuccess } from '@/lib/api/response';
import {
  requireDashboardSession,
  requireDashboardWrite,
} from '@/lib/auth/require-admin';
import { revalidatePortfolio } from '@/lib/revalidate';
import { normalizeStatus, portfolioProjectSchema } from '@/lib/validations/landing';

export async function GET(request: Request) {
  const auth = await requireDashboardSession(request);
  if (!auth.ok) return auth.response;

  try {
    const projects = await listAdminPortfolioProjects();
    return apiSuccess(request, projects, { message: 'Portfolio projects retrieved' });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to load portfolio projects',
      statusCode: 500,
      error,
    });
  }
}

export async function POST(request: Request) {
  const auth = await requireDashboardWrite(request);
  if (!auth.ok) return auth.response;

  try {
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
    const project = await createPortfolioProject({
      slug: data.slug,
      title: data.title,
      description: data.description,
      category: data.category,
      image: data.image,
      href: data.href,
      projectDate: data.projectDate,
      status: normalizeStatus(data.status),
      sortOrder: data.sortOrder ?? 0,
    });

    revalidatePortfolio();
    return apiSuccess(request, project, {
      message: 'Portfolio project created',
      statusCode: 201,
    });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to create portfolio project',
      statusCode: 500,
      error,
    });
  }
}
