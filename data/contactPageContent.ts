/**
 * Client-supplied Contact / RFQ copy.
 */

export const contactHero = {
  eyebrow: "Contact",
  title: "Get in Touch with Our Experts",
  intro:
    "Whether you are looking for a specific protected sugar building block, require a custom glycan synthesis project, or need advanced NMR analysis, our technical team is ready to assist you.",
  primaryCtaLabel: "Request a quote online",
  primaryAnchor: "/contact#enquiry-form",
  secondaryCtaLabel: "Browse catalogue",
  secondaryHref: "/products",
} as const;

export const contactGlobalLogistics = {
  title: "Global Reach & Reliable Logistics",
  body:
    "We are proud to serve the global scientific community. We ship our materials worldwide, utilizing specialized cold-chain logistics and express couriers to ensure your compounds arrive on time and in perfect condition, regardless of your laboratory’s location.",
} as const;

export const contactStartProject = {
  title: "Start Your Project",
  steps: [
    {
      title: "1. Inquiry & Technical Review",
      body: "Send us your structures (CAS, SMILES, Chemdraw, or IUPAC names) and required quantity. Our PhD chemists will review the synthetic route and provide a detailed quote within 48 hours.",
    },
    {
      title: "2. Confidentiality & CDA Signing",
      body: "We understand the sensitivity of your research and intellectual property.",
      note:
        "Note on Confidentiality: We are happy to review and sign a Confidential Disclosure Agreement (CDA) or Non-Disclosure Agreement (NDA) before discussing the specific details of your custom synthesis or proprietary structures. Please indicate if you would like us to provide our standard CDA template or if you prefer to use your own.",
    },
    {
      title: "3. Global Fulfillment",
      body: "Once the synthesis and analytical verification (1D/2D NMR) are complete, we handle all international customs documentation to ensure a seamless delivery to your facility.",
    },
  ],
} as const;

export const contactDetailsHeading = "Contact Information";

export const contactChannels = {
  salesEmails: [
    { label: "sales@hkrbiotechlabs.com", href: "mailto:sales@hkrbiotechlabs.com" },
    { label: "business@hkrbiotechlabs.com", href: "mailto:business@hkrbiotechlabs.com" },
  ],
  technical: { label: "kishor@hkrbiotechlabs.com", href: "mailto:kishor@hkrbiotechlabs.com" },
  phoneDisplay: "+91 8446660179",
  phoneHref: "tel:+918446660179",
  hours: "Monday – Saturday, 9:00 AM – 6:00 PM GMT",
  address: "HKR Biotech Pvt. Ltd., NCL Innovation Park, Pashan Road, Pune - 411008",
} as const;

export const quoteFormSection = {
  eyebrow: "Online form",
  title: "Request a Quote Online",
  description: "Complete the fields below. Our team will respond with a technical review and quotation as soon as possible.",
} as const;

export const quoteServiceOptions = [
  "Custom Glycan Synthesis",
  "Protected Sugars",
  "Protected/Modified nucleosides/Nucleotides",
  "Impurity synthesis",
  "Structure Elucidation",
] as const;

export const quoteCdaOptions = [
  { value: "no", label: "No" },
  { value: "yes_template", label: "Yes, please send a CDA template" },
] as const;
