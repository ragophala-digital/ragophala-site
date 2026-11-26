/** Lightweight stand-in used while 3D loads, on phones, or when reduced motion is requested. A soft glow, a glass-like sphere and two tilted forms: no rings or outlines. */
export function SceneFallback({ sculpture = false }: { sculpture?: boolean }) {
  return (
    <div aria-hidden className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="absolute h-64 w-64 rounded-full bg-cobalt/25 blur-[80px]" />
      <div className="absolute h-44 w-44 rounded-full bg-[radial-gradient(circle_at_32%_28%,#c9d6ff_0%,#5d7dfc_38%,#315BFA_65%,#1b2f8a_100%)] opacity-90 shadow-[0_30px_60px_-20px_rgba(49,91,250,.6)]" />
      {sculpture && (
        <>
          <div className="absolute h-[min(52vw,13rem)] w-[min(82vw,23rem)] -rotate-[27deg] rounded-[50%] border-[7px] border-cobalt-300 border-l-white border-t-slate shadow-[0_0_18px_rgba(143,165,255,.28)]" />
          <div className="absolute h-[min(47vw,12rem)] w-[min(72vw,20rem)] rotate-[52deg] rounded-[50%] border-[3px] border-slate border-b-white/80 opacity-80" />
        </>
      )}
      <div className="absolute right-[18%] top-[18%] h-10 w-10 rotate-12 rounded-md border border-white/30 bg-ivory/30" />
      <div className="absolute bottom-[20%] left-[16%] h-8 w-8 -rotate-12 rounded-md bg-cobalt/80" />
    </div>
  );
}
