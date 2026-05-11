import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    slug: "research-and-development",
    title: "Research & Development",
    summary: "R&D for carbohydrates, nucleosides, impurities, and advanced intermediates.",
    overview: "Custom routes with clear checkpoints and transparent updates.",
    process: ["Feasibility & target review", "Route scouting & safety", "Purification & analytical release"],
    benefits: ["Milestone reporting", "Flexible scale from exploratory onward"],
    capabilities: ["Oligosaccharide & glycan routes", "Nucleoside / nucleotide chemistry", "API impurity programs"],
  },
  {
    slug: "analytical-services",
    title: "Analytical Services",
    summary: "NMR, MS, UV, IR, and allied characterization with traceable reports.",
    overview: "Practical support for carbohydrates, nucleotides, chiral molecules, and impurities.",
    process: ["Scope & success criteria", "Execution & touchpoints", "Data package delivery"],
    benefits: ["Fast turnaround", "Interpretation-ready packages"],
    capabilities: ["1D/2D NMR", "Mass spectrometry & ID", "Purity & identity support"],
  },
  {
    slug: "consultation-and-support",
    title: "Consultation & Support",
    summary: "Route design, scouting, and process guidance from experienced chemists.",
    overview: "Scientist-to-scientist help across R&D decisions and bottlenecks.",
    process: ["Intake", "Feasibility & options", "Reporting"],
    benefits: ["Faster route decisions", "Practical risk reduction"],
    capabilities: ["Route strategy", "Difficult steps", "Development planning"],
  },
  {
    slug: "impurity-profiling",
    title: "Impurity Profiling",
    summary: "Isolation, identification, and qualification support for API impurities.",
    overview: "Prep separation plus spectroscopic proof for control strategies.",
    process: ["Spike & enrichment", "Prep isolation", "Structure proof"],
    benefits: ["CMC-aligned communication", "Traceable genealogy"],
    capabilities: ["Forced degradation", "Heart-cutting prep", "Chiral resolution"],
  },
  {
    slug: "method-development",
    title: "Method Development",
    summary: "Chromatography and spectroscopy methods for your matrix.",
    overview: "Phase-appropriate methods with robustness notes for QC handoff.",
    process: ["Target profile", "Screening", "Documentation"],
    benefits: ["Lifecycle support", "Transfer-friendly"],
    capabilities: ["Gradient & ion-pair", "MS-compatible methods", "Stability-indicating assays"],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
