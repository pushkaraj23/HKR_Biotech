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
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
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
          backgroundImage="https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=1400&h=600&fit=crop&q=80&auto=format"
          ctas={[
            { href: "#catalog-grid-heading", label: "Browse catalogue", primary: true },
            { href: "/contact", label: "Start an enquiry" },
          ]}
        />

        <RevealOnScroll>
          <section aria-labelledby="category-cards-heading">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-400">
              Browse by family
            </p>
            <h2
              id="category-cards-heading"
              className="mt-2 font-display text-2xl font-bold tracking-tight text-white md:text-3xl"
            >
              Product Families
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {categories.map((cat, i) => (
                <RevealOnScroll key={cat.slug} delay={i * 60}>
                  <CategoryCard category={cat} />
                </RevealOnScroll>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <ProductFilters
            state={state}
            onChange={setState}
            categoryOptions={categoryOptions}
            showCategoryFilter
          />
        </RevealOnScroll>

        <RevealOnScroll>
          <section aria-labelledby="catalog-grid-heading">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-400">
                  Full catalogue
                </p>
                <h2
                  id="catalog-grid-heading"
                  className="mt-1 font-display text-2xl font-bold tracking-tight text-white md:text-3xl"
                >
                  All Entries
                </h2>
              </div>
              <p className="text-sm text-slate-400">
                Showing{" "}
                <span className="font-semibold text-white">{filtered.length}</span> of{" "}
                {allProducts.length} entries
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="mt-8 rounded-[1.75rem] border border-dashed border-teal-500/30 bg-teal-500/5 px-8 py-16 text-center backdrop-blur-sm">
                <p className="font-display text-lg font-semibold text-white">No matches</p>
                <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
                  Try a shorter search term, clear availability filters, or pick &ldquo;All categories&rdquo; from the
                  dropdown.
                </p>
                <button
                  type="button"
                  onClick={() => setState(initialState)}
                  className="mt-6 rounded-full border border-teal-500/30 bg-white/[0.06] px-5 py-2 text-sm font-semibold text-teal-300 shadow-sm transition hover:bg-white/[0.1]"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <ul className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-2">
                {filtered.map((p, i) => (
                  <RevealOnScroll key={p.slug} delay={(i % 4) * 55}>
                    <li>
                      <ProductCard product={p} className="h-full" />
                    </li>
                  </RevealOnScroll>
                ))}
              </ul>
            )}
          </section>
        </RevealOnScroll>

        {/* CTA banner */}
        <RevealOnScroll>
          <div
            className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.08] p-10 text-center shadow-[0_16px_64px_-16px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-14"
            style={{
              background:
                "linear-gradient(140deg, rgba(20,184,166,0.15) 0%, rgba(124,58,237,0.12) 35%, rgba(91,33,182,0.12) 55%, rgba(244,63,94,0.08) 100%)",
            }}
          >
            {/* Decorative orbs */}
            <div
              className="pointer-events-none absolute -left-4 top-8 h-16 w-16 rounded-full sm:h-20 sm:w-20"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7), rgba(20,184,166,0.4) 55%, rgba(15,118,110,0.2))",
                boxShadow: "0 8px 28px -6px rgba(20,184,166,0.35), inset 0 -2px 6px rgba(0,0,0,0.06)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-3 bottom-6 h-12 w-12 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7), rgba(124,58,237,0.4) 55%, rgba(91,33,182,0.2))",
                boxShadow: "0 6px 20px -4px rgba(91,33,182,0.3), inset 0 -2px 5px rgba(0,0,0,0.06)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute right-[20%] top-4 h-8 w-8 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.6), rgba(159,18,57,0.3) 55%, rgba(159,18,57,0.1))",
                boxShadow: "0 4px 14px -3px rgba(159,18,57,0.25)",
              }}
              aria-hidden
            />

            <div className="relative">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-400">
                Beyond the catalogue
              </p>
              <h2 className="mx-auto mt-3 max-w-xl font-display text-2xl font-bold text-white md:text-3xl">
                Route Scouting, Impurity Synthesis,{" "}
                <span className="gradient-text-shimmer">and Custom Programmes</span>
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-slate-400">
                Share your target structure, timeline, and analytical expectations — we respond with scientific
                questions and a clear feasibility path, not a generic quote grid.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink
                  href="/contact"
                  className="rounded-full px-10 shadow-[0_14px_40px_-10px_rgba(15,118,110,0.4)]"
                >
                  Start a custom synthesis enquiry
                </ButtonLink>
                <ButtonLink
                  href="/services"
                  variant="secondary"
                  className="rounded-full border-white/[0.1] bg-white/[0.06] px-10 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.3)] backdrop-blur-xl"
                >
                  Explore services
                </ButtonLink>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
