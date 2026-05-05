import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/cn";
import { BRAND_SOLID_CARD_CYCLE } from "@/lib/ui/brandSolidCardCycle";
import {
  ABOUT_EXPERTS_LINKS,
  cultureSection,
  expertProfiles,
  leadershipScientificHeading,
  meetExpertsSection,
  workWithExpertsSection,
  type ExpertDetailRow,
} from "@/data/aboutExpertsContent";

function DetailRows({ rows, variant }: { rows: readonly ExpertDetailRow[]; variant: (typeof BRAND_SOLID_CARD_CYCLE)[number] }) {
  const linkClass = cn("font-semibold underline-offset-2 hover:underline", variant.link);

  return (
    <ul className="mt-5 space-y-4 text-sm leading-relaxed">
      {rows.map((row, i) => {
        if (row.type === "links") {
          return (
            <li key={`links-${i}`} className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {row.items.map((item, j) => (
                <span key={`${item.label}-${item.href}`} className="inline-flex items-center gap-3">
                  {j > 0 ? (
                    <span className={cn("select-none opacity-50", variant.body)} aria-hidden>
                      ·
                    </span>
                  ) : null}
                  <Link href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {item.label}
                  </Link>
                </span>
              ))}
            </li>
          );
        }

        const hasLabel = row.label.trim().length > 0;
        return (
          <li key={`field-${i}`}>
            {hasLabel ? (
              <p className={cn("font-mono text-[10px] font-semibold uppercase tracking-[0.18em]", variant.secondary)}>{row.label}</p>
            ) : null}
            <p className={cn(hasLabel ? "mt-1.5" : "", variant.body)}>{row.text}</p>
          </li>
        );
      })}
    </ul>
  );
}

