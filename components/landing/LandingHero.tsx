import { LandingHeroBackground } from "@/components/landing/LandingHeroBackground";
import { HeroCatalogSearch } from "@/components/landing/HeroCatalogSearch";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ButtonLink } from "@/components/ui/ButtonLink";

const STATS = [
  { value: "200+", label: "Products" },
  { value: "99.5%", label: "Purity" },
  { value: "50+", label: "Countries" },
  { value: "15+", label: "Years" },
] as const;

const TRUST_CHIPS = ["ALCOA+ records", "QC you can cite"] as const;

export function LandingHero() {
  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <LandingHeroBackground />
      {/* Main content */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col px-4 pt-[calc(4.5rem+max(0.75rem,env(safe-area-inset-top))+0.75rem)] sm:px-6 sm:pt-[calc(var(--site-header-offset,6rem)+1.5rem)] lg:px-8">
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-start pb-8 sm:justify-center sm:pb-10">
          <RevealOnScroll>
            <div className="flex flex-col gap-5 sm:gap-10">
              <HeroCatalogSearch />

              <div>
            {/* Main heading */}
            <h1
              className="mx-auto max-w-5xl text-center font-display text-[2.15rem] font-extrabold leading-[1.08] tracking-tight text-on-dark sm:text-[2.85rem] lg:text-[3.5rem]"
              style={{ textShadow: "0 2px 18px rgba(18,25,35,0.45)" }}
            >
              Global Suppliers in Affordable Custom{" "}
              <span className="gradient-text-shimmer">Glycan Synthesis</span> & Sugar Building Blocks
            </h1>

            {/* Subtitle */}
            <p
              className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-on-dark sm:text-xl"
              style={{ textShadow: "0 1px 12px rgba(18,25,35,0.4)" }}
            >
              High-purity protected monosaccharides and modified nucleotide sugars;
              <span className="font-semibold text-accent">  engineered for precision, priced for research</span>, and shipped worldwide.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <ButtonLink href="/products" color="blue" surface="dark" className="rounded-full px-10 py-3.5 text-base">
                Explore Catalogue
                <span aria-hidden className="text-base">→</span>
              </ButtonLink>
              <ButtonLink
                href="/contact"
                color="green"
                surface="dark"
                className="rounded-full px-10 py-3.5 text-base"
              >
                Start an Enquiry
              </ButtonLink>
            </div>

            {/* Trust chips */}
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-on-dark">
              {TRUST_CHIPS.map((chip, i) => (
                <li key={chip} className="flex items-center gap-2">
                  <svg
                    aria-hidden
                    viewBox="0 0 20 20"
                    className="h-3.5 w-3.5 text-primary"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 011.42-1.42L8.5 12.09l6.79-6.8a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{chip}</span>
                  {i < TRUST_CHIPS.length - 1 && (
                    <span aria-hidden className="hidden h-1 w-1 rounded-full bg-on-dark/45 sm:inline-block" />
                  )}
                </li>
              ))}
            </ul>
              </div>
            </div>
          </RevealOnScroll>

          {/* Stats row with elegant dividers */}
          <RevealOnScroll delay={150}>
            <div className="mx-auto mt-16 max-w-4xl">
              <div
                className="relative rounded-[1.75rem] border border-on-dark/25 px-6 py-6 shadow-[0_16px_40px_-12px_rgba(18,25,35,0.5)] backdrop-blur-md sm:px-8"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(18,25,35,0.65) 0%, rgba(27,38,50,0.55) 50%, rgba(44,59,77,0.5) 100%)",
                }}
              >
                {/* Subtle top accent line */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-px left-1/2 h-px w-2/3 -translate-x-1/2"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,177,98,0.75) 50%, transparent 100%)",
                  }}
                />

                <dl className="grid grid-cols-2 gap-y-5 sm:grid-cols-4 sm:divide-x sm:divide-on-dark/20 sm:gap-y-0">
                  {STATS.map((s) => (
                    <div
                      key={s.label}
                      className="flex flex-col items-center gap-1 px-2 sm:px-4"
                    >
                      <dt className="font-display text-3xl font-extrabold tracking-tight text-on-dark sm:text-4xl">
                        {s.value}
                      </dt>
                      <dd className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-on-dark/85">
                        {s.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Scroll indicator — in document flow below hero content */}
        <div
          className="mx-auto mt-6 hidden flex-col items-center gap-2.5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2 sm:mt-10 sm:flex sm:gap-3 sm:pb-8"
          aria-hidden
        >
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.35em] text-on-dark-muted">
            Scroll
          </span>
          <div className="flex h-9 w-5 justify-center rounded-full border border-on-dark/30 bg-on-dark/[0.06] backdrop-blur-md">
            <span className="mt-1.5 h-1.5 w-0.5 animate-bounce rounded-full bg-primary-mid" />
          </div>
        </div>
      </div>
    </section>
  );
}
