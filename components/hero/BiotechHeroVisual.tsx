import { cn } from "@/lib/cn";

type BiotechHeroVisualProps = {
  className?: string;
};

export function BiotechHeroVisual({ className }: BiotechHeroVisualProps) {
  return (
    <div
      className={cn("relative mx-auto aspect-square max-w-lg md:max-w-none", className)}
      aria-hidden
    >
      <div className="absolute inset-0 animate-float-soft">
        <svg viewBox="0 0 400 400" className="h-full w-full" fill="none">
          <defs>
            <radialGradient id="g1" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="rgba(14,165,233,0.45)" />
              <stop offset="45%" stopColor="rgba(29,78,216,0.18)" />
              <stop offset="100%" stopColor="rgba(248,250,252,0)" />
            </radialGradient>
            <radialGradient id="g2" cx="35%" cy="55%" r="55%">
              <stop offset="0%" stopColor="rgba(99,102,241,0.35)" />
              <stop offset="100%" stopColor="rgba(248,250,252,0)" />
            </radialGradient>
            <radialGradient id="g3" cx="60%" cy="60%" r="50%">
              <stop offset="0%" stopColor="rgba(14,165,233,0.35)" />
              <stop offset="100%" stopColor="rgba(248,250,252,0)" />
            </radialGradient>
            <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
            </filter>
          </defs>
          <circle cx="200" cy="200" r="160" fill="url(#g1)" filter="url(#blur)" opacity="0.95" />
          <ellipse cx="150" cy="180" rx="90" ry="85" fill="url(#g2)" opacity="0.85" />
          <ellipse cx="240" cy="230" rx="75" ry="70" fill="url(#g3)" opacity="0.9" />
          <circle cx="200" cy="195" r="38" fill="rgba(14,165,233,0.25)" stroke="rgba(148,163,184,0.35)" />
          <circle cx="200" cy="195" r="18" fill="rgba(99,102,241,0.45)" />
          <ellipse
            cx="265"
            cy="140"
            rx="28"
            ry="26"
            fill="rgba(14,165,233,0.15)"
            stroke="rgba(14,165,233,0.35)"
            strokeWidth="1"
          />
          <ellipse
            cx="130"
            cy="260"
            rx="32"
            ry="30"
            fill="rgba(99,102,241,0.12)"
            stroke="rgba(99,102,241,0.3)"
            strokeWidth="1"
          />
        </svg>
      </div>
      <div
        className="pointer-events-none absolute inset-0 rounded-full opacity-60 blur-3xl animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(14,165,233,0.14), transparent 55%)",
        }}
      />
    </div>
  );
}
