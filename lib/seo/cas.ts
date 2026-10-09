/** True when the value looks like a real CAS Registry Number (not placeholder text). */
export function isMeaningfulCas(value: string | undefined | null): boolean {
  if (!value) return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (/^(n\/?a|none|tbd|pending|assigned on coa|catalogue item|—|-)$/i.test(trimmed)) {
    return false;
  }
  // Standard CAS format: 2–7 digits, 2 digits, 1 check digit (hyphenated).
  return /^\d{2,7}-\d{2}-\d$/.test(trimmed);
}

/** Extract the first CAS-like token from a legacy WordPress-style slug. */
export function extractCasFromSlug(slug: string): string | null {
  const decoded = decodeURIComponent(slug);
  const match = decoded.match(/(\d{2,7}-\d{2}-\d)/);
  return match?.[1] ?? null;
}
