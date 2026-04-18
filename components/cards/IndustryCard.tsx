import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/cn";
import type { Industry } from "@/lib/types";

type IndustryCardProps = {
  industry: Industry;
  className?: string;
};

export function IndustryCard({ industry, className }: IndustryCardProps) {
  return (
    <GlassCard className={cn("flex h-full flex-col", className)}>
      <div
        className="mb-6 h-36 rounded-2xl bg-gradient-to-br from-light/95 via-surface to-light/80 ring-1 ring-border"
        role="img"
        aria-label=""
      />
      <h3 className="font-display text-xl font-semibold text-foreground">{industry.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {industry.description}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink href="/contact" variant="secondary" className="px-4 py-2 text-xs">
          Discuss your project
        </ButtonLink>
        <Link
          href={`/industries#${industry.slug}`}
          className="inline-flex items-center px-2 text-xs text-primary hover:underline"
        >
          Learn more
        </Link>
      </div>
    </GlassCard>
  );
}
