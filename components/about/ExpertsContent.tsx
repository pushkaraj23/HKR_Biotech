import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/cn";
import {
  ABOUT_EXPERTS_LINKS,
  cultureSection,
  workWithExpertsSection,
} from "@/data/aboutExpertsContent";

function IconQuote({ className }: { className?: string }) {
  return (
    <span className={cn("font-serif text-[4.5rem] leading-[0.85] text-primary/18 select-none", className)} aria-hidden>
      &ldquo;
    </span>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 7h16v10H4z" strokeLinejoin="round" />
      <path d="M4 7l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function ExpertsContent() {
  return (
    <section className="relative z-10 mt-20 px-4 sm:px-6 lg:px-8" aria-labelledby="culture-heading">
      <div className="mx-auto max-w-6xl space-y-14 md:space-y-16">
        {/* Culture — split editorial + quote */}
        <RevealOnScroll>
          <div className="group/culture relative overflow-hidden rounded-[1.75rem] border border-white/45 shadow-[0_28px_60px_-24px_rgba(2,10,99,0.5)]">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(118deg, #f6fcff 0%, color-mix(in srgb, var(--light) 90%, var(--primary) 10%) 38%, #e4f6ee 72%, color-mix(in srgb, #dff5eb 88%, var(--accent) 12%) 100%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(8,60,120,0.11) 1px, transparent 0)`,
                backgroundSize: "32px 32px",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-32 top-1/2 h-[120%] w-[55%] -translate-y-1/2 rounded-full opacity-30 blur-3xl transition-opacity duration-700 group-hover/culture:opacity-45"
              style={{
                background: "radial-gradient(ellipse at center, color-mix(in srgb, var(--accent) 40%, transparent), transparent 68%)",
              }}
              aria-hidden
            />

            <div className="relative grid gap-10 p-8 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-12">
              <div className="lg:col-span-5 lg:pt-1">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#1459b8]/90">Culture</p>
                <h2
                  id="culture-heading"
                  className="mt-3 font-display text-4xl font-extrabold tracking-tight text-[#051018] md:text-5xl"
                >
                  {cultureSection.title}
                </h2>
                <p className="mt-4 max-w-md text-base text-[#1f4558] md:text-lg">{cultureSection.paragraph}</p>
              </div>

              <div className="relative lg:col-span-7">
                <div className="relative overflow-hidden rounded-2xl border border-[#1459b8]/22 bg-white/88 p-8 shadow-[0_24px_56px_-28px_rgba(5,24,40,0.4)] backdrop-blur-md sm:p-10">
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary-mid"
                    aria-hidden
                  />
                  <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/10 blur-2xl" aria-hidden />
                  <div className="relative">
                    <IconQuote className="block -mb-2" />
                    <blockquote className="mt-3 text-lg font-semibold leading-snug tracking-tight text-[#0a2233] sm:text-xl">
                      {cultureSection.philosophy}
                    </blockquote>
                    <div className="mt-6 flex items-center gap-3">
                      <span className="h-px flex-1 max-w-[5rem] bg-gradient-to-r from-primary/45 to-transparent" aria-hidden />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Work with experts — dark contrast band */}
        <RevealOnScroll>
          <div className="group/cta relative overflow-hidden rounded-[1.75rem] border border-white/12 shadow-[0_28px_64px_-18px_rgba(0,0,0,0.55)]">
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#06153a] via-[#041032] to-[#020A63]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
                backgroundSize: "48px 48px",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-primary/25 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-accent/20 blur-3xl transition-all duration-700 group-hover/cta:scale-110"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(80%,28rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent"
              aria-hidden
            />

            <div className="relative px-6 py-12 text-center sm:px-12 sm:py-14">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-primary-mid">Contact</p>
              <h3 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-on-dark sm:text-4xl">
                {workWithExpertsSection.title}
              </h3>
              <p className="mx-auto mt-4 max-w-md text-sm text-on-dark/75 sm:text-base">
                {workWithExpertsSection.intro}
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <ButtonLink
                  href="/contact"
                  className="rounded-full px-8 py-3.5 shadow-[0_12px_36px_-8px_rgba(43,196,138,0.45)] sm:px-10"
                >
                  <IconMail className="h-[1.1rem] w-[1.1rem] opacity-95" />
                  {workWithExpertsSection.primaryCtaLabel}
                </ButtonLink>
                <ButtonLink
                  href={ABOUT_EXPERTS_LINKS.workWithLinkedIn}
                  variant="secondary"
                  className="rounded-full border-white/22 bg-white/[0.12] px-8 py-3.5 font-semibold text-on-dark shadow-none backdrop-blur-sm hover:border-white/35 hover:bg-white/[0.2] hover:text-white sm:px-10"
                  prefetch={false}
                  target="_blank"
                >
                  <IconLinkedIn className="h-[1.05rem] w-[1.05rem]" />
                  {workWithExpertsSection.secondaryCtaLabel}
                </ButtonLink>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
