/** Site-wide types. Product catalogue lives in `./types/catalog`. */

export type {
  BreadcrumbItem,
  CatalogProduct,
  ProductAvailability,
  ProductCategory,
  ProductCategorySlug,
} from "./types/catalog";

/** @deprecated Prefer `CatalogProduct`; kept for gradual migration. */
export type { CatalogProduct as Product } from "./types/catalog";

export type ServiceSlug =
  | "custom-chemical-synthesis"
  | "contract-research"
  | "analytical-services"
  | "impurity-profiling"
  | "method-development";

export type Service = {
  slug: ServiceSlug;
  title: string;
  summary: string;
  overview: string;
  process: string[];
  benefits: string[];
  capabilities: string[];
};

export type CapabilityBlock = {
  title: string;
  description: string;
  metrics?: { label: string; value: string }[];
};

export type Industry = {
  slug: string;
  title: string;
  description: string;
};
