import type { IApiResponse } from '@/types/api';

export class ApiError extends Error {
  constructor(
    message: string,
    /** HTTP status code from the envelope. */
    public status: number,
    public body?: unknown,
    /** Raw exception details from envelope.error. */
    public error?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

function isApiEnvelope(value: unknown): value is IApiResponse<unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'status' in value &&
    'statusCode' in value &&
    'message' in value &&
    'data' in value
  );
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    credentials: 'same-origin',
  });

  const json = await res.json().catch(() => null);

  if (isApiEnvelope(json)) {
    if (!res.ok || json.status === false) {
      throw new ApiError(
        json.message || 'Request failed',
        json.statusCode || res.status,
        json,
        json.error
      );
    }

    return json.data as T;
  }

  if (!res.ok) {
    const message =
      json && typeof json === 'object' && 'error' in json
        ? String((json as { error: string }).error)
        : 'Request failed';
    throw new ApiError(message, res.status, json, json);
  }

  return json as T;
}
