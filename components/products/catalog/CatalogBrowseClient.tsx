"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
const PAGE_SIZE = 16;

export function CatalogBrowseClient({ allProducts, categories }: CatalogBrowseClientProps) {
  const [state, setState] = useState<CatalogFilterState>(initialState);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(
    () => filterCatalogProducts(allProducts, state),
    [allProducts, state],
  );
  const visibleProducts = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount],
  );
  const hasMore = visibleCount < filtered.length;

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [state.search, state.category, state.availability]);

  useEffect(() => {
    if (!hasMore || !sentinelRef.current) return;
    const target = sentinelRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filtered.length));
        }
      },
      { rootMargin: "240px 0px", threshold: 0.01 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, filtered.length]);

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
            <div className="rounded-[1.5rem] border border-on-dark/20 bg-[rgba(18,25,35,0.5)] p-6 backdrop-blur-md md:p-7">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-mid">
                Browse by family
              </p>
              <h2
                id="category-cards-heading"
                className="mt-2 font-display text-2xl font-bold tracking-tight text-on-dark md:text-3xl"
              >
                Product Families
              </h2>
            </div>
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
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
                  Full catalogue
                </p>
                <h2
                  id="catalog-grid-heading"
                  className="mt-1 font-display text-2xl font-bold tracking-tight text-on-dark md:text-3xl"
                >
                  All Entries
                </h2>
              </div>
              <p className="text-sm text-on-dark/80">
                Showing <span className="font-semibold text-on-dark">{visibleProducts.length}</span> of{" "}
                {allProducts.length} entries
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="mt-8 rounded-[1.75rem] border border-dashed border-on-dark/35 bg-[rgba(18,25,35,0.5)] px-8 py-16 text-center backdrop-blur-sm">
                <p className="font-display text-lg font-semibold text-on-dark">No matches</p>
                <p className="mx-auto mt-2 max-w-md text-sm text-on-dark/75">
                  Try a shorter search term, clear availability filters, or pick &ldquo;All categories&rdquo; from the
                  dropdown.
                </p>
                <button
                  type="button"
                  onClick={() => setState(initialState)}
                  className="mt-6 rounded-full border border-primary/40 bg-[rgba(18,25,35,0.6)] px-5 py-2 text-sm font-semibold text-primary-mid shadow-sm transition hover:bg-[rgba(18,25,35,0.75)]"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <ul className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-2">
                {visibleProducts.map((p, i) => (
                  <RevealOnScroll key={p.slug} delay={(i % 4) * 55}>
                    <li>
                      <ProductCard product={p} className="h-full" />
                    </li>
                  </RevealOnScroll>
                ))}
              </ul>
            )}
            {filtered.length > 0 ? (
              <div className="mt-6 flex flex-col items-center gap-2">
                <div ref={sentinelRef} className="h-1 w-full" aria-hidden />
                {hasMore ? (
                  <p className="text-xs text-on-dark/65">Loading more products as you scroll...</p>
                ) : (
                  <p className="text-xs text-on-dark/65">All matching products loaded.</p>
                )}
              </div>
            ) : null}
          </section>
        </RevealOnScroll>

        {/* CTA banner */}
        <RevealOnScroll>
          <div
            className="relative overflow-hidden rounded-[2.5rem] border border-on-dark/22 p-10 text-center shadow-[0_16px_64px_-16px_rgba(18,25,35,0.55)] backdrop-blur-xl sm:p-14"
            style={{
              background:
                "linear-gradient(140deg, rgba(18,25,35,0.76) 0%, rgba(27,38,50,0.62) 35%, rgba(44,59,77,0.56) 62%, rgba(74,93,114,0.5) 100%)",
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
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-on-dark/78">
                Beyond the catalogue
              </p>
              <h2 className="mx-auto mt-3 max-w-xl font-display text-2xl font-bold text-on-dark md:text-3xl">
                Route Scouting, Impurity Synthesis,{" "}
                <span className="gradient-text-shimmer">and Custom Programmes</span>
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-on-dark/84">
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
                  className="rounded-full border-on-dark/38 bg-[rgba(18,25,35,0.52)] px-10 text-on-dark shadow-[0_4px_20px_-6px_rgba(0,0,0,0.3)] backdrop-blur-xl hover:border-on-dark/55 hover:bg-[rgba(18,25,35,0.68)]"
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
