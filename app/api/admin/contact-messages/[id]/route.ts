import {
  deleteContactMessage,
  getContactMessageById,
  updateContactMessage,
} from '@/db/queries/contact-messages';
import { apiError, apiSuccess } from '@/lib/api/response';
import {
  requireDashboardSession,
  requireDashboardWrite,
} from '@/lib/auth/require-admin';
import { inboxStatusSchema } from '@/lib/validations/landing';

type Params = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Params) {
  const auth = await requireDashboardSession(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    const message = await getContactMessageById(id);
    if (!message) {
      return apiError(request, { message: 'Contact message not found', statusCode: 404 });
    }
    return apiSuccess(request, message, { message: 'Contact message retrieved' });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to load contact message',
      statusCode: 500,
      error,
    });
  }
}

export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireDashboardWrite(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = inboxStatusSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(request, {
        message: 'Invalid status',
        statusCode: 400,
        error: parsed.error.flatten(),
      });
    }

    const message = await updateContactMessage(id, { status: parsed.data.status });
    if (!message) {
      return apiError(request, { message: 'Contact message not found', statusCode: 404 });
    }

    return apiSuccess(request, message, { message: 'Contact message updated' });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to update contact message',
      statusCode: 500,
      error,
    });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const auth = await requireDashboardWrite(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    const message = await deleteContactMessage(id);
    if (!message) {
      return apiError(request, { message: 'Contact message not found', statusCode: 404 });
    }
    return apiSuccess(request, null, { message: 'Contact message deleted' });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to delete contact message',
      statusCode: 500,
      error,
    });
  }
}
