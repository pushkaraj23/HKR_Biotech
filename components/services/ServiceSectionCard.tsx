import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ServiceSection } from "@/data/servicesPageContent";
import type { BrandSolidCardVariant } from "@/lib/ui/brandSolidCardCycle";

type ServiceSectionCardProps = {
  section: ServiceSection;
  variant: BrandSolidCardVariant;
  styleIndex: number;
};

export function ServiceSectionCard({ section, variant, styleIndex }: ServiceSectionCardProps) {
  const light = variant.surface === "#e8f4ef";
  const Icon = SERVICE_ICONS[styleIndex % SERVICE_ICONS.length];

  const cornerGlow = light
    ? "radial-gradient(ellipse 100% 90% at 0% 0%, rgba(255,255,255,0.95) 0%, rgba(43,196,138,0.14) 45%, transparent 68%)"
    : "radial-gradient(ellipse 95% 85% at 0% 0%, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.1) 40%, transparent 62%)";

  return (
    <article
      style={{ backgroundColor: variant.surface }}
      className={cn(
        "group relative overflow-hidden rounded-[1.75rem] border transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-[0_28px_60px_-20px_rgba(2,10,99,0.55)]",
        variant.shell,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[1.75rem]"
        style={{ background: cornerGlow }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
        style={{
          background: light
            ? "radial-gradient(circle, rgba(255,255,255,0.9), transparent 70%)"
            : "radial-gradient(circle, rgba(255,255,255,0.45), transparent 68%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-10 h-44 w-44 rounded-full opacity-20 blur-2xl"
        style={{
          background: light
            ? "radial-gradient(circle, color-mix(in srgb, var(--primary) 35%, transparent), transparent 70%)"
            : "radial-gradient(circle, rgba(255,255,255,0.25), transparent 70%)",
        }}
        aria-hidden
      />
      {!light ? (
        <div
          className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden
        />
      ) : null}

      <div className="relative px-8 py-9 sm:px-10 sm:py-10 md:px-12 md:py-11">
        <div className="flex items-start gap-5 sm:gap-6">
          <div
            className={cn(
              "relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-[1.04] sm:h-16 sm:w-16",
              light ? "bg-white/75 ring-1 ring-[#17324d]/10" : "bg-white/12 ring-1 ring-white/25",
            )}
          >
            <Icon className={cn("h-7 w-7 sm:h-8 sm:w-8", light ? "text-[#1459b8]" : "text-white")} />
            <div
              className={cn(
                "absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold tabular-nums sm:h-8 sm:w-8 sm:text-sm",
                light ? "bg-primary text-white shadow-md" : "bg-white/95 text-[#0d2137] shadow-lg",
              )}
            >
              {section.number}
            </div>
          </div>
          <h2
            className={cn(
              "min-w-0 flex-1 pt-1 font-display text-2xl font-extrabold leading-snug tracking-tight sm:text-3xl md:text-[2rem] md:leading-[1.15]",
              variant.title,
            )}
          >
            {section.heading}
          </h2>
        </div>

        <p
          className={cn(
            "mt-6 max-w-none text-lg leading-relaxed sm:mt-7 sm:text-xl sm:leading-relaxed",
            light ? "text-[#234a62]" : "text-white/88",
          )}
        >
          {section.intro}
        </p>

        <ul
          className={cn(
            "mt-8 space-y-4 sm:mt-9 sm:space-y-5",
            light ? "border-t border-[#17324d]/12 pt-8 sm:pt-9" : "border-t border-white/20 pt-8 sm:pt-9",
          )}
          role="list"
        >
          {section.bullets.map((bullet) => (
            <li
              key={bullet.label}
              className={cn(
                "rounded-2xl border px-6 py-5 transition-all duration-300 sm:px-7 sm:py-6",
                light
                  ? "border-[#17324d]/12 bg-white/80 shadow-[0_8px_24px_-12px_rgba(23,50,77,0.18)] group-hover:border-primary/20"
                  : "border-white/22 bg-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:border-white/32 group-hover:bg-white/[0.16]",
              )}
            >
              <h3
                className={cn(
                  "font-display text-xl font-bold leading-snug tracking-tight sm:text-2xl sm:leading-snug",
                  variant.title,
                )}
              >
                {bullet.label}
              </h3>
              <p className={cn("mt-3 text-base leading-relaxed sm:mt-3.5 sm:text-lg sm:leading-relaxed", variant.body)}>
                {bullet.body}
              </p>
              {bullet.subpoints && bullet.subpoints.length > 0 ? (
                <ul
                  className={cn(
                    "mt-4 space-y-2.5 border-t pt-4 sm:mt-5 sm:pt-5",
                    light ? "border-[#17324d]/10" : "border-white/16",
                  )}
                  role="list"
                >
                  {bullet.subpoints.map((sp) => (
                    <li key={sp} className="flex gap-3">
                      <span
                        className={cn(
                          "mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full",
                          light ? "bg-gradient-to-r from-primary to-accent" : "bg-white/75",
                        )}
                        aria-hidden
                      />
                      <span className={cn("text-base leading-relaxed sm:text-lg", variant.body)}>{sp}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>

        <div
          className={cn(
            "mt-8 flex flex-wrap items-center gap-4 border-t pt-8 sm:mt-9 sm:pt-9",
            light ? "border-[#17324d]/12" : "border-white/18",
          )}
        >
          <Link
            href="/contact"
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all duration-200 sm:text-base",
              light
                ? "bg-cta-gradient text-primary-foreground shadow-primary-glow hover:-translate-y-0.5 hover:shadow-primary-glow-lg"
                : "bg-white text-[#0d2137] shadow-md hover:-translate-y-0.5 hover:bg-white/95",
            )}
          >
            Request a quote
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

const SERVICE_ICONS = [IconGlycan, IconNucleotide, IconNmr, IconConjugate] as const;

function IconGlycan({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 3 16 8v8l-4 5-4-5V8l4-5Z" strokeLinejoin="round" />
      <path d="M8 11h8M12 7v8" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

function IconNucleotide({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M6 4c2 4 2 12 0 16M18 4c-2 4-2 12 0 16" strokeLinecap="round" />
      <path d="M8 8h8M8 16h8" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function IconNmr({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 18V6M8 18v-4M12 18V9M16 18v-7M20 18V4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconConjugate({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="7" cy="12" r="3" />
      <circle cx="17" cy="12" r="3" />
      <path d="M10 12h4" strokeLinecap="round" />
      <path d="M7 9V6M17 9V6M7 15v3M17 15v3" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}
