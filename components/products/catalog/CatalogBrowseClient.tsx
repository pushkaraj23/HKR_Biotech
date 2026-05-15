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
import { cn } from "@/lib/cn";

/** One row of spans sums to 12 — wide / split / pair rhythm for any category count. */
const CATEGORY_BENTO_XL_SPANS = [
  "xl:col-span-7",
  "xl:col-span-5",
  "xl:col-span-4",
  "xl:col-span-4",
  "xl:col-span-4",
  "xl:col-span-6",
  "xl:col-span-6",
] as const;

type CatalogBrowseClientProps = {
  allProducts: CatalogProduct[];
  categories: ProductCategory[];
};

const initialState: CatalogFilterState = {
  search: "",
  category: "all",
  subcategory: "all",
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
          title="Products"
          tagline="Speciality chemicals for discovery and scale-up."
          backgroundImage="https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=1400&h=600&fit=crop&q=80&auto=format"
          ctas={[
            { href: "#catalog-grid-heading", label: "Browse", primary: true },
            { href: "/contact", label: "Enquire" },
          ]}
        />

        <RevealOnScroll>
          <section aria-labelledby="category-cards-heading">
            <h2
              id="category-cards-heading"
              className="font-display text-3xl font-extrabold tracking-tight text-on-dark md:text-4xl"
            >
              Families
            </h2>
            <div
              className={cn(
                "mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5",
                "xl:grid-cols-12 xl:gap-x-5 xl:gap-y-6",
              )}
            >
              {categories.map((cat, i) => {
                const cycle = i % CATEGORY_BENTO_XL_SPANS.length;
                const spanClass = CATEGORY_BENTO_XL_SPANS[cycle];
                const emphasis = cycle === 0;
                return (
                  <RevealOnScroll key={cat.slug} delay={i * 55} className={cn("min-h-0", spanClass)}>
                    <CategoryCard category={cat} minimal emphasis={emphasis} />
                  </RevealOnScroll>
                );
              })}
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
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2
                id="catalog-grid-heading"
                className="font-display text-3xl font-extrabold tracking-tight text-on-dark md:text-4xl"
              >
                Catalogue
              </h2>
              <p className="text-sm text-on-dark/65 tabular-nums">
                <span className="font-semibold text-on-dark/90">{visibleProducts.length}</span>
                <span className="text-on-dark/50"> / </span>
                {allProducts.length}
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="mt-8 rounded-[1.75rem] border border-dashed border-white/45 bg-white/88 px-8 py-16 text-center shadow-[0_12px_32px_-14px_rgba(18,50,90,0.25)] backdrop-blur-sm">
                <p className="font-display text-2xl font-bold text-foreground">No matches</p>
                <p className="mx-auto mt-3 max-w-sm text-sm text-foreground/70">
                  Adjust search or reset filters.
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
                <p className="sr-only" aria-live="polite">
                  {hasMore ? "Loading more results." : "End of list."}
                </p>
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
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                Custom synthesis <span className="text-primary-deep">&amp; services</span>
              </h2>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink href="/contact" className="rounded-full px-10 shadow-primary-glow-lg">
                  Contact
                </ButtonLink>
                <ButtonLink
                  href="/services"
                  variant="secondary"
                  className="rounded-full border-primary/30 bg-white/85 px-10 text-foreground shadow-sm backdrop-blur-md hover:border-primary/50 hover:bg-white"
                >
                  Services
                </ButtonLink>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
