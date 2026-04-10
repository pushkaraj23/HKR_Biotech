import type { ProductCategory } from "@/lib/types";

export const productCategories: ProductCategory[] = [
  {
    slug: "carbohydrates",
    name: "Carbohydrates",
    tagline: "High-purity building blocks for glycobiology",
    description:
      "Rare sugars, protected intermediates, and complex carbohydrate scaffolds synthesized under stringent analytical control for pharmaceutical and discovery programs.",
  },
  {
    slug: "api-impurities",
    name: "API Impurities",
    tagline: "Reference standards for regulatory filings",
    description:
      "Isolated and characterized impurities tailored for method validation, stability studies, and toxicological assessment across small-molecule APIs.",
  },
  {
    slug: "nucleotides-linkers",
    name: "Nucleotides / Linkers",
    tagline: "Oligonucleotide chemistry with traceable purity",
    description:
      "Modified nucleotides, phosphoramidite precursors, and bioconjugation linkers engineered for oligo synthesis and bioconjugate development.",
  },
];

export function getCategoryBySlug(slug: string) {
  return productCategories.find((c) => c.slug === slug);
}
