import type { CatalogProduct, ProductSubcategory } from "@/lib/types/catalog";

/** Products in this category with no subcategory assigned. */
export function getDirectCategoryProducts(products: CatalogProduct[]): CatalogProduct[] {
  return products.filter((p) => !p.subcategorySlug?.trim());
}

export function countProductsInSubcategory(
  products: CatalogProduct[],
  subcategorySlug: string,
): number {
  return products.filter((p) => p.subcategorySlug === subcategorySlug).length;
}

export type SubcategoryWithCount = ProductSubcategory & { productCount: number };

export function subcategoriesWithCounts(
  subcategories: ProductSubcategory[],
  products: CatalogProduct[],
): SubcategoryWithCount[] {
  return subcategories.map((s) => ({
    ...s,
    productCount: countProductsInSubcategory(products, s.slug),
  }));
}
