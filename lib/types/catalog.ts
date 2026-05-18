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
  imageUrl?: string;
  tagline: string;
  /** Short line for cards */
  description: string;
  /** Longer intro for category page */
  overview: string;
  /** Trust / positioning bullets */
  highlights: string[];
};

export type ProductSubcategorySlug = string;

/** Child grouping under a category — loaded from Firestore `subcategories`. */
export type ProductSubcategory = {
  slug: ProductSubcategorySlug;
  categorySlug: ProductCategorySlug;
  name: string;
  description?: string;
  order?: number;
};

/** Size / price / availability row for the product ordering table. */
export type ProductVariant = {
  size: string;
  price: string;
  availabilityLabel: string;
};

export type CatalogProduct = {
  id: string;
  /** Unique globally — used in /products/[category]/[slug] */
  slug: string;
  imageUrl?: string;
  catalogNumber: string;
  categorySlug: ProductCategorySlug;
  /** Optional sub-family within the category */
  subcategorySlug?: ProductSubcategorySlug;
  chemicalName: string;
  /** IUPAC or systematic alternate name shown below the title */
  alternativeName?: string;
  casNumber: string;
  molecularFormula: string;
  molecularWeight: string;
  purity: string;
  appearance: string;
  /** Solvents / media (e.g. DCM, DMSO) */
  solubility?: string;
  shortDescription: string;
  detailedDescription: string;
  applications: string[];
  storageConditions: string;
  /** Legacy pack-size labels; used when `variants` is empty */
  packSizes: string[];
  /** Priced SKUs with availability — preferred for PDP ordering table */
  variants?: ProductVariant[];
  availability: ProductAvailability;
  datasheetUrl?: string;
  coaAvailable: boolean;
  sdsAvailable: boolean;
  /** Direct link to SDS PDF */
  sdsUrl?: string;
  /** Regulatory — Canada DSL */
  dslStatus?: string;
  /** Regulatory — US TSCA */
  tscaCertification?: string;
  rtecsNumber?: string;
  /** Helper shown under COA lot search (e.g. ABC12345) */
  coaLotFormat?: string;
  shippingConditions?: string;
  tariffCode?: string;
  /** GHS / safety statement for full-width safety card */
  safetyStatement?: string;
  showSingleLotAvailability?: boolean;
  /** Other product slugs (global) for related section */
  relatedSlugs: string[];
};

/** Breadcrumb item for product pages */
export type BreadcrumbItem = {
  label: string;
  href?: string;
};
