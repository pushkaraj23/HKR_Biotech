import type { Metadata } from "next";
import type { CatalogProduct, ProductCategory } from "@/lib/types/catalog";
import { isMeaningfulCas } from "@/lib/seo/cas";
import { keywordsForCategory, keywordsForProduct } from "@/lib/seo/keywords";
import { absoluteUrl, getSiteUrl } from "@/lib/seo/site";
import { productPath } from "@/lib/seo/product-url";

export { productPath } from "@/lib/seo/product-url";

export function productPageTitle(product: CatalogProduct): string {
  const parts = [product.chemicalName];
  if (isMeaningfulCas(product.casNumber)) {
    parts.push(`CAS ${product.casNumber.trim()}`);
  }
  if (product.purity?.trim()) {
    parts.push(product.purity.trim());
  } else if (product.catalogNumber?.trim()) {
    parts.push(product.catalogNumber.trim());
  }
  return parts.join(" | ");
}

export function productPageDescription(product: CatalogProduct): string {
  const bits: string[] = [];
  if (isMeaningfulCas(product.casNumber)) {
    bits.push(`CAS ${product.casNumber.trim()}`);
  }
  if (product.catalogNumber?.trim()) {
    bits.push(`Catalog ${product.catalogNumber.trim()}`);
  }
  if (product.purity?.trim()) {
    bits.push(product.purity.trim());
  }
  const lead =
    product.shortDescription?.trim() ||
    `${product.chemicalName} — sugar building block from HKR Biotech Labs for glycan synthesis programmes.`;
  const identity = bits.length ? ` ${bits.join(" · ")}.` : "";
  const docs: string[] = [];
  if (product.coaAvailable) docs.push("CoA");
  if (product.sdsAvailable) docs.push("SDS");
  const docLine = docs.length
    ? ` ${docs.join(" / ")} available. Enquire for pack sizes and custom glycan synthesis.`
    : " Enquire for pack sizes, purity, and custom glycan synthesis.";
  const text = `${lead}${identity}${docLine}`.replace(/\s+/g, " ").trim();
  return text.length > 320 ? `${text.slice(0, 317)}…` : text;
}

export function buildProductMetadata(
  product: CatalogProduct,
  category?: ProductCategory,
): Metadata {
  const path = productPath(product);
  const title = productPageTitle(product);
  const description = productPageDescription(product);
  const image = product.imageUrl?.trim() || "/hkr_logo.png";
  const keywords = keywordsForProduct({
    chemicalName: product.chemicalName,
    categorySlug: product.categorySlug,
    categoryName: category?.name,
    casNumber: isMeaningfulCas(product.casNumber) ? product.casNumber.trim() : undefined,
    catalogNumber: product.catalogNumber,
    alternativeName: product.alternativeName,
  });

  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title,
      description,
      siteName: "HKR Biotech Labs",
      images: [
        {
          url: image,
          alt: `${product.chemicalName}${isMeaningfulCas(product.casNumber) ? ` CAS ${product.casNumber.trim()}` : ""} structure`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    other: {
      "product:retailer_item_id": product.catalogNumber,
      ...(isMeaningfulCas(product.casNumber)
        ? { "product:material": `CAS ${product.casNumber.trim()}` }
        : {}),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function buildProductJsonLd(
  product: CatalogProduct,
  category: ProductCategory,
): Record<string, unknown> {
  const url = absoluteUrl(productPath(product));
  const siteUrl = getSiteUrl();
  const additionalProperty = [
    isMeaningfulCas(product.casNumber)
      ? {
          "@type": "PropertyValue",
          name: "CAS Registry Number",
          value: product.casNumber.trim(),
        }
      : null,
    product.molecularFormula
      ? {
          "@type": "PropertyValue",
          name: "Molecular Formula",
          value: product.molecularFormula,
        }
      : null,
    product.molecularWeight
      ? {
          "@type": "PropertyValue",
          name: "Molecular Weight",
          value: product.molecularWeight,
        }
      : null,
    product.purity
      ? {
          "@type": "PropertyValue",
          name: "Purity",
          value: product.purity,
        }
      : null,
    product.availability
      ? {
          "@type": "PropertyValue",
          name: "Availability",
          value: product.availability,
        }
      : null,
  ].filter(Boolean);

  return {
    // Product for commerce signals + ChemicalSubstance for chemistry entity matching.
    "@type": ["Product", "ChemicalSubstance"],
    name: product.chemicalName,
    description: productPageDescription(product),
    sku: product.catalogNumber || product.slug,
    mpn: product.catalogNumber || undefined,
    productID: product.id || product.slug,
    url,
    image: product.imageUrl ? [absoluteUrl(product.imageUrl)] : [`${siteUrl}/hkr_logo.png`],
    brand: {
      "@type": "Brand",
      name: "HKR Biotech Labs",
    },
    manufacturer: {
      "@type": "Organization",
      name: "HKR Biotech Pvt. Ltd.",
      url: siteUrl,
    },
    category: category.name,
    ...(product.alternativeName
      ? { alternateName: product.alternativeName }
      : {}),
    ...(isMeaningfulCas(product.casNumber)
      ? { identifier: product.casNumber.trim() }
      : {}),
    additionalProperty,
    offers: {
      "@type": "Offer",
      url,
      availability:
        product.availability === "In stock"
          ? "https://schema.org/InStock"
          : product.availability === "Made to order"
            ? "https://schema.org/PreOrder"
            : "https://schema.org/LimitedAvailability",
      businessFunction: "https://schema.org/Sell",
      seller: {
        "@type": "Organization",
        name: "HKR Biotech Labs",
        url: siteUrl,
      },
    },
  };
}

export function buildBreadcrumbJsonLd(
  items: { name: string; path?: string }[],
): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  };
}

export function buildCategoryMetadata(
  category: ProductCategory,
  options?: { subcategoryName?: string; subcategoryDescription?: string; path?: string },
): Metadata {
  const path = options?.path ?? `/products/${category.slug}`;
  const title = options?.subcategoryName
    ? `${options.subcategoryName} · ${category.name}`
    : `${category.name} | Sugar Building Blocks & Glycan Chemistry`;
  const description =
    options?.subcategoryDescription?.trim() ||
    category.description ||
    category.overview ||
    `Browse ${category.name} from HKR Biotech Labs — CAS-indexed sugar building blocks for custom glycan synthesis, with purity specs and enquiry-ready documentation.`;

  return {
    title,
    description,
    keywords: keywordsForCategory(category.slug, category.name),
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title,
      description,
      siteName: "HKR Biotech Labs",
      images: [{ url: category.imageUrl || "/hkr_logo.png", alt: category.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [category.imageUrl || "/hkr_logo.png"],
    },
  };
}
