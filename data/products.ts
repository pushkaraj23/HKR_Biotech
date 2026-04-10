import type { Product } from "@/lib/types";

export const products: Product[] = [
  {
    id: "hkr-carb-001",
    categorySlug: "carbohydrates",
    chemicalName: "2,3,4,6-Tetra-O-acetyl-α-D-glucopyranosyl bromide",
    casNumber: "572-09-8",
    molecularFormula: "C14H19BrO9",
    molecularWeight: "411.20 g/mol",
    purity: "≥ 98.0% (HPLC)",
    shortDescription:
      "Classic glycosyl donor for stereoselective couplings; supplied with full analytical characterization.",
    storageConditions: "−20 °C, under inert atmosphere, desiccated",
    applications: [
      "Glycosylation route scouting",
      "Carbohydrate library synthesis",
      "Process chemistry support",
    ],
    datasheetUrl: "#",
  },
  {
    id: "hkr-carb-002",
    categorySlug: "carbohydrates",
    chemicalName: "1,2:3,4-Di-O-isopropylidene-α-D-galactopyranose",
    casNumber: "4064-06-6",
    molecularFormula: "C12H20O6",
    molecularWeight: "260.29 g/mol",
    purity: "≥ 99.0% (HPLC)",
    shortDescription:
      "Orthogonally protected galactose scaffold for multistep oligosaccharide assembly.",
    storageConditions: "2–8 °C, protect from light",
    applications: ["Complex glycan synthesis", "Medicinal chemistry programs"],
    datasheetUrl: "#",
  },
  {
    id: "hkr-api-001",
    categorySlug: "api-impurities",
    chemicalName: "Desmethyl-API analogue (Process-related)",
    casNumber: "N/A — custom isolate",
    molecularFormula: "C18H21N3O4S",
    molecularWeight: "375.45 g/mol",
    purity: "≥ 95.0% (area%)",
    shortDescription:
      "Representative process impurity isolated from pilot batches; structure confirmed by NMR & HRMS.",
    storageConditions: "Ambient, ≤ 25 °C, dry",
    applications: ["ICH Q3A/B qualification support", "Forced degradation studies"],
    datasheetUrl: "#",
  },
  {
    id: "hkr-api-002",
    categorySlug: "api-impurities",
    chemicalName: "Oxidized side-chain variant",
    casNumber: "Assigned upon COA",
    molecularFormula: "C18H19N3O5S",
    molecularWeight: "389.43 g/mol",
    purity: "≥ 90.0% (isolated)",
    shortDescription:
      "Trace-level impurity enriched for analytical method development and toxicology bridging.",
    storageConditions: "−20 °C",
    applications: ["Impurity fate studies", "Reference standard for LC-MS"],
    datasheetUrl: "#",
  },
  {
    id: "hkr-nt-001",
    categorySlug: "nucleotides-linkers",
    chemicalName: "5′-DMT-protected phosphoramidite (modifier class A)",
    casNumber: "Proprietary",
    molecularFormula: "C45H52N3O9P",
    molecularWeight: "809.89 g/mol",
    purity: "≥ 98.0% (31P NMR / HPLC)",
    shortDescription:
      "Solid-support compatible amidite with controlled moisture sensitivity and batch traceability.",
    storageConditions: "−20 °C, argon headspace",
    applications: ["Therapeutic oligo programs", "Diagnostic probe synthesis"],
    datasheetUrl: "#",
  },
  {
    id: "hkr-nt-002",
    categorySlug: "nucleotides-linkers",
    chemicalName: "PEG-based cleavable linker (maleimide terminus)",
    casNumber: "N/A — HKR catalogue",
    molecularFormula: "C28H45N3O10",
    molecularWeight: "583.68 g/mol",
    purity: "≥ 97.0%",
    shortDescription:
      "Hydrophilic spacer for ADC / bioconjugate workflows with defined release kinetics.",
    storageConditions: "−20 °C, desiccated",
    applications: ["Bioconjugation", "Payload-linker optimization"],
    datasheetUrl: "#",
  },
];

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(slug: string) {
  return products.filter((p) => p.categorySlug === slug);
}
