import Link from "next/link";
import { UserProductActions } from "@/components/commerce/UserProductActions";
import { EnquireGateLink } from "@/components/auth/EnquireGateLink";
import { trackProductInterestClient } from "@/lib/analytics/track-product-interest";
import type { CatalogProduct } from "@/lib/types/catalog";
import { cn } from "@/lib/cn";

type ProductCardProps = {
  product: CatalogProduct;
  className?: string;
};

/** Glass cards: blue, green, light — cycle by slug for variety (aligned with category cards). */
const CARD_VARIANTS = [
  {
    id: "blue" as const,
    border: "border-white/28 hover:border-white/45",
    panel:
      "linear-gradient(155deg, color-mix(in srgb, var(--primary) 44%, rgba(2,10,99,0.42)) 0%, rgba(2,10,99,0.68) 48%, color-mix(in srgb, var(--primary-deep) 52%, rgba(2,10,99,0.75)) 100%)",
    glow: "rgba(26, 115, 232, 0.42)",
    shadowTw:
      "shadow-[0_12px_36px_-14px_rgba(13,71,161,0.42)] hover:shadow-[0_22px_48px_-14px_rgba(13,71,161,0.5)]",
    orb: "radial-gradient(circle at 32% 32%, rgba(255,255,255,0.9), color-mix(in srgb, var(--primary) 48%, transparent) 54%, transparent)",
    orbRing: "ring-white/38",
    orbShadow: "0 4px 16px rgba(0,40,90,0.25), inset 0 1px 0 rgba(255,255,255,0.45)",
    catalog: "text-white/88",
    title: "text-white",
    titleLink: "hover:text-[#c8e6ff]",
    category: "text-white/74",
    specBox: "border-white/22 bg-black/32",
    specLabel: "text-white/68",
    specValue: "text-white",
    purity: "text-[#9ee7ff]",
    formulaPill: "border-white/22 bg-black/30 text-white/92",
    footerBar: "border-white/18 bg-black/30",
    actionsRow: "border-white/14",
    linkDetails: "text-[#8fd0ff] hover:text-white",
    actionsSurface: "dark" as const,
  },
  {
    id: "green" as const,
    border: "border-white/28 hover:border-emerald-200/35",
    panel:
      "linear-gradient(155deg, color-mix(in srgb, var(--accent) 40%, rgba(2,10,99,0.48)) 0%, rgba(4,48,36,0.72) 52%, color-mix(in srgb, #020A63 58%, rgba(8,90,68,0.55)) 100%)",
    glow: "rgba(43, 196, 138, 0.38)",
    shadowTw:
      "shadow-[0_12px_36px_-14px_rgba(8,105,78,0.4)] hover:shadow-[0_22px_48px_-14px_rgba(8,105,78,0.48)]",
    orb: "radial-gradient(circle at 32% 32%, rgba(255,255,255,0.92), color-mix(in srgb, var(--accent) 52%, transparent) 56%, transparent)",
    orbRing: "ring-white/40",
    orbShadow: "0 4px 16px rgba(0,60,45,0.28), inset 0 1px 0 rgba(255,255,255,0.42)",
    catalog: "text-white/88",
    title: "text-white",
    titleLink: "hover:text-[#d4fff0]",
    category: "text-white/74",
    specBox: "border-white/22 bg-black/32",
    specLabel: "text-white/68",
    specValue: "text-white",
    purity: "text-[#b8ffe8]",
    formulaPill: "border-white/22 bg-black/30 text-white/92",
    footerBar: "border-white/18 bg-black/30",
    actionsRow: "border-white/14",
    linkDetails: "text-[#8cf5d0] hover:text-white",
    actionsSurface: "dark" as const,
  },
  {
    id: "light" as const,
    border: "border-[#17324d]/14 hover:border-primary/28",
    panel:
      "linear-gradient(165deg, color-mix(in srgb, var(--light) 78%, var(--accent) 22%) 0%, color-mix(in srgb, var(--light) 86%, var(--primary) 14%) 100%)",
    glow: "rgba(26, 115, 232, 0.16)",
    shadowTw:
      "shadow-[0_12px_36px_-14px_rgba(23,50,77,0.2)] hover:shadow-[0_22px_48px_-16px_rgba(23,50,77,0.26)]",
    orb: "radial-gradient(circle at 32% 32%, rgba(255,255,255,0.98), color-mix(in srgb, var(--accent) 38%, white) 52%, color-mix(in srgb, var(--primary) 22%, white) 100%)",
    orbRing: "ring-[#17324d]/14",
    orbShadow: "0 4px 14px rgba(23,50,77,0.12), inset 0 1px 0 rgba(255,255,255,0.85)",
    catalog: "text-[#1459b8]",
    title: "text-[#0d2137]",
    titleLink: "hover:text-primary",
    category: "text-[#234a62]",
    specBox: "border-[#17324d]/12 bg-white/72",
    specLabel: "text-[#4f6478]",
    specValue: "text-[#0d2137]",
    purity: "text-primary font-semibold",
    formulaPill: "border-[#17324d]/12 bg-white/82 text-[#17324d]",
    footerBar: "border-[#17324d]/10 bg-white/58",
    actionsRow: "border-[#17324d]/10",
    linkDetails: "text-primary hover:text-primary-deep",
    actionsSurface: "light" as const,
  },
] as const;

