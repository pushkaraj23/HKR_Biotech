import type { Metadata } from "next";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Cookie Policy for HKR Biotech Pvt. Ltd. website explaining cookie categories and usage.",
};

export default function CookiePolicyPage() {
  return (
    <div className="relative overflow-x-hidden">
      <PageAmbientGraphics variant="default" opacity="opacity-[0.14]" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 pb-28 pt-8 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-on-dark/20 bg-[rgba(18,25,35,0.55)] p-8 shadow-[0_12px_40px_-16px_rgba(18,25,35,0.7)] backdrop-blur-xl sm:p-10">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-primary-mid">
            Legal
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-on-dark md:text-4xl">
            Cookie Policy
          </h1>
          <p className="mt-4 text-sm text-on-dark/78">Last updated: April 30, 2026</p>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-on-dark/84">
            <p>
              This policy explains how cookies and similar technologies are used on the
              HKR Biotech Pvt. Ltd. website.
            </p>
            <div>
              <h2 className="font-display text-xl font-semibold text-on-dark">What Are Cookies?</h2>
              <p className="mt-2">
                Cookies are small data files stored on your device to help websites
                function properly, improve performance, and remember preferences.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-on-dark">How We Use Cookies</h2>
              <p className="mt-2">
                We may use essential cookies for website functionality and limited
                analytics-related cookies to understand usage patterns and improve user
                experience.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-on-dark">Cookie Choices</h2>
              <p className="mt-2">
                You can manage or disable cookies through browser settings. Disabling
                certain cookies may affect some website functionality.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-on-dark">Third-Party Services</h2>
              <p className="mt-2">
                Some embedded services may set their own cookies in accordance with
                their own privacy policies.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-on-dark">Contact</h2>
              <p className="mt-2">
                For cookie-related questions, contact: kishor@hkrbiotechlabs.com
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
