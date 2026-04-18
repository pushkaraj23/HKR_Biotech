import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { firebaseBrowserConfig, isFirebaseConfigured } from "@/lib/firebase/config";

let _app: FirebaseApp | null = null;

/**
 * Firebase app + Firestore for server-side reads (RSC / route handlers).
 * Uses the same public web config as the browser client.
 */
function getServerApp(): FirebaseApp {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured (NEXT_PUBLIC_FIREBASE_* / NEXT_PUBLIC_FIREBASE_JSON).");
  }
  if (_app) {
    return _app;
  }
  const cfg = {
    apiKey: firebaseBrowserConfig.apiKey!,
    authDomain: firebaseBrowserConfig.authDomain!,
    projectId: firebaseBrowserConfig.projectId!,
    storageBucket: firebaseBrowserConfig.storageBucket,
    messagingSenderId: firebaseBrowserConfig.messagingSenderId,
    appId: firebaseBrowserConfig.appId!,
    measurementId: firebaseBrowserConfig.measurementId,
  };
  _app = getApps().length ? getApp() : initializeApp(cfg);
  return _app;
}

export function getServerFirestoreDb(): Firestore {
  return getFirestore(getServerApp());
}
