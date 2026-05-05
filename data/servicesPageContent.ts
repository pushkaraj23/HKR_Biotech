/**
 * Client copy for the primary /services marketing page.
 */

export const servicesPageHero = {
  eyebrow: "Our services",
  title: "Our Services: Precision Carbohydrate & Nucleoside Chemistry",
  intro:
    "At HKR Biotech Pvt. Ltd, we combine deep synthetic expertise with state-of-the-art analytical characterization. We support global research institutions, academia, and pharmaceutical companies with scalable, high-purity chemical solutions.",
  primaryCtaLabel: "Request a Service Quote",
  primaryCtaHref: "/contact",
  secondaryCtaLabel: "View service areas",
  /** Hash link from same route (full path for consistent Next.js navigation) */
  secondaryAnchor: "/services#service-areas",
} as const;

export type ServiceAreaBullet = {
  title: string;
  body: string;
  /** Nested points (e.g. under 2D NMR) */
  subpoints?: readonly string[];
};

export type ServiceAreaCTA = {
  label: string;
  href: string;
};

export type ServiceArea = {
  heading: string;
  /** Short label for the card eyebrow */
  tagline: string;
  intro: string;
  bullets: readonly ServiceAreaBullet[];
  coverImage: {
    src: string;
    alt: string;
  };
  ctas: {
    primary: ServiceAreaCTA;
    secondary: ServiceAreaCTA;
  };
};

export const serviceAreas: readonly ServiceArea[] = [
  {
    heading: "1. Custom Glycan Synthesis",
    tagline: "Synthesis · impurity standards · building blocks",
    intro:
      "We tackle the most challenging branched and linear carbohydrate structures. Our team provides:",
    coverImage: {
      src: "https://images.unsplash.com/photo-1694230155228-cdde50083573?w=900&h=700&fit=crop&q=80&auto=format",
      alt: "Laboratory glassware during carbohydrate chemistry work",
    },
    ctas: {
      primary: { label: "Request a service quote", href: "/contact" },
      secondary: { label: "Browse products", href: "/products" },
    },
    bullets: [
      {
        title: "Oligosaccharide Synthesis:",
        body: "Milligram to gram scale synthesis of complex oligosaccharides related to tumor-associated carbohydrate antigens (TACAS), carbohydrate-based antigens for vaccine development, antigens needed in immunology, glycolipids, and Human milk oligosaccharides (HMOs).",
      },
      {
        title: "Carbohydrate-based Impurities and Reference Standards:",
        body: "In-stock impurities and custom synthesis of carbohydrate-based impurities.",
      },
      {
        title: "Protected Sugar Building Blocks:",
        body: "In-stock protected sugar building blocks and custom synthesis of protected sugars, monosaccharides, and disaccharides as per customer need.",
      },
    ],
  },
  {
    heading: "2. Specialized Sugars for DNA & RNA Synthesis",
    tagline: "Phosphoramidites · protections · scale-up",
    intro: "We provide the foundational building blocks for next-generation oligonucleotide therapeutics.",
    coverImage: {
      src: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=900&h=700&fit=crop&q=80&auto=format",
      alt: "DNA double helix — oligonucleotide and nucleoside synthesis context",
    },
    ctas: {
      primary: { label: "Request a service quote", href: "/contact" },
      secondary: { label: "Explore catalogue", href: "/products" },
    },
    bullets: [
      {
        title: "Phosphoramidites & Nucleosides:",
        body: "Custom synthesis of modified ribose and deoxyribose units.",
      },
      {
        title: "Protected Building Blocks:",
        body: "High-purity intermediates for solid-phase synthesis, including LNA, BNA, and 2'-modified derivatives.",
      },
      {
        title: "Scale-up Production:",
        body: "Seamless transition from R&D batches to pilot-scale manufacturing.",
      },
    ],
  },
  {
    heading: "3. Advanced Glycan Analysis (NMR Services)",
    tagline: "1D/2D NMR · elucidation · technical reports",
    intro:
      "We provide comprehensive structural characterization to guarantee the identity and purity of your compounds.",
    coverImage: {
      src: "https://images.unsplash.com/photo-1612278247414-b5df9638e1e7?w=900&h=700&fit=crop&q=80&auto=format",
      alt: "Laboratory workstation with analytical data on screen",
    },
    ctas: {
      primary: { label: "Schedule NMR consulting", href: "/contact" },
      secondary: { label: "View capabilities", href: "/capabilities" },
    },
    bullets: [
      {
        title: "1D NMR Analysis:",
        body: "Standard 1H, 13C, and 19F NMR for routine purity and structural characterisation.",
      },
      {
        title: "2D NMR Structural Elucidation:",
        body: "Detailed mapping of complex branched glycans using advanced NMR techniques like COSY, HSQC, HMBC, and NOESY/ROESY to determine:",
        subpoints: [
          "Anomeric configurations (alpha vs. beta linkages).",
          "Sequence and branching patterns.",
        ],
      },
      {
        title: "Full Technical Reports:",
        body: "Every analysis includes a detailed spectrum interpretation.",
      },
    ],
  },
  {
    heading: "4. GLycoconjugatation Synthesis Services",
    tagline: "Conjugates · labels · bioorthogonal clicks",
    intro:
      "Enhance your glycans with functional handles for biological tracking, bioorthogonal applications, synthetic conjugate vaccines and drug delivery. We use proven chemistries for glycocujugation and develop new chemistries.",
    coverImage: {
      src: "https://images.unsplash.com/photo-1670434843718-101a90294bfc?w=900&h=700&fit=crop&q=80&auto=format",
      alt: "Molecular structure model — conjugation and labeling chemistry",
    },
    ctas: {
      primary: { label: "Discuss glycoconjugation", href: "/contact" },
      secondary: { label: "Meet our experts", href: "/about#meet-experts-heading" },
    },
    bullets: [
      {
        title: "Glycoconjugates:",
        body: "Linking glycans to proteins, peptides, or lipids (Glycoproteins/Glycolipids).",
      },
      {
        title: "Labeling:",
        body: "Incorporation of fluorophores, biotin, or isotopic labels (Deuterium, 13C, 15N).",
      },
      {
        title: "Click Chemistry:",
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
