/**
 * Client copy for the primary /services marketing page (verbatim).
 */

export const servicesPageHero = {
  title: "Our Services: Precision Carbohydrate & Nucleoside Chemistry",
  intro:
    "At HKR Biotech Pvt. Ltd, we combine deep synthetic expertise with state-of-the-art analytical characterization. We support global research institutions, academia, and pharmaceutical companies with scalable, high-purity chemical solutions.",
  primaryCtaLabel: "Request a quote",
  primaryCtaHref: "/contact",
} as const;

export type ServiceBullet = {
  label: string;
  body: string;
  subpoints?: readonly string[];
};

export type ServiceSection = {
  number: number;
  heading: string;
  intro: string;
  bullets: readonly ServiceBullet[];
};

export const serviceSections: readonly ServiceSection[] = [
  {
    number: 1,
    heading: "Custom Glycan Synthesis",
    intro:
      "We tackle the most challenging branched and linear carbohydrate structures. Our team provides:",
    bullets: [
      {
        label: "Oligosaccharide Synthesis",
        body: "Milligram to gram scale synthesis of complex oligosaccharides related to tumor-associated carbohydrate antigens (TACAS), carbohydrate-based antigens for vaccine development, antigens needed in immunology, glycolipids, and Human milk oligosaccharides (HMOs).",
      },
      {
        label: "Carbohydrate-based Impurities and Reference Standards",
        body: "In-stock impurities and custom synthesis of carbohydrate-based impurities.",
      },
      {
        label: "Protected Sugar Building Blocks",
        body: "In-stock protected sugar building blocks and custom synthesis of protected sugars, monosaccharides, and disaccharides as per customer need.",
      },
    ],
  },
  {
    number: 2,
    heading: "Specialized Sugars for DNA & RNA Synthesis",
    intro: "We provide the foundational building blocks for next-generation oligonucleotide therapeutics.",
    bullets: [
      {
        label: "Phosphoramidites & Nucleosides",
        body: "Custom synthesis of modified ribose and deoxyribose units.",
      },
      {
        label: "Protected Building Blocks",
        body: "High-purity intermediates for solid-phase synthesis, including LNA, BNA, and 2'-modified derivatives.",
      },
      {
        label: "Scale-up Production",
        body: "Seamless transition from R&D batches to pilot-scale manufacturing.",
      },
    ],
  },
  {
    number: 3,
    heading: "Advanced Glycan Analysis (NMR Services)",
    intro:
      "We provide comprehensive structural characterization to guarantee the identity and purity of your compounds.",
    bullets: [
      {
        label: "1D NMR Analysis",
        body: "Standard 1H, 13C, and 19F NMR for routine purity and structural characterisation.",
      },
      {
        label: "2D NMR Structural Elucidation",
        body: "Detailed mapping of complex branched glycans using advanced NMR techniques like COSY, HSQC, HMBC, and NOESY/ROESY to determine:",
        subpoints: [
          "Anomeric configurations (alpha vs. beta linkages).",
          "Sequence and branching patterns.",
        ],
      },
      {
        label: "Full Technical Reports",
        body: "Every analysis includes a detailed spectrum interpretation.",
      },
    ],
  },
  {
    number: 4,
    heading: "GLycoconjugatation Synthesis Services",
    intro:
      "Enhance your glycans with functional handles for biological tracking, bioorthogonal applications, synthetic conjugate vaccines and drug delivery. We use proven chemistries for glycocujugation and develop new chemistries.",
    bullets: [
      {
        label: "Glycoconjugates",
        body: "Linking glycans to proteins, peptides, or lipids (Glycoproteins/Glycolipids).",
      },
      {
        label: "Labeling",
        body: "Incorporation of fluorophores, biotin, or isotopic labels (Deuterium, 13C, 15N).",
      },
      {
        label: "Click Chemistry",
        body: "Synthesis of azido and alkyne-functionalized sugars for rapid bioorthogonal assembly.",
      },
    ],
  },
];

export const servicesCommitmentHeading = "Our Service Commitment";

export const servicesCommitmentColumns: readonly { title: string; body: string }[] = [
  {
    title: "Global Shipping",
    body: "Express worldwide delivery with full customs documentation.",
  },
  {
    title: "Quality Assured",
    body: "Every product is shipped with a comprehensive CoA and NMR/MS data.",
  },
  {
    title: "Confidentiality",
    body: "We operate under strict NDA/CDA protocols to protect customer IP.",
  },
];

export const servicesPartnerCta = {
  title: "Partner With Us Today",
  body: "Ready to start your project? Our technical team is available for consultations to discuss your specific synthetic routes or analytical needs.",
  buttonLabel: "Request a Service Quote",
  buttonHref: "/contact",
} as const;
