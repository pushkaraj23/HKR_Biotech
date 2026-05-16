import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, services } from "@/data/services";
import type { ServiceSlug } from "@/lib/types";
import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { cn } from "@/lib/cn";
import { BRAND_SOLID_CARD_CYCLE } from "@/lib/ui/brandSolidCardCycle";

const VALID: ServiceSlug[] = [
  "research-and-development",
  "analytical-services",
  "consultation-and-support",
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

  const relatedServices = services.filter((x) => x.slug !== s.slug).slice(0, 4);

  return (
    <div className="relative overflow-x-hidden bg-[#020A63] pb-28">
      <PageAmbientGraphics variant="right" opacity="opacity-[0.12]" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-12 px-4 pt-6 sm:px-6 md:space-y-16 lg:px-8">

        <nav className="text-sm text-on-dark/72">
          <Link href="/services" className="text-primary-mid transition hover:text-primary hover:underline">
            Services
          </Link>
          <span className="mx-2 text-on-dark/45">/</span>
          <span className="font-medium text-on-dark">{s.title}</span>
        </nav>

        {/* Hero */}
        <RevealOnScroll>
          <header
            className="relative min-h-[240px] overflow-hidden rounded-[1.75rem] border border-white/25 shadow-[0_18px_48px_-14px_rgba(2,10,99,0.5)] sm:min-h-[280px]"
            style={{
              background:
                "linear-gradient(115deg, #052066 0%, #06124a 42%, color-mix(in srgb, var(--primary) 38%, #030a40) 100%)",
            }}
          >
            <div
              className="pointer-events-none absolute right-[8%] top-8 h-12 w-12 animate-orbit-slow rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55), color-mix(in srgb, var(--accent) 35%, transparent) 55%, transparent)",
                boxShadow: "0 6px 20px -4px rgba(43,196,138,0.35), inset 0 -2px 5px rgba(0,0,0,0.1)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute bottom-10 right-[20%] h-7 w-7 animate-orbit-slow rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55), color-mix(in srgb, var(--primary) 40%, transparent) 55%, transparent)",
                boxShadow: "0 4px 14px -3px rgba(26,115,232,0.35), inset 0 -1px 4px rgba(0,0,0,0.1)",
                animationDelay: "-4s",
                animationDuration: "14s",
              }}
              aria-hidden
            />

            <div className="relative px-8 py-14 sm:px-12 md:py-20 lg:max-w-[60%]">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-primary-mid">
                Service
              </p>
              <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-on-dark sm:text-5xl md:text-6xl">
                {s.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-on-dark/84">{s.summary}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="#enquiry-form" color="blue" surface="dark" className="rounded-full px-10">
                  Enquire about this service
                </ButtonLink>
                <ButtonLink href="/services" color="green" surface="dark" className="rounded-full px-10">
                  All services
                </ButtonLink>
              </div>
            </div>
          </header>
        </RevealOnScroll>

        {/* Overview — light mint */}
        <RevealOnScroll>
          <section
            className="rounded-[1.75rem] border border-[#17324d]/12 p-7 shadow-[0_14px_36px_-14px_rgba(23,50,77,0.14)] backdrop-blur-sm md:p-9"
            style={{
              background: "linear-gradient(165deg, #e8f4ef 0%, #ffffff 52%, color-mix(in srgb, var(--light) 92%, var(--primary) 8%) 100%)",
            }}
          >
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1459b8]">Overview</p>
            <h2 className="mt-1 font-display text-2xl font-extrabold text-[#0d2137] md:text-3xl">Overview</h2>
            <p className="mt-4 max-w-3xl text-base text-[#234a62]">{s.overview}</p>
          </section>
        </RevealOnScroll>

        {/* Process — color-cycled cards */}
        <RevealOnScroll>
          <section>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">Workflow</p>
            <h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-on-dark md:text-3xl">
              Typical process
            </h2>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {s.process.map((step, i) => {
                const v = BRAND_SOLID_CARD_CYCLE[i % BRAND_SOLID_CARD_CYCLE.length];
                return (
                  <RevealOnScroll key={step} delay={i * 60}>
                    <li
                      style={{ backgroundColor: v.surface }}
                      className={cn(
                        "flex min-h-[5.5rem] gap-4 rounded-[1.25rem] border p-5 transition-all duration-200 hover:-translate-y-0.5",
                        v.shell,
                      )}
                    >
                      <span className={cn("shrink-0 rounded-full", v.stepBadge)}>{i + 1}</span>
                      <span className={cn("text-sm leading-relaxed", v.body)}>{step}</span>
                    </li>
                  </RevealOnScroll>
                );
              })}
            </ol>
          </section>
        </RevealOnScroll>

        {/* Benefits (blue) + Capabilities (green) */}
        <div className="grid gap-6 md:grid-cols-2">
          <RevealOnScroll>
            <section
              className="h-full rounded-[1.75rem] border border-white/35 p-7 text-white shadow-[0_12px_36px_-12px_rgba(13,71,161,0.45)] md:p-9"
              style={{
                background: "linear-gradient(155deg, #1a73e8 0%, color-mix(in srgb, var(--primary-deep) 55%, #041238) 100%)",
              }}
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-100/90">
                Advantages
              </p>
              <h2 className="mt-1 font-display text-2xl font-extrabold text-white md:text-3xl">Benefits</h2>
              <ul className="mt-5 space-y-3">
                {s.benefits.map((b) => (
                  <li key={b} className="flex gap-3 text-sm leading-relaxed text-white/88">
                    <span
                      className="mt-2 h-1.5 w-4 shrink-0 rounded-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.35)]"
                      aria-hidden
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </section>
          </RevealOnScroll>

          <RevealOnScroll delay={60}>
            <section
              className="h-full rounded-[1.75rem] border border-white/30 p-7 text-white shadow-[0_12px_36px_-12px_rgba(8,105,78,0.42)] md:p-9"
              style={{
                background: "linear-gradient(155deg, #22a884 0%, color-mix(in srgb, var(--accent) 75%, #064d3a) 100%)",
              }}
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-50/95">
                Technical scope
              </p>
              <h2 className="mt-1 font-display text-2xl font-extrabold text-white md:text-3xl">Capabilities</h2>
              <ul className="mt-5 space-y-3">
                {s.capabilities.map((c) => (
                  <li key={c} className="flex gap-3 text-sm leading-relaxed text-white/88">
                    <span
                      className="mt-2 h-1.5 w-4 shrink-0 rounded-full bg-white/90 shadow-[0_0_10px_rgba(220,255,245,0.35)]"
                      aria-hidden
                    />
                    {c}
                  </li>
                ))}
              </ul>
            </section>
          </RevealOnScroll>
        </div>

        {/* Related services — solid cycle */}
        <RevealOnScroll>
          <section>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">Related</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-on-dark md:text-3xl">
              Other services
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedServices.map((rs, i) => {
                const v = BRAND_SOLID_CARD_CYCLE[i % BRAND_SOLID_CARD_CYCLE.length];
                return (
                  <RevealOnScroll key={rs.slug} delay={i * 50}>
                    <Link
                      href={`/services/${rs.slug}`}
                      style={{ backgroundColor: v.surface }}
                      className={cn(
                        "group block h-full rounded-[1.25rem] border p-5 transition-all duration-200 hover:-translate-y-0.5",
                        v.shell,
                      )}
                    >
                      <span
                        className={cn("mb-4 block h-9 w-9 rounded-full", v.orbShell)}
                        style={{ background: v.orb }}
                        aria-hidden
                      />
                      <h3
                        className={cn(
                          "font-display text-sm font-semibold leading-snug transition-colors",
                          v.title,
                          v.titleGroupHover,
                        )}
                      >
                        {rs.title}
                      </h3>
                      <p className={cn("mt-2 line-clamp-3 text-xs leading-relaxed", v.body)}>{rs.summary}</p>
                      <span className={cn("mt-4 inline-flex text-xs font-semibold transition-transform group-hover:translate-x-0.5", v.link)}>
                        Learn more →
                      </span>
                    </Link>
                  </RevealOnScroll>
                );
              })}
            </div>
          </section>
        </RevealOnScroll>

        {/* Enquiry — same green-glass band as product PDP */}
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
                  "color-mix(in srgb, var(--accent) 52%, transparent) 0%,",
                  "color-mix(in srgb, var(--accent) 28%, #020A63) 38%,",
                  "rgba(2, 10, 99, 0.78) 100%)",
                ].join(" "),
                opacity: 0.82,
              }}
              aria-hidden
            />
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
              <h2 id="enquiry-heading" className="mt-2 font-display text-2xl font-extrabold tracking-tight text-on-dark md:text-3xl">
                Enquire about {s.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-on-dark/88 md:text-base">
                Describe your project scope, timeline, and any analytical expectations — the service reference is pre-filled for you.
              </p>
              <ContactForm
                className="mt-8"
                tone="brandGreen"
                defaultProductRef={`service:${s.slug}`}
                enquirySource={`service:${s.slug}`}
              />
            </div>
          </section>
        </RevealOnScroll>
      </div>
    </div>
  );
}
