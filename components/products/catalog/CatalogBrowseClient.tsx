"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  }, [state.search, state.category]);

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
    <div className="relative overflow-x-hidden bg-[#020A63] px-4 pb-28 pt-6 sm:px-6 lg:px-8">
      <PageAmbientGraphics variant="long" opacity="opacity-[0.12]" />
      <div className="relative z-10 mx-auto max-w-6xl space-y-10 md:space-y-12">
        <GlassProductsHero
          eyebrow="Catalogue"
          title="Products"
          tagline="High-purity chemistry for discovery, scale-up, and regulated filings."
          description="Search by name, CAS number, or molecular formula and filter by product family — every entry is inquiry-led with technical data packages on request."
          backgroundImage="https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=1400&h=600&fit=crop&q=80&auto=format"
          ctas={[
            { href: "#catalog-grid-heading", label: "Browse catalogue", primary: true },
            { href: "/contact", label: "Start an enquiry" },
          ]}
        />

        <RevealOnScroll>
          <section aria-labelledby="category-cards-heading">
            <div
              className="rounded-[1.5rem] border border-white/45 p-6 shadow-[0_16px_42px_-14px_rgba(18,50,90,0.35)] backdrop-blur-md md:p-7"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in srgb, var(--light) 88%, var(--primary) 12%) 0%, color-mix(in srgb, var(--light) 76%, var(--primary-mid) 24%) 48%, color-mix(in srgb, var(--light) 80%, var(--accent) 20%) 100%)",
              }}
            >
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-deep">
                Browse by family
              </p>
              <h2
                id="category-cards-heading"
                className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl"
              >
                Product <span className="text-primary-deep">Families</span>
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
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.26em] text-accent">
                  Full catalogue
                </p>
                <h2
                  id="catalog-grid-heading"
                  className="mt-1 font-display text-base font-semibold tracking-tight text-on-dark/92 md:text-lg"
                >
                  All Entries
                </h2>
              </div>
              <p className="text-xs text-on-dark/80 sm:text-sm">
                Showing <span className="font-semibold text-on-dark">{visibleProducts.length}</span> of{" "}
                {allProducts.length} entries
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="mt-8 rounded-[1.75rem] border border-dashed border-white/45 bg-white/88 px-8 py-16 text-center shadow-[0_12px_32px_-14px_rgba(18,50,90,0.25)] backdrop-blur-sm">
                <p className="font-display text-lg font-semibold text-foreground">No matches</p>
                <p className="mx-auto mt-2 max-w-md text-sm text-foreground/75">
                  Try a shorter search term or pick &ldquo;All categories&rdquo; from the dropdown.
                </p>
                <button
                  type="button"
                  onClick={() => setState(initialState)}
                  className="mt-6 rounded-full border border-primary/35 bg-cta-gradient px-5 py-2 text-sm font-semibold text-primary-foreground shadow-primary-glow transition hover:-translate-y-0.5 hover:shadow-primary-glow-lg"
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
            className="relative overflow-hidden rounded-[2.5rem] border border-white/50 p-10 text-center shadow-[var(--elev-card-stack)] backdrop-blur-xl sm:p-14"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--light) 84%, var(--primary) 16%) 0%, color-mix(in srgb, var(--light) 70%, var(--primary-mid) 30%) 48%, color-mix(in srgb, var(--light) 72%, var(--accent) 28%) 100%)",
            }}
          >
            <div
              className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full opacity-70"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5), color-mix(in srgb, var(--accent) 22%, transparent) 55%, transparent 75%)",
                filter: "blur(4px)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-16 -right-12 h-52 w-52 rounded-full opacity-60"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, color-mix(in srgb, var(--primary) 24%, transparent), transparent 70%)",
                filter: "blur(6px)",
              }}
              aria-hidden
            />

            <div className="relative">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-foreground/80">
                Beyond the catalogue
              </p>
              <h2 className="mx-auto mt-3 max-w-xl font-display text-2xl font-bold text-foreground md:text-3xl">
                Route Scouting, Impurity Synthesis,{" "}
                <span className="text-primary-deep">and Custom Programmes</span>
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-foreground/82">
                Share your target structure, timeline, and analytical expectations — we respond with scientific
                questions and a clear feasibility path, not a generic quote grid.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink
                  href="/contact"
                  className="rounded-full px-10 shadow-primary-glow-lg"
                >
                  Start a custom synthesis enquiry
                </ButtonLink>
                <ButtonLink
                  href="/services"
                  variant="secondary"
                  className="rounded-full border-primary/30 bg-white/85 px-10 text-foreground shadow-sm backdrop-blur-md hover:border-primary/50 hover:bg-white"
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
