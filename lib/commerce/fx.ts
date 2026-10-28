/**
 * Catalogue prices may be USD / INR / EUR / GBP.
 * By default Razorpay is charged in that same currency (amount in minor units).
 *
 * Set NEXT_PUBLIC_RAZORPAY_SETTLE_INR=true to convert foreign totals to INR
 * (needed only if the Razorpay account cannot accept international currencies).
 */

const DEFAULT_USD_TO_INR = 85;

const RAZORPAY_CURRENCIES = new Set(["INR", "USD", "EUR", "GBP"]);

export function getUsdToInrRate(): number {
  const raw = (
    process.env.NEXT_PUBLIC_USD_TO_INR_RATE ??
    process.env.USD_TO_INR_RATE ??
    String(DEFAULT_USD_TO_INR)
  ).trim();
  const rate = Number(raw);
  if (!Number.isFinite(rate) || rate <= 0) {
    throw new Error("USD_TO_INR_RATE must be a positive number");
  }
  return rate;
}

/** When true, convert non-INR catalogue totals to INR before creating the Razorpay order. */
export function shouldSettleRazorpayInInr(): boolean {
  const raw = (
    process.env.NEXT_PUBLIC_RAZORPAY_SETTLE_INR ??
    process.env.RAZORPAY_SETTLE_INR ??
    "false"
  )
    .trim()
    .toLowerCase();
  return raw === "1" || raw === "true" || raw === "yes";
}

export type RazorpayChargeBreakdown = {
  /** Currency sent to Razorpay. */
  currency: string;
  /** Minor units for Razorpay (cents / paise). */
  amountPaise: number;
  /** Catalogue currency detected from price labels. */
  catalogCurrency: string;
  /** Numeric catalogue subtotal (in catalogCurrency). */
  catalogSubtotal: number;
  /** Amount charged in `currency` (amountPaise / 100). */
  chargeSubtotal: number;
  /** Legacy alias when charge currency is INR. */
  inrSubtotal: number;
  /** FX rate used when converting to INR; null when no conversion. */
  fxRate: number | null;
};

function normalizeCatalogCurrency(catalogCurrency: string | null): string {
  const currency = (catalogCurrency ?? "USD").toUpperCase();
  if (!RAZORPAY_CURRENCIES.has(currency)) {
    throw new Error(
      `Online payment supports USD, INR, EUR, or GBP catalogue prices only (got ${currency}). Contact us for a quote.`,
    );
  }
  return currency;
}

/**
 * Map a catalogue cart total into a Razorpay charge.
 * Default: same currency as the catalogue (e.g. $100 → Razorpay USD 100).
 * Optional settle-in-INR: convert USD→INR via NEXT_PUBLIC_USD_TO_INR_RATE.
 */
export function toRazorpayCharge(
  catalogSubtotal: number,
  catalogCurrency: string | null,
): RazorpayChargeBreakdown {
  const catalog = normalizeCatalogCurrency(catalogCurrency);

  if (!shouldSettleRazorpayInInr() || catalog === "INR") {
    const amountPaise = Math.round(catalogSubtotal * 100);
    return {
      currency: catalog,
      amountPaise,
      catalogCurrency: catalog,
      catalogSubtotal,
      chargeSubtotal: catalogSubtotal,
      inrSubtotal: catalog === "INR" ? catalogSubtotal : 0,
      fxRate: null,
    };
  }

  if (catalog === "USD") {
    const fxRate = getUsdToInrRate();
    const inrSubtotal = catalogSubtotal * fxRate;
    const amountPaise = Math.round(inrSubtotal * 100);
    return {
      currency: "INR",
      amountPaise,
      catalogCurrency: "USD",
      catalogSubtotal,
      chargeSubtotal: inrSubtotal,
      inrSubtotal,
      fxRate,
    };
  }

  throw new Error(
    `INR settlement is only configured for USD catalogue prices (got ${catalog}). Disable RAZORPAY_SETTLE_INR or contact us for a quote.`,
  );
}

/** @deprecated Use toRazorpayCharge — kept for older imports. */
export function toRazorpayInrCharge(
  catalogSubtotal: number,
  catalogCurrency: string | null,
): RazorpayChargeBreakdown {
  return toRazorpayCharge(catalogSubtotal, catalogCurrency);
}

/** Client-safe estimate of the Razorpay charge for checkout UI. */
export function estimateRazorpayCharge(
  catalogSubtotal: number,
  catalogCurrency: string | null,
): RazorpayChargeBreakdown | null {
  try {
    return toRazorpayCharge(catalogSubtotal, catalogCurrency);
  } catch {
    return null;
  }
}

/** @deprecated Use estimateRazorpayCharge. */
export function estimateInrCharge(
  catalogSubtotal: number,
  catalogCurrency: string | null,
): RazorpayChargeBreakdown | null {
  return estimateRazorpayCharge(catalogSubtotal, catalogCurrency);
}
