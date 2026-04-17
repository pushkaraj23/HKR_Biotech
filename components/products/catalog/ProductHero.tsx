import Link from "next/link";
import { EnquireGateLink } from "@/components/auth/EnquireGateLink";
import type { CatalogProduct } from "@/lib/types/catalog";
import { cn } from "@/lib/cn";

type ProductHeroProps = {
  product: CatalogProduct;
  categoryLabel: string;
  className?: string;
};

export function ProductHero({ product, categoryLabel, className }: ProductHeroProps) {
  const enquirySectionHref = `/products/${product.categorySlug}/${product.slug}#enquiry-form`;

  return (
    <header
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-slate-800/60 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 shadow-[0_16px_56px_-16px_rgba(15,23,42,0.5)]",
        className,
      )}
    >
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
        aria-hidden
      />

      {/* Ambient glow — subtle, cool tones only */}
      <div
        className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full blur-[100px] opacity-40"
        style={{ background: "radial-gradient(circle, rgba(20,184,166,0.5), transparent 70%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full blur-[80px] opacity-25"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.4), transparent 70%)" }}
        aria-hidden
      />

      {/* Single restrained floating orb */}
      <div
        className="pointer-events-none absolute right-[8%] top-10 h-10 w-10 animate-orbit-slow rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 32%, rgba(255,255,255,0.25), rgba(20,184,166,0.2) 55%, transparent)",
          boxShadow: "0 8px 24px -6px rgba(20,184,166,0.25), inset 0 -2px 6px rgba(0,0,0,0.15)",
          animationDuration: "14s",
        }}
        aria-hidden
      />

      <div className="relative px-8 py-12 md:px-12 md:py-14">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-teal-400">
          {categoryLabel}
        </p>

        <h1 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          {product.chemicalName}
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
          {product.shortDescription}
        </p>

        {/* Key data chips */}
        <dl className="mt-7 flex flex-wrap gap-2.5">
          {[
            { label: "Catalog", value: product.catalogNumber },
            { label: "CAS", value: product.casNumber },
            { label: "Formula", value: product.molecularFormula },
            { label: "Purity", value: product.purity },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 backdrop-blur-sm"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                {item.label}
              </span>
              <span className="font-mono text-[13px] font-medium text-teal-200">
                {item.value}
              </span>
            </div>
          ))}
        </dl>

        {/* CTAs */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <EnquireGateLink
            href={enquirySectionHref}
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-8px_rgba(0,0,0,0.4)]"
          >
            Request quotation
          </EnquireGateLink>
          <EnquireGateLink
            href={enquirySectionHref}
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.06] px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10"
          >
            Enquire now
          </EnquireGateLink>
        </div>
      </div>
    </header>
  );
}
