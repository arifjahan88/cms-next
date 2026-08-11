/**
 * Run a DB query and return fallback when the database is unavailable
 * or tables have not been migrated yet.
 */
export async function safeDbQuery<T>(
  query: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await query();
  } catch {
    return fallback;
  }
}

export function isDbQueryError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const name = 'name' in error ? String(error.name) : '';
  return name === 'DrizzleQueryError' || name === 'AggregateError';
}
