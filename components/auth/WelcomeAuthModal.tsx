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
  const open =
    mounted &&
    configured &&
    !loading &&
    !user &&
    !dismissed &&
    !authRoute;

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
      className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-auth-title"
    >
      <div
        className={cn(
          "relative w-full max-w-md rounded-3xl border border-white/[0.1] bg-bg-secondary/95 p-8 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.7)] backdrop-blur-2xl",
        )}
      >
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-teal-400/90">
          Welcome
        </p>
        <h2 id="welcome-auth-title" className="mt-2 font-display text-2xl font-semibold tracking-tight text-white">
          Sign in to get the full experience
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          Create an account or sign in to save enquiries, track RFQs, and unlock personalized features.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-stretch">
          <Link
            href={`/login?callbackUrl=${encodeURIComponent("/")}`}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-[linear-gradient(135deg,#14b8a6,#2dd4bf)] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(45,212,191,0.45)] transition-transform hover:-translate-y-0.5"
          >
            Sign in
          </Link>
          <Link
            href={`/signup?callbackUrl=${encodeURIComponent("/")}`}
            className="inline-flex flex-1 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.06] px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-lg transition-colors hover:bg-white/[0.1]"
          >
            Create account
          </Link>
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="mt-6 w-full text-center text-sm font-medium text-slate-500 transition-colors hover:text-slate-300"
        >
          Continue browsing
        </button>
      </div>
    </div>,
    document.body,
  );
}
