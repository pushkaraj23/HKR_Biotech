import Link from "next/link";
import { EnquireGateLink } from "@/components/auth/EnquireGateLink";
import type { CatalogProduct, ProductAvailability } from "@/lib/types/catalog";
import { cn } from "@/lib/cn";

type ProductCardProps = {
  product: CatalogProduct;
  className?: string;
};

const AVAILABILITY_CONFIG: Record<
  ProductAvailability,
  { label: string; dot: string; pill: string }
> = {
  "In stock": {
    label: "In stock",
    dot: "bg-teal-500",
    pill: "border-teal-500/25 bg-teal-500/15 text-teal-300",
  },
  "Made to order": {
    label: "Made to order",
    dot: "bg-violet-500",
    pill: "border-violet-500/25 bg-violet-500/15 text-violet-300",
  },
  "Limited lots": {
    label: "Limited lots",
    dot: "bg-amber-500",
    pill: "border-amber-500/25 bg-amber-500/15 text-amber-300",
  },
  "Quote required": {
    label: "Quote required",
    dot: "bg-slate-400",
    pill: "border-slate-500/25 bg-slate-500/15 text-slate-400",
  },
};

const CATEGORY_ACCENTS: Record<string, { tint: string; orb: string; glow: string }> = {
  carbohydrates: {
    tint: "from-teal-950/25 via-bg-secondary to-bg-secondary",
    orb: "radial-gradient(circle at 35% 35%, rgba(153,246,228,0.85), rgba(20,184,166,0.6) 55%, rgba(15,118,110,0.4))",
    glow: "rgba(20,184,166,0.18)",
  },
  "api-impurities": {
    tint: "from-violet-950/25 via-bg-secondary to-bg-secondary",
    orb: "radial-gradient(circle at 35% 35%, rgba(196,181,253,0.85), rgba(124,58,237,0.6) 55%, rgba(91,33,182,0.4))",
    glow: "rgba(124,58,237,0.18)",
  },
  "nucleotides-linkers": {
    tint: "from-rose-950/20 via-bg-secondary to-bg-secondary",
    orb: "radial-gradient(circle at 35% 35%, rgba(253,164,175,0.85), rgba(225,29,72,0.6) 55%, rgba(159,18,57,0.4))",
    glow: "rgba(225,29,72,0.14)",
  },
  "research-intermediates": {
    tint: "from-teal-950/20 via-violet-950/10 to-bg-secondary",
    orb: "radial-gradient(circle at 35% 35%, rgba(167,243,208,0.85), rgba(20,184,166,0.5) 50%, rgba(91,33,182,0.3))",
    glow: "rgba(20,184,166,0.15)",
  },
  "protecting-groups": {
    tint: "from-violet-950/20 via-rose-950/10 to-bg-secondary",
    orb: "radial-gradient(circle at 35% 35%, rgba(196,181,253,0.8), rgba(167,139,250,0.55) 50%, rgba(124,58,237,0.35))",
    glow: "rgba(124,58,237,0.15)",
  },
};

const FALLBACK_ACCENT = {
  tint: "from-teal-950/20 via-bg-secondary to-bg-secondary",
  orb: "radial-gradient(circle at 35% 35%, rgba(153,246,228,0.85), rgba(20,184,166,0.6) 55%, rgba(15,118,110,0.4))",
  glow: "rgba(20,184,166,0.18)",
};

export function ProductCard({ product, className }: ProductCardProps) {
  const detailHref = `/products/${product.categorySlug}/${product.slug}`;
  const enquiryHref = `/contact?product=${encodeURIComponent(product.catalogNumber)}`;
  const avail = AVAILABILITY_CONFIG[product.availability] ?? AVAILABILITY_CONFIG["Quote required"];
  const accent = CATEGORY_ACCENTS[product.categorySlug] ?? FALLBACK_ACCENT;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem]",
        "border border-white/[0.08] backdrop-blur-xl",
        `bg-gradient-to-b ${accent.tint}`,
        "shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)]",
        "transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:shadow-[0_20px_48px_-16px_rgba(0,0,0,0.5)]",
        className,
      )}
    >
      {/* Ambient glow blob — top right, reacts on hover */}
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full blur-2xl opacity-40 transition-opacity duration-500 group-hover:opacity-75"
        style={{ background: `radial-gradient(circle, ${accent.glow} 0%, transparent 70%)` }}
        aria-hidden
      />

      {/* Card body */}
      <div className="relative flex flex-1 flex-col gap-5 p-6">

        {/* Header row: catalog # + availability */}
        <div className="flex items-start justify-between gap-3">
          <p className="font-mono text-[11px] font-semibold tracking-[0.18em] text-slate-500">
            {product.catalogNumber}
          </p>
          <span
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold",
              avail.pill,
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", avail.dot)} aria-hidden />
            {avail.label}
          </span>
        </div>

        {/* Product name + orb */}
        <div className="flex items-start gap-4">
          <div
            className="mt-0.5 h-9 w-9 shrink-0 rounded-full ring-2 ring-white/[0.08]"
            style={{
              background: accent.orb,
              boxShadow: "0 4px 14px -3px rgba(0,0,0,0.4), inset 0 -1px 4px rgba(0,0,0,0.06)",
            }}
            aria-hidden
          />
          <div className="min-w-0">
            <h3 className="font-display text-base font-semibold leading-snug text-white md:text-[1.05rem]">
              <Link
                href={detailHref}
                className="transition-colors duration-200 hover:text-teal-400"
              >
                {product.chemicalName}
              </Link>
            </h3>
            <p className="mt-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
              {product.categorySlug.replace(/-/g, " ")}
            </p>
          </div>
        </div>

        {/* Spec chips */}
        <dl className="grid grid-cols-3 gap-2">
          <div className="col-span-1 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">CAS</dt>
            <dd className="mt-0.5 truncate font-mono text-[11px] font-medium text-slate-100">
              {product.casNumber}
            </dd>
          </div>
          <div className="col-span-1 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">MW</dt>
            <dd className="mt-0.5 truncate font-mono text-[11px] font-medium text-slate-100">
              {product.molecularWeight}
            </dd>
          </div>
          <div className="col-span-1 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Purity</dt>
            <dd className="mt-0.5 truncate font-mono text-[11px] font-medium text-teal-400">
              {product.purity}
            </dd>
          </div>
        </dl>

        {/* Formula pill */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Formula
          </span>
          <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-0.5 font-mono text-[12px] font-medium text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            {product.molecularFormula}
          </span>
        </div>

        {/* Short description */}
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-400">
          {product.shortDescription}
        </p>
      </div>

      {/* Footer CTA strip */}
      <div className="relative flex items-center justify-between gap-3 border-t border-white/[0.06] bg-white/[0.03] px-6 py-4 backdrop-blur-sm">
        <Link
          href={detailHref}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-400 transition-all duration-200 hover:gap-2.5 hover:text-teal-300"
        >
          View details
          <span
            className="transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden
          >
            →
          </span>
        </Link>
        <EnquireGateLink
          href={enquiryHref}
          className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#14b8a6,#2dd4bf)] px-5 py-2 text-xs font-semibold text-white shadow-[0_6px_18px_-4px_rgba(45,212,191,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_26px_-6px_rgba(45,212,191,0.45)]"
        >
          Enquire
        </EnquireGateLink>
      </div>
    </article>
  );
}
