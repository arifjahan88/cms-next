import { createContactMessage } from '@/db/queries/contact-messages';
import { apiError, apiSuccess } from '@/lib/api/response';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { contactSubmitSchema } from '@/lib/validations/landing';

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (!checkRateLimit(`contact:${ip}`)) {
      return apiError(request, {
        message: 'Too many requests. Please try again later.',
        statusCode: 429,
      });
    }

    const body = await request.json();
    const parsed = contactSubmitSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(request, {
        message: 'Invalid form data',
        statusCode: 400,
        error: parsed.error.flatten(),
      });
    }

    if (parsed.data.website) {
      return apiSuccess(request, { ok: true }, { message: 'Message sent' });
    }

    await createContactMessage({
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      company: parsed.data.company ?? null,
      phone: parsed.data.phone ?? null,
      subject: parsed.data.subject,
      message: parsed.data.message,
      status: 'new',
    });

    return apiSuccess(request, { ok: true }, { message: 'Message sent successfully' });
  } catch (error) {
    return apiError(request, {
      message: 'Failed to send message',
      statusCode: 500,
      error,
    });
  }
}
