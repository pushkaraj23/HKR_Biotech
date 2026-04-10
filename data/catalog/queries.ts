import type { CatalogProduct, ProductCategory, ProductCategorySlug } from "@/lib/types/catalog";
import { productCategories } from "./categories";
import { products } from "./products";

const SLUGS = new Set(productCategories.map((c) => c.slug));

export function isValidCategorySlug(slug: string): slug is ProductCategorySlug {
  return SLUGS.has(slug as ProductCategorySlug);
}

export function getAllCategories(): ProductCategory[] {
  return productCategories;
}

export function getAllProducts(): CatalogProduct[] {
  return products;
}

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return productCategories.find((c) => c.slug === slug);
}

export function getProductsByCategorySlug(categorySlug: ProductCategorySlug): CatalogProduct[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getProductBySlug(
  categorySlug: string,
  productSlug: string,
): CatalogProduct | undefined {
  if (!isValidCategorySlug(categorySlug)) return undefined;
  const p = products.find((x) => x.slug === productSlug);
  if (!p || p.categorySlug !== categorySlug) return undefined;
  return p;
}

export function getProductByCatalogRef(ref: string): CatalogProduct | undefined {
  const normalized = ref.trim().toUpperCase();
  return products.find(
    (p) =>
      p.catalogNumber.toUpperCase() === normalized ||
      p.slug.toLowerCase() === ref.trim().toLowerCase(),
  );
}

export function getRelatedProducts(product: CatalogProduct): CatalogProduct[] {
  const related: CatalogProduct[] = [];
  for (const slug of product.relatedSlugs) {
    const p = products.find((x) => x.slug === slug);
    if (p) related.push(p);
  }
  return related;
}

/** Fallback related: same category if relatedSlugs empty */
export function getRelatedProductsOrFallback(product: CatalogProduct, limit = 3): CatalogProduct[] {
  const direct = getRelatedProducts(product);
  if (direct.length >= Math.min(1, limit)) {
    return direct.slice(0, limit);
  }
  const sameCat = products
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
    .slice(0, limit);
  return [...direct, ...sameCat.filter((p) => !direct.some((d) => d.slug === p.slug))].slice(0, limit);
}

export function getCategoriesExcept(slug: ProductCategorySlug): ProductCategory[] {
  return productCategories.filter((c) => c.slug !== slug);
}
