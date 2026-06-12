import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllCategories, getAllProducts, getAllSubcategories } from "@/data/catalog";
import { CatalogBrowseClient } from "@/components/products/catalog/CatalogBrowseClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse HKR Biotech Labs speciality chemicals: carbohydrates, API impurities, nucleotides and linkers, research intermediates, and protecting groups — inquiry-led catalogue.",
};

export default async function ProductsPage() {
  const [categories, allProducts, subcategories] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
    getAllSubcategories(),
  ]);

  return (
    <Suspense fallback={null}>
      <CatalogBrowseClient allProducts={allProducts} categories={categories} subcategories={subcategories} />
    </Suspense>
  );
}
