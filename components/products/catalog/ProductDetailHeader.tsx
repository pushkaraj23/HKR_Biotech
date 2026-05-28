import Link from "next/link";
import { EnquireGateLink } from "@/components/auth/EnquireGateLink";
import { UserProductActions } from "@/components/commerce/UserProductActions";
import { StructurePlaceholder } from "@/components/products/catalog/StructurePlaceholder";
import { COMMERCE_STICKY_TOP } from "@/components/products/catalog/productDetailStyles";
import { glassButtonCn } from "@/lib/ui/glassButton";
import type { CatalogProduct } from "@/lib/types/catalog";
import { cn } from "@/lib/cn";

type ProductDetailHeaderProps = {
  product: CatalogProduct;
  categoryLabel: string;
  categoryHref: string;
  enquiryHref: string;
};

const PANEL_GRADIENT =
  "linear-gradient(115deg, #052066 0%, #06124a 42%, color-mix(in srgb, var(--primary) 36%, #030a40) 100%)";

function isDistinctLabel(primary: string, secondary: string | undefined): boolean {
  if (!secondary?.trim()) return false;
  return secondary.trim().toLowerCase() !== primary.trim().toLowerCase();
}

function ProductStructureImage({ product }: { product: CatalogProduct }) {
  const alt = `${product.chemicalName} structure`;

  return (
    <div className="aspect-square w-full overflow-hidden rounded-xl border-2 border-white/40 bg-white shadow-[0_12px_40px_-16px_rgba(0,0,0,0.45)] ring-1 ring-white/15">
      {product.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={product.imageUrl}
          alt={alt}
          className="h-full w-full object-cover object-center"
          loading="eager"
        />
      ) : (
        <StructurePlaceholder
          detail
          imageAlt={alt}
          className="h-full min-h-0 rounded-none border-0 bg-white shadow-none"
        />
      )}
    </div>
  );
}

export function ProductDetailHeader({
  product,
  categoryLabel,
  categoryHref,
  enquiryHref,
}: ProductDetailHeaderProps) {
  const specRows = [
    { label: "Catalog No.", value: product.catalogNumber },
    { label: "CAS No.", value: product.casNumber },
    { label: "Mol. formula", value: product.molecularFormula },
    { label: "Mol. weight", value: product.molecularWeight },
    { label: "Purity", value: product.purity },
    { label: "Availability", value: product.availability },
    ...(product.solubility ? [{ label: "Solubility", value: product.solubility }] : []),
    ...(isDistinctLabel(product.chemicalName, product.alternativeName)
      ? [{ label: "Alt. name", value: product.alternativeName! }]
      : []),
  ].filter((row) => row.value && row.value !== "—");

  return (
    <header className="space-y-5 sm:space-y-6">
      <div className="hidden flex-wrap items-center gap-2 md:flex">
        <Link
          href={categoryHref}
          className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-on-dark backdrop-blur-sm transition hover:border-white/40 hover:bg-white/16"
        >
          {categoryLabel}
        </Link>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-on-dark/70">
          Catalogue · {product.catalogNumber}
        </span>
      </div>

      <div className="space-y-3 border-b border-white/12 pb-5 sm:pb-6">
        <div className="flex items-start justify-between gap-4">
          <h1 className="min-w-0 flex-1 font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-on-dark sm:text-4xl md:text-[2.65rem]">
            {product.chemicalName}
          </h1>
          <UserProductActions
            showCart={false}
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

        {isDistinctLabel(product.chemicalName, product.alternativeName) ? (
          <p className="text-lg font-medium text-on-dark/88 md:text-xl">{product.alternativeName}</p>
        ) : null}

        {product.shortDescription ? (
          <p className="max-w-4xl text-base leading-relaxed text-on-dark/82 md:text-lg">
            {product.shortDescription}
          </p>
        ) : null}
      </div>

      <div className="grid gap-5 lg:grid-cols-2 lg:items-start lg:gap-6 xl:gap-8">
        <div className={cn("w-full lg:sticky lg:z-10 lg:self-start", COMMERCE_STICKY_TOP)}>
          <ProductStructureImage product={product} />
        </div>

        <div
          className="relative flex min-h-0 flex-col overflow-hidden rounded-[1.75rem] border border-white/28 py-5 shadow-[0_18px_48px_-14px_rgba(2,10,99,0.55)] sm:py-6"
          style={{ background: PANEL_GRADIENT }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-1.5 w-full"
            style={{
              background: "linear-gradient(90deg, #1a73e8 0%, #1459b8 40%, #2bc48a 100%)",
            }}
            aria-hidden
          />

          <dl className="relative flex-1 divide-y divide-white/12">
            {specRows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[minmax(0,38%)_1fr] items-baseline gap-3 px-5 py-3.5 sm:px-6 sm:py-4"
              >
                <dt className="text-sm font-semibold text-[#8fd0ff]">{row.label}</dt>
                <dd className="font-mono text-sm font-medium leading-snug text-on-dark sm:text-base">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="relative flex flex-col gap-3 border-t border-white/12 bg-black/12 px-5 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:px-6 sm:py-5">
            <EnquireGateLink
              href={enquiryHref}
              className={glassButtonCn("blue", "dark", "rounded-full px-7 py-3 text-sm sm:text-base")}
            >
              Request quotation
            </EnquireGateLink>
            <EnquireGateLink
              href={enquiryHref}
              className={glassButtonCn("green", "dark", "rounded-full px-7 py-3 text-sm sm:text-base")}
            >
              Enquire now
            </EnquireGateLink>
            <a
              href="#ordering"
              className={cn(
                glassButtonCn("white", "dark", "rounded-full px-7 py-3 text-sm sm:text-center sm:text-base"),
              )}
            >
              Pack sizes
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
