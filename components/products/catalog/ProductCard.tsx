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
    dot: "bg-primary",
    pill: "border-primary/40 bg-primary/18 text-primary-mid",
  },
  "Made to order": {
    label: "Made to order",
    dot: "bg-accent",
    pill: "border-accent/35 bg-accent/18 text-on-dark",
  },
  "Limited lots": {
    label: "Limited lots",
    dot: "bg-warning",
    pill: "border-warning/35 bg-warning/18 text-warning",
  },
  "Quote required": {
    label: "Quote required",
    dot: "bg-caption-foreground",
    pill: "border-on-dark/30 bg-[rgba(18,25,35,0.5)] text-on-dark/75",
  },
};

const CATEGORY_ACCENTS: Record<
  string,
  { tint: string; orb: string; glow: string }
> = {
  carbohydrates: {
    tint: "from-[rgba(44,59,77,0.42)] via-[rgba(27,38,50,0.58)] to-[rgba(18,25,35,0.68)]",
    orb: "var(--product-orb-carbohydrates)",
    glow: "var(--product-glow-blob-carbohydrates)",
  },
  "api-impurities": {
    tint: "from-[rgba(74,93,114,0.4)] via-[rgba(27,38,50,0.58)] to-[rgba(18,25,35,0.68)]",
    orb: "var(--product-orb-api-impurities)",
    glow: "var(--product-glow-blob-api-impurities)",
  },
  "nucleotides-linkers": {
    tint: "from-[rgba(163,81,57,0.32)] via-[rgba(27,38,50,0.58)] to-[rgba(18,25,35,0.68)]",
    orb: "var(--product-orb-nucleotides)",
    glow: "var(--product-glow-blob-nucleotides)",
  },
  "research-intermediates": {
    tint: "from-[rgba(44,59,77,0.36)] via-[rgba(74,93,114,0.28)] to-[rgba(18,25,35,0.68)]",
    orb: "var(--product-orb-research)",
    glow: "var(--product-glow-blob-research)",
  },
  "protecting-groups": {
    tint: "from-[rgba(74,93,114,0.34)] via-[rgba(163,81,57,0.22)] to-[rgba(18,25,35,0.68)]",
    orb: "var(--product-orb-protecting)",
    glow: "var(--product-glow-blob-protecting)",
  },
};

const FALLBACK_ACCENT = {
  tint: "from-[rgba(44,59,77,0.36)] via-[rgba(27,38,50,0.58)] to-[rgba(18,25,35,0.68)]",
  orb: "var(--product-orb-fallback)",
  glow: "var(--product-glow-blob-fallback)",
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
        "border border-on-dark/20 backdrop-blur-xl",
        `bg-gradient-to-b ${accent.tint}`,
        "shadow-[0_10px_30px_-14px_rgba(18,25,35,0.7)]",
        "transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_46px_-16px_rgba(18,25,35,0.78)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full blur-2xl opacity-40 transition-opacity duration-500 group-hover:opacity-75"
        style={{ background: `radial-gradient(circle, ${accent.glow} 0%, transparent 70%)` }}
        aria-hidden
      />

      <div className="relative flex flex-1 flex-col gap-5 p-6">
        <div className="flex items-start justify-between gap-3">
          <p className="font-mono text-[11px] font-semibold tracking-[0.18em] text-on-dark/72">
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

        <div className="flex items-start gap-4">
          <div
            className="mt-0.5 h-9 w-9 shrink-0 rounded-full ring-2 ring-overlay"
            style={{
              background: accent.orb,
              boxShadow: "var(--shadow-elevated-sm)",
            }}
            aria-hidden
          />
          <div className="min-w-0">
            <h3 className="font-display text-base font-semibold leading-snug text-on-dark md:text-[1.05rem]">
              <Link href={detailHref} className="transition-colors duration-200 hover:text-primary">
                {product.chemicalName}
              </Link>
            </h3>
            <p className="mt-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-on-dark/68">
              {product.categorySlug.replace(/-/g, " ")}
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-3 gap-2">
          <div className="col-span-1 rounded-xl border border-on-dark/18 bg-[rgba(18,25,35,0.45)] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-on-dark/65">CAS</dt>
            <dd className="mt-0.5 truncate font-mono text-[11px] font-medium text-on-dark">
              {product.casNumber}
            </dd>
          </div>
          <div className="col-span-1 rounded-xl border border-on-dark/18 bg-[rgba(18,25,35,0.45)] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-on-dark/65">MW</dt>
            <dd className="mt-0.5 truncate font-mono text-[11px] font-medium text-on-dark">
              {product.molecularWeight}
            </dd>
          </div>
          <div className="col-span-1 rounded-xl border border-on-dark/18 bg-[rgba(18,25,35,0.45)] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-on-dark/65">Purity</dt>
            <dd className="mt-0.5 truncate font-mono text-[11px] font-medium text-primary">
              {product.purity}
            </dd>
          </div>
        </dl>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-on-dark/65">
            Formula
          </span>
          <span className="rounded-full border border-on-dark/18 bg-[rgba(18,25,35,0.45)] px-3 py-0.5 font-mono text-[12px] font-medium text-on-dark/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            {product.molecularFormula}
          </span>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-on-dark/78">{product.shortDescription}</p>
      </div>

      <div className="relative flex items-center justify-between gap-3 border-t border-on-dark/18 bg-[rgba(18,25,35,0.42)] px-6 py-4 backdrop-blur-sm">
        <Link
          href={detailHref}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all duration-200 hover:gap-2.5 hover:text-primary-mid"
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
          className="inline-flex items-center justify-center rounded-full bg-cta-gradient px-5 py-2 text-xs font-semibold text-primary-foreground shadow-primary-glow transition-all duration-200 hover:-translate-y-0.5 hover:shadow-primary-glow-lg"
        >
          Enquire
        </EnquireGateLink>
      </div>
    </article>
  );
}
