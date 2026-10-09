/**
 * Priority commercial / scientific search phrases for HKR Biotech Labs.
 * Used in metadata; keep copy natural — do not dump the full list into every page body.
 */
export const CORE_SEO_KEYWORDS = [
  "Custom glycan synthesis",
  "Glycan synthesis",
  "Sugar Building Blocks",
  "protected monosaccharides",
  "modified nucleotide sugars",
  "O-glycans",
  "N-glycans",
  "Bacterial oligosaccharides",
  "Carbohydrates",
  "Carbohydrates synthesis",
  "Glycan NMR analysis",
  "Glycoconjugation",
  "Glycoconjugates",
  "Carbohydrate impurities",
  "Glucose",
  "Glucosamine",
  "Galactose",
  "Galactosamine",
  "Mannose",
  "Mannosamine",
  "Fluorinated sugars",
  "Ribose",
  "Fucose",
  "Rhamnose",
  "Sialic acid",
  "Disaccharides",
  "Trisaccharides",
  "Carbohydrate Antigens",
  "Carbohydrates standards",
] as const;

export type SeoKeyword = (typeof CORE_SEO_KEYWORDS)[number];

/** Homepage + global metadata — full commercial set. */
export const HOME_SEO_KEYWORDS: string[] = [
  ...CORE_SEO_KEYWORDS,
  "HKR Biotech Labs",
  "CAS number",
  "custom chemical synthesis",
  "API impurities",
  "nucleotide building blocks",
];

/** Catalogue index — discovery intents. */
export const CATALOG_SEO_KEYWORDS: string[] = [
  "Sugar Building Blocks",
  "protected monosaccharides",
  "Bacterial oligosaccharides",
  "Disaccharides",
  "Trisaccharides",
  "Carbohydrate impurities",
  "Carbohydrates standards",
  "modified nucleotide sugars",
  "Glucose",
  "Glucosamine",
  "Galactose",
  "Galactosamine",
  "Mannose",
  "Mannosamine",
  "Fluorinated sugars",
  "Ribose",
  "Fucose",
  "Rhamnose",
  "Sialic acid",
  "CAS number",
  "HKR Biotech Labs",
];

/** Services marketing — synthesis / analysis intents. */
export const SERVICES_SEO_KEYWORDS: string[] = [
  "Custom glycan synthesis",
  "Glycan synthesis",
  "Carbohydrates synthesis",
  "Glycan NMR analysis",
  "Glycoconjugation",
  "Glycoconjugates",
  "O-glycans",
  "N-glycans",
  "Carbohydrate Antigens",
  "Sugar Building Blocks",
  "protected monosaccharides",
  "modified nucleotide sugars",
  "HKR Biotech Labs",
];

/** Keywords that often appear in product chemistry names / families. */
const PRODUCT_NAME_HINTS: { pattern: RegExp; keywords: string[] }[] = [
  { pattern: /glucosamin/i, keywords: ["Glucosamine", "Glucose"] },
  { pattern: /glucose|glucopyran/i, keywords: ["Glucose"] },
  { pattern: /galactosamin/i, keywords: ["Galactosamine", "Galactose"] },
  { pattern: /galactose|galactopyran/i, keywords: ["Galactose"] },
  { pattern: /mannosamin/i, keywords: ["Mannosamine", "Mannose"] },
  { pattern: /mannose|mannopyran/i, keywords: ["Mannose"] },
  { pattern: /fucose|fucopyran/i, keywords: ["Fucose"] },
  { pattern: /rhamnose|rhamnopyran/i, keywords: ["Rhamnose"] },
  { pattern: /sialic|neuramin/i, keywords: ["Sialic acid"] },
  { pattern: /ribose|ribonucle/i, keywords: ["Ribose", "modified nucleotide sugars"] },
  { pattern: /fluoro|fluorinat/i, keywords: ["Fluorinated sugars"] },
  { pattern: /oligosaccharid|bacterial/i, keywords: ["Bacterial oligosaccharides"] },
  { pattern: /disaccharid/i, keywords: ["Disaccharides"] },
  { pattern: /trisaccharid/i, keywords: ["Trisaccharides"] },
  { pattern: /impurit/i, keywords: ["Carbohydrate impurities", "Carbohydrates standards"] },
  { pattern: /antigen/i, keywords: ["Carbohydrate Antigens"] },
  { pattern: /conjugat/i, keywords: ["Glycoconjugation", "Glycoconjugates"] },
];

const CATEGORY_KEYWORD_MAP: Record<string, string[]> = {
  "protected-monosaccharides": [
    "protected monosaccharides",
    "Sugar Building Blocks",
    "Carbohydrates",
    "Glucose",
    "Galactose",
    "Mannose",
    "Fucose",
    "Rhamnose",
  ],
  "bacterial-oligosaccharides": [
    "Bacterial oligosaccharides",
    "O-glycans",
    "N-glycans",
    "Carbohydrate Antigens",
    "Glycan synthesis",
  ],
  disaccharides: ["Disaccharides", "Sugar Building Blocks", "Carbohydrates"],
  trisaccharides: ["Trisaccharides", "Sugar Building Blocks", "Carbohydrates"],
  nucleosides: ["modified nucleotide sugars", "Ribose", "Glycan synthesis"],
  "carbohydrate-impurities": [
    "Carbohydrate impurities",
    "Carbohydrates standards",
    "Carbohydrates",
  ],
  carbohydrates: ["Carbohydrates", "Sugar Building Blocks", "Glycan synthesis"],
  "api-impurities": ["Carbohydrate impurities", "Carbohydrates standards"],
  "nucleotides-linkers": ["modified nucleotide sugars", "Ribose"],
};

export function keywordsForCategory(categorySlug: string, categoryName?: string): string[] {
  const mapped = CATEGORY_KEYWORD_MAP[categorySlug] ?? [];
  const base = [
    ...mapped,
    categoryName,
    "Custom glycan synthesis",
    "Glycan synthesis",
    "Sugar Building Blocks",
    "HKR Biotech Labs",
    "CAS number",
  ].filter((k): k is string => Boolean(k && String(k).trim()));
  return uniqueKeywords(base);
}

export function keywordsForProduct(input: {
  chemicalName: string;
  categorySlug: string;
  categoryName?: string;
  casNumber?: string;
  catalogNumber?: string;
  alternativeName?: string;
}): string[] {
  const fromName = PRODUCT_NAME_HINTS.filter((h) => h.pattern.test(input.chemicalName)).flatMap(
    (h) => h.keywords,
  );
  const base = [
    input.chemicalName,
    input.catalogNumber,
    input.casNumber,
    input.alternativeName,
    ...keywordsForCategory(input.categorySlug, input.categoryName),
    ...fromName,
    "Carbohydrates",
    "Carbohydrates synthesis",
  ].filter((k): k is string => Boolean(k && String(k).trim()));
  return uniqueKeywords(base);
}

function uniqueKeywords(values: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of values) {
    const key = raw.trim();
    if (!key) continue;
    const norm = key.toLowerCase();
    if (seen.has(norm)) continue;
    seen.add(norm);
    out.push(key);
  }
  return out;
}
