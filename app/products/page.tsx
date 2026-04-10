import type { Metadata } from "next";
import { products } from "@/data/products";
import { GlassProductsHero } from "@/components/products/GlassProductsHero";
import { ProductCategoryNav } from "@/components/products/ProductCategoryNav";
import { ProductsGrid } from "@/components/products/ProductsGrid";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse HKR Biotech Labs chemicals: carbohydrates, API impurities, and nucleotides / linkers.",
};

export default function ProductsPage() {
  return (
    <div className="px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10 md:space-y-12">
        <GlassProductsHero
          title="Products"
          description="High-purity chemicals for research and development. Explore by family below — each category has its own overview and product listing."
        />
        <ProductCategoryNav activeSlug="all" mode="catalog" />
        <ProductsGrid products={products} heading="Full catalogue" />
      </div>
    </div>
  );
}
