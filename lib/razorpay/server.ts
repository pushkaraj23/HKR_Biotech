import Razorpay from "razorpay";
import { createHmac } from "crypto";
import { getRazorpayKeyId, getRazorpayKeySecret, isRazorpayConfigured } from "@/lib/razorpay/config";

let client: Razorpay | null = null;

export function getRazorpayClient(): Razorpay {
  if (!isRazorpayConfigured()) {
    throw new Error("Razorpay is not configured (NEXT_PUBLIC_RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET).");
  }
  if (!client) {
    client = new Razorpay({
      key_id: getRazorpayKeyId(),
      key_secret: getRazorpayKeySecret(),
    });
  }
  return client;
}

export async function createRazorpayOrder(params: {
  amountPaise: number;
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}) {
  const rz = getRazorpayClient();
  return rz.orders.create({
    amount: params.amountPaise,
    currency: params.currency,
    receipt: params.receipt,
    notes: params.notes,
  });
}

export function verifyRazorpayPaymentSignature(params: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}): boolean {
  const secret = getRazorpayKeySecret();
  if (!secret) return false;
  const body = `${params.razorpayOrderId}|${params.razorpayPaymentId}`;
  const expected = createHmac("sha256", secret).update(body).digest("hex");
  return expected === params.razorpaySignature;
}
