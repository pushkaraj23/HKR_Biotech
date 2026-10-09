/** Canonical production domain for metadata, sitemap, and robots. */
export const DEFAULT_SITE_URL = "https://www.hkrbiotechlabs.com";

export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_SITE_URL;
  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

/** Absolute URL for a path that may already be absolute. */
export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${getSiteUrl()}${path}`;
}
