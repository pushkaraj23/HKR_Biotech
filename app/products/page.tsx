import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllCategories, getAllProducts, getAllSubcategories } from "@/data/catalog";
import { CatalogBrowseClient } from "@/components/products/catalog/CatalogBrowseClient";
import { JsonLd } from "@/lib/seo/json-ld";
import { CATALOG_SEO_KEYWORDS } from "@/lib/seo/keywords";
import { absoluteUrl } from "@/lib/seo/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Sugar Building Blocks & Carbohydrate Catalogue",
  description:
    "Browse HKR Biotech Labs by chemical name or CAS: protected monosaccharides, bacterial oligosaccharides, disaccharides, trisaccharides, carbohydrate impurities, and modified nucleotide sugars — CoA-ready documentation.",
  keywords: CATALOG_SEO_KEYWORDS,
  alternates: { canonical: "/products" },
  openGraph: {
    type: "website",
    url: "/products",
    title: "Sugar Building Blocks & Carbohydrate Catalogue | HKR Biotech Labs",
    description:
      "Search by name or CAS: protected monosaccharides, bacterial oligosaccharides, sugar building blocks, and carbohydrate impurities.",
    images: [{ url: "/hkr_logo.png", alt: "HKR Biotech Labs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sugar Building Blocks & Carbohydrate Catalogue | HKR Biotech Labs",
    description:
      "Search by name or CAS: protected monosaccharides, bacterial oligosaccharides, and carbohydrate impurities.",
    images: ["/hkr_logo.png"],
  },
};

export default async function ProductsPage() {
  const [categories, allProducts, subcategories] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
    getAllSubcategories(),
  ]);

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "HKR Biotech Labs Product Catalogue",
    description:
      "Specialty chemicals searchable by chemical name and CAS Registry Number.",
    url: absoluteUrl("/products"),
    numberOfItems: allProducts.length,
  };

  return (
    <>
      <JsonLd data={collectionJsonLd} />
      <Suspense fallback={null}>
        <CatalogBrowseClient
          allProducts={allProducts}
          categories={categories}
          subcategories={subcategories}
        />
      </Suspense>
    </>
  );
}
