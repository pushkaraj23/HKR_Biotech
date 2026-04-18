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
      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-r from-surface via-background to-surface px-8 py-12 shadow-elevated-sm md:px-14 md:py-16">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-80"
          style={{ background: "var(--cta-radial-glow)" }}
        />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {title}
            </h2>
            {description ? (
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{description}</p>
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
