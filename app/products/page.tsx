import type { Metadata } from "next";
import { getAllCategories, getAllProducts } from "@/data/catalog";
import { CatalogBrowseClient } from "@/components/products/catalog/CatalogBrowseClient";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse HKR Biotech Labs speciality chemicals: carbohydrates, API impurities, nucleotides and linkers, research intermediates, and protecting groups — inquiry-led catalogue.",
};

export default function ProductsPage() {
  const categories = getAllCategories();
  const allProducts = getAllProducts();

  return <CatalogBrowseClient allProducts={allProducts} categories={categories} />;
}
