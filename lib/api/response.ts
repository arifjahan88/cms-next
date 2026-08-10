import { NextResponse } from 'next/server';
import type { IApiResponse } from '@/types/api';

function requestPath(request: Request): string {
  try {
    return new URL(request.url).pathname;
  } catch {
    return '/api';
  }
}

/** Make Error instances JSON-serializable for the client. */
export function toRawError(error: unknown): unknown {
  if (error == null) return null;

  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
    };
  }

  return error;
}

type ApiSuccessOptions = {
  message?: string;
  statusCode?: number;
};

type ApiErrorOptions = {
  /** Human-readable error message for the frontend. */
  message: string;
  /** HTTP status code (also used as the response statusCode). */
  statusCode: number;
  /** Raw exception / validation details. */
  error?: unknown;
};

export function apiSuccess<T>(
  request: Request,
  data: T,
  opts?: ApiSuccessOptions
): NextResponse<IApiResponse<T>> {
  const statusCode = opts?.statusCode ?? 200;
  const body: IApiResponse<T> = {
    status: true,
    path: requestPath(request),
    statusCode,
    message: opts?.message ?? 'Request successful',
    data,
  };

  return NextResponse.json(body, { status: statusCode });
}

export function apiError(
  request: Request,
  opts: ApiErrorOptions
): NextResponse<IApiResponse<null>> {
  const { message, statusCode, error } = opts;

  const body: IApiResponse<null> = {
    status: false,
    path: requestPath(request),
    statusCode,
    message,
    data: null,
    error: toRawError(error),
  };

  return NextResponse.json(body, { status: statusCode });
}
