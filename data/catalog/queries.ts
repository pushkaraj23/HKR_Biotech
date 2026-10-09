import type {
  CatalogProduct,
  ProductCategory,
  ProductCategorySlug,
  ProductSubcategory,
  ProductSubcategorySlug,
} from "@/lib/types/catalog";
import { loadCatalog } from "@/lib/catalog/load-catalog";
import { extractCasFromSlug, isMeaningfulCas } from "@/lib/seo/cas";
import { productSeoSegment } from "@/lib/seo/product-url";

export async function isValidCategorySlug(slug: string): Promise<boolean> {
  const { categories } = await loadCatalog();
  return categories.some((c) => c.slug === slug);
}

export async function getAllCategories(): Promise<ProductCategory[]> {
  return (await loadCatalog()).categories;
}

export async function getAllProducts(): Promise<CatalogProduct[]> {
  return (await loadCatalog()).products;
}

export async function getAllSubcategories(): Promise<ProductSubcategory[]> {
  return (await loadCatalog()).subcategories;
}

export async function getSubcategoriesByCategorySlug(
  categorySlug: ProductCategorySlug,
): Promise<ProductSubcategory[]> {
  const { subcategories } = await loadCatalog();
  return subcategories.filter((s) => s.categorySlug === categorySlug);
}

export async function getSubcategoryBySlug(
  categorySlug: ProductCategorySlug,
  subcategorySlug: ProductSubcategorySlug,
): Promise<ProductSubcategory | undefined> {
  const rows = await getSubcategoriesByCategorySlug(categorySlug);
  return rows.find((s) => s.slug === subcategorySlug);
}

export async function getCategoryBySlug(slug: string): Promise<ProductCategory | undefined> {
  const { categories } = await loadCatalog();
  return categories.find((c) => c.slug === slug);
}

export async function getProductsByCategorySlug(
  categorySlug: ProductCategorySlug,
): Promise<CatalogProduct[]> {
  const { products } = await loadCatalog();
  return products.filter((p) => p.categorySlug === categorySlug);
}

/**
 * Resolve a PDP by catalog slug, CAS-prefixed SEO segment, or CAS alone.
 * Supports both legacy `/…/hkr-gas-001` and `/…/3006-60-8-chemical-name` URLs.
 */
export async function getProductBySlug(
  categorySlug: string,
  productSlug: string,
): Promise<CatalogProduct | undefined> {
  if (!(await isValidCategorySlug(categorySlug))) return undefined;
  const { products } = await loadCatalog();
  const inCategory = products.filter((x) => x.categorySlug === categorySlug);
  const decoded = decodeURIComponent(productSlug);

  const byCatalogSlug = inCategory.find((x) => x.slug === decoded);
  if (byCatalogSlug) return byCatalogSlug;

  const bySeoSegment = inCategory.find((x) => productSeoSegment(x) === decoded);
  if (bySeoSegment) return bySeoSegment;

  const cas = extractCasFromSlug(decoded);
  if (cas && isMeaningfulCas(cas)) {
    const byCas = inCategory.find((x) => x.casNumber.trim() === cas);
    if (byCas) return byCas;
  }

  return undefined;
}

export async function getProductByCatalogRef(ref: string): Promise<CatalogProduct | undefined> {
  const normalized = ref.trim().toUpperCase();
  const { products } = await loadCatalog();
  return products.find(
    (p) =>
      p.catalogNumber.toUpperCase() === normalized ||
      p.slug.toLowerCase() === ref.trim().toLowerCase(),
  );
}

/** Lookup by CAS Registry Number (exact match after trim). */
export async function getProductByCasNumber(cas: string): Promise<CatalogProduct | undefined> {
  const normalized = cas.trim();
  if (!normalized) return undefined;
  const { products } = await loadCatalog();
  return products.find((p) => p.casNumber.trim() === normalized);
}

export async function getRelatedProductsOrFallback(
  product: CatalogProduct,
  limit = 3,
): Promise<CatalogProduct[]> {
  const { products } = await loadCatalog();
  return products
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
    .slice(0, limit);
}

export async function getCategoriesExcept(slug: ProductCategorySlug): Promise<ProductCategory[]> {
  const { categories } = await loadCatalog();
  return categories.filter((c) => c.slug !== slug);
}
