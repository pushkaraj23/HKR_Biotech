import { NextResponse } from "next/server";
import { verifyFirebaseIdTokenPublic } from "@/lib/firebase/verify-id-token";

export async function requireUserAuth(req: Request): Promise<{ uid: string; email?: string } | NextResponse> {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace(/^Bearer\s+/i, "");
  if (!token) {
    return NextResponse.json({ error: "Missing Authorization bearer token" }, { status: 401 });
  }

  const auth = await verifyFirebaseIdTokenPublic(token).catch(() => null);
  if (!auth) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
  return auth;
}
