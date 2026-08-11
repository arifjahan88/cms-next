import { createConsultationBooking } from '@/db/queries/consultation-bookings';
import { apiError, apiSuccess } from '@/lib/api/response';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { consultationSubmitSchema } from '@/lib/validations/landing';

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (!checkRateLimit(`consultation:${ip}`)) {
      return apiError(request, {
        message: 'Too many requests. Please try again later.',
        statusCode: 429,
      });
    }

    const body = await request.json();
    const parsed = consultationSubmitSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(request, {
        message: 'Invalid form data',
        statusCode: 400,
        error: parsed.error.flatten(),
      });
    }

    if (parsed.data.website) {
      return apiSuccess(request, { ok: true }, { message: 'Consultation requested' });
    }

    await createConsultationBooking({
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      company: parsed.data.company,
      phone: parsed.data.phone,
      service: parsed.data.service,
      projectType: parsed.data.projectType,
      description: parsed.data.description,
      budget: parsed.data.budget ?? null,
      preferredDate: parsed.data.preferredDate ?? null,
      preferredTime: parsed.data.preferredTime ?? null,
      referral: parsed.data.referral ?? null,
      status: 'new',
    });

    return apiSuccess(request, { ok: true }, { message: 'Consultation requested successfully' });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to submit consultation request',
      statusCode: 500,
      error,
    });
  }
}
