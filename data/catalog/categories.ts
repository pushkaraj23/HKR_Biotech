import type { ProductCategory } from "@/lib/types/catalog";

export const productCategories: ProductCategory[] = [
  {
    slug: "carbohydrates",
    name: "Carbohydrates",
    tagline: "High-purity building blocks for glycobiology",
    description:
      "Rare sugars, protected intermediates, and complex carbohydrate scaffolds under stringent analytical control.",
    overview:
      "Our carbohydrate programme supports medicinal chemistry, vaccine adjuvant research, and glycan assembly with batch records aligned to discovery and early CMC expectations. Materials are characterized by complementary orthogonal techniques and released with traceable documentation suitable for regulatory dialogue.",
    highlights: [
      "Analytical packages: HPLC, NMR, HRMS as appropriate per SKU",
      "Controlled atmosphere handling for moisture-sensitive donors",
      "Scale-up support from milligrams to multi-gram batches",
    ],
  },
  {
    slug: "api-impurities",
    name: "API Impurities",
    tagline: "Reference standards for regulatory filings",
    description:
      "Isolated and characterized impurities for method validation, stability, and toxicology support.",
    overview:
      "We isolate process-related and degradation impurities with structure elucidation suitable for ICH Q3A/B discussions. Each reference batch is tied to a defined synthetic or enrichment strategy and full analytical traceability.",
    highlights: [
      "Forced-degradation driven isolate strategies where applicable",
      "Chromatographic purity reporting with peak tracking",
      "Optional salt / solvate form confirmation",
    ],
  },
  {
    slug: "nucleotides-linkers",
    name: "Nucleotides / Linkers",
    tagline: "Oligonucleotide chemistry with traceable purity",
    description:
      "Modified nucleotides, phosphoramidites, and bioconjugation linkers for oligo and ADC workflows.",
    overview:
      "Phosphoramidite and linker portfolios are managed under inert atmosphere logistics with moisture-exclusion protocols. Purity is confirmed by multinuclear NMR, HPLC, and where relevant 31P NMR for amidite integrity.",
    highlights: [
      "Cold-chain dispatch options for moisture-sensitive SKUs",
      "Batch-matched analytical summaries for program continuity",
      "Custom linker arm extension via enquiry",
    ],
  },
  {
    slug: "research-intermediates",
    name: "Research Intermediates",
    tagline: "Scalable building blocks for route exploration",
    description:
      "Versatile intermediates for medicinal chemistry and route scouting with reproducible specifications.",
    overview:
      "Intermediate catalogue items are designed for rapid iteration: defined purity bands, clear storage guidance, and documentation that slots into notebook and ELN workflows for both Indian and export R&D teams.",
    highlights: [
      "Repeatable isolation protocols for recurring orders",
      "Structure confirmation by NMR / MS on every batch",
      "Tech transfer friendly batch summaries",
    ],
  },
  {
    slug: "protecting-groups",
    name: "Protecting Groups & Reagents",
    tagline: "Orthogonal protection for multistep synthesis",
    description:
      "Specialty protecting reagents and activators for carbohydrate and peptide-related synthetic programmes.",
    overview:
      "Orthogonal protection strategies reduce late-stage surprises. Our catalogue focuses on high-turnover protecting patterns used in complex synthesis labs, with emphasis on stability, solubility, and clean deprotection profiles.",
    highlights: [
      "Dry-box compatible packaging on request",
      "Compatibility notes for common coupling conditions",
      "Bulk quotation for recurring campaigns",
    ],
  },
];
