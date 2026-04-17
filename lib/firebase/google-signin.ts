import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export async function signInWithGooglePopup(): Promise<void> {
  const auth = getFirebaseAuth();
  await signInWithPopup(auth, googleProvider);
}
