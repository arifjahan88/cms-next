import {
  deleteConsultationBooking,
  getConsultationBookingById,
  updateConsultationBooking,
} from '@/db/queries/consultation-bookings';
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
    const booking = await getConsultationBookingById(id);
    if (!booking) {
      return apiError(request, { message: 'Consultation booking not found', statusCode: 404 });
    }
    return apiSuccess(request, booking, { message: 'Consultation booking retrieved' });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to load consultation booking',
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

    const booking = await updateConsultationBooking(id, { status: parsed.data.status });
    if (!booking) {
      return apiError(request, { message: 'Consultation booking not found', statusCode: 404 });
    }

    return apiSuccess(request, booking, { message: 'Consultation booking updated' });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to update consultation booking',
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
    const booking = await deleteConsultationBooking(id);
    if (!booking) {
      return apiError(request, { message: 'Consultation booking not found', statusCode: 404 });
    }
    return apiSuccess(request, null, { message: 'Consultation booking deleted' });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to delete consultation booking',
      statusCode: 500,
      error,
    });
  }
}
