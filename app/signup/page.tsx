import type { Metadata } from "next";
import Link from "next/link";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create an HKR Biotech Labs account.",
};

export default function SignupPage() {
  return (
    <div className="relative px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-md">
        <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-primary-mid">
          Account
        </p>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-on-dark sm:text-3xl">
          Create account
        </h1>
        <p className="mt-2 text-sm text-on-dark/75">
          Create a password account or use Google when OAuth is configured.
        </p>
        <div className="mt-8">
          <SignupForm />
        </div>
        <p className="mt-8 text-center text-sm text-on-dark/65">
          Already registered?{" "}
          <Link href="/login" className="font-medium text-primary hover:text-primary-mid">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
