/**
 * Client copy for the primary /services marketing page.
 */

export const servicesPageHero = {
  eyebrow: "Services",
  title: "Carbohydrate & nucleoside chemistry",
  intro: "Custom synthesis, building blocks, and NMR-backed characterization — for pharma, biotech, and research.",
  primaryCtaLabel: "Request a quote",
  primaryCtaHref: "/contact",
  secondaryCtaLabel: "Service areas",
  secondaryAnchor: "/services#service-areas",
} as const;

export type ServiceAreaBullet = {
  title: string;
  body: string;
  subpoints?: readonly string[];
};

export type ServiceAreaCTA = {
  label: string;
  href: string;
};

export type ServiceArea = {
  heading: string;
  tagline: string;
  intro: string;
  bullets: readonly ServiceAreaBullet[];
  ctas: {
    primary: ServiceAreaCTA;
    secondary: ServiceAreaCTA;
  };
};

export const serviceAreas: readonly ServiceArea[] = [
  {
    heading: "Custom glycan synthesis",
    tagline: "Synthesis · standards · blocks",
    intro: "Complex carbohydrates from design to documented release.",
    ctas: {
      primary: { label: "Request a quote", href: "/contact" },
      secondary: { label: "Products", href: "/products" },
    },
    bullets: [
      {
        title: "Oligosaccharides",
        body: "mg–g scale: TACAs, vaccine antigens, HMOs, glycolipids.",
      },
      {
        title: "Impurities & standards",
        body: "In-stock and custom carbohydrate impurities and reference materials.",
      },
      {
        title: "Protected sugars",
        body: "Catalog and custom monosaccharides, disaccharides, and blocks.",
      },
    ],
  },
  {
    heading: "DNA & RNA building blocks",
    tagline: "Phosphoramidites · protections · scale-up",
    intro: "High-purity intermediates for solid-phase oligo synthesis.",
    ctas: {
      primary: { label: "Request a quote", href: "/contact" },
      secondary: { label: "Catalogue", href: "/products" },
    },
    bullets: [
      {
        title: "Phosphoramidites & nucleosides",
        body: "Modified ribose and deoxyribose units, custom as needed.",
      },
      {
        title: "Protected intermediates",
        body: "LNA, BNA, 2′-modifications, and related blocks.",
      },
      {
        title: "Scale-up",
        body: "R&D through pilot batches with engineering review.",
      },
    ],
  },
  {
    heading: "Glycan analysis (NMR)",
    tagline: "1D/2D · reports",
    intro: "Structural ID and purity with clear documentation.",
    ctas: {
      primary: { label: "Book consulting", href: "/contact" },
      secondary: { label: "All services", href: "/services" },
    },
    bullets: [
      {
        title: "1D NMR",
        body: "¹H, ¹³C, ¹⁹F for routine purity and structure checks.",
      },
      {
        title: "2D NMR",
        body: "COSY, HSQC, HMBC, NOESY/ROESY for linkage and branching.",
      },
      {
        title: "Reports",
        body: "Interpreted spectra and technical write-ups.",
      },
    ],
  },
  {
    heading: "Glycoconjugation",
    tagline: "Conjugates · labels · clicks",
    intro: "Functional handles for tracking, vaccines, and delivery.",
    ctas: {
      primary: { label: "Discuss a project", href: "/contact" },
      secondary: { label: "Team", href: "/leadership#meet-experts-heading" },
    },
    bullets: [
      {
        title: "Conjugates",
        body: "Glycans linked to proteins, peptides, or lipids.",
      },
      {
        title: "Labels",
        body: "Fluorophores, biotin, stable isotopes.",
      },
      {
        title: "Click chemistry",
        body: "Azide/alkyne sugars for bioorthogonal assembly.",
      },
    ],
  },
];

export const servicesCommitmentHeading = "How we ship";

export const servicesCommitmentColumns: readonly { title: string; body: string }[] = [
  { title: "Shipping", body: "Worldwide express with customs paperwork." },
  { title: "Quality", body: "CoA with NMR/MS traceability." },
  { title: "Confidentiality", body: "NDA/CDA where programs require it." },
];

export const servicesPartnerCta = {
  title: "Start a project",
  body: "Share structures, quantities, and timelines — we respond with a technical path.",
  buttonLabel: "Contact",
  buttonHref: "/contact",
} as const;
