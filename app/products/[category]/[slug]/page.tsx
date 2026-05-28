import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllProducts,
  getCategoryBySlug,
  getProductBySlug,
  getRelatedProductsOrFallback,
  isValidCategorySlug,
} from "@/data/catalog";
import { Breadcrumbs } from "@/components/products/catalog/Breadcrumbs";
import { ProductDetailHeader } from "@/components/products/catalog/ProductDetailHeader";
import { ProductDetailSectionHeading } from "@/components/products/catalog/ProductDetailSectionHeading";
import {
  ProductDetailSolidBulletList,
  ProductDetailSolidSection,
} from "@/components/products/catalog/ProductDetailSolidSection";
import { ProductOrderingPanel } from "@/components/products/catalog/ProductOrderingPanel";
import { ProductTechnicalCards } from "@/components/products/catalog/ProductTechnicalCards";
import { RelatedProducts } from "@/components/products/catalog/RelatedProducts";
import { ProductStickyEnquiry } from "@/components/products/catalog/ProductStickyEnquiry";
import { ContactForm } from "@/components/forms/ContactForm";
import { ProductInterestTracker } from "@/components/analytics/ProductInterestTracker";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { PRODUCT_DETAIL_CONTAINER, PRODUCT_DETAIL_STACK } from "@/components/products/catalog/productDetailStyles";

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
  const enquiryHref = `/products/${categoryParam}/${slug}#enquiry-form`;

  const crumbs = [
    { label: "Products", href: "/products" },
    { label: categoryMeta.name, href: `/products/${categoryParam}` },
    { label: product.chemicalName },
  ];

  return (
    <div className="relative bg-[#020A63] pb-28">
      <PageAmbientGraphics variant="right" opacity="opacity-[0.12]" />
      <ProductInterestTracker
        slug={product.slug}
        categorySlug={product.categorySlug}
        chemicalName={product.chemicalName}
        catalogNumber={product.catalogNumber}
      />
      <ProductStickyEnquiry product={product} />

      <div className={`relative z-10 ${PRODUCT_DETAIL_CONTAINER} ${PRODUCT_DETAIL_STACK} pb-4`}>
        <Breadcrumbs items={crumbs} className="hidden md:block" />

        <RevealOnScroll>
          <ProductDetailHeader
            product={product}
            categoryLabel={categoryMeta.name}
            categoryHref={`/products/${categoryParam}`}
            enquiryHref={enquiryHref}
          />
        </RevealOnScroll>

        <RevealOnScroll>
          <section id="ordering" className="scroll-mt-28">
            <ProductDetailSectionHeading
              eyebrow="Ordering"
              title="Pack sizes & availability"
              description="Select quantities below or request a custom quote with your purity and timeline requirements."
              eyebrowTone="blue"
            />
            <ProductOrderingPanel product={product} />
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section aria-labelledby="technical-specs-heading">
            <ProductDetailSectionHeading
              eyebrow="Specifications"
              title="Technical & regulatory data"
              description="Identity, compliance, and logistics — documented for procurement and quality review."
              titleId="technical-specs-heading"
            />
            <ProductTechnicalCards product={product} enquiryHref={enquiryHref} />
          </section>
        </RevealOnScroll>

        {product.detailedDescription || product.applications.length > 0 ? (
          <RevealOnScroll>
            <ProductDetailSectionHeading
              eyebrow="Product information"
              title="Description & applications"
              description="How this compound is used in discovery and process development programmes."
              eyebrowTone="blue"
            />
            <div className="grid gap-5 md:grid-cols-2">
              {product.detailedDescription ? (
                <ProductDetailSolidSection
                  colorIndex={0}
                  eyebrow="Overview"
                  title="Product description"
                >
                  <p className="text-base leading-relaxed md:text-lg">{product.detailedDescription}</p>
                </ProductDetailSolidSection>
              ) : null}

              {product.applications.length > 0 ? (
                <ProductDetailSolidSection colorIndex={1} eyebrow="Use cases" title="Applications">
                  <ProductDetailSolidBulletList colorIndex={1} items={product.applications} />
                </ProductDetailSolidSection>
              ) : null}
            </div>
          </RevealOnScroll>
        ) : null}

        <RevealOnScroll>
          <RelatedProducts products={related} />
        </RevealOnScroll>

        <RevealOnScroll>
          <section
            id="enquiry-form"
            aria-labelledby="enquiry-heading"
            className="scroll-mt-28 relative overflow-hidden rounded-[1.75rem] border border-white/35 shadow-[0_20px_48px_-18px_rgba(2,10,99,0.45)] backdrop-blur-md"
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: [
                  "linear-gradient(165deg,",
                  "color-mix(in srgb, var(--accent) 48%, transparent) 0%,",
                  "color-mix(in srgb, var(--accent) 22%, #020A63) 42%,",
                  "rgba(2, 10, 99, 0.82) 100%)",
                ].join(" "),
                opacity: 0.88,
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-28 -top-36 h-[24rem] w-[24rem] rounded-full opacity-[0.45] blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 72% 26%, rgba(180, 255, 220, 0.65) 0%, color-mix(in srgb, var(--accent) 38%, transparent) 45%, transparent 62%)",
              }}
              aria-hidden
            />

            <div className="relative z-10 px-7 py-9 sm:px-10 sm:py-11">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-100/90">
                Get in touch
              </p>
              <h2
                id="enquiry-heading"
                className="mt-3 font-display text-3xl font-extrabold tracking-tight text-on-dark md:text-4xl"
              >
                Enquire about this product
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-on-dark/88 md:text-xl">
                Include quantity, purity requirements, and timeline — your catalogue reference is pre-filled.
              </p>
              <ContactForm
                className="mt-9"
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
