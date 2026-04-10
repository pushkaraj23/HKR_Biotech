import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCategories,
  getCategoriesExcept,
  getCategoryBySlug,
  getProductsByCategorySlug,
  isValidCategorySlug,
} from "@/data/catalog";
import { CategoryHero } from "@/components/products/catalog/CategoryHero";
import { CategoryBrowseClient } from "@/components/products/catalog/CategoryBrowseClient";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";
import type { ProductCategorySlug } from "@/lib/types/catalog";

type PageProps = {
  params: Promise<{ category: string }>;
};

/** Allow any valid category slug at request time (matches catalogue data). */
export const dynamicParams = true;

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return { title: "Category" };
  return {
    title: cat.name,
    description: cat.description,
  };
}

export default async function ProductCategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  if (!isValidCategorySlug(slug)) notFound();

  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  const categoryProducts = getProductsByCategorySlug(slug as ProductCategorySlug);
  const allCategories = getAllCategories();
  const relatedCategories = getCategoriesExcept(slug as ProductCategorySlug);

  return (
    <div className="relative overflow-x-hidden">
      <PageAmbientGraphics variant="long" opacity="opacity-[0.16]" />
      <div className="relative z-10 mx-auto max-w-6xl space-y-10 px-4 pt-6 sm:px-6 md:space-y-12 lg:px-8">
        <CategoryHero category={cat} />
      </div>

      <section className="relative z-10 mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8" aria-labelledby="category-overview-heading">
        <h2 id="category-overview-heading" className="font-display text-xl font-semibold text-slate-950">
          Overview
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">{cat.overview}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {cat.highlights.map((h) => (
            <li
              key={h}
              className="flex gap-3 rounded-2xl border border-teal-100/90 bg-white/80 px-4 py-3 text-sm text-slate-700 shadow-sm backdrop-blur-sm"
            >
              <span
                className="mt-1.5 h-1.5 w-4 shrink-0 rounded-full bg-gradient-to-r from-teal-500 to-violet-600"
                aria-hidden
              />
              {h}
            </li>
          ))}
        </ul>
      </section>

      <CategoryBrowseClient
        category={cat}
        categoryProducts={categoryProducts}
        relatedCategories={relatedCategories}
        allCategories={allCategories}
      />
    </div>
  );
}
