/**
 * Contact / RFQ copy.
 */

export const contactHero = {
  eyebrow: "Contact",
  title: "Talk to our team",
  intro: "Quotes, custom synthesis, NMR services, or catalogue questions — we reply quickly.",
  primaryCtaLabel: "Request a quote",
  primaryAnchor: "/contact#enquiry-form",
  secondaryCtaLabel: "Catalogue",
  secondaryHref: "/products",
} as const;

export const contactGlobalLogistics = {
  title: "Global shipping",
  body: "Cold-chain and express options worldwide with full documentation.",
} as const;

export const contactStartProject = {
  title: "How it works",
  steps: [
    {
      title: "1. Inquiry",
      body: "Send structures, quantities, and timeline. Technical review and quote within ~48 hours.",
    },
    {
      title: "2. Confidentiality",
      body: "CDA/NDA available before sharing proprietary details — use our template or yours.",
    },
    {
      title: "3. Delivery",
      body: "Analytical sign-off (including NMR where applicable), then export-ready documentation.",
    },
  ],
} as const;

export const contactDetailsHeading = "Details";

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
  eyebrow: "Form",
  title: "Request a quote",
  description: "Submit the form — we follow up with a technical review.",
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
