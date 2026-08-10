const DEFAULT_AUTH_REDIRECT = '/dashboard';

/**
 * Resolve a safe post-login redirect path.
 * Only allows same-origin relative paths under /dashboard.
 */
export function resolveAuthRedirect(from: string | null | undefined): string {
  if (!from) return DEFAULT_AUTH_REDIRECT;

  let path = from.trim();

  try {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      path = new URL(path).pathname;
    }
  } catch {
    return DEFAULT_AUTH_REDIRECT;
  }

  if (
    !path.startsWith('/') ||
    path.startsWith('//') ||
    path.includes('\\') ||
    !path.startsWith('/dashboard')
  ) {
    return DEFAULT_AUTH_REDIRECT;
  }

  return path;
}