function variantIndexForSlug(slug: string): number {
  return Math.abs(slug.charCodeAt(0) + slug.charCodeAt(Math.max(0, slug.length - 1))) % CARD_VARIANTS.length;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const detailHref = `/products/${product.categorySlug}/${product.slug}`;
  const enquiryHref = `/contact?product=${encodeURIComponent(product.catalogNumber)}`;
  const v = CARD_VARIANTS[variantIndexForSlug(product.slug)];

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1",
        v.border,
        v.shadowTw,
        className,
      )}
      style={{ background: v.panel }}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl opacity-50 transition-opacity duration-500 group-hover:opacity-80"
        style={{ background: `radial-gradient(circle, ${v.glow} 0%, transparent 70%)` }}
        aria-hidden
      />

      <div className="relative flex flex-1 flex-col gap-4 p-6">
        <p className={cn("font-mono text-[10px] font-medium tracking-[0.12em] text-white/70", v.catalog)}>
          {product.catalogNumber}
        </p>

        <div className="flex items-start gap-4">
          <div
            className={cn("mt-1 h-8 w-8 shrink-0 rounded-full ring-2", v.orbRing)}
            style={{
              background: v.orb,
              boxShadow: v.orbShadow,
            }}
            aria-hidden
          />
          <div className="min-w-0">
            <h3
              className={cn(
                "font-display text-xl font-bold leading-snug tracking-tight md:text-2xl md:leading-snug",
                v.title,
              )}
            >
              <Link href={detailHref} className={cn("transition-colors duration-200", v.titleLink)}>
                {product.chemicalName}
              </Link>
            </h3>
            <p className={cn("mt-1.5 text-xs font-medium capitalize tracking-wide", v.category)}>
              {product.categorySlug.replace(/-/g, " ")}
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-3 gap-2">
          <div
            className={cn(
              "col-span-1 rounded-xl px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
              v.specBox,
            )}
          >
            <dt className={cn("text-[10px] font-semibold uppercase tracking-[0.16em]", v.specLabel)}>CAS</dt>
            <dd className={cn("mt-0.5 truncate font-mono text-xs font-medium", v.specValue)}>{product.casNumber}</dd>
          </div>
          <div
            className={cn(
              "col-span-1 rounded-xl px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
              v.specBox,
            )}
          >
            <dt className={cn("text-[10px] font-semibold uppercase tracking-[0.16em]", v.specLabel)}>MW</dt>
            <dd className={cn("mt-0.5 truncate font-mono text-xs font-medium", v.specValue)}>
              {product.molecularWeight}
            </dd>
          </div>
          <div
            className={cn(
              "col-span-1 rounded-xl px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
              v.specBox,
            )}
          >
            <dt className={cn("text-[10px] font-semibold uppercase tracking-[0.16em]", v.specLabel)}>Purity</dt>
            <dd className={cn("mt-0.5 truncate font-mono text-xs", v.purity)}>{product.purity}</dd>
          </div>
        </dl>

        <div className="flex items-center gap-2">
          <span className={cn("text-[10px] font-semibold uppercase tracking-[0.14em]", v.specLabel)}>Formula</span>
          <span
            className={cn(
              "rounded-full px-3 py-0.5 font-mono text-[12px] font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
              v.formulaPill,
            )}
          >
            {product.molecularFormula}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "relative flex items-center justify-between gap-3 border-t px-6 py-4 backdrop-blur-sm",
          v.footerBar,
        )}
      >
        <Link
          href={detailHref}
          onClick={() =>
            void trackProductInterestClient("view_from_list", {
              slug: product.slug,
              categorySlug: product.categorySlug,
              chemicalName: product.chemicalName,
              catalogNumber: product.catalogNumber,
            })
          }
          className={cn(
            "inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 hover:gap-2.5",
            v.linkDetails,
          )}
        >
          Details
          <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
            →
          </span>
        </Link>
        <EnquireGateLink
          href={enquiryHref}
          className="inline-flex items-center justify-center btn-glass btn-glass-green-light rounded-full px-5 py-2 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
        >
          Enquire
        </EnquireGateLink>
      </div>
      <div className={cn("relative border-t px-6 py-3 backdrop-blur-sm", v.actionsRow, v.id === "light" ? "bg-white/40" : "bg-black/18")}>
        <UserProductActions
          compact
          surface={v.actionsSurface}
          product={{
            slug: product.slug,
            catalogNumber: product.catalogNumber,
            categorySlug: product.categorySlug,
            chemicalName: product.chemicalName,
            shortDescription: product.shortDescription,
            purity: product.purity,
            availability: product.availability,
            imageUrl: product.imageUrl,
          }}
        />
      </div>
    </article>
  );
}
