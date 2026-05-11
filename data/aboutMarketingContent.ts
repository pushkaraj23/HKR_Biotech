/** About page — concise marketing copy. */

export const aboutMarketingHero = {
  eyebrow: "About",
  title: "Global Leaders in Custom Glycan & Sugar Chemistry",
  titleAccentPhrase: "Glycan & Sugar Chemistry",
  intro:
    "Custom glycans, modified sugars, impurities, and protected building blocks — from design through analytical release, shipped worldwide.",
} as const;

export const aboutHighlightMetrics: readonly { label: string; value: string }[] = [
  { label: "Focus", value: "Glycans & sugars" },
  { label: "Scale", value: "Mg to bulk" },
  { label: "Reach", value: "Worldwide" },
];

export const aboutCoreExpertise = {
  heading: "What we deliver",
  subheading: "Five pillars — one accountable lab.",
  items: [
    {
      title: "Custom glycan synthesis",
      description: "Complex carbohydrates built to your spec.",
    },
    {
      title: "Modified sugars",
      description: "Functionalized sugars for discovery and development.",
    },
    {
      title: "Nucleic acid chemistry",
      description: "Protected and modified units for oligo programs.",
    },
    {
      title: "Impurities & standards",
      description: "Reference materials and API-related impurities.",
    },
    {
      title: "Global logistics",
      description: "Documented release and dependable shipping.",
    },
  ],
} as const;

export const aboutDifferentiators: readonly { title: string; subtitle: string }[] = [
  {
    title: "Synthesis depth",
    subtitle: "Reproducible routes, purification, and characterization.",
  },
  {
    title: "Quality & cost",
    subtitle: "High purity with realistic program economics.",
  },
  {
    title: "Bench to border",
    subtitle: "Documentation and logistics for global teams.",
  },
];

export const aboutWhyChoose = {
  heading: "Why HKR?",
  paragraphs: [
    "We connect advanced carbohydrate synthesis with practical delivery — from milligrams to scale, with analytics you can defend.",
  ],
} as const;
