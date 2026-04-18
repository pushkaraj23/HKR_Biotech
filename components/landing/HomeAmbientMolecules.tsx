/**
 * Full-page ambient gradient blobs that add subtle colour washes
 * behind each section as the user scrolls.
 */
export function HomeAmbientMolecules() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Warm accent — top-left */}
      <div
        className="absolute -left-[22%] top-[18%] h-[min(52vw,520px)] w-[min(52vw,520px)] rounded-full blur-[120px] opacity-[0.2]"
        style={{
          background:
            "radial-gradient(circle at 45% 40%, rgba(255,177,98,0.55), rgba(163,81,57,0.12) 50%, transparent 70%)",
        }}
      />
      {/* Slate wash — mid-right */}
      <div
        className="absolute -right-[18%] top-[36%] h-[min(48vw,480px)] w-[min(48vw,480px)] rounded-full blur-[110px] opacity-[0.16]"
        style={{
          background:
            "radial-gradient(circle at 55% 45%, rgba(44,59,77,0.45), rgba(74,93,114,0.1) 48%, transparent 68%)",
        }}
      />
      {/* Terracotta wash — lower-left */}
      <div
        className="absolute -left-[15%] top-[58%] h-[min(44vw,440px)] w-[min(44vw,440px)] rounded-full blur-[100px] opacity-[0.14]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(163,81,57,0.32), rgba(200,120,95,0.08) 46%, transparent 65%)",
        }}
      />
      {/* Orange–slate — bottom-right */}
      <div
        className="absolute -right-[20%] top-[76%] h-[min(46vw,460px)] w-[min(46vw,460px)] rounded-full blur-[110px] opacity-[0.13]"
        style={{
          background:
            "radial-gradient(circle at 48% 52%, rgba(255,177,98,0.28), rgba(44,59,77,0.12) 52%, transparent 72%)",
        }}
      />
    </div>
  );
}
