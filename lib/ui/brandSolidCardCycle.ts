/**
 * Solid blue / green / light cards with glow — shared by product “related” cards,
 * services listing, and other marketing surfaces. Cycle with index % 3.
 */
export const BRAND_SOLID_CARD_CYCLE = [
  {
    surface: "#1a73e8",
    shell:
      "border-white/35 text-white shadow-[0_8px_28px_-6px_rgba(13,71,161,0.55),0_0_32px_-10px_rgba(26,115,232,0.42)] hover:border-white/50 hover:shadow-[0_12px_36px_-6px_rgba(13,71,161,0.62),0_0_40px_-8px_rgba(26,115,232,0.52)]",
    eyebrow: "text-emerald-100/90",
    title: "text-white",
    titleHover: "hover:text-[#d4ecff]",
    titleGroupHover: "group-hover:text-[#d4ecff]",
    secondary: "text-white/75",
    body: "text-white/84",
    bullet:
      "mt-2 h-1.5 w-4 shrink-0 rounded-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.45)]",
    link: "text-[#c8e6ff] hover:text-white",
    thumbRing: "ring-2 ring-white/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]",
    stepBadge:
      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/18 text-sm font-bold text-white ring-1 ring-white/35",
    orb: "radial-gradient(circle at 30% 26%, #ffffff 0%, #f0f8ff 6%, #7eb8ff 32%, #1a73e8 58%, #0a3a78 100%)",
    orbShell:
      "ring-2 ring-white/45 shadow-[0_5px_16px_rgba(0,30,80,0.45),inset_0_4px_10px_rgba(255,255,255,0.55),inset_0_-10px_18px_rgba(0,25,70,0.35)]",
  },
  {
    surface: "#22a884",
    shell:
      "border-white/30 text-white shadow-[0_8px_28px_-6px_rgba(8,105,78,0.5),0_0_32px_-10px_rgba(43,196,138,0.38)] hover:border-white/45 hover:shadow-[0_12px_36px_-6px_rgba(8,105,78,0.58),0_0_40px_-8px_rgba(43,196,138,0.48)]",
    eyebrow: "text-emerald-50/95",
    title: "text-white",
    titleHover: "hover:text-[#e4fff4]",
    titleGroupHover: "group-hover:text-[#e8fff4]",
    secondary: "text-white/75",
    body: "text-white/84",
    bullet:
      "mt-2 h-1.5 w-4 shrink-0 rounded-full bg-white/90 shadow-[0_0_10px_rgba(220,255,245,0.5)]",
    link: "text-[#b8ffe8] hover:text-white",
    thumbRing: "ring-2 ring-white/32 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]",
    stepBadge:
      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/18 text-sm font-bold text-white ring-1 ring-white/32",
    orb: "radial-gradient(circle at 28% 24%, #ffffff 0%, #e8fff6 8%, #7ee8c4 34%, #22a884 56%, #064d3a 100%)",
    orbShell:
      "ring-2 ring-white/40 shadow-[0_5px_16px_rgba(0,55,40,0.42),inset_0_4px_10px_rgba(255,255,255,0.5),inset_0_-10px_18px_rgba(0,45,32,0.32)]",
  },
  {
    surface: "#e8f4ef",
    shell:
      "border-[#17324d]/12 text-[#0d2137] shadow-[0_8px_26px_-8px_rgba(23,50,77,0.16),0_0_36px_-12px_rgba(255,255,255,0.55)] hover:border-primary/25 hover:shadow-[0_12px_32px_-8px_rgba(23,50,77,0.2),0_0_44px_-10px_rgba(255,255,255,0.7)]",
    eyebrow: "text-[#1459b8]",
    title: "text-[#0d2137]",
    titleHover: "hover:text-primary",
    titleGroupHover: "group-hover:text-primary",
    secondary: "text-[#4f6478]",
    body: "text-[#234a62]",
    bullet: "mt-2 h-1.5 w-4 shrink-0 rounded-full bg-gradient-to-r from-primary to-accent",
    link: "text-[#1459b8] hover:text-primary-deep",
    thumbRing: "ring-2 ring-[#17324d]/12 shadow-sm",
    stepBadge:
      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/90 text-sm font-bold text-[#0d2137] ring-1 ring-primary/20",
    orb: "radial-gradient(circle at 30% 26%, #ffffff 0%, #eef6ff 8%, #9ec5ff 30%, #1a73e8 56%, #0c3a72 100%)",
    orbShell:
      "ring-2 ring-[#17324d]/15 shadow-[0_5px_14px_rgba(23,50,77,0.22),inset_0_4px_10px_rgba(255,255,255,0.65),inset_0_-10px_16px_rgba(10,40,90,0.22)]",
  },
] as const;

export type BrandSolidCardVariant = (typeof BRAND_SOLID_CARD_CYCLE)[number];
