import type { Metadata } from "next";
import Image from "next/image";
import {
  serviceAreas,
  servicesCommitmentColumns,
  servicesCommitmentHeading,
  servicesPageHero,
  servicesPartnerCta,
} from "@/data/servicesPageContent";
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
    "Precision carbohydrate and nucleoside chemistry: custom glycan synthesis, DNA/RNA building blocks, NMR analysis, glycoconjugation, global shipping with CoA/NMR/MS, and confidentiality at HKR Biotech Pvt. Ltd.",
};

export default function ServicesPage() {
  return (
    <div className="relative overflow-x-hidden bg-[#020A63]">
      <PageAmbientGraphics variant="long" opacity="opacity-[0.12]" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-16 px-4 pb-28 pt-6 sm:px-6 md:space-y-20 lg:px-8">
        {/* Hero */}
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

            <div className="relative px-8 py-14 sm:px-12 md:py-20 lg:max-w-[85%]">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-primary-mid">{servicesPageHero.eyebrow}</p>
              <h1 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight text-on-dark md:text-4xl lg:text-5xl">
                {servicesPageHero.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-on-dark/84">{servicesPageHero.intro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={servicesPageHero.primaryCtaHref} className="rounded-full px-10 shadow-primary-glow">
                  {servicesPageHero.primaryCtaLabel}
                </ButtonLink>
                <ButtonLink
                  href={servicesPageHero.secondaryAnchor}
                  variant="secondary"
                  className="rounded-full border-white/30 bg-white/10 px-10 text-on-dark backdrop-blur-sm hover:border-white/45 hover:bg-white/16"
                >
                  {servicesPageHero.secondaryCtaLabel}
                </ButtonLink>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Four service pillars */}
        <section id="service-areas" aria-labelledby="service-areas-heading" className="scroll-mt-28">
          <RevealOnScroll>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">Detailed offerings</p>
            <h2 id="service-areas-heading" className="sr-only">
              Service areas one through four
            </h2>
          </RevealOnScroll>

          <div className="mt-10 grid gap-10 md:gap-12">
            {serviceAreas.map((area, i) => {
              const v = BRAND_SOLID_CARD_CYCLE[i % BRAND_SOLID_CARD_CYCLE.length];
              const light = v.surface === "#e8f4ef";
              const imageOnRight = i % 2 === 1;
              const step = String(i + 1).padStart(2, "0");

              return (
                <RevealOnScroll key={area.heading} delay={i * 60}>
                  <article
                    style={{ backgroundColor: v.surface }}
                    className={cn(
                      "group relative overflow-hidden rounded-[1.75rem] border transition-all duration-300",
                      "shadow-[0_20px_50px_-24px_rgba(2,10,99,0.45)] hover:-translate-y-1 hover:shadow-[0_28px_60px_-20px_rgba(2,10,99,0.55)]",
                      v.shell,
                    )}
                  >
                    <div
                      className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                      style={{
                        background:
                          light
                            ? "radial-gradient(circle, rgba(255,255,255,0.9), transparent 70%)"
                            : "radial-gradient(circle, rgba(255,255,255,0.45), transparent 68%)",
                      }}
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full opacity-20 blur-2xl"
                      style={{
                        background:
                          light
                            ? "radial-gradient(circle, color-mix(in srgb, var(--primary) 35%, transparent), transparent 70%)"
                            : "radial-gradient(circle, rgba(255,255,255,0.25), transparent 70%)",
                      }}
                      aria-hidden
                    />

                    <div
                      className={cn(
                        "relative grid overflow-hidden lg:min-h-[22rem] lg:grid-cols-12",
                        imageOnRight ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : "",
                      )}
                    >
                      {/* Cover image */}
                      <div
                        className={cn(
                          "relative isolate order-1 min-h-[13rem] w-full overflow-hidden sm:min-h-[15rem] lg:col-span-5 lg:min-h-0",
                          "rounded-t-[1.75rem] lg:rounded-t-none",
                          imageOnRight ? "lg:rounded-r-[1.75rem] lg:col-start-8" : "lg:rounded-l-[1.75rem] lg:col-start-1",
                        )}
                      >
                        <Image
                          src={area.coverImage.src}
                          alt={area.coverImage.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 42vw"
                          className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                        />
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/25 lg:to-black/50"
                          aria-hidden
                        />
                        <div
                          className={cn(
                            "absolute inset-y-0 z-[1] hidden w-14 lg:block",
                            imageOnRight ? "left-0" : "right-0",
                          )}
                          style={{
                            background: imageOnRight
                              ? `linear-gradient(to right, ${v.surface}, transparent)`
                              : `linear-gradient(to left, ${v.surface}, transparent)`,
                          }}
                          aria-hidden
                        />
                        <div className="absolute left-4 top-4 z-[2] sm:left-5 sm:top-5">
                          <span
                            className={cn(
                              "inline-flex h-12 w-12 items-center justify-center rounded-2xl text-base font-bold tabular-nums shadow-lg backdrop-blur-md md:h-[3.25rem] md:w-[3.25rem] md:text-lg",
                              "bg-white/22 text-white ring-1 ring-white/40",
                            )}
                          >
                            {step}
                          </span>
                        </div>
                      </div>

                      {/* Copy + CTAs */}
                      <div
                        className={cn(
                          "relative order-2 flex flex-col p-8 sm:p-9 lg:col-span-7 lg:p-10",
                          imageOnRight ? "lg:col-start-1" : "lg:col-start-6",
                        )}
                      >
                        <p
                          aria-hidden
                          className={cn(
                            "pointer-events-none mb-4 font-display text-6xl font-bold tabular-nums leading-none opacity-[0.14] transition-opacity duration-300 group-hover:opacity-[0.2] md:text-7xl",
                            light ? "text-[#0d2137]" : "text-white",
                          )}
                        >
                          {step}
                        </p>

                        <div className="flex gap-4">
                          <span
                            className={cn(
                              "mt-1 hidden min-h-[3rem] w-1 shrink-0 rounded-full sm:block sm:self-stretch md:min-h-[3.5rem]",
                              light ? "bg-gradient-to-b from-primary to-accent shadow-sm" : "bg-gradient-to-b from-white to-white/50 shadow-[0_0_14px_rgba(255,255,255,0.35)]",
                            )}
                            aria-hidden
                          />
                          <div className="min-w-0 flex-1">
                            <p className={cn("font-mono text-[10px] font-semibold uppercase tracking-[0.22em]", v.eyebrow)}>{area.tagline}</p>
                            <h3 className={cn("mt-2 text-balance font-display text-xl font-bold leading-snug md:text-2xl lg:text-[1.65rem]", v.title)}>{area.heading}</h3>
                          </div>
                        </div>

                        <p className={cn("mt-4 max-w-xl text-sm leading-relaxed sm:text-base", v.body)}>{area.intro}</p>

                        <ul
                          className={cn(
                            "mt-7 space-y-4 text-sm leading-relaxed sm:text-[15px]",
                          )}
                        >
                          {area.bullets.map((b) => (
                            <li
                              key={b.title}
                              className={cn(
                                "rounded-2xl border px-4 py-3.5 backdrop-blur-[2px]",
                                light ? "border-[#17324d]/10 bg-white/55 shadow-sm" : "border-white/15 bg-black/14 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
                              )}
                            >
                              <div className="flex gap-3">
                                <span
                                  className={cn(
                                    "mt-1.5 h-2 w-2 shrink-0 rounded-full md:mt-2 md:h-2.5 md:w-2.5",
                                    light
                                      ? "bg-gradient-to-br from-primary to-accent shadow-[0_0_8px_rgba(26,115,232,0.35)]"
                                      : "bg-white shadow-[0_0_12px_rgba(255,255,255,0.45)]",
                                  )}
                                  aria-hidden
                                />
                                <div>
                                  <p className={v.body}>
                                    <span className={cn("font-semibold", v.title)}>{b.title}</span> {b.body}
                                  </p>
                                  {b.subpoints && b.subpoints.length > 0 ? (
                                    <ul className={cn("mt-2 space-y-1 border-l border-dashed pl-4 text-[13px] sm:text-sm", light ? "border-[#17324d]/20" : "border-white/25", v.body)}>
                                      {b.subpoints.map((sp) => (
                                        <li key={sp}>{sp}</li>
                                      ))}
                                    </ul>
                                  ) : null}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>

                        <div
                          className={cn(
                            "mt-auto flex flex-col gap-3 border-t pt-8 sm:flex-row sm:flex-wrap",
                            light ? "border-[#17324d]/12" : "border-white/18",
                          )}
                        >
                          <ButtonLink href={area.ctas.primary.href} className="rounded-full px-8 shadow-primary-glow sm:px-9">
                            {area.ctas.primary.label}
                          </ButtonLink>
                          <ButtonLink
                            href={area.ctas.secondary.href}
                            variant="secondary"
                            className={cn(
                              "rounded-full px-8 sm:px-9",
                              light
                                ? "border-[#17324d]/18 bg-white/92 text-[#0d2137] hover:border-primary/35 hover:bg-white"
                                : "border-white/35 bg-white/10 text-on-dark backdrop-blur-sm hover:border-white/48 hover:bg-white/16",
                            )}
                          >
                            {area.ctas.secondary.label}
                          </ButtonLink>
                        </div>
                      </div>
                    </div>
                  </article>
                </RevealOnScroll>
              );
            })}
          </div>
        </section>

        {/* Our Service Commitment */}
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/35 px-6 py-10 shadow-[0_16px_42px_-14px_rgba(2,10,99,0.35)] backdrop-blur-md sm:px-10 sm:py-12">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.85]"
              style={{
                background:
                  "linear-gradient(125deg, color-mix(in srgb, var(--light) 88%, var(--primary) 12%) 0%, color-mix(in srgb, var(--light) 78%, var(--accent) 22%) 52%, #e8f4ef 100%)",
              }}
              aria-hidden
            />
            <div className="relative">
              <h2 className="text-center font-display text-2xl font-bold tracking-tight text-[#0d2137] md:text-3xl">{servicesCommitmentHeading}</h2>
              <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
                {servicesCommitmentColumns.map((col) => (
                  <div key={col.title} className="rounded-2xl border border-[#17324d]/10 bg-white/70 px-5 py-6 text-center shadow-sm backdrop-blur-sm">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1459b8]">{col.title}</p>
                    <p className="mt-3 text-sm leading-relaxed text-[#234a62]">{col.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Partner CTA */}
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
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--primary) 28%, transparent), transparent 70%)",
              }}
              aria-hidden
            />

            <div className="relative">
              <h2 className="mx-auto max-w-xl text-balance font-display text-2xl font-bold text-[#0d2137] md:text-3xl">{servicesPartnerCta.title}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#234a62] md:text-base">{servicesPartnerCta.body}</p>
              <div className="mt-10 flex justify-center">
                <ButtonLink href={servicesPartnerCta.buttonHref} className="rounded-full px-10 shadow-primary-glow">
                  {servicesPartnerCta.buttonLabel}
                </ButtonLink>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
