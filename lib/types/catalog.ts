/** Product catalogue — biotech / chemical synthesis lab (URL-safe slugs). */

/** Dynamic categories from Firestore; seed data still uses familiar slug strings. */
export type ProductCategorySlug = string;

export type ProductAvailability =
  | "In stock"
  | "Made to order"
  | "Limited lots"
  | "Quote required";

export type ProductCategory = {
  slug: ProductCategorySlug;
  name: string;
  tagline: string;
  /** Short line for cards */
  description: string;
  /** Longer intro for category page */
  overview: string;
  /** Trust / positioning bullets */
  highlights: string[];
};

export type CatalogProduct = {
  id: string;
  /** Unique globally — used in /products/[category]/[slug] */
  slug: string;
  catalogNumber: string;
  categorySlug: ProductCategorySlug;
  chemicalName: string;
  casNumber: string;
  molecularFormula: string;
  molecularWeight: string;
  purity: string;
  appearance: string;
  shortDescription: string;
  detailedDescription: string;
  applications: string[];
  storageConditions: string;
  packSizes: string[];
  availability: ProductAvailability;
  datasheetUrl?: string;
  coaAvailable: boolean;
  sdsAvailable: boolean;
  /** Other product slugs (global) for related section */
  relatedSlugs: string[];
};

/** Breadcrumb item for product pages */
export type BreadcrumbItem = {
  label: string;
  href?: string;
};
