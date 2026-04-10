/**
 * Full-page ambient gradient blobs that add subtle colour washes
 * behind each section as the user scrolls.
 */
export function HomeAmbientMolecules() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Teal wash — top-left */}
      <div
        className="absolute -left-[22%] top-[18%] h-[min(52vw,520px)] w-[min(52vw,520px)] rounded-full blur-[120px] opacity-[0.22]"
        style={{
          background:
            "radial-gradient(circle at 45% 40%, rgba(20,184,166,0.6), rgba(15,118,110,0.15) 50%, transparent 70%)",
        }}
      />
      {/* Violet wash — mid-right */}
      <div
        className="absolute -right-[18%] top-[36%] h-[min(48vw,480px)] w-[min(48vw,480px)] rounded-full blur-[110px] opacity-[0.18]"
        style={{
          background:
            "radial-gradient(circle at 55% 45%, rgba(91,33,182,0.55), rgba(124,58,237,0.12) 48%, transparent 68%)",
        }}
      />
      {/* Rose wash — lower-left */}
      <div
        className="absolute -left-[15%] top-[58%] h-[min(44vw,440px)] w-[min(44vw,440px)] rounded-full blur-[100px] opacity-[0.16]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(159,18,57,0.4), rgba(190,24,93,0.1) 46%, transparent 65%)",
        }}
      />
      {/* Teal-violet — bottom-right */}
      <div
        className="absolute -right-[20%] top-[76%] h-[min(46vw,460px)] w-[min(46vw,460px)] rounded-full blur-[110px] opacity-[0.15]"
        style={{
          background:
            "radial-gradient(circle at 48% 52%, rgba(14,165,148,0.35), rgba(91,33,182,0.15) 52%, transparent 72%)",
        }}
      />
    </div>
  );
}
