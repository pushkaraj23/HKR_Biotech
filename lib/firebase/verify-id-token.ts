import { createRemoteJWKSet, jwtVerify } from "jose";
import { firebaseBrowserConfig } from "@/lib/firebase/config";

const jwks = createRemoteJWKSet(
  new URL("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"),
);

export async function verifyFirebaseIdTokenPublic(
  idToken: string,
): Promise<{ uid: string; email?: string; name?: string }> {
  const projectId = firebaseBrowserConfig.projectId;
  if (!projectId) {
    throw new Error("NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set");
  }

  const { payload } = await jwtVerify(idToken, jwks, {
    issuer: `https://securetoken.google.com/${projectId}`,
    audience: projectId,
    clockTolerance: 60,
  });

  const uid = payload.sub;
  if (!uid) {
    throw new Error("Invalid token payload");
  }

  const email = typeof payload.email === "string" ? payload.email : undefined;
  const name = typeof payload.name === "string" ? payload.name.trim() : undefined;
  return { uid, email, name: name || undefined };
}
