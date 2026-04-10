import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, services } from "@/data/services";
import type { ServiceSlug } from "@/lib/types";
import { ContactForm } from "@/components/forms/ContactForm";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageBanner } from "@/components/ui/PageBanner";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";

const VALID: ServiceSlug[] = [
  "custom-chemical-synthesis",
  "contract-research",
  "analytical-services",
  "impurity-profiling",
  "method-development",
];

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const s = getServiceBySlug(slug);
  if (!s) return { title: "Service" };
  return { title: s.title, description: s.summary };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  if (!VALID.includes(slug as ServiceSlug)) notFound();
  const s = getServiceBySlug(slug);
  if (!s) notFound();

  return (
    <div className="relative overflow-x-hidden px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <PageAmbientGraphics variant="default" opacity="opacity-[0.18]" />
      <div className="relative z-10 mx-auto max-w-6xl space-y-12">
        <nav className="text-xs text-text-muted">
          <Link href="/services" className="hover:text-text-primary">
            Services
          </Link>
          <span className="mx-2 opacity-50">/</span>
          <span className="text-text-secondary">{s.title}</span>
        </nav>

        <PageBanner title={s.title} description={s.summary} />

        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <GlassCard className="p-8">
              <h2 className="font-display text-xl font-semibold text-text-primary">Overview</h2>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">{s.overview}</p>
            </GlassCard>
            <GlassCard className="p-8">
              <h2 className="font-display text-xl font-semibold text-text-primary">Typical process</h2>
              <ol className="mt-6 space-y-4">
                {s.process.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-glass-strong text-xs font-semibold text-accent-secondary">
                      {i + 1}
                    </span>
                    <p className="text-sm text-text-secondary">{step}</p>
                  </li>
                ))}
              </ol>
            </GlassCard>
            <div className="grid gap-6 md:grid-cols-2">
              <GlassCard className="p-8">
                <h2 className="font-display text-lg font-semibold text-text-primary">Key benefits</h2>
                <ul className="mt-4 space-y-2 text-sm text-text-secondary">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary" />
                      {b}
                    </li>
                  ))}
                </ul>
              </GlassCard>
              <GlassCard className="p-8">
                <h2 className="font-display text-lg font-semibold text-text-primary">Capabilities</h2>
                <ul className="mt-4 space-y-2 text-sm text-text-secondary">
                  {s.capabilities.map((c) => (
                    <li key={c} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary" />
                      {c}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>
          </div>
          <div className="space-y-6">
            <GlassCard className="p-6">
              <h2 className="font-display text-lg font-semibold text-text-primary">Related services</h2>
              <ul className="mt-4 space-y-2 text-sm">
                {services
                  .filter((x) => x.slug !== s.slug)
                  .slice(0, 4)
                  .map((x) => (
                    <li key={x.slug}>
                      <Link href={`/services/${x.slug}`} className="text-accent-primary hover:underline">
                        {x.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </GlassCard>
            <ButtonLink href="/contact" className="w-full justify-center">
              Enquire about this service
            </ButtonLink>
            <div>
              <h3 className="text-sm font-semibold text-text-primary">Quick enquiry</h3>
              <ContactForm className="mt-4" defaultProductRef={`service:${s.slug}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
