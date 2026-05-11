import type { CapabilityBlock } from "@/lib/types";

export const capabilitySections: {
  id: string;
  heading: string;
  subheading: string;
  blocks: CapabilityBlock[];
}[] = [
  {
    id: "infrastructure",
    heading: "Lab infrastructure",
    subheading: "Controlled spaces for reproducible work.",
    blocks: [
      {
        title: "Synthesis suites",
        description: "Hood lines with inert gas, solvents, and segregated waste for multi-step routes.",
        metrics: [
          { label: "Hood capacity", value: "24/7 scheduled" },
          { label: "Inert lines", value: "N₂ / Ar" },
        ],
      },
      {
        title: "Purification bays",
        description: "Prep HPLC, flash, and crystallization with barcode-linked fractions.",
        metrics: [
          { label: "Prep throughput", value: "Scalable" },
          { label: "Fraction logging", value: "Digital" },
        ],
      },
    ],
  },
  {
    id: "instruments",
    heading: "Instruments",
    subheading: "Redundant characterization for confident release.",
    blocks: [
      {
        title: "Separation science",
        description: "UHPLC with PDA/MS and libraries for polar, lipophilic, and ionic methods.",
        metrics: [
          { label: "LC-MS", value: "Online" },
          { label: "Detectors", value: "PDA / CAD" },
        ],
      },
      {
        title: "Molecular confirmation",
        description: "400 MHz NMR (cryoprobe option) and HRMS for ambiguous isomers.",
        metrics: [
          { label: "NMR", value: "400 MHz" },
          { label: "HRMS", value: "TOF" },
        ],
      },
    ],
  },
  {
    id: "synthesis",
    heading: "Synthesis",
    subheading: "Discovery through scalable campaigns.",
    blocks: [
      {
        title: "Chemistries",
        description: "Couplings, catalysis, glycosylation, nucleotide chemistry, and conjugation under SOPs.",
      },
      {
        title: "Scale",
        description: "mg to pilot with engineering review on demanding steps.",
        metrics: [
          { label: "Typical scale", value: "mg → kg" },
          { label: "PSM support", value: "Yes" },
        ],
      },
    ],
  },
  {
    id: "purification",
    heading: "Purification",
    subheading: "Isolation matched to stability and regulatory needs.",
    blocks: [
      {
        title: "Chromatography",
        description: "Normal/reversed-phase prep, chiral, and 2D heart-cutting for trace enrichments.",
      },
      {
        title: "Crystallization",
        description: "Solvent screens, seeding, and polymorph-aware isolation for standards.",
      },
    ],
  },
  {
    id: "analytical",
    heading: "Analytics",
    subheading: "Quantitative and qualitative pipelines.",
    blocks: [
      {
        title: "Core assays",
        description: "HPLC purity, chiral HPLC, KF, optical rotation, residual solvents (HS-GC).",
      },
      {
        title: "Advanced ID",
        description: "LC-HRMS, high-field NMR, and FT-IR for structure and salt assignment.",
        metrics: [
          { label: "Data integrity", value: "ALCOA+" },
          { label: "Archival", value: "Secure" },
        ],
      },
    ],
  },
];
