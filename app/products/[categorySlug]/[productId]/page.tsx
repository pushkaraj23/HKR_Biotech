import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/data/product-categories";
import { getProductById } from "@/data/products";
import type { ProductCategorySlug } from "@/lib/types";
import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GlassCard } from "@/components/ui/GlassCard";

type PageProps = {
  params: Promise<{ categorySlug: string; productId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { productId } = await params;
  const p = getProductById(productId);
  if (!p) return { title: "Product" };
  return {
    title: p.chemicalName,
    description: p.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { categorySlug, productId } = await params;
  const p = getProductById(productId);
  if (!p || p.categorySlug !== categorySlug) {
    notFound();
  }
  const cat = getCategoryBySlug(categorySlug as ProductCategorySlug);
  if (!cat) notFound();

  return (
    <div className="px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <nav className="text-xs text-text-muted">
          <Link href="/products" className="hover:text-text-primary">
            Products
          </Link>
          <span className="mx-2 opacity-50">/</span>
          <Link href={`/products/${categorySlug}`} className="hover:text-text-primary">
            {cat.name}
          </Link>
          <span className="mx-2 opacity-50">/</span>
          <span className="text-text-secondary">{p.chemicalName}</span>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-5 lg:gap-10">
          <div className="lg:col-span-3 space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-secondary">
                Technical datasheet preview
              </p>
              <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
                {p.chemicalName}
              </h1>
              <p className="mt-4 text-lg text-text-secondary">{p.shortDescription}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <GlassCard className="p-6">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Structure
                </h2>
                <div
                  className="mt-4 flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-border-subtle bg-bg-secondary/80 text-center text-sm text-text-muted"
                  role="img"
                  aria-label="Chemical structure placeholder"
                >
                  Structure image placeholder
                  <br />
                  <span className="mt-2 block font-mono text-xs">{p.molecularFormula}</span>
                </div>
              </GlassCard>
              <GlassCard className="p-6">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Identifiers
                </h2>
                <dl className="mt-4 space-y-3 text-sm">
                  <div>
                    <dt className="text-text-muted">CAS number</dt>
                    <dd className="font-mono text-text-primary">{p.casNumber}</dd>
                  </div>
                  <div>
                    <dt className="text-text-muted">Molecular weight</dt>
                    <dd className="font-mono text-text-primary">{p.molecularWeight}</dd>
                  </div>
                  <div>
                    <dt className="text-text-muted">Purity</dt>
                    <dd className="text-accent-secondary">{p.purity}</dd>
                  </div>
                  <div>
                    <dt className="text-text-muted">Storage</dt>
                    <dd className="text-text-secondary">{p.storageConditions}</dd>
                  </div>
                </dl>
              </GlassCard>
            </div>

            <GlassCard className="p-6">
              <h2 className="font-display text-lg font-semibold text-text-primary">Applications</h2>
              <ul className="mt-4 space-y-2 text-sm text-text-secondary">
                {p.applications.map((a) => (
                  <li key={a} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-secondary" />
                    {a}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <GlassCard className="p-6">
              <h2 className="font-display text-lg font-semibold text-text-primary">Request documentation</h2>
              <p className="mt-2 text-sm text-text-secondary">
                Download a placeholder datasheet — connect to your DAM or LIMS in production.
              </p>
              <ButtonLink href={p.datasheetUrl ?? "#"} className="mt-6 w-full justify-center text-xs">
                Download datasheet (PDF)
              </ButtonLink>
            </GlassCard>
            <div>
              <h2 className="font-display text-lg font-semibold text-text-primary">Enquiry / RFQ</h2>
              <p className="mt-2 text-sm text-text-secondary">
                Reference <span className="font-mono text-accent-secondary">{p.id}</span> in your message.
              </p>
              <ContactForm className="mt-6" defaultProductRef={p.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
