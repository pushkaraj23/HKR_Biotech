import type { ProductSubcategory } from "@/lib/types/catalog";

export type CategoryCatalogView = "hub" | "subcategory" | "all" | "direct" | "flat";

export function resolveCategoryCatalogView(
  subcategories: ProductSubcategory[],
  options: { subcategory?: string; view?: string },
): { view: CategoryCatalogView; activeSubcategory: string } {
  if (subcategories.length === 0) {
    return { view: "flat", activeSubcategory: "all" };
  }

  const viewParam = options.view?.trim();
  if (viewParam === "all") {
    return { view: "all", activeSubcategory: "all" };
  }
  if (viewParam === "direct") {
    return { view: "direct", activeSubcategory: "all" };
  }

  const sub = options.subcategory?.trim();
  if (sub && subcategories.some((s) => s.slug === sub)) {
    return { view: "subcategory", activeSubcategory: sub };
  }

  return { view: "hub", activeSubcategory: "all" };
}
