"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { CatalogProduct, ProductCategory, ProductCategorySlug } from "@/lib/types/catalog";
import { filterCatalogProducts, type CatalogFilterState } from "@/lib/catalog/filters";
import { ProductCategoryNav } from "@/components/products/ProductCategoryNav";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ProductCard } from "./ProductCard";
import { ProductFilters } from "./ProductFilters";

type CategoryBrowseClientProps = {
  category: ProductCategory;
  categoryProducts: CatalogProduct[];
  relatedCategories: ProductCategory[];
  allCategories: ProductCategory[];
};

export function CategoryBrowseClient({
  category,
  categoryProducts,
  relatedCategories,
  allCategories,
}: CategoryBrowseClientProps) {
  const initial: CatalogFilterState = {
    search: "",
    category: category.slug,
    availability: "all",
  };
  const [state, setState] = useState<CatalogFilterState>(initial);

  const filtered = useMemo(
    () => filterCatalogProducts(categoryProducts, state, category.slug as ProductCategorySlug),
    [category.slug, categoryProducts, state],
  );

  const categoryOptions = allCategories.map((c) => ({ slug: c.slug, name: c.name }));

  return (
    <div className="space-y-10 px-4 pb-28 pt-6 sm:px-6 lg:px-8 md:space-y-12">
      <div className="mx-auto max-w-6xl space-y-10 md:space-y-12">
        <ProductCategoryNav activeSlug={category.slug} mode="category" />

        <ProductFilters
          state={state}
          onChange={setState}
          categoryOptions={categoryOptions}
          showCategoryFilter={false}
        />

        <section aria-labelledby="category-list-heading">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="category-list-heading" className="font-display text-xl font-semibold text-slate-950">
              {category.name} — entries
            </h2>
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-slate-900">{filtered.length}</span> shown in this family
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-dashed border-teal-300/70 bg-white/60 px-8 py-14 text-center">
              <p className="font-medium text-slate-900">No products match these filters.</p>
              <button
                type="button"
                onClick={() => setState({ ...initial, category: category.slug })}
                className="mt-4 text-sm font-semibold text-teal-800 underline"
              >
                Clear search & availability
              </button>
            </div>
          ) : (
            <ul className="mt-8 grid gap-6 md:grid-cols-2">
              {filtered.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} className="h-full" />
                </li>
              ))}
            </ul>
          )}
        </section>

        <section
          className="rounded-[2rem] border border-teal-200/60 bg-gradient-to-br from-white to-violet-50/20 p-8 md:p-10"
          aria-labelledby="category-cta-heading"
        >
          <h2 id="category-cta-heading" className="font-display text-xl font-semibold text-slate-950">
            Need a non-catalog variant?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
            We routinely deliver analogues, salt forms, and labelled batches within the{" "}
            <span className="font-medium text-slate-800">{category.name}</span> space — reference this family in
            your RFQ.
          </p>
          <ButtonLink
            href={`/contact?product=${encodeURIComponent(category.name + " — custom")}`}
            variant="primary"
            className="mt-6 px-6 py-3 text-sm"
          >
            Enquire about {category.name}
          </ButtonLink>
        </section>

        <section aria-labelledby="related-cats-heading">
          <h2 id="related-cats-heading" className="font-display text-xl font-semibold text-slate-950">
            Related categories
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Explore adjacent chemistries often combined in route design.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedCategories.map((c) => (
              <CategoryCard key={c.slug} category={c} />
            ))}
          </div>
        </section>

        <section
          className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-slate-50/80 px-8 py-10 backdrop-blur-sm md:px-12"
          aria-labelledby="trust-heading"
        >
          <h2 id="trust-heading" className="font-display text-xl font-semibold text-slate-950">
            Why teams choose HKR for catalogue chemistry
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Analytical depth",
                body: "Identity and purity context aligned to how you will use the material in the lab.",
              },
              {
                title: "Scale flexibility",
                body: "Milligram exploration through multi-gram supply with transparent feasibility gates.",
              },
              {
                title: "Export-ready mindset",
                body: "Documentation and communication tuned for Indian and international procurement teams.",
              },
            ].map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-white/80 bg-white/90 p-5 shadow-sm"
              >
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <Link
            href="/capabilities"
            className="mt-8 inline-flex text-sm font-semibold text-teal-800 hover:underline"
          >
            View capabilities →
          </Link>
        </section>
      </div>
    </div>
  );
}
