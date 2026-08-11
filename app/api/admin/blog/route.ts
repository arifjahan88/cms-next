import {
  createBlogPost,
  deleteBlogPost,
  getBlogPostById,
  listAdminBlogPosts,
  updateBlogPost,
} from '@/db/queries/blog';
import { apiError, apiSuccess } from '@/lib/api/response';
import { requireAdmin } from '@/lib/auth/require-admin';
import { revalidateBlog } from '@/lib/revalidate';
import { blogPostSchema, normalizeStatus } from '@/lib/validations/landing';

export async function GET(request: Request) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const posts = await listAdminBlogPosts();
    return apiSuccess(request, posts, { message: 'Blog posts retrieved' });
  } catch (error) {
    return apiError(request, { message: 'Failed to load blog posts', statusCode: 500, error });
  }
}

export async function POST(request: Request) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
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
    const post = await createBlogPost({
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
      sortOrder: data.sortOrder ?? 0,
    });

    revalidateBlog(data.slug);
    return apiSuccess(request, post, { message: 'Blog post created', statusCode: 201 });
  } catch (error) {
    return apiError(request, { message: 'Failed to create blog post', statusCode: 500, error });
  }
}
