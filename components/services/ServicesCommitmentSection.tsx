import {
  servicesCommitmentColumns,
  servicesCommitmentHeading,
} from "@/data/servicesPageContent";
import { cn } from "@/lib/cn";

const COMMITMENT_ICONS = [IconGlobe, IconShield, IconLock] as const;

export function ServicesCommitmentSection({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="services-commitment-heading"
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] border border-white/35 shadow-[0_16px_42px_-14px_rgba(2,10,99,0.35)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.9]"
        style={{
          background:
            "linear-gradient(125deg, color-mix(in srgb, var(--light) 88%, var(--primary) 12%) 0%, color-mix(in srgb, var(--light) 78%, var(--accent) 22%) 52%, #e8f4ef 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(23,50,77,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(23,50,77,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />

      <div className="relative px-8 py-9 sm:px-10 sm:py-10 md:px-12 md:py-11">
        <h2
          id="services-commitment-heading"
          className="font-display text-2xl font-extrabold tracking-tight text-[#0d2137] sm:text-3xl md:text-4xl"
        >
          {servicesCommitmentHeading}
        </h2>

        <div className="mt-8 overflow-hidden rounded-2xl border border-[#17324d]/14 bg-white/50 shadow-sm backdrop-blur-sm sm:mt-9">
          <div className="grid md:grid-cols-3 md:divide-x md:divide-[#17324d]/12">
            {servicesCommitmentColumns.map((col, i) => {
              const Icon = COMMITMENT_ICONS[i % COMMITMENT_ICONS.length];
              return (
                <div
                  key={col.title}
                  className={cn(
                    "flex flex-col px-6 py-6 sm:px-7 sm:py-7",
                    i > 0 && "border-t border-[#17324d]/12 md:border-t-0",
                  )}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 ring-1 ring-[#17324d]/10">
                    <Icon className="h-5 w-5 text-[#1459b8]" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-[#0d2137] sm:text-xl">
                    {col.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-[#234a62] sm:text-lg">{col.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function IconGlobe({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" strokeLinecap="round" />
    </svg>
  );
}

function IconShield({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" strokeLinejoin="round" />
      <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconLock({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" strokeLinecap="round" />
    </svg>
  );
}
