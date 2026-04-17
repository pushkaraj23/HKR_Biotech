"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { onAuthStateChanged, signOut as firebaseSignOut, type User } from "firebase/auth";
import { initFirebaseAnalytics } from "@/lib/firebase/analytics";
import { getFirebaseApp, getFirebaseAuth } from "@/lib/firebase/client";
import { isFirebaseConfigured } from "@/lib/firebase/config";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  configured: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const configured = isFirebaseConfigured();

  useEffect(() => {
    if (!configured) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "[firebase] Auth disabled: set NEXT_PUBLIC_FIREBASE_* in .env.local (see .env.example).",
        );
      }
      setLoading(false);
      return;
    }

    let unsub: (() => void) | undefined;
    try {
      const app = getFirebaseApp();
      void initFirebaseAnalytics(app);
      const auth = getFirebaseAuth();
      unsub = onAuthStateChanged(auth, (next) => {
        setUser(next);
        setLoading(false);
      });
    } catch {
      setLoading(false);
    }

    return () => {
      unsub?.();
    };
  }, [configured]);

  const signOut = useCallback(async () => {
    if (!configured) {
      return;
    }
    try {
      const auth = getFirebaseAuth();
      await firebaseSignOut(auth);
    } catch {
      /* ignore */
    }
  }, [configured]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      configured,
      signOut,
    }),
    [user, loading, configured, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
