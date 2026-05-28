export function getRazorpayKeyId(): string {
  return process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim() ?? "";
}

export function getRazorpayKeySecret(): string {
  return process.env.RAZORPAY_KEY_SECRET?.trim() ?? "";
}

export function isRazorpayConfigured(): boolean {
  return Boolean(getRazorpayKeyId() && getRazorpayKeySecret());
}
