/**
 * Helper to construct absolute URLs for public assets considering basePath.
 * Used when Next.js Image component doesn't apply basePath in static export mode.
 */
export function withBasePath(path: string): string {
  const basePath = (process.env.NEXT_BASE_PATH || '').trim();

  // If no basePath or path already includes it, return as-is
  if (!basePath || path.startsWith(basePath)) {
    return path;
  }

  // Ensure path starts with / for consistency
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${basePath}${normalizedPath}`;
}
