import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCategories,
  getCategoriesExcept,
  getCategoryBySlug,
  getProductsByCategorySlug,
  getSubcategoriesByCategorySlug,
  isValidCategorySlug,
} from "@/data/catalog";
import { CategoryIntro } from "@/components/products/catalog/CategoryIntro";
import { CategoryBrowseClient } from "@/components/products/catalog/CategoryBrowseClient";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { resolveCategoryCatalogView } from "@/lib/catalog/category-view";
import type { ProductCategorySlug } from "@/lib/types/catalog";
import { buildCategoryMetadata } from "@/lib/seo/product-metadata";
import { JsonLd } from "@/lib/seo/json-ld";
import { absoluteUrl } from "@/lib/seo/site";

type PageProps = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ subcategory?: string; view?: string }>;
};

export const revalidate = 60;

/** Allow any valid category slug at request time (matches catalogue data). */
export const dynamicParams = true;

export async function generateStaticParams() {
  const cats = await getAllCategories();
  return cats.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const { subcategory: subcategoryParam, view: viewParam } = await searchParams;
  const cat = await getCategoryBySlug(slug);
  if (!cat) return { title: "Category" };
  const subcategories = await getSubcategoriesByCategorySlug(slug as ProductCategorySlug);
  const { view, activeSubcategory } = resolveCategoryCatalogView(subcategories, {
    subcategory: subcategoryParam,
    view: viewParam,
  });
  const sub = subcategories.find((s) => s.slug === activeSubcategory);
  return buildCategoryMetadata(cat, {
    subcategoryName: view === "subcategory" ? sub?.name : undefined,
    subcategoryDescription: view === "subcategory" ? sub?.description : undefined,
    // Canonical stays on the clean category URL (avoid indexing every filter combo).
    path: `/products/${slug}`,
  });
}

export default async function ProductCategoryPage({ params, searchParams }: PageProps) {
  const { category: slug } = await params;
  const { subcategory: subcategoryParam, view: viewParam } = await searchParams;
  if (!(await isValidCategorySlug(slug))) notFound();

  const cat = await getCategoryBySlug(slug);
  if (!cat) notFound();

  const categoryProducts = await getProductsByCategorySlug(slug as ProductCategorySlug);
  const subcategories = await getSubcategoriesByCategorySlug(slug as ProductCategorySlug);
  const allCategories = await getAllCategories();
  const relatedCategories = await getCategoriesExcept(slug as ProductCategorySlug);
  const { view: catalogView, activeSubcategory } = resolveCategoryCatalogView(subcategories, {
    subcategory: subcategoryParam,
    view: viewParam,
  });

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: cat.name,
    description: cat.description || cat.overview,
    url: absoluteUrl(`/products/${slug}`),
    isPartOf: {
      "@type": "WebSite",
      name: "HKR Biotech Labs",
      url: absoluteUrl("/"),
    },
  };

  return (
    <div className="relative overflow-x-hidden bg-[#020A63]">
      <JsonLd data={collectionJsonLd} />
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
        subcategories={subcategories}
        relatedCategories={relatedCategories}
        allCategories={allCategories}
        catalogView={catalogView}
        activeSubcategory={activeSubcategory}
      />
    </div>
  );
}
