/**
 * Animated backdrop for dark hero sections. Pure CSS: three slow cobalt glows and a light sweep. It downloads nothing, moves only with transform and opacity, and is still for
 * visitors who prefer reduced motion. Content sits above it and stays readable.
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden className="hero-bg">
      <span className="hero-bg__glow hero-bg__glow--a" />
      <span className="hero-bg__glow hero-bg__glow--b" />
      <span className="hero-bg__glow hero-bg__glow--c" />
      <span className="hero-bg__sweep" />
    </div>
  );
}
