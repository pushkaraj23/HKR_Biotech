import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/forms/ContactForm";
import {
  contactChannels,
  contactDetailsHeading,
  contactGlobalLogistics,
  contactHero,
  contactStartProject,
  quoteFormSection,
} from "@/data/contactPageContent";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { cn } from "@/lib/cn";
import { BRAND_SOLID_CARD_CYCLE } from "@/lib/ui/brandSolidCardCycle";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with HKR Biotech for protected sugars, custom glycan synthesis, NMR analysis, quotes, shipping worldwide, CDAs/NDAs, and technical support.",
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=1400&h=600&fit=crop&q=80&auto=format";

type PageProps = {
  searchParams: Promise<{ product?: string }>;
};

export default async function ContactPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const productRef =
    typeof sp.product === "string" ? sp.product : Array.isArray(sp.product) ? sp.product[0] : "";

  const infoCard = BRAND_SOLID_CARD_CYCLE[0];
  const catalogueCard = BRAND_SOLID_CARD_CYCLE[1];

  return (
    <div className="relative overflow-x-hidden bg-[#020A63]">
      <PageAmbientGraphics variant="long" opacity="opacity-[0.12]" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-16 px-4 pb-28 pt-6 sm:px-6 md:space-y-20 lg:px-8">
        {/* Hero */}
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/25 shadow-[0_18px_48px_-14px_rgba(2,10,99,0.5)]">
            <Image
              src={HERO_IMAGE}
              alt="Laboratory discussion"
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
              className="pointer-events-none absolute bottom-10 right-[18%] h-7 w-7 animate-orbit-slow rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55), color-mix(in srgb, var(--primary) 40%, transparent) 55%, transparent)",
                boxShadow: "0 4px 14px -3px rgba(26,115,232,0.35), inset 0 -1px 4px rgba(0,0,0,0.1)",
                animationDelay: "-4s",
                animationDuration: "14s",
              }}
              aria-hidden
            />

            <div className="relative px-8 py-14 sm:px-12 md:py-20 lg:max-w-[90%]">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-primary-mid">{contactHero.eyebrow}</p>
              <h1 className="mt-4 max-w-4xl text-balance font-display text-4xl font-extrabold tracking-tight text-on-dark md:text-5xl lg:text-6xl">
                {contactHero.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base text-on-dark/82 md:text-lg">{contactHero.intro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={contactHero.primaryAnchor} color="blue" surface="dark" className="rounded-full px-10">
                  {contactHero.primaryCtaLabel}
                </ButtonLink>
                <ButtonLink
                  href={contactHero.secondaryHref}
                  color="green"
                  surface="dark"
                  className="rounded-full px-10"
                >
                  {contactHero.secondaryCtaLabel}
                </ButtonLink>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Global reach */}
        <RevealOnScroll>
          <div
            className="relative overflow-hidden rounded-[1.75rem] border border-white/35 px-8 py-10 shadow-[0_16px_42px_-14px_rgba(2,10,99,0.35)] backdrop-blur-md sm:px-10 sm:py-12"
            style={{
              background:
                "linear-gradient(125deg, color-mix(in srgb, var(--light) 88%, var(--primary) 12%) 0%, color-mix(in srgb, var(--light) 78%, var(--accent) 22%) 52%, #e8f4ef 100%)",
            }}
          >
            <div
              className="pointer-events-none absolute -left-24 top-0 h-52 w-52 rounded-full opacity-40 blur-3xl"
              style={{
                background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 30%, transparent), transparent 72%)",
              }}
              aria-hidden
            />
            <div className="relative max-w-3xl">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#0d2137] md:text-4xl">{contactGlobalLogistics.title}</h2>
              <p className="mt-3 text-base text-[#234a62] md:text-lg">{contactGlobalLogistics.body}</p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Start your project */}
        <RevealOnScroll>
          <section aria-labelledby="start-project-heading" className="scroll-mt-28">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-accent/90">Process</p>
            <h2 id="start-project-heading" className="mt-2 font-display text-4xl font-extrabold tracking-tight text-on-dark md:text-5xl">
              {contactStartProject.title}
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {contactStartProject.steps.map((step, i) => {
                const v = BRAND_SOLID_CARD_CYCLE[i % BRAND_SOLID_CARD_CYCLE.length];
                const light = v.surface === "#e8f4ef";
                return (
                  <RevealOnScroll key={step.title} delay={i * 70}>
                    <article
                      style={{ backgroundColor: v.surface }}
                      className={cn(
                        "relative h-full overflow-hidden rounded-[1.5rem] border p-6 transition-all duration-300 hover:-translate-y-0.5 sm:p-7",
                        v.shell,
                      )}
                    >
                      <div
                        className={cn(
                          "mb-4 inline-flex min-w-[2.25rem] items-center justify-center rounded-full px-2.5 py-1 text-xs font-bold tabular-nums",
                          light ? "bg-primary/14 text-[#1459b8]" : "bg-white/16 text-white",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className={cn("font-display text-xl font-extrabold leading-snug", v.title)}>{step.title}</h3>
                      <p className={cn("mt-3 text-sm leading-relaxed", v.body)}>{step.body}</p>
                    </article>
                  </RevealOnScroll>
                );
              })}
            </div>
          </section>
        </RevealOnScroll>

        {/* Contact info + quote form */}
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-10">
          <div className="space-y-6 lg:col-span-2">
            <RevealOnScroll>
              <article
                style={{ backgroundColor: infoCard.surface }}
                className={cn(
                  "group relative overflow-hidden rounded-[1.75rem] border p-7 transition-all duration-300 hover:-translate-y-0.5",
                  infoCard.shell,
                )}
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-30 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
                  style={{
                    background: "radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%)",
                  }}
                  aria-hidden
                />
                <div className="relative">
                  <span
                    className={cn("mb-5 block h-10 w-10 shrink-0 rounded-full", infoCard.orbShell)}
                    style={{ background: infoCard.orb }}
                    aria-hidden
                  />
                  <p className={cn("font-mono text-[10px] font-semibold uppercase tracking-[0.22em]", infoCard.eyebrow)}>{contactDetailsHeading}</p>
                  <ul className={cn("mt-4 space-y-4 text-sm", infoCard.body)}>
                    <li>
                      <span className={cn("font-mono text-[10px] uppercase tracking-wider", infoCard.secondary)}>Email us</span>
                      <div className="mt-1.5 flex flex-col gap-1">
                        {contactChannels.salesEmails.map((em) => (
                          <a key={em.href} href={em.href} className={cn("font-medium underline-offset-2 hover:underline", infoCard.link)}>
                            {em.label}
                          </a>
                        ))}
                      </div>
                    </li>
                    <li>
                      <span className={cn("font-mono text-[10px] uppercase tracking-wider", infoCard.secondary)}>Technical support</span>
                      <br />
                      <a href={contactChannels.technical.href} className={cn("font-medium underline-offset-2 hover:underline", infoCard.link)}>
                        {contactChannels.technical.label}
                      </a>
                    </li>
                    <li>
                      <span className={cn("font-mono text-[10px] uppercase tracking-wider", infoCard.secondary)}>Phone</span>
                      <br />
                      <a href={contactChannels.phoneHref} className={cn("font-medium underline-offset-2 hover:underline", infoCard.link)}>
                        {contactChannels.phoneDisplay}
                      </a>
                    </li>
                    <li>
                      <span className={cn("font-mono text-[10px] uppercase tracking-wider", infoCard.secondary)}>Business hours</span>
                      <br />
                      <span className="font-medium text-inherit">{contactChannels.hours}</span>
                    </li>
                    <li className={cn("border-t pt-4", lightFooterBorder(infoCard))}>
                      <span className={cn("font-mono text-[10px] uppercase tracking-wider", infoCard.secondary)}>Address</span>
                      <br />
                      <span className="font-medium text-inherit">{contactChannels.address}</span>
                    </li>
                  </ul>
                </div>
              </article>
            </RevealOnScroll>

            <RevealOnScroll delay={60}>
              <article
                style={{ backgroundColor: catalogueCard.surface }}
                className={cn(
                  "group relative overflow-hidden rounded-[1.75rem] border p-7 transition-all duration-300 hover:-translate-y-0.5",
                  catalogueCard.shell,
                )}
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-30 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
                  style={{
                    background: "radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%)",
                  }}
                  aria-hidden
                />
                <div className="relative">
                  <span
                    className={cn("mb-5 block h-10 w-10 shrink-0 rounded-full", catalogueCard.orbShell)}
                    style={{ background: catalogueCard.orb }}
                    aria-hidden
                  />
                  <p className={cn("font-mono text-[10px] font-semibold uppercase tracking-[0.22em]", catalogueCard.eyebrow)}>Already know the SKU?</p>
                  <h2 className={cn("mt-2 font-display text-lg font-semibold", catalogueCard.title)}>From the catalogue</h2>
                  <p className={cn("mt-3 text-sm leading-relaxed", catalogueCard.body)}>
                    Visiting from a product page? Pass <span className="font-semibold">?product=</span> in the URL or browse — your reference can be
                    pre-filled below.
                  </p>
                  <ButtonLink
                    href="/products"
                    color="white"
                    surface="dark"
                    className="mt-5 rounded-full px-6 text-xs"
                  >
                    Browse catalogue
                  </ButtonLink>
                </div>
              </article>
            </RevealOnScroll>
          </div>

          <div className="lg:col-span-3">
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
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-100/90">{quoteFormSection.eyebrow}</p>
                  <h2 id="enquiry-heading" className="mt-2 font-display text-2xl font-bold tracking-tight text-on-dark md:text-3xl">
                    {quoteFormSection.title}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-on-dark/88 md:text-base">{quoteFormSection.description}</p>
                  <ContactForm
                    className="mt-8"
                    tone="brandGreen"
                    defaultProductRef={productRef}
                    enquirySource="contact-page"
                    rfqLayout
                  />
                </div>
              </section>
            </RevealOnScroll>
          </div>
        </div>

        {/* Location */}
        <RevealOnScroll>
          <section
            aria-labelledby="location-heading"
            className="relative overflow-hidden rounded-[1.75rem] border border-white/45 shadow-[0_16px_42px_-14px_rgba(18,50,90,0.28)] backdrop-blur-md"
            style={{
              background:
                "linear-gradient(125deg, color-mix(in srgb, var(--light) 90%, var(--primary) 10%) 0%, color-mix(in srgb, var(--light) 82%, var(--accent) 18%) 55%, #e8f4ef 100%)",
            }}
          >
            <div
              className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full opacity-40 blur-3xl"
              style={{
                background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 28%, transparent), transparent 70%)",
              }}
              aria-hidden
            />
            <div className="relative px-6 pb-2 pt-8 sm:px-8 sm:pt-10 lg:px-10">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1459b8]">Location</p>
              <h2 id="location-heading" className="mt-2 font-display text-2xl font-bold tracking-tight text-[#0d2137] md:text-3xl">
                Visit our facility
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-[#234a62] md:text-base">{contactChannels.address}</p>
            </div>

            <div className="relative mt-6 border-t border-[#17324d]/10 bg-white px-2 pb-2 pt-2 sm:px-3 sm:pb-3">
              <iframe
                title="HKR Biotech Labs location"
                src="https://www.google.com/maps?q=NCL+Innovation+Park+Pashan+Road+Pune+411008&output=embed"
                className="h-[420px] w-full rounded-xl border-0 shadow-[inset_0_1px_0_rgba(23,50,77,0.06)]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>
        </RevealOnScroll>
      </div>
    </div>
  );
}

function lightFooterBorder(v: (typeof BRAND_SOLID_CARD_CYCLE)[number]): string {
  return v.surface === "#e8f4ef" ? "border-[#17324d]/12" : "border-white/15";
}
