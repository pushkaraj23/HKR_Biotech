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
    pill: "border-primary/25 bg-primary/15 text-primary-mid",
  },
  "Made to order": {
    label: "Made to order",
    dot: "bg-accent",
    pill: "border-accent/25 bg-accent/15 text-accent/90",
  },
  "Limited lots": {
    label: "Limited lots",
    dot: "bg-warning",
    pill: "border-warning/25 bg-warning/15 text-warning",
  },
  "Quote required": {
    label: "Quote required",
    dot: "bg-caption-foreground",
    pill: "border-border-strong/40 bg-muted/40 text-muted-foreground",
  },
};

const CATEGORY_ACCENTS: Record<
  string,
  { tint: string; orb: string; glow: string }
> = {
  carbohydrates: {
    tint: "from-tint-primary/25 via-surface to-surface",
    orb: "var(--product-orb-carbohydrates)",
    glow: "var(--product-glow-blob-carbohydrates)",
  },
  "api-impurities": {
    tint: "from-tint-accent/25 via-surface to-surface",
    orb: "var(--product-orb-api-impurities)",
    glow: "var(--product-glow-blob-api-impurities)",
  },
  "nucleotides-linkers": {
    tint: "from-tint-danger/20 via-surface to-surface",
    orb: "var(--product-orb-nucleotides)",
    glow: "var(--product-glow-blob-nucleotides)",
  },
  "research-intermediates": {
    tint: "from-tint-primary/20 via-tint-accent/10 to-surface",
    orb: "var(--product-orb-research)",
    glow: "var(--product-glow-blob-research)",
  },
  "protecting-groups": {
    tint: "from-tint-accent/20 via-tint-danger/10 to-surface",
    orb: "var(--product-orb-protecting)",
    glow: "var(--product-glow-blob-protecting)",
  },
};

const FALLBACK_ACCENT = {
  tint: "from-tint-primary/20 via-surface to-surface",
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
        "border border-overlay backdrop-blur-xl",
        `bg-gradient-to-b ${accent.tint}`,
        "shadow-elevated-md",
        "transition-all duration-300 hover:-translate-y-1 hover:border-overlay-hover hover:shadow-elevated-lg",
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
          <p className="font-mono text-[11px] font-semibold tracking-[0.18em] text-caption-foreground">
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
            <p className="mt-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-caption-foreground">
              {product.categorySlug.replace(/-/g, " ")}
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-3 gap-2">
          <div className="col-span-1 rounded-xl border border-overlay bg-on-dark/[0.04] px-3 py-2 shadow-[inset_0_1px_0_var(--overlay-hover)]">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-caption-foreground">CAS</dt>
            <dd className="mt-0.5 truncate font-mono text-[11px] font-medium text-foreground/95">
              {product.casNumber}
            </dd>
          </div>
          <div className="col-span-1 rounded-xl border border-overlay bg-on-dark/[0.04] px-3 py-2 shadow-[inset_0_1px_0_var(--overlay-hover)]">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-caption-foreground">MW</dt>
            <dd className="mt-0.5 truncate font-mono text-[11px] font-medium text-foreground/95">
              {product.molecularWeight}
            </dd>
          </div>
          <div className="col-span-1 rounded-xl border border-overlay bg-on-dark/[0.04] px-3 py-2 shadow-[inset_0_1px_0_var(--overlay-hover)]">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-caption-foreground">Purity</dt>
            <dd className="mt-0.5 truncate font-mono text-[11px] font-medium text-primary">
              {product.purity}
            </dd>
          </div>
        </dl>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-caption-foreground">
            Formula
          </span>
          <span className="rounded-full border border-overlay bg-on-dark/[0.04] px-3 py-0.5 font-mono text-[12px] font-medium text-muted-foreground shadow-[inset_0_1px_0_var(--overlay-hover)]">
            {product.molecularFormula}
          </span>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{product.shortDescription}</p>
      </div>

      <div className="relative flex items-center justify-between gap-3 border-t border-overlay bg-on-dark/[0.03] px-6 py-4 backdrop-blur-sm">
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
