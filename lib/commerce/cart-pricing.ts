export type CartPricingLine = {
  slug: string;
  chemicalName: string;
  catalogNumber: string;
  variantSize?: string;
  variantPrice?: string;
  quantity: number;
};

export type CartPricingSummary = {
  lineCount: number;
  totalUnits: number;
  pricedLineCount: number;
  quoteLineCount: number;
  subtotal: number;
  currencyHint: string | null;
  lines: Array<{
    slug: string;
    label: string;
    quantity: number;
    unitPrice: number | null;
    lineTotal: number | null;
    priceLabel: string;
  }>;
};

/** Extract a numeric amount from display prices like "$140.00" or "₹1,200". */
export function parsePriceAmount(raw: string | undefined): number | null {
  const trimmed = String(raw ?? "").trim();
  if (!trimmed || /quote|request|contact|tbd|n\/a/i.test(trimmed)) return null;
  const normalized = trimmed.replace(/,/g, "");
  const match = normalized.match(/-?\d+(?:\.\d+)?/);
  if (!match) return null;
  const value = Number(match[0]);
  return Number.isFinite(value) ? value : null;
}

function detectCurrencyHint(samples: string[]): string | null {
  for (const sample of samples) {
    if (sample.includes("₹")) return "INR";
    if (sample.includes("$")) return "USD";
    if (sample.includes("€")) return "EUR";
    if (sample.includes("£")) return "GBP";
  }
  return null;
}

export function formatMoney(amount: number, currencyHint: string | null): string {
  if (currencyHint === "USD") {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
  }
  if (currencyHint === "EUR") {
    return new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(amount);
  }
  if (currencyHint === "GBP") {
    return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(amount);
  }
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);
}

export function summarizeCart(items: CartPricingLine[]): CartPricingSummary {
  const priceSamples = items.map((i) => String(i.variantPrice ?? "").trim()).filter(Boolean);
  const currencyHint = detectCurrencyHint(priceSamples);

  const lines = items.map((item) => {
    const qty = Math.max(1, Number(item.quantity ?? 1));
    const priceLabel = String(item.variantPrice ?? "").trim() || "Quote on request";
    const unitPrice = parsePriceAmount(item.variantPrice);
    const lineTotal = unitPrice === null ? null : unitPrice * qty;
    const size = item.variantSize?.trim();
    const label = size ? `${item.chemicalName} · ${size}` : item.chemicalName;

    return {
      slug: item.slug,
      label,
      quantity: qty,
      unitPrice,
      lineTotal,
      priceLabel,
    };
  });

  const pricedLines = lines.filter((l) => l.lineTotal !== null);
  const subtotal = pricedLines.reduce((sum, l) => sum + (l.lineTotal ?? 0), 0);

  return {
    lineCount: items.length,
    totalUnits: items.reduce((sum, i) => sum + Math.max(1, Number(i.quantity ?? 1)), 0),
    pricedLineCount: pricedLines.length,
    quoteLineCount: lines.length - pricedLines.length,
    subtotal,
    currencyHint,
    lines,
  };
}
