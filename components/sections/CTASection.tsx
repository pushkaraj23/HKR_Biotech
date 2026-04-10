import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { cn } from "@/lib/cn";

type CTASectionProps = {
  title: string;
  description?: string;
  className?: string;
};

export function CTASection({ title, description, className }: CTASectionProps) {
  return (
    <SectionWrapper className={cn("py-16 md:py-20", className)}>
      <div className="relative overflow-hidden rounded-[2rem] border border-border-subtle bg-gradient-to-r from-bg-secondary via-white to-bg-secondary px-8 py-12 shadow-[0_4px_32px_-8px_rgba(15,23,42,0.08)] md:px-14 md:py-16">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-80"
          style={{
            background:
              "radial-gradient(ellipse at 70% 50%, rgba(14,165,233,0.1), transparent 55%)",
          }}
        />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              {title}
            </h2>
            {description ? (
              <p className="mt-4 text-lg leading-relaxed text-text-secondary">{description}</p>
            ) : null}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/contact">Request RFQ</ButtonLink>
            <ButtonLink href="/products" variant="secondary">
              Explore products
            </ButtonLink>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
