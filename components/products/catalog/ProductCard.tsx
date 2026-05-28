import Link from "next/link";
import { UserProductActions } from "@/components/commerce/UserProductActions";
import { EnquireGateLink } from "@/components/auth/EnquireGateLink";
import { StructurePlaceholder } from "@/components/products/catalog/StructurePlaceholder";
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
    catalog: "text-white/88",
    title: "text-white",
    titleLink: "hover:text-[#c8e6ff]",
    meta: "text-white/72",
    purity: "text-[#9ee7ff]",
    footerBar: "border-white/18 bg-black/30",
    actionsRow: "border-white/14",
    linkDetails: "text-[#8fd0ff] hover:text-white",
    actionsSurface: "dark" as const,
    imageRing: "ring-white/20",
  },
  {
    id: "green" as const,
    border: "border-white/28 hover:border-emerald-200/35",
    panel:
      "linear-gradient(155deg, color-mix(in srgb, var(--accent) 40%, rgba(2,10,99,0.48)) 0%, rgba(4,48,36,0.72) 52%, color-mix(in srgb, #020A63 58%, rgba(8,90,68,0.55)) 100%)",
    glow: "rgba(43, 196, 138, 0.38)",
    shadowTw:
      "shadow-[0_12px_36px_-14px_rgba(8,105,78,0.4)] hover:shadow-[0_22px_48px_-14px_rgba(8,105,78,0.48)]",
    catalog: "text-white/88",
    title: "text-white",
    titleLink: "hover:text-[#d4fff0]",
    meta: "text-white/72",
    purity: "text-[#b8ffe8]",
    footerBar: "border-white/18 bg-black/30",
    actionsRow: "border-white/14",
    linkDetails: "text-[#8cf5d0] hover:text-white",
    actionsSurface: "dark" as const,
    imageRing: "ring-white/20",
  },
  {
    id: "light" as const,
    border: "border-[#17324d]/14 hover:border-primary/28",
    panel:
      "linear-gradient(165deg, color-mix(in srgb, var(--light) 78%, var(--accent) 22%) 0%, color-mix(in srgb, var(--light) 86%, var(--primary) 14%) 100%)",
    glow: "rgba(26, 115, 232, 0.16)",
    shadowTw:
      "shadow-[0_12px_36px_-14px_rgba(23,50,77,0.2)] hover:shadow-[0_22px_48px_-16px_rgba(23,50,77,0.26)]",
    catalog: "text-[#1459b8]",
    title: "text-[#0d2137]",
    titleLink: "hover:text-primary",
    meta: "text-[#456178]",
    purity: "text-primary font-semibold",
    footerBar: "border-[#17324d]/10 bg-white/58",
    actionsRow: "border-[#17324d]/10",
    linkDetails: "text-primary hover:text-primary-deep",
    actionsSurface: "light" as const,
    imageRing: "ring-[#17324d]/12",
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
        "group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5",
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

      <Link
        href={detailHref}
        className={cn("relative block shrink-0 overflow-hidden ring-1 ring-inset", v.imageRing)}
        onClick={() =>
          void trackProductInterestClient("view_from_list", {
            slug: product.slug,
            categorySlug: product.categorySlug,
            chemicalName: product.chemicalName,
            catalogNumber: product.catalogNumber,
          })
        }
      >
        <StructurePlaceholder
          card
          imageUrl={product.imageUrl}
          imageAlt={`Structure of ${product.chemicalName}`}
        />
      </Link>

      <div className="relative flex flex-1 flex-col gap-2 p-3.5 sm:p-4">
        <p className={cn("font-mono text-[9px] font-medium tracking-[0.1em]", v.catalog)}>
          {product.catalogNumber}
        </p>

        <h3 className={cn("font-display text-base font-bold leading-snug tracking-tight", v.title)}>
          <Link href={detailHref} className={cn("line-clamp-2 transition-colors duration-200", v.titleLink)}>
            {product.chemicalName}
          </Link>
        </h3>

        <p className={cn("font-mono text-[11px]", v.meta)}>
          <span className={v.purity}>{product.purity}</span>
          <span className="mx-2 opacity-50">·</span>
          <span>{product.casNumber}</span>
        </p>
      </div>

      <div
        className={cn(
          "relative flex items-center justify-between gap-2 border-t px-3.5 py-2.5 backdrop-blur-sm sm:px-4",
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
            "inline-flex items-center gap-1 text-xs font-semibold transition-all duration-200 hover:gap-1.5",
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
          className="inline-flex items-center justify-center btn-glass btn-glass-green-light rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-all duration-200 hover:-translate-y-0.5"
        >
          Enquire
        </EnquireGateLink>
      </div>

      <div
        className={cn(
          "relative border-t px-3.5 py-2 backdrop-blur-sm sm:px-4",
          v.actionsRow,
          v.id === "light" ? "bg-white/40" : "bg-black/18",
        )}
      >
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
