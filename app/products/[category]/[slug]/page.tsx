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
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export const dynamicParams = true;

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({
    category: p.categorySlug,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categoryParam, slug } = await params;
  const p = isValidCategorySlug(categoryParam)
    ? getProductBySlug(categoryParam, slug)
    : undefined;
  if (!p) return { title: "Product" };
  return { title: p.chemicalName, description: p.shortDescription };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { category: categoryParam, slug } = await params;
  if (!isValidCategorySlug(categoryParam)) notFound();

  const product = getProductBySlug(categoryParam, slug);
  if (!product) notFound();

  const categoryMeta = getCategoryBySlug(categoryParam);
  if (!categoryMeta) notFound();

  const related = getRelatedProductsOrFallback(product, 3);

  const crumbs = [
    { label: "Products", href: "/products" },
    { label: categoryMeta.name, href: `/products/${categoryParam}` },
    { label: product.chemicalName },
  ];

  return (
    <div className="relative overflow-x-hidden pb-28">
      <PageAmbientGraphics variant="right" opacity="opacity-[0.16]" />
      <ProductStickyEnquiry product={product} />

      <div className="relative z-10 mx-auto max-w-6xl space-y-10 px-4 pt-6 sm:px-6 md:space-y-12 lg:px-8">
        <Breadcrumbs items={crumbs} />

        <ProductHero product={product} categoryLabel={categoryMeta.name} />

        {/* Overview */}
        <RevealOnScroll>
          <section
            aria-labelledby="overview-heading"
            className="rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-b from-teal-950/20 to-[#0c1526]/80 p-7 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] backdrop-blur-xl md:p-9"
          >
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-teal-400">
              Overview
            </p>
            <h2
              id="overview-heading"
              className="mt-1 font-display text-xl font-semibold text-white"
            >
              Product overview
            </h2>
            <p className="mt-4 max-w-4xl text-base leading-relaxed text-slate-300">
              {product.detailedDescription}
            </p>
          </section>
        </RevealOnScroll>

        {/* Specs & Structure */}
        <RevealOnScroll>
          <section
            aria-labelledby="specs-heading"
            className="rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-b from-violet-950/20 to-[#0c1526]/80 p-7 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] backdrop-blur-xl md:p-9"
          >
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-400">
              Technical data
            </p>
            <h2
              id="specs-heading"
              className="mt-1 font-display text-xl font-semibold text-white"
            >
              Specifications & Structure
            </h2>
            <div className="mt-6 grid gap-8 md:grid-cols-2 md:items-start">
              <div>
                <StructurePlaceholder />
                <p className="mt-3 font-mono text-sm text-slate-300">
                  {product.molecularFormula}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Representative — supply .mol / .cdx with PO if required.
                </p>
              </div>
              <ProductSpecsTable product={product} />
            </div>
          </section>
        </RevealOnScroll>

        {/* Applications + Supply side-by-side on desktop */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Applications */}
          <RevealOnScroll>
            <section
              aria-labelledby="applications-heading"
              className="h-full rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-b from-teal-950/15 to-[#0c1526]/80 p-7 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] backdrop-blur-xl"
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-teal-400">
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
                  <li key={a} className="flex gap-3 text-sm text-slate-300">
                    <span
                      className="mt-2 h-1.5 w-4 shrink-0 rounded-full bg-gradient-to-r from-teal-500 to-violet-600"
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
              className="h-full rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-b from-rose-950/15 to-[#0c1526]/80 p-7 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] backdrop-blur-xl"
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-rose-400">
                Supply & handling
              </p>
              <h2
                id="supply-heading"
                className="mt-1 font-display text-xl font-semibold text-white"
              >
                Packaging & Storage
              </h2>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Pack sizes
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {product.packSizes.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-teal-500/25 bg-teal-500/10 px-4 py-1.5 text-sm font-medium text-teal-300"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 border-t border-white/[0.06] pt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Storage conditions
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {product.storageConditions}
                </p>
              </div>

              <div className="mt-5 border-t border-white/[0.06] pt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Documents
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className={product.coaAvailable ? "text-teal-400" : "text-slate-500"} aria-hidden>
                      {product.coaAvailable ? "✓" : "—"}
                    </span>
                    COA — {product.coaAvailable ? "on release" : "on request"}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className={product.sdsAvailable ? "text-teal-400" : "text-slate-500"} aria-hidden>
                      {product.sdsAvailable ? "✓" : "—"}
                    </span>
                    SDS — {product.sdsAvailable ? "available" : "on request"}
                  </li>
                  {product.datasheetUrl && (
                    <li className="flex items-center gap-2">
                      <span className="text-teal-400" aria-hidden>↓</span>
                      <Link href={product.datasheetUrl} className="font-medium text-teal-400 hover:underline">
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

        {/* Enquiry form */}
        <RevealOnScroll>
          <section
            id="enquiry-form"
            aria-labelledby="enquiry-heading"
            className="scroll-mt-28 relative overflow-hidden rounded-[2rem] border border-slate-800/60 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 p-8 shadow-[0_16px_56px_-16px_rgba(15,23,42,0.5)] sm:p-12"
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

            {/* Ambient glow */}
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-[80px] opacity-30"
              style={{ background: "radial-gradient(circle, rgba(20,184,166,0.5), transparent 70%)" }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full blur-[80px] opacity-20"
              style={{ background: "radial-gradient(circle, rgba(124,58,237,0.4), transparent 70%)" }}
              aria-hidden
            />

            <div className="relative">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-teal-400">
                Get in touch
              </p>
              <h2
                id="enquiry-heading"
                className="mt-2 font-display text-2xl font-bold text-white md:text-3xl"
              >
                Enquire About This Product
              </h2>
              <p className="mt-3 max-w-2xl text-slate-400">
                Include quantity, purity requirements, and timeline — the product reference
                is pre-filled for you.
              </p>
              <ContactForm
                className="mt-8 border-0 bg-transparent p-0 shadow-none"
                defaultProductRef={product.catalogNumber}
                dark
              />
            </div>
          </section>
        </RevealOnScroll>
      </div>
    </div>
  );
}
