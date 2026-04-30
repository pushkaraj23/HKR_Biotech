import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    slug: "research-and-development",
    title: "Research & Development",
    summary:
      "Comprehensive R&D support for complex carbohydrates, nucleosides, nucleotides, API impurities, and advanced intermediates.",
    overview:
      "Our team works closely with clients to build customer-specific development routes for complex synthesis programs with clear technical checkpoints and transparent communication.",
    process: [
      "Target review & feasibility",
      "Route scouting / literature intelligence",
      "Process safety & solvent selection",
      "Purification & isolation",
      "Analytical release & documentation",
    ],
    benefits: [
      "Customer-aligned project planning",
      "Scientific milestone reporting",
      "Complex route design support",
      "Flexible execution from exploratory to advanced stages",
    ],
    capabilities: [
      "Complex polysaccharide and oligosaccharide synthesis",
      "Nucleoside, nucleotide, and linker chemistry",
      "API impurity and API standard development",
      "Route scouting and process troubleshooting",
    ],
  },
  {
    slug: "analytical-services",
    title: "Analytical Services",
    summary:
      "In-depth analytical characterization using NMR, mass spectrometry, UV, IR, and allied methods.",
    overview:
      "We provide practical analytical support for carbohydrates, nucleotides, complex heterocycles, chiral molecules, and unknown API impurities with traceable reports.",
    process: [
      "Scope alignment & success criteria",
      "Experimental planning",
      "Weekly technical touchpoints",
      "Data package delivery",
    ],
    benefits: [
      "Rapid analytical turnaround",
      "Comprehensive characterization packages",
      "Decision-ready scientific interpretation",
    ],
    capabilities: [
      "Advanced 1D/2D NMR workflows",
      "Mass spectrometry and structure confirmation",
      "Purity and identity verification support",
    ],
  },
  {
    slug: "consultation-and-support",
    title: "Consultation & Support",
    summary:
      "Strategic consultation for synthesis route design, route scouting, and process development support.",
    overview:
      "Our experts support teams through technical decisions across R&D lifecycle stages, helping resolve route challenges and optimize development pathways.",
    process: [
      "Requirement intake",
      "Method feasibility",
      "Optimization & robustness",
      "Reporting & archival",
    ],
    benefits: [
      "Direct scientist-to-scientist collaboration",
      "Faster route decision cycles",
      "Practical guidance for development risk reduction",
    ],
    capabilities: [
      "Route strategy and route scouting",
      "Problem-solving for difficult synthesis steps",
      "Support for development planning and execution",
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
