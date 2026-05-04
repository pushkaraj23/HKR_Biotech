import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllProducts,
  getCategoryBySlug,
  getProductBySlug,
  getRelatedProductsOrFallback,
  isValidCategorySlug,
} from "@/data/catalog";
import { Breadcrumbs } from "@/components/products/catalog/Breadcrumbs";
import { ProductHero } from "@/components/products/catalog/ProductHero";
import { StructurePlaceholder } from "@/components/products/catalog/StructurePlaceholder";
import { ProductSpecsTable } from "@/components/products/catalog/ProductSpecsTable";
import { RelatedProducts } from "@/components/products/catalog/RelatedProducts";
import { ProductStickyEnquiry } from "@/components/products/catalog/ProductStickyEnquiry";
import { ContactForm } from "@/components/forms/ContactForm";
import { UserProductActions } from "@/components/commerce/UserProductActions";
import { ProductInterestTracker } from "@/components/analytics/ProductInterestTracker";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export const revalidate = 60;

export const dynamicParams = true;

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({
    category: p.categorySlug,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categoryParam, slug } = await params;
  const p =
    (await isValidCategorySlug(categoryParam)) ? await getProductBySlug(categoryParam, slug) : undefined;
  if (!p) return { title: "Product" };
  return { title: p.chemicalName, description: p.shortDescription };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { category: categoryParam, slug } = await params;
  if (!(await isValidCategorySlug(categoryParam))) notFound();

  const product = await getProductBySlug(categoryParam, slug);
  if (!product) notFound();

  const categoryMeta = await getCategoryBySlug(categoryParam);
  if (!categoryMeta) notFound();

  const related = await getRelatedProductsOrFallback(product, 3);

  const crumbs = [
    { label: "Products", href: "/products" },
    { label: categoryMeta.name, href: `/products/${categoryParam}` },
    { label: product.chemicalName },
  ];

  return (
    <div className="relative overflow-x-hidden bg-[#020A63] pb-28">
      <PageAmbientGraphics variant="right" opacity="opacity-[0.12]" />
      <ProductInterestTracker
        slug={product.slug}
        categorySlug={product.categorySlug}
        chemicalName={product.chemicalName}
        catalogNumber={product.catalogNumber}
      />
      <ProductStickyEnquiry product={product} />

      <div className="relative z-10 mx-auto max-w-6xl space-y-10 px-4 pt-6 sm:px-6 md:space-y-12 lg:px-8">
        <Breadcrumbs items={crumbs} />

        <ProductHero product={product} categoryLabel={categoryMeta.name} />

        {/* Overview — light mint band (matches family characteristic “light” card) */}
        <RevealOnScroll>
          <section
            aria-labelledby="overview-heading"
            className="rounded-[1.75rem] border border-[#17324d]/12 p-7 shadow-[0_14px_36px_-14px_rgba(23,50,77,0.14)] backdrop-blur-sm md:p-9"
            style={{
              background: "linear-gradient(165deg, #e8f4ef 0%, #ffffff 52%, color-mix(in srgb, var(--light) 92%, var(--primary) 8%) 100%)",
            }}
          >
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1459b8]">
              Overview
            </p>
            <h2
              id="overview-heading"
              className="mt-1 font-display text-xl font-semibold text-[#0d2137]"
            >
              Product overview
            </h2>
            <p className="mt-4 max-w-4xl text-base leading-relaxed text-[#234a62]">
              {product.detailedDescription}
            </p>
          </section>
        </RevealOnScroll>

        {/* Specs & Structure — deep blue panel + light inset table */}
        <RevealOnScroll>
          <section
            aria-labelledby="specs-heading"
            className="relative overflow-hidden rounded-[1.75rem] border border-white/28 p-7 shadow-[0_18px_44px_-16px_rgba(2,10,99,0.55)] backdrop-blur-xl md:p-9"
            style={{
              background: [
                "linear-gradient(135deg,",
                "color-mix(in srgb, var(--surface) 68%, #020A63 32%) 0%,",
                "color-mix(in srgb, var(--primary) 36%, #041238 64%) 48%,",
                "color-mix(in srgb, var(--surface) 58%, #01084e 42%) 100%)",
              ].join(" "),
            }}
          >
            <div
              className="pointer-events-none absolute -right-12 top-0 h-40 w-40 rounded-full opacity-40 blur-3xl"
              style={{
                background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 35%, transparent), transparent 70%)",
              }}
              aria-hidden
            />
            <div className="relative">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-primary-mid">
                Technical data
              </p>
              <h2
                id="specs-heading"
                className="mt-1 font-display text-xl font-semibold text-on-dark"
              >
                Specifications & Structure
              </h2>
              <div className="mt-6 grid gap-8 md:grid-cols-2 md:items-start">
                <div>
                  <StructurePlaceholder imageUrl={product.imageUrl} imageAlt={`${product.chemicalName} structure`} />
                  <p className="mt-3 font-mono text-sm text-on-dark/85">
                    {product.molecularFormula}
                  </p>
                  <p className="mt-1 text-xs text-on-dark/72">
                    Representative — supply .mol / .cdx with PO if required.
                  </p>
                  <UserProductActions
                    className="mt-4"
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
                <ProductSpecsTable product={product} variant="insetLight" />
              </div>
            </div>
          </section>
        </RevealOnScroll>

        {/* Applications + Supply side-by-side on desktop */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Applications */}
          <RevealOnScroll>
            <section
              aria-labelledby="applications-heading"
              className="h-full rounded-[1.75rem] border border-white/30 p-7 text-white shadow-[0_14px_36px_-12px_rgba(8,105,78,0.45),0_0_40px_-14px_rgba(43,196,138,0.25)] backdrop-blur-sm"
              style={{
                background:
                  "linear-gradient(155deg, #157a5c 0%, #22a884 40%, color-mix(in srgb, var(--accent) 88%, #064d3a 12%) 100%)",
              }}
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-white/80">
                Use cases
              </p>
              <h2
                id="applications-heading"
                className="mt-1 font-display text-xl font-semibold text-white"
              >
                Applications
              </h2>
              <ul className="mt-5 space-y-2.5">
                {product.applications.map((a) => (
                  <li key={a} className="flex gap-3 text-sm leading-relaxed text-white/92">
                    <span
                      className="mt-2 h-1.5 w-4 shrink-0 rounded-full bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.45)]"
                      aria-hidden
                    />
                    {a}
                  </li>
                ))}
              </ul>
            </section>
          </RevealOnScroll>

          {/* Supply & Storage */}
          <RevealOnScroll delay={60}>
            <section
              aria-labelledby="supply-heading"
              className="h-full rounded-[1.75rem] border border-white/45 p-7 shadow-[0_14px_36px_-14px_rgba(26,115,232,0.18)] backdrop-blur-md"
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 0%, color-mix(in srgb, var(--light) 88%, var(--primary) 12%) 45%, color-mix(in srgb, #e8f4ef 70%, var(--accent) 30%) 100%)",
              }}
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1459b8]">
                Supply & handling
              </p>
              <h2
                id="supply-heading"
                className="mt-1 font-display text-xl font-semibold text-[#0d2137]"
              >
                Packaging & Storage
              </h2>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#4f6478]">
                  Pack sizes
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {product.packSizes.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-primary/22 bg-white/95 px-4 py-1.5 text-sm font-medium text-[#0d2137] shadow-sm"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 border-t border-[#17324d]/10 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#4f6478]">
                  Storage conditions
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#234a62]">
                  {product.storageConditions}
                </p>
              </div>

              <div className="mt-5 border-t border-[#17324d]/10 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#4f6478]">
                  Documents
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#234a62]">
                  <li className="flex items-center gap-2">
                    <span className={product.coaAvailable ? "text-primary" : "text-[#567089]"} aria-hidden>
                      {product.coaAvailable ? "✓" : "—"}
                    </span>
                    COA — {product.coaAvailable ? "on release" : "on request"}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className={product.sdsAvailable ? "text-primary" : "text-[#567089]"} aria-hidden>
                      {product.sdsAvailable ? "✓" : "—"}
                    </span>
                    SDS — {product.sdsAvailable ? "available" : "on request"}
                  </li>
                  {product.datasheetUrl && (
                    <li className="flex items-center gap-2">
                      <span className="text-primary" aria-hidden>↓</span>
                      <Link href={product.datasheetUrl} className="font-medium text-[#1459b8] hover:text-primary hover:underline">
                        Technical summary (PDF)
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </section>
          </RevealOnScroll>
        </div>

        {/* Related products */}
        <RevealOnScroll>
          <RelatedProducts products={related} />
        </RevealOnScroll>

        {/* Enquiry — single green-glass surface (header + form) */}
        <RevealOnScroll>
          <section
            id="enquiry-form"
            aria-labelledby="enquiry-heading"
            className="scroll-mt-28 relative overflow-hidden rounded-[1.75rem] border border-white/35 shadow-[0_20px_48px_-18px_rgba(2,10,99,0.45)] backdrop-blur-md"
          >
            {/* Unified fill: green wash over navy */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: [
                  "linear-gradient(165deg,",
                  "color-mix(in srgb, var(--accent) 52%, transparent) 0%,",
                  "color-mix(in srgb, var(--accent) 28%, #020A63) 38%,",
                  "rgba(2, 10, 99, 0.78) 100%)",
                ].join(" "),
                opacity: 0.82,
              }}
              aria-hidden
            />
            {/* Top-right glow (whole section) */}
            <div
              className="pointer-events-none absolute -right-28 -top-36 h-[24rem] w-[24rem] rounded-full opacity-[0.52] blur-3xl sm:h-[28rem] sm:w-[28rem]"
              style={{
                background:
                  "radial-gradient(circle at 72% 26%, rgba(180, 255, 220, 0.78) 0%, color-mix(in srgb, var(--accent) 45%, transparent) 38%, transparent 62%)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,10,99,0.14)_100%)]"
              aria-hidden
            />

            <div className="relative z-10 px-7 py-8 sm:px-10 sm:py-10">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-100/90">
                Get in touch
              </p>
              <h2
                id="enquiry-heading"
                className="mt-2 font-display text-2xl font-bold tracking-tight text-on-dark md:text-3xl"
              >
                Enquire about this product
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-on-dark/88 md:text-base">
                Include quantity, purity requirements, and timeline — the product reference is pre-filled for you.
              </p>
              <ContactForm
                className="mt-8"
                tone="brandGreen"
                defaultProductRef={product.catalogNumber}
                enquirySource={`product:${product.slug}`}
              />
            </div>
          </section>
        </RevealOnScroll>
      </div>
    </div>
  );
}
