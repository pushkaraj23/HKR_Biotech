import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    slug: "custom-chemical-synthesis",
    title: "Custom Chemical Synthesis",
    summary:
      "Route design, multistep synthesis, and scale-up from milligrams to multi-kilogram batches.",
    overview:
      "Our chemists partner with your team to deliver complex targets with documented purity profiles, analytical packages, and transparent timelines—from first route to GMP-ready intermediates where required.",
    process: [
      "Target review & feasibility",
      "Route scouting / literature intelligence",
      "Process safety & solvent selection",
      "Purification & isolation",
      "Analytical release & documentation",
    ],
    benefits: [
      "Dedicated project chemist",
      "Structured milestone reporting",
      "IP-aware execution",
      "Seamless tech transfer options",
    ],
    capabilities: [
      "Air- and moisture-sensitive chemistry",
      "Cryogenic & high-pressure options",
      "Chromatography at preparative scale",
      "Salt & polymorph screening support",
    ],
  },
  {
    slug: "contract-research",
    title: "Contract Research",
    summary:
      "Discovery-oriented programs with hypothesis-driven experimentation and rapid iteration.",
    overview:
      "HKR supports exploratory chemistry aligned to biological hypotheses—ideal for lead optimization, SAR expansions, and novel scaffold access with scientific rigor.",
    process: [
      "Scope alignment & success criteria",
      "Experimental planning",
      "Weekly technical touchpoints",
      "Data package delivery",
    ],
    benefits: [
      "Flexible FTE or milestone models",
      "Integrated analytical support",
      "Publication-ready data on request",
    ],
    capabilities: [
      "Parallel synthesis",
      "Purification troubleshooting",
      "Structure elucidation liaison",
    ],
  },
  {
    slug: "analytical-services",
    title: "Analytical Services",
    summary:
      "Method development, validation support, and high-resolution characterization.",
    overview:
      "From early profiling to filing-ready documentation, our analytical team delivers traceable results with instrument redundancy and controlled data handling.",
    process: [
      "Requirement intake",
      "Method feasibility",
      "Optimization & robustness",
      "Reporting & archival",
    ],
    benefits: [
      "Regulatory-aware protocols",
      "Fast turnaround for critical batches",
      "Scientifically defensible conclusions",
    ],
    capabilities: [
      "HPLC / UHPLC",
      "LC-MS / HRMS",
      "NMR (400 MHz)",
      "Prep isolation support",
    ],
  },
  {
    slug: "impurity-profiling",
    title: "Impurity Profiling",
    summary:
      "Isolation, identification, and qualification strategy for API-related impurities.",
    overview:
      "We combine preparative separation with spectroscopic structure proof to support ICH-aligned impurity control strategies and toxicological assessment.",
    process: [
      "Analytical spike & enrichment",
      "Isolation at prep scale",
      "Structure elucidation",
      "Reference standard preparation",
    ],
    benefits: [
      "Clear communication with CMC teams",
      "Traceable batch genealogy",
      "Optional salt form exploration",
    ],
    capabilities: [
      "Forced degradation design",
      "Chromatographic heart-cutting",
      "Chiral impurity resolution",
    ],
  },
  {
    slug: "method-development",
    title: "Method Development",
    summary:
      "Robust chromatographic and spectroscopic methods tailored to your matrix.",
    overview:
      "We develop phase-appropriate methods with documented robustness and transfer notes for internal or external QC adoption.",
    process: [
      "Analytical target profile",
      "Screening & selectivity",
      "LOD/LOQ exploration",
      "Validation-ready documentation",
    ],
    benefits: [
      "Lifecycle support",
      "Instrument-agnostic where possible",
      "Training for client QC teams",
    ],
    capabilities: [
      "Gradient & ion-pair optimization",
      "MS-compatible methods",
      "Stability-indicating assays",
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
