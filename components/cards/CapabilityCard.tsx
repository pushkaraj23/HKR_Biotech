import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/cn";
import type { CapabilityBlock } from "@/lib/types";

type CapabilityCardProps = {
  block: CapabilityBlock;
  className?: string;
};

export function CapabilityCard({ block, className }: CapabilityCardProps) {
  return (
    <GlassCard hover className={cn("h-full", className)}>
      <h3 className="font-display text-lg font-semibold text-text-primary">{block.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-text-secondary">{block.description}</p>
      {block.metrics && block.metrics.length > 0 ? (
        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border-subtle pt-6">
          {block.metrics.map((m) => (
            <div key={m.label}>
              <dt className="text-xs uppercase tracking-wider text-text-muted">{m.label}</dt>
              <dd className="mt-1 font-display text-lg font-semibold text-text-primary">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </GlassCard>
  );
}
