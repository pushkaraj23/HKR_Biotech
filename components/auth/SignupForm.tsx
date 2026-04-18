"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { AuthCard, authFieldClass, authLabelClass } from "@/components/auth/AuthFormFields";
import { GoogleGlyph } from "@/components/auth/GoogleGlyph";
import { useAuth } from "@/components/providers/AuthProvider";
import { getFirebaseAuthMessage } from "@/lib/firebase/auth-errors";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { missingFirebasePublicEnvHints } from "@/lib/firebase/config";
import { signInWithGooglePopup } from "@/lib/firebase/google-signin";
import { cn } from "@/lib/cn";

export function SignupForm() {
  const router = useRouter();
  const { configured } = useAuth();

  const [name, setName] = useState("");
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
      const auth = getFirebaseAuth();
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      if (name.trim()) {
        await updateProfile(cred.user, { displayName: name.trim() });
      }
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(getFirebaseAuthMessage(err, "Could not create account."));
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
      router.push("/");
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
              "flex w-full items-center justify-center gap-2 rounded-full border border-overlay-strong bg-white/[0.08] px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm backdrop-blur-lg transition-all duration-200",
              "hover:border-white/[0.18] hover:bg-white/[0.12]",
            )}
            disabled={loading}
            onClick={() => void onGoogle()}
          >
            <GoogleGlyph className="h-5 w-5" />
            Sign up with Google
          </button>
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center" aria-hidden>
              <div className="w-full border-t border-overlay" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-surface/80 px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-caption-foreground">
                or email
              </span>
            </div>
          </div>
        </>
      ) : null}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="signup-name" className={authLabelClass}>
            Name
          </label>
          <input
            id="signup-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={authFieldClass}
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label htmlFor="signup-email" className={authLabelClass}>
            Email
          </label>
          <input
            id="signup-email"
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
          <label htmlFor="signup-password" className={authLabelClass}>
            Password
          </label>
          <input
            id="signup-password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={authFieldClass}
            placeholder="At least 8 characters"
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
          className="w-full rounded-full bg-cta-gradient px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-primary-glow transition-all duration-200 hover:-translate-y-0.5 hover:shadow-primary-glow-lg disabled:pointer-events-none disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      {!configured ? (
        <div className="mt-6 space-y-3 rounded-xl border border-amber-500/20 bg-amber-500/[0.08] px-4 py-3 text-left text-xs text-muted-foreground">
          <p className="font-medium text-amber-100/90">
            Firebase env vars are not loaded in the app (they must start with{" "}
            <code className="rounded bg-black/20 px-1 font-mono text-[10px]">NEXT_PUBLIC_</code>).
          </p>
          <ol className="list-decimal space-y-1 pl-4 text-muted-foreground">
            <li>
              Copy <code className="font-mono text-[10px] text-muted-foreground">.env.example</code> →{" "}
              <code className="font-mono text-[10px] text-muted-foreground">.env.local</code> in the{" "}
              <strong className="text-muted-foreground">project root</strong> (same folder as{" "}
              <code className="font-mono text-[10px]">package.json</code>).
            </li>
            <li>
              Or set <code className="font-mono text-[10px] text-muted-foreground">NEXT_PUBLIC_FIREBASE_JSON</code> to your
              full <code className="font-mono text-[10px] text-muted-foreground">firebaseConfig</code> object as a JSON string
              (see <code className="font-mono text-[10px] text-muted-foreground">.env.example</code>).
            </li>
            <li>
              <strong className="text-muted-foreground">Restart</strong> the dev server after saving (
              <kbd className="font-mono text-[10px]">Ctrl+C</kbd> then{" "}
              <code className="font-mono text-[10px]">npm run dev</code>).
            </li>
          </ol>
          {process.env.NODE_ENV === "development" && missingFirebasePublicEnvHints().length > 0 ? (
            <p className="border-t border-white/10 pt-2 font-mono text-[10px] text-caption-foreground">
              Missing: {missingFirebasePublicEnvHints().join(", ")}
            </p>
          ) : null}
          <p className="border-t border-white/10 pt-2 text-[11px] text-caption-foreground">
            In Firebase Console → Authentication, enable <strong className="text-muted-foreground">Email/Password</strong> and{" "}
            <strong className="text-muted-foreground">Google</strong>.
          </p>
        </div>
      ) : null}
    </AuthCard>
  );
}
