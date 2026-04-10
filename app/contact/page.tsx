import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageBanner } from "@/components/ui/PageBanner";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact HKR Biotech Labs for quotations, custom synthesis, and technical partnership.",
};

type PageProps = {
  searchParams: Promise<{ product?: string }>;
};

export default async function ContactPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const productRef =
    typeof sp.product === "string" ? sp.product : Array.isArray(sp.product) ? sp.product[0] : "";

  return (
    <div className="px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-14">
        <PageBanner
          title="Enquiries & RFQ"
          description="Share your target structure, quantity band, and analytical expectations — our team will respond with scientific questions, not just pricing."
        />

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-10">
          <div className="space-y-6 lg:col-span-2">
            <GlassCard className="p-6">
              <h2 className="font-display text-lg font-semibold text-text-primary">Direct</h2>
              <ul className="mt-4 space-y-3 text-sm text-text-secondary">
                <li>
                  <span className="text-text-muted">Email</span>
                  <br />
                  enquiries@hkrbio.tech
                </li>
                <li>
                  <span className="text-text-muted">Phone</span>
                  <br />
                  +1 (555) 010-4420
                </li>
                <li>
                  <span className="text-text-muted">Hours</span>
                  <br />
                  Mon–Fri, 08:00–18:00 (local)
                </li>
              </ul>
            </GlassCard>
            <GlassCard className="p-6">
              <h2 className="font-display text-lg font-semibold text-text-primary">Product-specific enquiry</h2>
              <p className="mt-2 text-sm text-text-secondary">
                Visiting from a catalogue entry? Your reference can be pre-filled from the query string.
              </p>
              <ButtonLink href="/products" variant="secondary" className="mt-4 text-xs">
                Browse catalogue
              </ButtonLink>
            </GlassCard>
            <div
              className="overflow-hidden rounded-3xl border border-dashed border-border-subtle bg-bg-secondary/60"
              role="img"
              aria-label="Map placeholder"
            >
              <div className="flex min-h-[220px] items-center justify-center text-sm text-text-muted">
                Map placeholder — embed Google Maps or Mapbox in production.
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <ContactForm defaultProductRef={productRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
