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
              "flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.08] px-4 py-2.5 text-sm font-semibold text-white shadow-sm backdrop-blur-lg transition-all duration-200",
              "hover:border-white/[0.18] hover:bg-white/[0.12]",
            )}
            disabled={loading}
            onClick={() => void onGoogle()}
          >
            <GoogleGlyph className="h-5 w-5" />
            Continue with Google
          </button>
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center" aria-hidden>
              <div className="w-full border-t border-white/[0.08]" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-bg-secondary/80 px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
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
          <p className="rounded-xl border border-rose-500/25 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={loading || !configured}
          className="w-full rounded-full bg-[linear-gradient(135deg,#14b8a6,#2dd4bf)] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(45,212,191,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-8px_rgba(45,212,191,0.4)] disabled:pointer-events-none disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      {!configured ? (
        <div className="mt-6 space-y-2 rounded-xl border border-amber-500/20 bg-amber-500/[0.08] px-4 py-3 text-left text-xs text-slate-400">
          <p className="font-medium text-amber-100/90">
            Variables must be named <code className="font-mono text-[10px]">NEXT_PUBLIC_FIREBASE_*</code> (or use{" "}
            <code className="font-mono text-[10px]">NEXT_PUBLIC_FIREBASE_JSON</code>) in{" "}
            <code className="font-mono text-[10px]">.env.local</code>, then <strong className="text-slate-300">restart</strong>{" "}
            <code className="font-mono text-[10px]">npm run dev</code>.
          </p>
          <p>
            <Link href="https://firebase.google.com/docs/web/setup" className="text-teal-400 hover:underline">
              Firebase web setup
            </Link>{" "}
            · <code className="font-mono text-[10px] text-slate-500">.env.example</code>
          </p>
          {process.env.NODE_ENV === "development" && missingFirebasePublicEnvHints().length > 0 ? (
            <p className="font-mono text-[10px] text-slate-500">
              Missing: {missingFirebasePublicEnvHints().join(", ")}
            </p>
          ) : null}
        </div>
      ) : null}
    </AuthCard>
  );
}
