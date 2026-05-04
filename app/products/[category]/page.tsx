import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCategories,
  getCategoriesExcept,
  getCategoryBySlug,
  getProductsByCategorySlug,
  isValidCategorySlug,
} from "@/data/catalog";
import { CategoryIntro } from "@/components/products/catalog/CategoryIntro";
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
    <div className="relative overflow-x-hidden bg-[#020A63]">
      <PageAmbientGraphics variant="long" opacity="opacity-[0.12]" />
      <div className="relative z-10 px-4 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <RevealOnScroll>
            <CategoryIntro category={cat} />
          </RevealOnScroll>
        </div>
      </div>

      <CategoryBrowseClient
        category={cat}
        categoryProducts={categoryProducts}
        relatedCategories={relatedCategories}
        allCategories={allCategories}
      />
    </div>
  );
}
