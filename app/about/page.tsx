import Image from "next/image";
import type { Metadata } from "next";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Company overview, vision, leadership, infrastructure, and compliance posture at HKR Biotech Labs.",
};

const leadership = [
  {
    name: "Kishor R. Harale, PhD",
    role: "Director",
    bio: "Leads HKR Biotech with a focus on complex carbohydrate synthesis, API impurity programs, and practical R&D delivery for pharma and biotech partners.",
    image: "/team/founder.jpg",
    orb: "radial-gradient(circle at 35% 35%, rgba(153,246,228,0.85), rgba(20,184,166,0.6) 55%, rgba(15,118,110,0.4))",
    orbShadow: "0 8px 24px -4px rgba(20,184,166,0.35)",
    tint: "from-tint-primary/25 to-surface/80",
  },
  {
    name: "Scientific Program Team",
    role: "R&D, Analytical, and Consultation Support",
    bio: "A multidisciplinary team delivering route scouting, analytical characterization, and consultation support aligned to customer-specific development goals.",
    orb: "radial-gradient(circle at 35% 35%, rgba(196,181,253,0.85), rgba(124,58,237,0.6) 55%, rgba(91,33,182,0.4))",
    orbShadow: "0 8px 24px -4px rgba(91,33,182,0.3)",
    tint: "from-tint-accent/25 to-surface/80",
  },
];

const facilityLines = [
  "Synthesis support for complex carbohydrates, oligosaccharides, and glycoprotein-linked projects",
  "API impurity, nitrosamine impurity (NDSRI), and API standard development support",
  "Advanced analytical characterization using NMR, MS, UV, and IR techniques",
  "Route design, route scouting, and technical consultation for process development",
];

const complianceItems = [
  {
    k: "Quality system",
    v: "Document-controlled SOPs & training matrix",
    ring: "ring-primary/30",
    tint: "from-tint-primary/25 to-surface/80",
    orb: "radial-gradient(circle at 35% 35%, rgba(153,246,228,0.85), rgba(20,184,166,0.6) 55%, rgba(15,118,110,0.4))",
    orbShadow: "0 4px 14px -3px rgba(20,184,166,0.3)",
  },
  {
    k: "Data integrity",
    v: "ALCOA+ aligned analytical records",
    ring: "ring-violet-500/30",
    tint: "from-tint-accent/25 to-surface/80",
    orb: "radial-gradient(circle at 35% 35%, rgba(196,181,253,0.85), rgba(124,58,237,0.6) 55%, rgba(91,33,182,0.4))",
    orbShadow: "0 4px 14px -3px rgba(91,33,182,0.25)",
  },
  {
    k: "Safety",
    v: "Process hazard review for scale-up steps",
    ring: "ring-rose-500/30",
    tint: "from-tint-danger/25 to-surface/80",
    orb: "radial-gradient(circle at 35% 35%, rgba(253,164,175,0.85), rgba(225,29,72,0.6) 55%, rgba(159,18,57,0.4))",
    orbShadow: "0 4px 14px -3px rgba(159,18,57,0.22)",
  },
];

const BULLET_COLORS = [
  "from-teal-400 to-teal-600",
  "from-violet-400 to-violet-600",
  "from-rose-400 to-rose-600",
  "from-teal-400 to-violet-500",
] as const;

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=1200&h=600&fit=crop&q=80&auto=format";
const LAB_IMAGE =
  "https://images.unsplash.com/photo-1582560486415-e67bced0ca2d?w=900&h=600&fit=crop&q=80&auto=format";
const OVERVIEW_IMAGE =
  "https://images.unsplash.com/photo-1694230155228-cdde50083573?w=800&h=600&fit=crop&q=80&auto=format";

