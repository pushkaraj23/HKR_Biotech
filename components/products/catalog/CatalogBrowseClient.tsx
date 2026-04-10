"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { CatalogProduct } from "@/lib/types/catalog";
import type { ProductCategory } from "@/lib/types/catalog";
import { filterCatalogProducts, type CatalogFilterState } from "@/lib/catalog/filters";
import { GlassProductsHero } from "@/components/products/GlassProductsHero";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";
import { ProductCard } from "./ProductCard";
import { ProductFilters } from "./ProductFilters";

type CatalogBrowseClientProps = {
  allProducts: CatalogProduct[];
  categories: ProductCategory[];
};

const initialState: CatalogFilterState = {
  search: "",
  category: "all",
  availability: "all",
};

export function CatalogBrowseClient({ allProducts, categories }: CatalogBrowseClientProps) {
  const [state, setState] = useState<CatalogFilterState>(initialState);

  const filtered = useMemo(
    () => filterCatalogProducts(allProducts, state),
    [allProducts, state],
  );

  const categoryOptions = categories.map((c) => ({ slug: c.slug, name: c.name }));

  return (
    <div className="relative overflow-x-hidden px-4 pb-28 pt-6 sm:px-6 lg:px-8">
      <PageAmbientGraphics variant="long" opacity="opacity-[0.16]" />
      <div className="relative z-10 mx-auto max-w-6xl space-y-10 md:space-y-12">
        <GlassProductsHero
          eyebrow="Catalogue"
          title="Products"
          tagline="High-purity chemistry for discovery, scale-up, and regulated filings."
          description="Search by name, CAS number, or molecular formula. Filter by product family and availability — every entry is inquiry-led with technical data packages on request."
        />

        <section aria-labelledby="category-cards-heading">
          <h2 id="category-cards-heading" className="font-display text-xl font-semibold text-slate-950">
            Browse by family
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((cat) => (
              <CategoryCard key={cat.slug} category={cat} />
            ))}
          </div>
        </section>

        <ProductFilters
          state={state}
          onChange={setState}
          categoryOptions={categoryOptions}
          showCategoryFilter
        />

        <section aria-labelledby="catalog-grid-heading">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="catalog-grid-heading" className="font-display text-xl font-semibold text-slate-950">
              Catalogue
            </h2>
            <p className="text-sm text-slate-600">
              Showing{" "}
              <span className="font-semibold text-slate-900">{filtered.length}</span> of{" "}
              {allProducts.length} entries
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-dashed border-teal-300/70 bg-teal-50/30 px-8 py-16 text-center backdrop-blur-sm">
              <p className="font-display text-lg font-semibold text-slate-900">No matches</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                Try a shorter search term, clear availability filters, or pick &ldquo;All categories&rdquo; from the
                dropdown.
              </p>
              <button
                type="button"
                onClick={() => setState(initialState)}
                className="mt-6 rounded-full border border-teal-500/40 bg-white px-5 py-2 text-sm font-semibold text-teal-900 shadow-sm transition hover:bg-teal-50"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <ul className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-2">
              {filtered.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} className="h-full" />
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="relative overflow-hidden rounded-[2rem] border border-teal-200/55 bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 px-8 py-12 text-white shadow-xl md:px-12">
          <div
            className="pointer-events-none absolute -right-20 top-0 h-56 w-56 rounded-full blur-3xl opacity-50"
            style={{ background: "radial-gradient(circle, rgba(91,33,182,0.35), transparent 70%)" }}
            aria-hidden
          />
          <div className="relative max-w-2xl">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-teal-200/90">
              Beyond the catalogue
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold md:text-3xl">
              Route scouting, impurity synthesis, and GMP-adjacent programmes
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-teal-100/90 md:text-base">
              Share your target structure, timeline, and analytical expectations — we respond with scientific
              questions and a clear feasibility path, not a generic quote grid.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink
                href="/contact"
                variant="primary"
                className="border-0 bg-white text-teal-950 shadow-lg hover:brightness-100"
              >
                Start a custom synthesis enquiry
              </ButtonLink>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border border-white/25 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Explore services
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
