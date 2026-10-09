import type { CatalogProduct } from "@/lib/types/catalog";
import { isMeaningfulCas } from "@/lib/seo/cas";

/** URL-safe slug from a chemical name (ASCII-ish, hyphenated). */
export function slugifyChemicalName(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
    .slice(0, 96);
}

/**
 * Public PDP path segment.
 * Prefer `CAS-chemical-name` when CAS is real (client SEO report); otherwise catalog slug.
 */
export function productSeoSegment(
  product: Pick<CatalogProduct, "slug" | "casNumber" | "chemicalName">,
): string {
  if (!isMeaningfulCas(product.casNumber)) return product.slug;
  const cas = product.casNumber.trim();
  const namePart = slugifyChemicalName(product.chemicalName);
  return namePart ? `${cas}-${namePart}` : `${cas}-${product.slug}`;
}

export function productPath(
  product: Pick<CatalogProduct, "categorySlug" | "slug" | "casNumber" | "chemicalName">,
): string {
  return `/products/${product.categorySlug}/${productSeoSegment(product)}`;
}

/** True when the URL segment is this product's preferred SEO path. */
export function isPreferredProductSegment(
  product: Pick<CatalogProduct, "slug" | "casNumber" | "chemicalName">,
  segment: string,
): boolean {
  return segment === productSeoSegment(product);
}