export default function AboutPage() {
  return (
    <div className="relative overflow-x-hidden pb-28">
      {/* ─── Hero ─── */}
      <section className="relative px-4 pt-6 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-overlay shadow-[0_12px_48px_-12px_rgba(0,0,0,0.5)]">
          <Image
            src={HERO_IMAGE}
            alt="HKR Biotech laboratory"
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
          <div className="relative px-8 py-14 sm:px-12 md:py-20 lg:max-w-[60%]">
            <RevealOnScroll>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-primary">
                About
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Welcome to{" "}
                <span className="gradient-text-shimmer">HKR Biotech</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                We deliver innovative and customized research solutions in carbohydrate
                chemistry, API impurity synthesis, and custom organic synthesis for
                pharma and biotech teams.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ─── Overview ─── */}
      <section className="relative mt-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <RevealOnScroll>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
              Overview
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Company Overview
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
              HKR Biotech Pvt. Ltd. is built to provide focused R&D support where
              complex chemistry, analytical depth, and responsive execution are all
              required together.
            </p>
          </RevealOnScroll>

          <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
            <RevealOnScroll>
              <div className="h-full overflow-hidden rounded-[1.75rem] border border-overlay bg-gradient-to-b from-tint-primary/25 to-surface/80 p-8 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_44px_-14px_rgba(0,0,0,0.5)]">
                <div
                  className="mb-6 h-12 w-12 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 35%, rgba(153,246,228,0.85), rgba(20,184,166,0.6) 55%, rgba(15,118,110,0.4))",
                    boxShadow: "0 8px 24px -4px rgba(20,184,166,0.3), inset 0 -2px 6px rgba(0,0,0,0.06)",
                  }}
                />
                <h3 className="font-display text-xl font-semibold text-foreground/95">What we do</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  We support synthesis of carbohydrate-related products, API impurities,
                  APIs, linker chemistry, and conjugation programs, backed by
                  characterization workflows tailored to each project.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={60}>
              <div className="relative h-full min-h-[280px] overflow-hidden rounded-[1.75rem] border border-overlay shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)]">
                <Image
                  src={OVERVIEW_IMAGE}
                  alt="Chemistry lab with colourful solutions"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(15,23,42,0.7) 0%, rgba(15,23,42,0.3) 40%, transparent 100%)",
                  }}
                />
                {/* Floating orb */}
                <div
                  className="absolute right-6 top-6 h-10 w-10 rounded-full animate-orbit-slow"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5), rgba(124,58,237,0.3) 55%, rgba(91,33,182,0.1))",
                    boxShadow: "0 6px 20px -4px rgba(91,33,182,0.3)",
                    animationDelay: "-3s",
                  }}
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-primary-mid">
                    Lab footprint
                  </p>
                  <p className="mt-3 font-display text-xl font-bold leading-snug text-foreground">
                    Scientific execution designed for reproducible outcomes.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ─── Vision & Mission ─── */}
      <section className="relative mt-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 md:gap-8">
          <RevealOnScroll>
            <div
              className="group relative h-full overflow-hidden rounded-[1.75rem] border border-overlay p-8 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_-14px_rgba(0,0,0,0.5)]"
              style={{
                background:
                  "linear-gradient(145deg, rgba(20,184,166,0.12) 0%, rgba(124,58,237,0.08) 60%, rgba(91,33,182,0.1) 100%)",
              }}
            >
              <div
                className="mb-6 h-10 w-10 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7), rgba(20,184,166,0.4) 55%, rgba(15,118,110,0.2))",
                  boxShadow: "0 6px 20px -4px rgba(20,184,166,0.35), inset 0 -2px 5px rgba(0,0,0,0.06)",
                }}
              />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">
                Vision
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold text-foreground/95 md:text-3xl">
                Pioneering innovation in complex carbohydrates and custom synthesis
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                To be a leading provider of bespoke R&D solutions that empower
                organizations to build with complex carbohydrates, API impurity science,
                and advanced custom synthesis.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={70}>
            <div
              className="group relative h-full overflow-hidden rounded-[1.75rem] border border-overlay p-8 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_-14px_rgba(0,0,0,0.5)]"
              style={{
                background:
                  "linear-gradient(145deg, rgba(124,58,237,0.12) 0%, rgba(225,29,72,0.08) 60%, rgba(244,63,94,0.1) 100%)",
              }}
            >
              <div
                className="mb-6 h-10 w-10 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7), rgba(124,58,237,0.4) 55%, rgba(91,33,182,0.2))",
                  boxShadow: "0 6px 20px -4px rgba(91,33,182,0.3), inset 0 -2px 5px rgba(0,0,0,0.06)",
                }}
              />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
                Mission
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold text-foreground/95 md:text-3xl">
                Deliver practical R&D support with scientific clarity
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Our mission is to provide customer-aligned development support in
                carbohydrate chemistry, API impurity programs, and advanced intermediate
                synthesis with transparent technical communication.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─── Leadership ─── */}
      <section className="relative mt-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <RevealOnScroll>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
              Leadership
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Team
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Meet the leadership and scientific team driving HKR Biotech programs.
            </p>
          </RevealOnScroll>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {leadership.map((person, i) => (
              <RevealOnScroll key={person.name} delay={i * 55}>
                <div
                  className={`group h-full overflow-hidden rounded-[1.75rem] border border-overlay bg-gradient-to-b ${person.tint} p-8 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_44px_-14px_rgba(0,0,0,0.5)]`}
                >
                  <div className="flex gap-5">
                    {person.image ? (
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-white/[0.16]">
                        <Image
                          src={person.image}
                          alt={person.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className="h-16 w-16 shrink-0 rounded-full ring-2 ring-white/[0.08]"
                        style={{
                          background: person.orb,
                          boxShadow: `${person.orbShadow}, inset 0 -3px 8px rgba(0,0,0,0.08)`,
                        }}
                        aria-hidden
                      />
                    )}
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground/95">
                        {person.name}
                      </h3>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-caption-foreground">
                        {person.role}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {person.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Infrastructure ─── */}
      <section className="relative mt-20 px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-overlay shadow-[0_12px_48px_-12px_rgba(0,0,0,0.5)]">
          <Image
            src={LAB_IMAGE}
            alt="Modern laboratory facility"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(15,23,42,0.6) 40%, rgba(15,23,42,0.4) 100%)",
            }}
          />

          {/* Floating orbs */}
          <div
            className="absolute right-[8%] top-8 h-12 w-12 rounded-full animate-orbit-slow"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.4), rgba(20,184,166,0.3) 55%, rgba(15,118,110,0.1))",
              boxShadow: "0 6px 20px -4px rgba(20,184,166,0.35)",
            }}
            aria-hidden
          />
          <div
            className="absolute bottom-12 left-[6%] h-7 w-7 rounded-full animate-orbit-slow"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.4), rgba(124,58,237,0.3) 55%, rgba(91,33,182,0.1))",
              boxShadow: "0 4px 14px -3px rgba(91,33,182,0.3)",
              animationDelay: "-5s",
              animationDuration: "14s",
            }}
            aria-hidden
          />

          <div className="relative px-8 py-14 sm:px-12 md:py-16">
            <RevealOnScroll>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-mid">
                Infrastructure
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
                Laboratory Facilities
              </h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Segregated synthesis suites, controlled storage, and redundant
                characterization — engineered for batch continuity.
              </p>
            </RevealOnScroll>

            <ul className="relative mt-10 grid gap-4 sm:grid-cols-2">
              {facilityLines.map((line, i) => (
                <RevealOnScroll key={line} delay={i * 50}>
                  <li className="flex gap-3 text-sm text-foreground/90">
                    <span
                      className={`mt-2 h-1.5 w-5 shrink-0 rounded-full bg-gradient-to-r ${BULLET_COLORS[i % BULLET_COLORS.length]} shadow-sm`}
                      aria-hidden
                    />
                    {line}
                  </li>
                </RevealOnScroll>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Compliance ─── */}
      <section className="relative mt-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <RevealOnScroll>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-danger">
              Compliance
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Certifications & Posture
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Phase-appropriate controls with a roadmap to formal audits where programs
              demand them.
            </p>
          </RevealOnScroll>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {complianceItems.map((item, i) => (
              <RevealOnScroll key={item.k} delay={i * 55}>
                <div
                  className={`h-full overflow-hidden rounded-[1.75rem] border border-overlay bg-gradient-to-b ${item.tint} p-7 shadow-[0_6px_28px_-8px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_44px_-14px_rgba(0,0,0,0.5)]`}
                >
                  <div
                    className="mb-5 h-9 w-9 rounded-full"
                    style={{
                      background: item.orb,
                      boxShadow: `${item.orbShadow}, inset 0 -1px 4px rgba(0,0,0,0.06)`,
                    }}
                  />
                  <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-caption-foreground">
                    {item.k}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.v}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
          <RevealOnScroll delay={180}>
            <p className="mt-10 text-center text-xs leading-relaxed text-caption-foreground">
              Formal GMP certification can be pursued via qualified partner sites — HKR
              orchestrates tech transfer when programs require audited batches.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative mt-20 px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div
            className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-overlay p-10 text-center shadow-[0_16px_64px_-16px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-14"
            style={{
              background:
                "linear-gradient(140deg, rgba(20,184,166,0.15) 0%, rgba(124,58,237,0.12) 35%, rgba(91,33,182,0.12) 55%, rgba(244,63,94,0.08) 100%)",
            }}
          >
            {/* Decorative orbs */}
            <div
              className="pointer-events-none absolute -left-4 top-8 h-16 w-16 rounded-full sm:h-20 sm:w-20"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7), rgba(20,184,166,0.4) 55%, rgba(15,118,110,0.2))",
                boxShadow: "0 8px 28px -6px rgba(20,184,166,0.35), inset 0 -2px 6px rgba(0,0,0,0.06)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-3 bottom-6 h-12 w-12 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7), rgba(124,58,237,0.4) 55%, rgba(91,33,182,0.2))",
                boxShadow: "0 6px 20px -4px rgba(91,33,182,0.3), inset 0 -2px 5px rgba(0,0,0,0.06)",
              }}
              aria-hidden
            />

            <div className="relative">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                Next step
              </p>
              <h2 className="mx-auto mt-3 max-w-xl font-display text-2xl font-bold text-foreground md:text-3xl">
                Tell Us About Your Route or Analytical Gap
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
                We respond with technical questions and realistic timelines — not
                generic brochures.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink
                  href="/contact"
                  className="rounded-full px-10 shadow-[0_14px_40px_-10px_rgba(15,118,110,0.4)]"
                >
                  Start a conversation
                </ButtonLink>
                <ButtonLink
                  href="/capabilities"
                  variant="secondary"
                  className="rounded-full px-10"
                >
                  View capabilities
                </ButtonLink>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}
