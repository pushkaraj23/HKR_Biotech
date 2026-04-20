/**
 * Full-page ambient gradient blobs that add subtle colour washes
 * behind each section as the user scrolls.
 *
 * Opacities are kept low (0.08–0.11) so the warm cream page background
 * (#eee9df) stays visible and card text remains readable.
 */
export function HomeAmbientMolecules() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Warm primary accent — top-left */}
      <div
        className="absolute -left-[22%] top-[18%] h-[min(52vw,520px)] w-[min(52vw,520px)] rounded-full blur-[130px] opacity-[0.11]"
        style={{
          background:
            "radial-gradient(circle at 45% 40%, rgba(255,177,98,0.6), rgba(163,81,57,0.14) 50%, transparent 70%)",
        }}
      />
      {/* Slate wash — mid-right */}
      <div
        className="absolute -right-[18%] top-[36%] h-[min(48vw,480px)] w-[min(48vw,480px)] rounded-full blur-[120px] opacity-[0.09]"
        style={{
          background:
            "radial-gradient(circle at 55% 45%, rgba(44,59,77,0.5), rgba(74,93,114,0.12) 48%, transparent 68%)",
        }}
      />
      {/* Terracotta wash — lower-left */}
      <div
        className="absolute -left-[15%] top-[58%] h-[min(44vw,440px)] w-[min(44vw,440px)] rounded-full blur-[110px] opacity-[0.08]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(163,81,57,0.35), rgba(200,120,95,0.1) 46%, transparent 65%)",
        }}
      />
      {/* Warm glow — bottom-right */}
      <div
        className="absolute -right-[20%] top-[76%] h-[min(46vw,460px)] w-[min(46vw,460px)] rounded-full blur-[120px] opacity-[0.08]"
        style={{
          background:
            "radial-gradient(circle at 48% 52%, rgba(255,177,98,0.32), rgba(44,59,77,0.1) 52%, transparent 72%)",
        }}
      />
    </div>
  );
}
