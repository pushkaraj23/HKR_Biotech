import { getAnalytics, isSupported } from "firebase/analytics";
import type { FirebaseApp } from "firebase/app";
import { firebaseBrowserConfig } from "@/lib/firebase/config";

/** Browser-only; no-op if Analytics unsupported or measurementId missing. */
export async function initFirebaseAnalytics(app: FirebaseApp): Promise<void> {
  if (typeof window === "undefined") {
    return;
  }
  if (!firebaseBrowserConfig.measurementId) {
    return;
  }
  try {
    if (!(await isSupported())) {
      return;
    }
    getAnalytics(app);
  } catch {
    /* ignore */
  }
}
