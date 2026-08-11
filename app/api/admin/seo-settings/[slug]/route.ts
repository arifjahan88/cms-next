import { upsertPageSeo } from '@/db/queries/page-seo';
import { apiError, apiSuccess } from '@/lib/api/response';
import { requireAdmin } from '@/lib/auth/require-admin';
import { revalidateSeo } from '@/lib/revalidate';
import { pageSlugSchema, updatePageSeoSchema } from '@/lib/validations/landing';

type Params = { params: Promise<{ slug: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const { slug } = await params;
    const slugParsed = pageSlugSchema.safeParse(slug);
    if (!slugParsed.success) {
      return apiError(request, { message: 'Invalid page slug', statusCode: 400 });
    }

    const body = await request.json();
    const parsed = updatePageSeoSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(request, {
        message: 'Invalid SEO data',
        statusCode: 400,
        error: parsed.error.flatten(),
      });
    }

    const row = await upsertPageSeo(slugParsed.data, parsed.data);
    revalidateSeo(slugParsed.data);

    return apiSuccess(request, row, { message: 'SEO settings updated' });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to update SEO settings',
      statusCode: 500,
      error,
    });
  }
}
