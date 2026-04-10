import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/data/product-categories";
import { getProductsByCategory } from "@/data/products";
import type { ProductCategorySlug } from "@/lib/types";
import { GlassProductsHero } from "@/components/products/GlassProductsHero";
import { ProductCategoryNav } from "@/components/products/ProductCategoryNav";
import { ProductsGrid } from "@/components/products/ProductsGrid";

const VALID: ProductCategorySlug[] = [
  "carbohydrates",
  "api-impurities",
  "nucleotides-linkers",
];

type PageProps = {
  params: Promise<{ categorySlug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const cat = getCategoryBySlug(categorySlug);
  if (!cat) return { title: "Category" };
  return {
    title: cat.name,
    description: cat.description,
  };
}

export default async function ProductCategoryPage({ params }: PageProps) {
  const { categorySlug } = await params;
  if (!VALID.includes(categorySlug as ProductCategorySlug)) {
    notFound();
  }
  const cat = getCategoryBySlug(categorySlug);
  if (!cat) notFound();

  const list = getProductsByCategory(categorySlug);

  return (
    <div className="px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10 md:space-y-12">
        <GlassProductsHero
          eyebrow="Product category"
          title={cat.name}
          tagline={cat.tagline}
          description={cat.description}
        />

        <ProductCategoryNav activeSlug={cat.slug} mode="category" />

        <ProductsGrid
          products={list}
          heading={`${cat.name} — products`}
          headingId="category-products-heading"
          emptyMessage="No products in this category yet."
          emptyExtra={
            <p className="text-sm text-text-muted">
              <Link href="/contact" className="font-medium text-accent-primary hover:underline">
                Request custom synthesis
              </Link>
            </p>
          }
        />
      </div>
    </div>
  );
}
