import { contactChannels } from "@/data/contactPageContent";
import { getSiteUrl } from "@/lib/seo/site";

/** Company details shown on customer invoices (PDF). */
export const COMPANY_INVOICE = {
  legalName: "HKR Biotech Pvt. Ltd.",
  brandName: "HKR Biotech Labs",
  tagline: "Custom glycans · Protected sugars · Research chemicals",
  address: contactChannels.address,
  email: contactChannels.salesEmails[0]?.label ?? "sales@hkrbiotechlabs.com",
  phone: contactChannels.phoneDisplay,
  website: getSiteUrl(),
  gstin: process.env.NEXT_PUBLIC_COMPANY_GSTIN?.trim() || "",
  pan: process.env.NEXT_PUBLIC_COMPANY_PAN?.trim() || "",
} as const;

export const INVOICE_FOOTER_NOTES = [
  "This is a computer-generated tax invoice for your confirmed online payment.",
  "Products are for research use only unless otherwise agreed in writing.",
  "For billing queries, contact sales@hkrbiotechlabs.com with your order reference.",
] as const;
