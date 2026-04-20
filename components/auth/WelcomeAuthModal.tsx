"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "@/components/providers/AuthProvider";
import { cn } from "@/lib/cn";

const STORAGE_KEY = "hkr-welcome-auth-dismissed";

export function WelcomeAuthModal() {
  const pathname = usePathname();
  const { user, loading, configured } = useAuth();
  const [dismissed, setDismissed] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [delayElapsed, setDelayElapsed] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      setDismissed(sessionStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setDismissed(true);
  }, []);

  const authRoute = pathname === "/login" || pathname === "/signup";
  const canPrompt =
    mounted &&
    configured &&
    !loading &&
    !user &&
    !dismissed &&
    !authRoute;

  useEffect(() => {
    if (!canPrompt) {
      setDelayElapsed(false);
      return;
    }
    const delayMs = 3000 + Math.floor(Math.random() * 2001);
    const timeoutId = window.setTimeout(() => {
      setDelayElapsed(true);
    }, delayMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [canPrompt]);

  const open =
    canPrompt &&
    delayElapsed;

  useEffect(() => {
    if (!open) {
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(7,14,27,0.72)] p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-auth-title"
    >
      <div
        className={cn(
          "relative w-full max-w-md rounded-3xl border border-on-dark/20 bg-[linear-gradient(160deg,rgba(18,25,35,0.94)_0%,rgba(11,19,31,0.96)_100%)] p-8 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.72)] backdrop-blur-2xl",
        )}
      >
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-primary-mid">
          Welcome
        </p>
        <h2 id="welcome-auth-title" className="mt-2 font-display text-2xl font-semibold tracking-tight text-on-dark">
          Sign in to get the full experience
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-on-dark/78">
          Create an account or sign in to save enquiries, track RFQs, and unlock personalized features.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-stretch">
          <Link
            href={`/login?callbackUrl=${encodeURIComponent("/")}`}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-cta-gradient px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-primary-glow transition-transform hover:-translate-y-0.5"
          >
            Sign in
          </Link>
          <Link
            href={`/signup?callbackUrl=${encodeURIComponent("/")}`}
            className="inline-flex flex-1 items-center justify-center rounded-full border border-on-dark/30 bg-[rgba(18,25,35,0.52)] px-6 py-2.5 text-sm font-semibold text-on-dark backdrop-blur-lg transition-colors hover:border-on-dark/45 hover:bg-[rgba(18,25,35,0.68)]"
          >
            Create account
          </Link>
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="mt-6 w-full text-center text-sm font-medium text-on-dark/72 transition-colors hover:text-on-dark/92"
        >
          Continue browsing
        </button>
      </div>
    </div>,
    document.body,
  );
}
