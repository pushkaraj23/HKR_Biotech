import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, services } from "@/data/services";
import type { ServiceSlug } from "@/lib/types";
import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

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

const STEP_ACCENTS = [
  "from-teal-500 to-teal-700",
  "from-violet-500 to-violet-700",
  "from-rose-500 to-rose-700",
  "from-teal-500 to-violet-600",
  "from-violet-500 to-rose-600",
] as const;

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  if (!VALID.includes(slug as ServiceSlug)) notFound();
  const s = getServiceBySlug(slug);
  if (!s) notFound();

  const relatedServices = services.filter((x) => x.slug !== s.slug).slice(0, 4);

  return (
    <div className="relative overflow-x-hidden pb-28">
      <PageAmbientGraphics variant="right" opacity="opacity-[0.16]" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-12 px-4 pt-6 sm:px-6 md:space-y-16 lg:px-8">

        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500">
          <Link href="/services" className="text-teal-400 transition hover:text-teal-300 hover:underline">
            Services
          </Link>
          <span className="mx-2 text-slate-600">/</span>
          <span className="font-medium text-slate-100">{s.title}</span>
        </nav>

        {/* Hero — photo background with dark wash */}
        <RevealOnScroll>
          <header className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] shadow-[0_12px_48px_-12px_rgba(0,0,0,0.5)]">
            <Image
              src="https://images.unsplash.com/photo-1582560486415-e67bced0ca2d?w=1400&h=600&fit=crop&q=80&auto=format"
              alt="Laboratory research"
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(7,14,27,0.85) 0%, rgba(7,14,27,0.75) 45%, rgba(7,14,27,0.5) 100%)",
              }}
            />

            {/* Floating orbs */}
            <div
              className="pointer-events-none absolute right-[8%] top-8 h-12 w-12 animate-orbit-slow rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5), rgba(20,184,166,0.3) 55%, rgba(15,118,110,0.1))",
                boxShadow: "0 6px 20px -4px rgba(20,184,166,0.35), inset 0 -2px 5px rgba(0,0,0,0.1)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute bottom-10 right-[20%] h-7 w-7 animate-orbit-slow rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5), rgba(124,58,237,0.3) 55%, rgba(91,33,182,0.1))",
                boxShadow: "0 4px 14px -3px rgba(91,33,182,0.3), inset 0 -1px 4px rgba(0,0,0,0.1)",
                animationDelay: "-4s",
                animationDuration: "14s",
              }}
              aria-hidden
            />

            <div className="relative px-8 py-14 sm:px-12 md:py-20 lg:max-w-[60%]">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-teal-400">
                Service
              </p>
              <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                {s.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-400">
                {s.summary}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href="#enquiry-form"
                  className="rounded-full px-10 shadow-[0_14px_40px_-10px_rgba(15,118,110,0.35)]"
                >
                  Enquire about this service
                </ButtonLink>
                <ButtonLink
                  href="/services"
                  variant="secondary"
                  className="rounded-full px-10"
                >
                  All services
                </ButtonLink>
              </div>
            </div>
          </header>
        </RevealOnScroll>

        {/* Overview */}
        <RevealOnScroll>
          <section
            className="rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-b from-teal-950/20 to-bg-secondary/80 p-7 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] backdrop-blur-xl md:p-9"
          >
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-teal-400">
              Overview
            </p>
            <h2 className="mt-1 font-display text-xl font-semibold text-white">
              What this service delivers
            </h2>
            <p className="mt-4 max-w-4xl text-base leading-relaxed text-slate-300">
              {s.overview}
            </p>
          </section>
        </RevealOnScroll>

        {/* Process steps */}
        <RevealOnScroll>
          <section
            className="rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-b from-violet-950/20 to-bg-secondary/80 p-7 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] backdrop-blur-xl md:p-9"
          >
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-400">
              Workflow
            </p>
            <h2 className="mt-1 font-display text-xl font-semibold text-white">
              Typical process
            </h2>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {s.process.map((step, i) => (
                <RevealOnScroll key={step} delay={i * 60}>
                  <li className="flex gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${STEP_ACCENTS[i % STEP_ACCENTS.length]} text-xs font-bold text-white shadow-sm`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-slate-300">{step}</span>
                  </li>
                </RevealOnScroll>
              ))}
            </ol>
          </section>
        </RevealOnScroll>

        {/* Benefits + Capabilities side by side */}
        <div className="grid gap-6 md:grid-cols-2">
          <RevealOnScroll>
            <section
              className="h-full rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-b from-teal-950/15 to-bg-secondary/80 p-7 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] backdrop-blur-xl"
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-teal-400">
                Advantages
              </p>
              <h2 className="mt-1 font-display text-xl font-semibold text-white">
                Key benefits
              </h2>
              <ul className="mt-5 space-y-3">
                {s.benefits.map((b) => (
                  <li key={b} className="flex gap-3 text-sm text-slate-300">
                    <span
                      className="mt-2 h-1.5 w-4 shrink-0 rounded-full bg-gradient-to-r from-teal-500 to-teal-700"
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
              className="h-full rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-b from-violet-950/15 to-bg-secondary/80 p-7 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] backdrop-blur-xl"
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-400">
                Technical scope
              </p>
              <h2 className="mt-1 font-display text-xl font-semibold text-white">
                Capabilities
              </h2>
              <ul className="mt-5 space-y-3">
                {s.capabilities.map((c) => (
                  <li key={c} className="flex gap-3 text-sm text-slate-300">
                    <span
                      className="mt-2 h-1.5 w-4 shrink-0 rounded-full bg-gradient-to-r from-violet-500 to-violet-700"
                      aria-hidden
                    />
                    {c}
                  </li>
                ))}
              </ul>
            </section>
          </RevealOnScroll>
        </div>

        {/* Related services */}
        <RevealOnScroll>
          <section>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-rose-400">
              Related
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Other Services
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedServices.map((rs, i) => (
                <RevealOnScroll key={rs.slug} delay={i * 50}>
                  <Link
                    href={`/services/${rs.slug}`}
                    className="group block h-full rounded-[1.25rem] border border-white/[0.08] bg-gradient-to-b from-bg-secondary to-teal-950/10 p-5 shadow-[0_4px_16px_-6px_rgba(0,0,0,0.3)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)]"
                  >
                    <h3 className="font-display text-sm font-semibold text-slate-100 transition-colors group-hover:text-teal-400">
                      {rs.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-400">
                      {rs.summary}
                    </p>
                    <span className="mt-3 inline-flex text-xs font-semibold text-teal-400 transition-transform group-hover:translate-x-0.5">
                      Learn more →
                    </span>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        {/* Enquiry form — dark gradient */}
        <RevealOnScroll>
          <section
            id="enquiry-form"
            className="scroll-mt-28 relative overflow-hidden rounded-[2.5rem] border border-white/[0.08] p-8 shadow-[0_16px_64px_-16px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-12"
            style={{
              background:
                "linear-gradient(140deg, rgba(20,184,166,0.15) 0%, rgba(124,58,237,0.12) 35%, rgba(91,33,182,0.12) 55%, rgba(244,63,94,0.08) 100%)",
            }}
          >
            {/* Subtle grid */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[2.5rem] opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
              aria-hidden
            />

            {/* Decorative orbs */}
            <div
              className="pointer-events-none absolute -right-4 top-6 h-16 w-16 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7), rgba(20,184,166,0.4) 55%, rgba(15,118,110,0.2))",
                boxShadow: "0 8px 28px -6px rgba(20,184,166,0.35), inset 0 -2px 6px rgba(0,0,0,0.06)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -left-3 bottom-8 h-10 w-10 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7), rgba(124,58,237,0.4) 55%, rgba(91,33,182,0.2))",
                boxShadow: "0 6px 20px -4px rgba(91,33,182,0.3), inset 0 -2px 5px rgba(0,0,0,0.06)",
              }}
              aria-hidden
            />

            <div className="relative">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
                Get in touch
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">
                Enquire About {s.title}
              </h2>
              <p className="mt-3 max-w-2xl text-slate-400">
                Describe your project scope, timeline, and any analytical expectations — the
                service reference is pre-filled for you.
              </p>
              <ContactForm
                className="mt-8 border-0 bg-transparent p-0 shadow-none"
                defaultProductRef={`service:${s.slug}`}
              />
            </div>
          </section>
        </RevealOnScroll>
      </div>
    </div>
  );
}
