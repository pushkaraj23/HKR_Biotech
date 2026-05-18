import Link from "next/link";
import { EnquireGateLink } from "@/components/auth/EnquireGateLink";
import { UserProductActions } from "@/components/commerce/UserProductActions";
import { StructurePlaceholder } from "@/components/products/catalog/StructurePlaceholder";
import { glassButtonCn } from "@/lib/ui/glassButton";
import type { CatalogProduct } from "@/lib/types/catalog";
import { cn } from "@/lib/cn";

type ProductDetailHeaderProps = {
  product: CatalogProduct;
  categoryLabel: string;
  categoryHref: string;
  enquiryHref: string;
};

export function ProductDetailHeader({
  product,
  categoryLabel,
  categoryHref,
  enquiryHref,
}: ProductDetailHeaderProps) {
  const chips = [
    { label: "Catalog", value: product.catalogNumber },
    { label: "CAS", value: product.casNumber },
    { label: "Purity", value: product.purity },
    { label: "Availability", value: product.availability },
  ].filter((c) => c.value && c.value !== "—");

  return (
    <header
      className="relative min-h-[260px] overflow-hidden rounded-[1.75rem] border border-white/28 shadow-[0_18px_48px_-14px_rgba(2,10,99,0.55)] sm:min-h-[300px]"
      style={{
        background:
          "linear-gradient(115deg, #052066 0%, #06124a 42%, color-mix(in srgb, var(--primary) 36%, #030a40) 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1.5 w-full"
        style={{
          background: "linear-gradient(90deg, #1a73e8 0%, #1459b8 40%, #2bc48a 100%)",
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-50 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(43,196,138,0.22), transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(26,115,232,0.25), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative grid gap-8 px-7 py-10 sm:px-10 sm:py-12 md:grid-cols-[minmax(0,1fr)_minmax(200px,280px)] md:items-center md:gap-10 lg:px-12 lg:py-14">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
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

          <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-on-dark sm:text-4xl md:text-5xl">
            {product.chemicalName}
          </h1>

          {product.alternativeName ? (
            <p className="mt-3 text-lg font-medium text-on-dark/88 md:text-xl">{product.alternativeName}</p>
          ) : null}

          {product.shortDescription ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-on-dark/82 md:text-lg">
              {product.shortDescription}
            </p>
          ) : null}

          {chips.length > 0 ? (
            <dl className="mt-7 flex flex-wrap gap-2.5">
              {chips.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 backdrop-blur-md"
                >
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-on-dark/72">
                    {item.label}
                  </dt>
                  <dd className="font-mono text-base font-medium text-on-dark">{item.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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
            <EnquireGateLink
              href={enquiryHref}
              className={glassButtonCn("blue", "dark", "rounded-full px-9 py-3.5 text-base")}
            >
              Request quotation
            </EnquireGateLink>
            <EnquireGateLink
              href={enquiryHref}
              className={glassButtonCn("green", "dark", "rounded-full px-9 py-3.5 text-base")}
            >
              Enquire now
            </EnquireGateLink>
            <a
              href="#ordering"
              className={cn(glassButtonCn("white", "dark", "rounded-full px-9 py-3.5 text-base"), "text-center")}
            >
              Pack sizes
            </a>
          </div>
        </div>

        <aside className="mx-auto w-full max-w-[280px] md:mx-0 md:max-w-none md:justify-self-end">
          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md">
            <StructurePlaceholder
              imageUrl={product.imageUrl}
              imageAlt={`${product.chemicalName} structure`}
              className="aspect-square max-w-none rounded-xl border-0 bg-transparent"
            />
          </div>
          <p className="mt-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-on-dark/65">
            Representative structure
          </p>
        </aside>
      </div>
    </header>
  );
}
