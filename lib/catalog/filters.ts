import type { CatalogProduct, ProductAvailability, ProductCategorySlug } from "@/lib/types/catalog";

export type CatalogFilterState = {
  search: string;
  category: ProductCategorySlug | "all";
  availability: "all" | ProductAvailability;
};

const AVAILABILITY_VALUES: ProductAvailability[] = [
  "In stock",
  "Made to order",
  "Limited lots",
  "Quote required",
];

export function isAvailabilityValue(s: string): s is ProductAvailability {
  return AVAILABILITY_VALUES.includes(s as ProductAvailability);
}

/**
 * Filter catalogue products. When `categoryScope` is set (category page), category filter is ignored
 * and all products are assumed pre-filtered to that category.
 */
export function filterCatalogProducts(
  list: CatalogProduct[],
  state: CatalogFilterState,
  categoryScope?: ProductCategorySlug,
): CatalogProduct[] {
  let out = categoryScope ? list.filter((p) => p.categorySlug === categoryScope) : [...list];

  const q = state.search.trim().toLowerCase();
  if (q) {
    out = out.filter((p) => {
      const formulaNorm = p.molecularFormula.toLowerCase().replace(/\s/g, "");
      const qNorm = q.replace(/\s/g, "");
      return (
        p.chemicalName.toLowerCase().includes(q) ||
        p.casNumber.toLowerCase().includes(q) ||
        p.catalogNumber.toLowerCase().includes(q) ||
        formulaNorm.includes(qNorm) ||
        p.slug.toLowerCase().includes(q)
      );
    });
  }

  if (!categoryScope && state.category !== "all") {
    out = out.filter((p) => p.categorySlug === state.category);
  }

  if (state.availability !== "all") {
    out = out.filter((p) => p.availability === state.availability);
  }

  return out;
}

export const AVAILABILITY_OPTIONS = AVAILABILITY_VALUES;
