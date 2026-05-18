import type { CatalogProduct, ProductVariant } from "@/lib/types/catalog";

/** Rows for the PDP ordering table — uses `variants` or falls back to pack sizes. */
export function getDisplayVariants(product: CatalogProduct): ProductVariant[] {
  if (product.variants?.length) {
    return product.variants.filter((v) => v.size.trim());
  }
  return product.packSizes.map((size) => ({
    size,
    price: "",
    availabilityLabel: product.availability,
  }));
}

/** Stable cart document id for a product + pack size line. */
export function cartLineId(productSlug: string, variantSize: string): string {
  const sizeKey = variantSize.trim().toLowerCase().replace(/\s+/g, "-") || "default";
  return `${productSlug}__${sizeKey}`;
}
