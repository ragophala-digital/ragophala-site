/** Lightweight stand-in used while 3D loads, on weak devices, or when reduced motion is requested. */
export function SceneFallback() {
  return (
    <div aria-hidden className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="absolute h-64 w-64 rounded-full bg-cobalt/25 blur-[80px]" />
      <div className="absolute h-72 w-72 rounded-full border-[14px] border-ivory/30" />
      <div className="absolute h-48 w-48 rounded-full border border-white/30 bg-white/10 backdrop-blur-md" />
      <div className="absolute h-16 w-16 rounded-full bg-cobalt" />
      <div className="absolute right-[18%] top-[18%] h-10 w-10 rotate-12 rounded-md border border-white/30 bg-ivory/30" />
      <div className="absolute bottom-[20%] left-[16%] h-8 w-8 -rotate-12 rounded-md bg-cobalt/80" />
    </div>
  );
}
