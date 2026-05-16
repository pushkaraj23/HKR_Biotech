import Image from "next/image";
import Link from "next/link";
import {
  servicesCommitmentColumns,
  servicesCommitmentHeading,
} from "@/data/servicesPageContent";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { LANDING_CONTAINER, LANDING_SECTION } from "@/components/landing/landingSection";
import { ButtonLink } from "@/components/ui/ButtonLink";

const LAB_IMAGE =
  "https://images.unsplash.com/photo-1582560486415-e67bced0ca2d?w=1200&h=900&fit=crop&q=80&auto=format";

const ACCENT_ORDER = ["primary", "secondary", "danger"] as const;

const ACCENT_CLASSES = {
  primary: {
    bar: "from-primary to-primary-deep",
    itemBg: "bg-primary/14 border-primary/32",
    title: "text-on-dark",
    copy: "text-on-dark/86",
  },
  secondary: {
    bar: "from-accent to-[#7AE38D]",
    itemBg: "bg-accent/18 border-accent/36",
    title: "text-on-dark",
    copy: "text-on-dark/88",
  },
  danger: {
    bar: "from-light to-tint-accent",
    itemBg: "bg-white/84 border-white/55",
    title: "text-foreground",
    copy: "text-foreground/82",
  },
};

const STATS = [
  { value: "99.7%", label: "QC Pass" },
  { value: "< 48h", label: "RFQ Response" },
  { value: "CoA + NMR", label: "Every shipment" },
];

export function LandingLabStory() {
  return (
    <section className={LANDING_SECTION} aria-labelledby="landing-commitment-heading">
      <div
        className={`${LANDING_CONTAINER} grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-stretch lg:gap-14`}
      >
        <RevealOnScroll className="relative order-2 lg:order-1">
          <div className="relative h-full min-h-[480px] overflow-hidden rounded-[2rem] border border-border-strong/50 shadow-[var(--elev-card-stack)] sm:min-h-[540px] lg:min-h-[640px]">
            <Image
              src={LAB_IMAGE}
              alt="Laboratory quality and documentation"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(27,38,50,0.85) 0%, rgba(27,38,50,0.35) 45%, rgba(27,38,50,0.04) 75%, transparent 100%)",
              }}
            />

            <div className="absolute inset-x-0 bottom-28 p-8 sm:bottom-32 sm:p-10">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
                Delivery you can plan on
              </p>
              <p className="mt-3 max-w-md font-display text-2xl font-extrabold leading-snug text-on-dark sm:text-3xl">
                Documented release, worldwide logistics, protected IP.
              </p>
            </div>

            <div className="absolute inset-x-5 bottom-5 hidden gap-0 rounded-2xl border border-on-dark/25 bg-[rgba(18,25,35,0.62)] shadow-[0_14px_32px_-10px_rgba(18,25,35,0.62)] backdrop-blur-md sm:flex">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex-1 px-5 py-4 ${i !== STATS.length - 1 ? "border-r border-on-dark/20" : ""}`}
                >
                  <p className="font-display text-xl font-extrabold tracking-tight text-on-dark">{s.value}</p>
                  <p className="mt-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-on-dark/80">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <div className="order-1 lg:order-2">
          <RevealOnScroll>
            <div
              className="relative overflow-hidden rounded-[2rem] border border-white/45 px-6 py-8 shadow-[0_16px_42px_-14px_rgba(18,50,90,0.3)] backdrop-blur-md sm:px-10"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in srgb, var(--light) 86%, var(--primary) 14%) 0%, color-mix(in srgb, var(--light) 74%, var(--primary-mid) 26%) 45%, color-mix(in srgb, var(--light) 78%, var(--accent) 22%) 100%)",
              }}
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/70">
                {servicesCommitmentHeading}
              </p>
              <h2
                id="landing-commitment-heading"
                className="max-w-xl font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl"
              >
                What you can <span className="text-primary-deep">expect</span> on every order
              </h2>
              <p className="mt-3 max-w-xl text-lg leading-relaxed text-foreground/80 md:text-xl">
                The same commitments we outline on our services page — shipping, analytics, and confidentiality handled
                as part of the project, not an afterthought.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <ul className="mt-8 space-y-4">
              {servicesCommitmentColumns.map((col, i) => {
                const accent = ACCENT_ORDER[i % ACCENT_ORDER.length];
                const a = ACCENT_CLASSES[accent];
                return (
                  <li
                    key={col.title}
                    className={`group flex gap-4 rounded-2xl border p-4 shadow-[0_10px_24px_-12px_rgba(18,50,90,0.45)] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(18,50,90,0.55)] ${a.itemBg}`}
                  >
                    <span
                      aria-hidden
                      className={`mt-1 h-10 w-1 shrink-0 rounded-full bg-gradient-to-b ${a.bar}`}
                    />
                    <div className="flex-1">
                      <h3 className={`font-display text-base font-extrabold sm:text-lg ${a.title}`}>{col.title}</h3>
                      <p className={`mt-1 text-sm leading-relaxed sm:text-base ${a.copy}`}>{col.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </RevealOnScroll>

          <RevealOnScroll delay={180}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink href="/services" className="rounded-full px-8">
                View all services
              </ButtonLink>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition hover:text-primary-deep"
              >
                Request a quote
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
