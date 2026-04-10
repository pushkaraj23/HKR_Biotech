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
import { ProductEnquiryCard } from "@/components/products/catalog/ProductEnquiryCard";
import { ProductStickyEnquiry } from "@/components/products/catalog/ProductStickyEnquiry";
import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";

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
  const p =
    isValidCategorySlug(categoryParam) ? getProductBySlug(categoryParam, slug) : undefined;
  if (!p) return { title: "Product" };
  return {
    title: p.chemicalName,
    description: p.shortDescription,
  };
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
    <div className="relative overflow-x-hidden pb-32 md:pb-24">
      <PageAmbientGraphics variant="right" opacity="opacity-[0.16]" />
      <ProductStickyEnquiry product={product} />

      <div className="relative z-10 px-4 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs items={crumbs} />
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
        <ProductHero product={product} categoryLabel={categoryMeta.name} />
      </div>

      <div className="relative z-10 mx-auto mt-10 grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_min(380px,100%)] lg:gap-12 lg:px-8">
        <div className="min-w-0 space-y-10">
          <section aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="font-display text-xl font-semibold text-slate-950">
              Product overview
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">{product.detailedDescription}</p>
          </section>

          <section aria-labelledby="structure-heading" className="grid gap-8 lg:grid-cols-[min(320px,100%)_1fr] lg:items-start">
            <div>
              <h2 id="structure-heading" className="font-display text-lg font-semibold text-slate-950">
                Structure
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Representative depiction — supply structure files with your PO where required.
              </p>
              <div className="mt-4">
                <StructurePlaceholder className="max-w-sm" />
                <p className="mt-3 font-mono text-sm text-slate-800">{product.molecularFormula}</p>
              </div>
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-slate-950">Technical specifications</h2>
              <ProductSpecsTable product={product} className="mt-4" />
            </div>
          </section>

          <section aria-labelledby="applications-heading">
            <h2 id="applications-heading" className="font-display text-xl font-semibold text-slate-950">
              Applications
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-700">
              {product.applications.map((a) => (
                <li key={a} className="flex gap-3">
                  <span
                    className="mt-2 h-1.5 w-4 shrink-0 rounded-full bg-gradient-to-r from-teal-500 to-violet-600"
                    aria-hidden
                  />
                  {a}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="packaging-heading">
            <h2 id="packaging-heading" className="font-display text-xl font-semibold text-slate-950">
              Packaging & supply
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {product.packSizes.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-teal-200/80 bg-teal-50/50 px-4 py-1.5 text-sm font-medium text-teal-950"
                >
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-600">
              Custom pack sizes and labelled batches are quoted on feasibility — reference{" "}
              <span className="font-mono font-medium text-slate-800">{product.catalogNumber}</span>.
            </p>
          </section>

          <section aria-labelledby="storage-heading">
            <h2 id="storage-heading" className="font-display text-xl font-semibold text-slate-950">
              Storage & handling
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{product.storageConditions}</p>
          </section>

          <section aria-labelledby="documents-heading">
            <h2 id="documents-heading" className="font-display text-xl font-semibold text-slate-950">
              Documents
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Batch release packages are aligned to your phase — indicate requirements in your enquiry.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span
                  className={product.coaAvailable ? "text-teal-700" : "text-slate-400"}
                  aria-hidden
                >
                  {product.coaAvailable ? "✓" : "—"}
                </span>
                Certificate of analysis (COA) — {product.coaAvailable ? "available on release" : "on request"}
              </li>
              <li className="flex items-center gap-2">
                <span
                  className={product.sdsAvailable ? "text-teal-700" : "text-slate-400"}
                  aria-hidden
                >
                  {product.sdsAvailable ? "✓" : "—"}
                </span>
                Safety data sheet (SDS) — {product.sdsAvailable ? "available" : "on request"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-700" aria-hidden>
                  ↓
                </span>
                <Link href={product.datasheetUrl ?? "#"} className="font-medium text-teal-800 hover:underline">
                  Technical summary (PDF placeholder)
                </Link>
              </li>
            </ul>
          </section>

          <RelatedProducts products={related} className="border-t border-slate-200/80 pt-10" />

          <section aria-labelledby="inline-form-heading" className="rounded-[2rem] border border-slate-200/90 bg-white/90 p-6 shadow-sm md:p-8">
            <h2 id="inline-form-heading" className="font-display text-xl font-semibold text-slate-950">
              Send an enquiry
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              The product field is pre-filled with your catalogue reference. Add quantity, purity, and timeline.
            </p>
            <ContactForm className="mt-6 border-0 bg-transparent p-0 shadow-none" defaultProductRef={product.catalogNumber} />
          </section>
        </div>

        <aside className="min-w-0 space-y-6 lg:sticky lg:top-28 lg:self-start">
          <ProductEnquiryCard product={product} categoryLabel={categoryMeta.name} />
          <div className="hidden rounded-2xl border border-teal-200/60 bg-gradient-to-b from-white to-teal-50/30 p-6 md:block">
            <h3 className="font-display text-lg font-semibold text-slate-950">Quick actions</h3>
            <div className="mt-4 flex flex-col gap-3">
              <ButtonLink
                href={`/contact?product=${encodeURIComponent(product.catalogNumber)}`}
                variant="primary"
                className="justify-center text-sm"
              >
                Open full contact form
              </ButtonLink>
              <ButtonLink href={`/products/${categoryParam}`} variant="secondary" className="justify-center text-sm">
                Back to {categoryMeta.name}
              </ButtonLink>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
