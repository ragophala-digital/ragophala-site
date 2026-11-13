export function SceneFallback() {
  return (
    <div aria-hidden className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="absolute h-56 w-56 rounded-full bg-volt/25 blur-[70px]" />
      <div className="glass absolute h-40 w-56 -rotate-6 animate-drift border-volt/30" />
      <div className="glass absolute h-36 w-48 translate-x-10 translate-y-8 rotate-6 animate-drift border-white/10" style={{ animationDelay: "-3s" }} />
      <div className="absolute h-28 w-28 rotate-45 rounded-2xl border border-volt-400/60 bg-gradient-to-br from-volt/40 to-transparent" />
    </div>
  );
}
