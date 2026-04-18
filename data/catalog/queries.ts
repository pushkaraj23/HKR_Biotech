import type { CatalogProduct, ProductCategory, ProductCategorySlug } from "@/lib/types/catalog";
import { loadCatalog } from "@/lib/catalog/load-catalog";

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

export async function getProductBySlug(
  categorySlug: string,
  productSlug: string,
): Promise<CatalogProduct | undefined> {
  if (!(await isValidCategorySlug(categorySlug))) return undefined;
  const { products } = await loadCatalog();
  const p = products.find((x) => x.slug === productSlug);
  if (!p || p.categorySlug !== categorySlug) return undefined;
  return p;
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

export async function getRelatedProducts(product: CatalogProduct): Promise<CatalogProduct[]> {
  const { products } = await loadCatalog();
  const related: CatalogProduct[] = [];
  for (const slug of product.relatedSlugs) {
    const p = products.find((x) => x.slug === slug);
    if (p) related.push(p);
  }
  return related;
}

export async function getRelatedProductsOrFallback(
  product: CatalogProduct,
  limit = 3,
): Promise<CatalogProduct[]> {
  const direct = await getRelatedProducts(product);
  if (direct.length >= Math.min(1, limit)) {
    return direct.slice(0, limit);
  }
  const { products } = await loadCatalog();
  const sameCat = products
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
    .slice(0, limit);
  return [...direct, ...sameCat.filter((p) => !direct.some((d) => d.slug === p.slug))].slice(0, limit);
}

export async function getCategoriesExcept(slug: ProductCategorySlug): Promise<ProductCategory[]> {
  const { categories } = await loadCatalog();
  return categories.filter((c) => c.slug !== slug);
}
