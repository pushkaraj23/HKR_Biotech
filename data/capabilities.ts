import type { CapabilityBlock } from "@/lib/types";

export const capabilitySections: {
  id: string;
  heading: string;
  subheading: string;
  blocks: CapabilityBlock[];
}[] = [
  {
    id: "infrastructure",
    heading: "Lab Infrastructure",
    subheading: "Controlled environments engineered for reproducibility.",
    blocks: [
      {
        title: "Synthesis suites",
        description:
          "Dedicated fume hood lines with inert gas distribution, solvent delivery, and segregated waste streams for complex multi-step campaigns.",
        metrics: [
          { label: "Hood capacity", value: "24/7 scheduled" },
          { label: "Inert lines", value: "N₂ / Ar" },
        ],
      },
      {
        title: "Purification bays",
        description:
          "Prep HPLC, flash, and crystallization stations with monitored fractions and barcode traceability from crude to isolate.",
        metrics: [
          { label: "Prep throughput", value: "Scalable" },
          { label: "Fraction logging", value: "Digital" },
        ],
      },
    ],
  },
  {
    id: "instruments",
    heading: "Instruments & Equipment",
    subheading: "Redundant characterization for confident release.",
    blocks: [
      {
        title: "Separation science",
        description:
          "UHPLC with PDA and MS triggering; method libraries for polar, lipophilic, and ionic chemistries.",
        metrics: [
          { label: "LC-MS", value: "Online" },
          { label: "Detectors", value: "PDA / CAD" },
        ],
      },
      {
        title: "Molecular confirmation",
        description:
          "400 MHz NMR with cryoprobe option; high-resolution mass spectrometry for ambiguous regioisomers.",
        metrics: [
          { label: "NMR", value: "400 MHz" },
          { label: "HRMS", value: "TOF" },
        ],
      },
    ],
  },
  {
    id: "synthesis",
    heading: "Synthesis Capabilities",
    subheading: "From exploratory routes to scalable processes.",
    blocks: [
      {
        title: "Chemistries",
        description:
          "Organometallic couplings, asymmetric catalysis, glycosylation, nucleotide chemistry, and linker bioconjugation under documented SOPs.",
      },
      {
        title: "Scale",
        description:
          "Milligram discovery through pilot-scale batches with engineering review for exothermic or pressure steps.",
        metrics: [
          { label: "Typical scale", value: "mg → kg" },
          { label: "PSM support", value: "Yes" },
        ],
      },
    ],
  },
  {
    id: "purification",
    heading: "Purification Techniques",
    subheading: "Isolation tuned to stability and regulatory needs.",
    blocks: [
      {
        title: "Chromatography",
        description:
          "Normal- and reversed-phase prep, chiral separation, and two-dimensional heart-cutting for trace enrichments.",
      },
      {
        title: "Crystallization",
        description:
          "Solvent screening, seeding strategies, and polymorph awareness for long-term reference standards.",
      },
    ],
  },
  {
    id: "analytical",
    heading: "Analytical Techniques",
    subheading: "Quantitative and qualitative pipelines.",
    blocks: [
      {
        title: "Core assays",
        description:
          "HPLC purity, chiral HPLC, KF titration, optical rotation, and residual solvent by HS-GC.",
      },
      {
        title: "Advanced ID",
        description:
          "LC-HRMS, high-field NMR, and FT-IR fingerprinting for structure proof and salt assignment.",
        metrics: [
          { label: "Data integrity", value: "ALCOA+" },
          { label: "Archival", value: "Secure" },
        ],
      },
    ],
  },
];
