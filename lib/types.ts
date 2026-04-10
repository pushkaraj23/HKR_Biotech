export type ProductCategorySlug =
  | "carbohydrates"
  | "api-impurities"
  | "nucleotides-linkers";

export type ProductCategory = {
  slug: ProductCategorySlug;
  name: string;
  tagline: string;
  description: string;
};

export type Product = {
  id: string;
  categorySlug: ProductCategorySlug;
  chemicalName: string;
  casNumber: string;
  molecularFormula: string;
  molecularWeight: string;
  purity: string;
  shortDescription: string;
  storageConditions: string;
  applications: string[];
  datasheetUrl?: string;
};

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
