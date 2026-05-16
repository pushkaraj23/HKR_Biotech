import { servicesPartnerCta } from "@/data/servicesPageContent";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/cn";

export function ServicesPartnerSection({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="services-partner-heading"
      className={cn(
        "group relative overflow-hidden rounded-[1.75rem] border border-white/30 text-white",
        "shadow-[0_8px_28px_-6px_rgba(8,105,78,0.5),0_0_32px_-10px_rgba(43,196,138,0.38)]",
        "transition-all duration-300 hover:border-white/45",
        "hover:shadow-[0_12px_36px_-6px_rgba(8,105,78,0.58),0_0_40px_-8px_rgba(43,196,138,0.48)]",
        className,
      )}
      style={{ backgroundColor: "#22a884" }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[1.75rem]"
        style={{
          background:
            "radial-gradient(ellipse 95% 85% at 0% 0%, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.1) 40%, transparent 62%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 -top-16 h-56 w-56 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-45"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.45), transparent 68%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-10 h-44 w-44 rounded-full opacity-25 blur-2xl"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />

      <div className="relative px-8 py-10 text-center sm:px-10 sm:py-11 md:px-12 md:py-12">
        <h2
          id="services-partner-heading"
          className="mx-auto max-w-3xl font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl"
        >
          {servicesPartnerCta.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/88 sm:mt-6 sm:text-xl sm:leading-relaxed">
          {servicesPartnerCta.body}
        </p>
        <div className="mt-8 flex justify-center sm:mt-9">
          <ButtonLink
            href={servicesPartnerCta.buttonHref}
            color="white"
            surface="light"
            className="rounded-full px-10 py-3.5 text-base"
          >
            {servicesPartnerCta.buttonLabel}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
