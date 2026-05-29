import { NextResponse } from "next/server";
import { requireUserAuth } from "@/lib/api/user-auth";
import { loadUserOrders } from "@/lib/commerce/orders-firestore";

export async function GET(req: Request) {
  const auth = await requireUserAuth(req);
  if (auth instanceof NextResponse) return auth;

  try {
    const orders = await loadUserOrders(auth.uid);
    return NextResponse.json({ orders });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load orders" },
      { status: 500 },
    );
  }
}
