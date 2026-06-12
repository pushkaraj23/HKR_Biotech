import Link from "next/link";
import { UserProductActions } from "@/components/commerce/UserProductActions";
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

      <div className="relative flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-col gap-1.5">
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

        <Link
          href={detailHref}
          className={cn("block shrink-0 overflow-hidden rounded-xl ring-1 ring-inset", v.imageRing)}
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

        <div className="mt-auto">
          <UserProductActions
            compact
            surface={v.actionsSurface}
            enquireHref={enquiryHref}
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
      </div>
    </article>
  );
}
