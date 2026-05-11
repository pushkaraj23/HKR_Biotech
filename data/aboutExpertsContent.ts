/**
 * Client-supplied About / Experts copy — preserve wording verbatim where provided.
 */

export const ABOUT_EXPERTS_LINKS = {
  /** Dr. Kishor Harale — public profile */
  kishorLinkedIn: "https://www.linkedin.com/in/kishor-harale-ph-d-28409248",
  /** Scholar search — replace with direct citations URL when confirmed */
  kishorGoogleScholar: "https://scholar.google.com/scholar?q=Kishor+R.+Harale+carbohydrate",
  /** Footer CTA — same profile until a dedicated company page is confirmed */
  workWithLinkedIn: "https://www.linkedin.com/in/kishor-harale-ph-d-28409248",
} as const;

export const meetExpertsSection = {
  title: "Our team",
  intro: "PhD-led synthesis and analytical specialists for glycochemistry and nucleic-acid programs.",
};

export const leadershipScientificHeading = "Leadership & science";

export type ExpertDetailRow =
  | { type: "field"; label: string; text: string }
  | {
      type: "links";
      items: readonly { label: string; href: string }[];
    };

export type ExpertProfile = {
  name: string;
  roleDescriptor: string;
  /** Path under `public/` (e.g. `/team/Kishor Harale.jpg`) */
  photoSrc?: string;
  rows: readonly ExpertDetailRow[];
};

export const expertProfiles: readonly ExpertProfile[] = [
  {
    name: "Dr. Kishor Harale, Director",
    roleDescriptor:
      "(Postdoc: University of Michigan, with Prof. John Montgomery, Ex-Scientist MSD-Wellcode Trust Hilleman Labs) Ph.D. Director",
    photoSrc: "/team/Kishor Harale.jpg",
    rows: [
      {
        type: "field",
        label: "Expertise:",
        text: "Synthetic Organic Chemistry & Glycan Chemistry.",
      },
      {
        type: "field",
        label: "Background:",
        text: "With over 14 years in carbohydrate synthesis, Dr. Kishor leads our custom synthesis department. He ensures on-time delivery of every complex glycan target molecule, meeting quality parameters as per customer needs.",
      },
      {
        type: "links",
        items: [
          { label: "LinkedIn", href: ABOUT_EXPERTS_LINKS.kishorLinkedIn },
          { label: "Google Scholar", href: ABOUT_EXPERTS_LINKS.kishorGoogleScholar },
        ],
      },
      {
        type: "field",
        label: "Leadership & Experience:",
        text: "Dr. Kishor Harale, the founder and driving force behind HKR Biotech Pvt Ltd, brings over 15 years of dedicated research experience to the forefront of the biotech industry. He holds a Ph.D. from the National Chemical Laboratory (NCL), Pune in the field of total synthesis, methodology of natural products and API synthesis. His primary expertise lies in the intricate field of glycobiology, specifically complex carbohydrate synthesis, synthetic conjugate vaccines, and natural product methodology.",
      },
      {
        type: "field",
        label: "Postdoctoral Research:",
        text: "Dr. Harale expanded his academic and technical credentials as a postdoctoral research scholar at the University of Michigan, Ann Arbor, USA in the field of synthesis of tri-saccharides.",
      },
      {
        type: "field",
        label: "",
        text: "He has also have pharmaceutical industry experience of eight years at the MSD-Wellcome Trust Hilleman Laboratories, a prestigious joint venture between Merck USA and the Wellcome Trust UK. His key work area was glycan synthesis, and structural characterization of complex glycans. His commitment to advancing synthetic chemistry is evidenced by top-tier academic contributions, including publishing high-impact research in international journals like JACS, RSC advances, vaccines, Esevier etc.",
      },
    ],
  },
  {
    name:
      "Prof. Dilip Dhavale, Ph.D. (FASc., FNASc., FMASc, Ex-Head and Distinguished Professor, Department of Chemistry, Savitribai Phule Pune University):",
    roleDescriptor: "Scientific Advisor and Head of Analytical Chemistry",
    photoSrc: "/team/Dilip Dhavale.jpeg",
    rows: [
      {
        type: "field",
        label: "Expertise:",
        text: "Advance NMR Spectroscopy (1D/2D) & Mass Spectrometry.",
      },
      {
        type: "field",
        label: "Background:",
        text: "With over 40 years in carbohydrate and imino sugar synthesis, Prof. Dhavale specializes in the structural elucidation of branched oligosaccharides, ensuring that every alpha and beta linkage is definitively confirmed.",
      },
      {
        type: "field",
        label: "",
        text: "Prof. (Dr.) Dilip D. Dhavale is a distinguished chemist and retired Professor from Savitribai Phule Pune University, currently serving as a Scientific Advisor at HKR Biotech. With extensive expertise in synthetic organic chemistry, his work spans carbohydrate chemistry, natural products, and medicinal chemistry. He has authored over 200 scientific publications in reputed international journals, reflecting his significant contributions to innovative chemical research, including enzyme inhibition and nanoparticle synthesis. A Fellow of leading Indian science academies, his global academic experience and award-winning career continue to guide cutting-edge R&D initiatives, bringing deep scientific insight and strategic direction to advancing innovation.",
      },
    ],
  },
];

export const cultureSection = {
  title: "Culture",
  paragraph:
    "PhD- and Masters-level chemists. We know impurities in protected sugars can ruin a sequence — so we lead with quality.",
  philosophy:
    "We treat every synthesis like our own research — from route to release spectrum, precision is the standard.",
};

export const workWithExpertsSection = {
  title: "Talk to science",
  intro: "Technical questions? Email our team.",
  primaryCtaLabel: "Schedule a Technical Consultation",
  secondaryCtaLabel: "Connect on LinkedIn",
};
