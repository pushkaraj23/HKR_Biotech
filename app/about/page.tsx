import Image from "next/image";
import type { Metadata } from "next";
import { AboutWhyChooseSection } from "@/components/about/AboutWhyChooseSection";
import { ExpertsContent } from "@/components/about/ExpertsContent";
import { aboutCoreExpertise, aboutMarketingHero } from "@/data/aboutMarketingContent";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";
import { cn } from "@/lib/cn";
import { BRAND_SOLID_CARD_CYCLE } from "@/lib/ui/brandSolidCardCycle";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "HKR Biotech Pvt Ltd — global leaders in custom glycan and sugar chemistry. Custom glycans, modified sugars, nucleic acid chemistry, impurities, reference standards, and worldwide logistics.",
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=1200&h=600&fit=crop&q=80&auto=format";

/** Large-screen column spans for a 12-col bento: row 7+5, row 4+4+4. */
const EXPERTISE_BENTO_SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4"];

export default function AboutPage() {
  let expertiseCycle = 0;
  const titleAccent = aboutMarketingHero.titleAccentPhrase;
  const titleLead =
    titleAccent && aboutMarketingHero.title.includes(titleAccent)
      ? aboutMarketingHero.title.replace(titleAccent, "").trim()
      : null;

  return (
    <div className="relative overflow-x-hidden bg-[#020A63] pb-28">
      <PageAmbientGraphics variant="long" opacity="opacity-[0.12]" />

      {/* Hero */}
      <section className="relative z-10 px-4 pt-6 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/25 bg-[#020A63] shadow-[0_18px_48px_-14px_rgba(2,10,99,0.5)]">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary-mid"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-16 top-8 h-48 w-48 rounded-full opacity-30 blur-3xl"
            style={{
              background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 40%, transparent), transparent 70%)",
            }}
            aria-hidden
          />
          <div className="relative flex flex-col gap-10 px-8 py-12 sm:px-12 sm:py-14 md:gap-12 md:py-16 lg:gap-14">
            <RevealOnScroll>
              <h1 className="mx-auto max-w-4xl text-center text-balance font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-on-dark sm:text-4xl md:text-5xl lg:text-6xl">
                {titleLead ? (
                  <>
                    {titleLead}{" "}
                    <span className="gradient-text-shimmer">{titleAccent}</span>
                  </>
                ) : (
                  aboutMarketingHero.title
                )}
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={80}>
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
                <div className="flex flex-col">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.32em] text-primary-mid sm:text-[11px]">
                    {aboutMarketingHero.eyebrow}
                  </p>
                  <p className="mt-5 text-base leading-relaxed text-on-dark/88 sm:text-lg md:text-xl md:leading-relaxed">
                    {aboutMarketingHero.intro}
                  </p>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                    <ButtonLink href="/contact" className="rounded-full px-10 py-3.5 text-sm shadow-primary-glow">
                      Partner with HKR
                    </ButtonLink>
                    <ButtonLink
                      href="#core-expertise-heading"
                      variant="secondary"
                      className="rounded-full border-white/30 bg-white/10 px-10 py-3.5 text-sm text-on-dark backdrop-blur-sm hover:border-white/45 hover:bg-white/16"
                    >
                      Our Core Expertise
                    </ButtonLink>
                  </div>
                </div>

                <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl border border-white/20 shadow-[0_20px_48px_-16px_rgba(2,10,99,0.55)] sm:aspect-[4/3] lg:aspect-[5/4]">
                  <Image
                    src={HERO_IMAGE}
                    alt="Scientist working in the HKR Biotech laboratory"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Our Core Expertise */}
      <section className="relative z-10 mt-24 px-4 sm:px-6 lg:px-8" aria-labelledby="core-expertise-heading">
        <div className="mx-auto max-w-6xl">
          <RevealOnScroll>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-accent sm:text-[11px]">What we deliver</p>
            <h2
              id="core-expertise-heading"
              className="mt-3 font-display text-3xl font-extrabold tracking-tight text-on-dark sm:text-4xl md:text-5xl"
            >
              {aboutCoreExpertise.heading}
            </h2>
          </RevealOnScroll>

          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-12 lg:gap-7">
            {aboutCoreExpertise.items.map((item, i) => {
              const v = BRAND_SOLID_CARD_CYCLE[expertiseCycle % BRAND_SOLID_CARD_CYCLE.length];
              expertiseCycle += 1;
              const light = v.surface === "#e8f4ef";
              const bentoSpan = EXPERTISE_BENTO_SPANS[i] ?? "lg:col-span-4";
              return (
                <RevealOnScroll key={item.title} delay={i * 55} className={bentoSpan}>
                  <article
                    style={{ backgroundColor: v.surface }}
                    className={cn(
                      "relative flex h-full min-h-0 flex-col overflow-hidden rounded-[2rem] border p-9 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_-18px_rgba(2,10,99,0.4)] sm:p-10 md:p-11",
                      i === 0 && "lg:min-h-[260px]",
                      v.shell,
                    )}
                  >
                    <span
                      className={cn(
                        "absolute right-7 top-6 font-mono text-xs font-semibold uppercase tracking-[0.2em]",
                        light ? v.secondary : "text-on-dark/40",
                      )}
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div
                      className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-30 blur-2xl"
                      style={{
                        background: light
                          ? "radial-gradient(circle, rgba(255,255,255,0.82), transparent 70%)"
                          : "radial-gradient(circle, rgba(255,255,255,0.34), transparent 70%)",
                      }}
                      aria-hidden
                    />
                    <span className={cn("relative mb-5 block h-12 w-12 rounded-full", v.orbShell)} style={{ background: v.orb }} aria-hidden />
                    <h3
                      className={cn(
                        "relative pr-14 font-display text-2xl font-extrabold leading-snug tracking-tight sm:text-3xl md:text-3xl lg:leading-tight",
                        v.title,
                      )}
                    >
                      {item.title}
                    </h3>
                    <p className={cn("relative mt-5 flex-1 text-sm leading-relaxed sm:text-base md:text-lg md:leading-relaxed", v.body)}>
                      {item.description}
                    </p>
                  </article>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      <AboutWhyChooseSection />

      <ExpertsContent />
    </div>
  );
}
