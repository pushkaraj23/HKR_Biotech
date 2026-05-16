"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthCard, authFieldClass, authLabelClass } from "@/components/auth/AuthFormFields";
import { GoogleGlyph } from "@/components/auth/GoogleGlyph";
import { useAuth } from "@/components/providers/AuthProvider";
import { getFirebaseAuthMessage } from "@/lib/firebase/auth-errors";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { missingFirebasePublicEnvHints } from "@/lib/firebase/config";
import { signInWithGooglePopup } from "@/lib/firebase/google-signin";
import { cn } from "@/lib/cn";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const { configured } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!configured) {
      setError("Firebase is not configured. Add env vars from .env.example.");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(getFirebaseAuth(), email.trim(), password);
      router.push(callbackUrl);
      router.refresh();
    } catch (err) {
      setError(getFirebaseAuthMessage(err, "Invalid email or password."));
      setLoading(false);
    }
  }

  async function onGoogle() {
    setError(null);
    if (!configured) {
      setError("Firebase is not configured. Add env vars from .env.example.");
      return;
    }
    setLoading(true);
    try {
      await signInWithGooglePopup();
      router.push(callbackUrl);
      router.refresh();
    } catch (err) {
      setError(getFirebaseAuthMessage(err));
      setLoading(false);
    }
  }

  return (
    <AuthCard>
      {configured ? (
        <>
          <button
            type="button"
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-full border border-on-dark/25 bg-[rgba(248,250,255,0.1)] px-4 py-2.5 text-sm font-semibold text-on-dark shadow-sm backdrop-blur-lg transition-all duration-200",
              "hover:border-primary/35 hover:bg-[rgba(248,250,255,0.14)]",
            )}
            disabled={loading}
            onClick={() => void onGoogle()}
          >
            <GoogleGlyph className="h-5 w-5" />
            Continue with Google
          </button>
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center" aria-hidden>
              <div className="w-full border-t border-on-dark/20" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[rgba(18,26,38,0.9)] px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-on-dark/65">
                or email
              </span>
            </div>
          </div>
        </>
      ) : null}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="login-email" className={authLabelClass}>
            Email
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={authFieldClass}
            placeholder="you@company.com"
          />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <label htmlFor="login-password" className={authLabelClass}>
              Password
            </label>
          </div>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={authFieldClass}
          />
        </div>
        {error ? (
          <p className="rounded-xl border border-danger/25 bg-danger/10 px-3 py-2 text-sm text-danger">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={loading || !configured}
          className="w-full btn-glass btn-glass-blue-light rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      {!configured ? (
        <div className="mt-6 space-y-2 rounded-xl border border-amber-500/20 bg-amber-500/[0.08] px-4 py-3 text-left text-xs text-muted-foreground">
          <p className="font-medium text-amber-100/90">
            Variables must be named <code className="font-mono text-[10px]">NEXT_PUBLIC_FIREBASE_*</code> (or use{" "}
            <code className="font-mono text-[10px]">NEXT_PUBLIC_FIREBASE_JSON</code>) in{" "}
            <code className="font-mono text-[10px]">.env.local</code>, then <strong className="text-muted-foreground">restart</strong>{" "}
            <code className="font-mono text-[10px]">npm run dev</code>.
          </p>
          <p>
            <Link href="https://firebase.google.com/docs/web/setup" className="text-primary hover:underline">
              Firebase web setup
            </Link>{" "}
            · <code className="font-mono text-[10px] text-caption-foreground">.env.example</code>
          </p>
          {process.env.NODE_ENV === "development" && missingFirebasePublicEnvHints().length > 0 ? (
            <p className="font-mono text-[10px] text-caption-foreground">
              Missing: {missingFirebasePublicEnvHints().join(", ")}
            </p>
          ) : null}
        </div>
      ) : null}
    </AuthCard>
  );
}