export function ExpertsContent() {
  let cycle = 0;

  return (
    <section className="relative z-10 mt-20 px-4 sm:px-6 lg:px-8" aria-labelledby="meet-experts-heading">
      <div className="mx-auto max-w-6xl space-y-16 md:space-y-20">
        {/* Meet Our Experts */}
        <RevealOnScroll>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">People & science</p>
          <h2 id="meet-experts-heading" className="mt-2 font-display text-3xl font-bold tracking-tight text-on-dark md:text-4xl">
            {meetExpertsSection.title}
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-on-dark/84">{meetExpertsSection.intro}</p>
        </RevealOnScroll>

        {/* Our Leadership & Scientific Team */}
        <div>
          <RevealOnScroll>
            <h3 className="font-display text-2xl font-bold tracking-tight text-on-dark md:text-3xl">{leadershipScientificHeading}</h3>
          </RevealOnScroll>

          <div className="mt-10 grid gap-8 lg:gap-10">
            {expertProfiles.map((profile, i) => {
              const v = BRAND_SOLID_CARD_CYCLE[cycle % BRAND_SOLID_CARD_CYCLE.length];
              cycle += 1;
              const light = v.surface === "#e8f4ef";

              return (
                <RevealOnScroll key={profile.name + profile.roleDescriptor} delay={i * 80}>
                  <article
                    style={{ backgroundColor: v.surface }}
                    className={cn(
                      "relative overflow-hidden rounded-[1.75rem] border p-8 transition-all duration-300 hover:-translate-y-0.5 sm:p-10",
                      v.shell,
                    )}
                  >
                    <div
                      className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-30 blur-3xl"
                      style={{
                        background:
                          light
                            ? "radial-gradient(circle, rgba(255,255,255,0.85), transparent 70%)"
                            : "radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%)",
                      }}
                      aria-hidden
                    />
                    <header
                      className="relative flex flex-col items-center gap-6 border-b pb-6 sm:flex-row sm:items-center sm:gap-8"
                      style={{ borderColor: light ? "rgba(23,50,77,0.12)" : "rgba(255,255,255,0.2)" }}
                    >
                      {profile.photoSrc ? (
                        <div
                          className={cn(
                            "relative mx-auto h-36 w-36 shrink-0 overflow-hidden rounded-2xl shadow-[0_10px_30px_-8px_rgba(0,0,0,0.35)] sm:mx-0 sm:h-40 sm:w-40",
                            light ? "ring-2 ring-[#17324d]/15" : "ring-2 ring-white/40",
                          )}
                        >
                          <Image
                            src={profile.photoSrc}
                            alt={profile.name.replace(/:/g, "").trim()}
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 640px) 144px, 160px"
                            priority={i === 0}
                          />
                        </div>
                      ) : (
                        <span className={cn("mb-0 block h-11 w-11 shrink-0 rounded-full sm:mb-0", v.orbShell)} style={{ background: v.orb }} aria-hidden />
                      )}
                      <div className="min-w-0 flex-1 text-center sm:text-left">
                        <p className={cn("font-display text-xl font-semibold leading-snug sm:text-2xl", v.title)}>{profile.name}</p>
                        <p className={cn("mt-2 text-sm leading-relaxed sm:text-base", v.body)}>{profile.roleDescriptor}</p>
                      </div>
                    </header>
                    <DetailRows rows={profile.rows} variant={v} />
                  </article>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>

        {/* A Culture of HKR Biotech */}
        <RevealOnScroll>
          <div
            className="relative overflow-hidden rounded-[1.75rem] border border-white/35 px-8 py-10 shadow-[0_16px_42px_-14px_rgba(2,10,99,0.35)] backdrop-blur-md sm:px-10 sm:py-12"
            style={{
              background:
                "linear-gradient(125deg, color-mix(in srgb, var(--light) 88%, var(--primary) 12%) 0%, color-mix(in srgb, var(--light) 78%, var(--accent) 22%) 52%, #e8f4ef 100%)",
            }}
          >
            <div
              className="pointer-events-none absolute -left-16 top-0 h-52 w-52 rounded-full opacity-45 blur-3xl"
              style={{
                background: "radial-gradient(circle, color-mix(in srgb, var(--primary) 25%, transparent), transparent 72%)",
              }}
              aria-hidden
            />
            <div className="relative">
              <h3 className="font-display text-2xl font-bold tracking-tight text-[#0d2137] md:text-3xl">{cultureSection.title}</h3>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#234a62] sm:text-lg">{cultureSection.paragraph}</p>
              <blockquote className="relative mt-8 border-l-[3px] border-primary pl-5 text-base font-medium leading-relaxed text-[#0d2137] sm:text-lg">
                {cultureSection.philosophy}
              </blockquote>
            </div>
          </div>
        </RevealOnScroll>

        {/* Work With Our Experts */}
        <RevealOnScroll>
          <div
            className="relative overflow-hidden rounded-[1.75rem] border border-white/45 px-8 py-12 text-center shadow-[0_16px_42px_-14px_rgba(18,50,90,0.28)] backdrop-blur-md sm:px-12 sm:py-14"
            style={{
              background:
                "linear-gradient(125deg, color-mix(in srgb, var(--light) 90%, var(--primary) 10%) 0%, color-mix(in srgb, var(--light) 82%, var(--accent) 18%) 55%, #e8f4ef 100%)",
            }}
          >
            <div
              className="pointer-events-none absolute -right-20 bottom-0 h-48 w-48 rounded-full opacity-40 blur-3xl"
              style={{
                background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 28%, transparent), transparent 72%)",
              }}
              aria-hidden
            />

            <div className="relative">
              <h3 className="font-display text-2xl font-bold tracking-tight text-[#0d2137] md:text-3xl">{workWithExpertsSection.title}</h3>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#234a62] sm:text-lg">{workWithExpertsSection.intro}</p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink href="/contact" className="rounded-full px-10 shadow-primary-glow">
                  {workWithExpertsSection.primaryCtaLabel}
                </ButtonLink>
                <ButtonLink
                  href={ABOUT_EXPERTS_LINKS.workWithLinkedIn}
                  variant="secondary"
                  className="rounded-full border-[#17324d]/18 bg-white/90 px-10 text-[#0d2137] hover:border-primary/35 hover:bg-white"
                  prefetch={false}
                  target="_blank"
                >
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
