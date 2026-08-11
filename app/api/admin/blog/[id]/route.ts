import {
  deleteBlogPost,
  getBlogPostById,
  updateBlogPost,
} from '@/db/queries/blog';
import { apiError, apiSuccess } from '@/lib/api/response';
import {
  requireDashboardSession,
  requireDashboardWrite,
} from '@/lib/auth/require-admin';
import { revalidateBlog } from '@/lib/revalidate';
import { blogPostSchema, normalizeStatus } from '@/lib/validations/landing';

type Params = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Params) {
  const auth = await requireDashboardSession(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    const post = await getBlogPostById(id);
    if (!post) {
      return apiError(request, { message: 'Blog post not found', statusCode: 404 });
    }
    return apiSuccess(request, post, { message: 'Blog post retrieved' });
  } catch (error) {
    return apiError(request, { message: 'Failed to load blog post', statusCode: 500, error });
  }
}

export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireDashboardWrite(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    const existing = await getBlogPostById(id);
    if (!existing) {
      return apiError(request, { message: 'Blog post not found', statusCode: 404 });
    }

    const body = await request.json();
    const parsed = blogPostSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(request, {
        message: 'Invalid blog post data',
        statusCode: 400,
        error: parsed.error.flatten(),
      });
    }

    const data = parsed.data;
    const post = await updateBlogPost(id, {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      body: data.body,
      category: data.category,
      author: data.author,
      image: data.image,
      readTime: data.readTime,
      featured: data.featured,
      status: normalizeStatus(data.status),
      seoTitle: data.seoTitle ?? null,
      seoDescription: data.seoDescription ?? null,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
      sortOrder: data.sortOrder,
    });

    revalidateBlog(data.slug);
    return apiSuccess(request, post, { message: 'Blog post updated' });
  } catch (error) {
    return apiError(request, { message: 'Failed to update blog post', statusCode: 500, error });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const auth = await requireDashboardWrite(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    const existing = await getBlogPostById(id);
    if (!existing) {
      return apiError(request, { message: 'Blog post not found', statusCode: 404 });
    }

    await deleteBlogPost(id);
    revalidateBlog(existing.slug);
    return apiSuccess(request, null, { message: 'Blog post deleted' });
  } catch (error) {
    return apiError(request, { message: 'Failed to delete blog post', statusCode: 500, error });
  }
}
