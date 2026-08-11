import { listConsultationBookings } from '@/db/queries/consultation-bookings';
import { apiError, apiSuccess } from '@/lib/api/response';
import { requireDashboardSession } from '@/lib/auth/require-admin';

export async function GET(request: Request) {
  const auth = await requireDashboardSession(request);
  if (!auth.ok) return auth.response;

  try {
    const bookings = await listConsultationBookings();
    return apiSuccess(request, bookings, { message: 'Consultation bookings retrieved' });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to load consultation bookings',
      statusCode: 500,
      error,
    });
  }
}
