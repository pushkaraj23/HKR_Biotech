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
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import type { ProductCategorySlug } from "@/lib/types/catalog";

type PageProps = {
  params: Promise<{ category: string }>;
};

export const revalidate = 60;

/** Allow any valid category slug at request time (matches catalogue data). */
export const dynamicParams = true;

export async function generateStaticParams() {
  const cats = await getAllCategories();
  return cats.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const cat = await getCategoryBySlug(slug);
  if (!cat) return { title: "Category" };
  return {
    title: cat.name,
    description: cat.description,
  };
}

export default async function ProductCategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  if (!(await isValidCategorySlug(slug))) notFound();

  const cat = await getCategoryBySlug(slug);
  if (!cat) notFound();

  const categoryProducts = await getProductsByCategorySlug(slug as ProductCategorySlug);
  const allCategories = await getAllCategories();
  const relatedCategories = await getCategoriesExcept(slug as ProductCategorySlug);

  return (
    <div className="relative overflow-x-hidden">
      <PageAmbientGraphics variant="long" opacity="opacity-[0.16]" />
      <div className="relative z-10 mx-auto max-w-6xl space-y-8 pt-6 md:space-y-10">
        <CategoryHero category={cat} />
      </div>

      <section className="relative z-10 mx-auto max-w-6xl pt-8" aria-labelledby="category-overview-heading">
        <RevealOnScroll>
          <div
            className="rounded-[1.5rem] border border-on-dark/18 bg-[rgba(18,25,35,0.5)] p-6 shadow-[0_10px_28px_-16px_rgba(18,25,35,0.62)] backdrop-blur-md md:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(18,25,35,0.72) 0%, rgba(27,38,50,0.56) 48%, rgba(44,59,77,0.48) 100%)",
            }}
          >
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-mid">
              Overview
            </p>
            <h2
              id="category-overview-heading"
              className="mt-2 font-display text-2xl font-bold tracking-tight text-on-dark md:text-3xl"
            >
              About {cat.name}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-on-dark/84">{cat.overview}</p>

            {/* Compact highlights list to reduce card clutter */}
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {cat.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2.5 rounded-xl border border-on-dark/16 bg-[rgba(18,25,35,0.45)] px-4 py-3 text-sm text-on-dark/82"
                >
                  <span
                    className="mt-1.5 h-1.5 w-4 shrink-0 rounded-full bg-gradient-to-r from-primary to-primary-mid"
                    aria-hidden
                  />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>
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
