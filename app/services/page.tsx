import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/cn";
import { BRAND_SOLID_CARD_CYCLE } from "@/lib/ui/brandSolidCardCycle";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1400&h=600&fit=crop&q=80&auto=format";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom synthesis, contract research, analytical services, impurity profiling, and method development at HKR Biotech Labs.",
};

export default function ServicesPage() {
  return (
    <div className="relative overflow-x-hidden bg-[#020A63]">
      <PageAmbientGraphics variant="long" opacity="opacity-[0.12]" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-16 px-4 pb-28 pt-6 sm:px-6 md:space-y-20 lg:px-8">

        {/* Hero — photo + navy wash (products-style) */}
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/25 shadow-[0_18px_48px_-14px_rgba(2,10,99,0.5)]">
            <Image
              src={HERO_IMAGE}
              alt="Scientific laboratory glassware"
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(115deg, rgba(2,10,99,0.88) 0%, rgba(2,10,99,0.72) 42%, color-mix(in srgb, var(--primary) 22%, transparent) 100%)",
              }}
            />

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
                Scientific services
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-on-dark md:text-5xl">
                Composable Chemistry Services
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-on-dark/84">
                From exploratory FTE blocks to filing-ready analytical packages — unified under one project team
                with transparent milestones and scientific dialogue.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href="/contact"
                  className="rounded-full px-10 shadow-primary-glow"
                >
                  Discuss your project
                </ButtonLink>
                <ButtonLink
                  href="#services-grid"
                  variant="secondary"
                  className="rounded-full border-white/30 bg-white/10 px-10 text-on-dark backdrop-blur-sm hover:border-white/45 hover:bg-white/16"
                >
                  Browse services
                </ButtonLink>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Service cards — blue / green / light solids */}
        <section id="services-grid">
          <RevealOnScroll>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
              What we offer
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-on-dark md:text-4xl">
              Our Services
            </h2>
          </RevealOnScroll>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {services.map((s, i) => {
              const v = BRAND_SOLID_CARD_CYCLE[i % BRAND_SOLID_CARD_CYCLE.length];
              return (
                <RevealOnScroll key={s.slug} delay={i * 70}>
                  <Link href={`/services/${s.slug}`} className="group block h-full">
                    <article
                      style={{ backgroundColor: v.surface }}
                      className={cn(
                        "relative h-full overflow-hidden rounded-[1.75rem] border p-7 transition-all duration-300 hover:-translate-y-1",
                        v.shell,
                      )}
                    >
                      <div
                        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-35 blur-2xl transition-opacity duration-500 group-hover:opacity-55"
                        style={{
                          background:
                            v.surface === "#e8f4ef"
                              ? "radial-gradient(circle, rgba(255,255,255,0.7), transparent 70%)"
                              : "radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%)",
                        }}
                        aria-hidden
                      />

                      <div className="relative">
                        <span
                          className={cn("mb-5 block h-11 w-11 shrink-0 rounded-full", v.orbShell)}
                          style={{ background: v.orb }}
                          aria-hidden
                        />

                        <p className={cn("font-mono text-[10px] font-semibold uppercase tracking-[0.22em]", v.eyebrow)}>
                          Service
                        </p>
                        <h3 className={cn("mt-2 font-display text-xl font-semibold md:text-2xl", v.title)}>
                          {s.title}
                        </h3>
                        <p className={cn("mt-3 text-sm leading-relaxed", v.body)}>{s.summary}</p>

                        <ul className="mt-5 space-y-2">
                          {s.benefits.slice(0, 3).map((b) => (
                            <li key={b} className={cn("flex gap-2.5 text-sm", v.body)}>
                              <span className={v.bullet} aria-hidden />
                              {b}
                            </li>
                          ))}
                        </ul>

                        <span
                          className={cn(
                            "mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200",
                            v.link,
                          )}
                        >
                          Learn more
                          <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                            →
                          </span>
                        </span>
                      </div>
                    </article>
                  </Link>
                </RevealOnScroll>
              );
            })}
          </div>
        </section>

        {/* CTA — light band + mint (matches catalogue toolbars) */}
        <RevealOnScroll>
          <div
            className="relative overflow-hidden rounded-[1.75rem] border border-white/45 px-8 py-12 text-center shadow-[0_16px_42px_-14px_rgba(18,50,90,0.28)] backdrop-blur-md sm:px-12 sm:py-14"
            style={{
              background:
                "linear-gradient(125deg, color-mix(in srgb, var(--light) 90%, var(--primary) 10%) 0%, color-mix(in srgb, var(--light) 82%, var(--accent) 18%) 55%, #e8f4ef 100%)",
            }}
          >
            <div
              className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full opacity-50 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--accent) 30%, transparent), transparent 68%)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full opacity-40 blur-3xl"
              style={{
                background: "radial-gradient(circle, color-mix(in srgb, var(--primary) 28%, transparent), transparent 70%)",
              }}
              aria-hidden
            />

            <div className="relative">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1459b8]">
                Partnership
              </p>
              <h2 className="mx-auto mt-3 max-w-xl font-display text-2xl font-bold text-[#0d2137] md:text-3xl">
                Not Sure Where to Start?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#234a62] md:text-base">
                Share your target, timeline, and analytical expectations. We respond with technical questions and a
                clear feasibility path — not a generic brochure.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink href="/contact" className="rounded-full px-10 shadow-primary-glow">
                  Start a conversation
                </ButtonLink>
                <ButtonLink
                  href="/capabilities"
                  variant="secondary"
                  className="rounded-full border-[#17324d]/18 bg-white/90 px-10 text-[#0d2137] hover:border-primary/35 hover:bg-white"
                >
                  View capabilities
                </ButtonLink>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
