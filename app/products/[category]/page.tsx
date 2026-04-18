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
      <div className="relative z-10 mx-auto max-w-6xl space-y-10 pt-6 md:space-y-12">
        <CategoryHero category={cat} />
      </div>

      <section
        className="relative z-10 mx-auto max-w-6xl pt-10"
        aria-labelledby="category-overview-heading"
      >
        <RevealOnScroll>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            Overview
          </p>
          <h2
            id="category-overview-heading"
            className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl"
          >
            About {cat.name}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">{cat.overview}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {cat.highlights.map((h, i) => (
              <RevealOnScroll key={h} delay={i * 50}>
                <li className="flex gap-3 rounded-[1.25rem] border border-overlay bg-gradient-to-b from-tint-primary/25 to-surface/80 px-4 py-3.5 text-sm text-muted-foreground shadow-[0_4px_16px_-6px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3)]">
                  <span
                    className="mt-1.5 h-1.5 w-4 shrink-0 rounded-full bg-gradient-to-r from-primary to-violet-600"
                    aria-hidden
                  />
                  {h}
                </li>
              </RevealOnScroll>
            ))}
          </ul>
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
