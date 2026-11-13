import type { Project } from "@/lib/site";

const BARS = [30, 55, 40, 75, 60];

/** Generated illustration of a project (no external image dependency). */
export function ProjectVisual({ project, className }: { project: Pick<Project, "hue" | "category" | "slug">; className?: string }) {
  const h = project.hue;
  const c1 = `hsl(${h} 90% 58%)`;
  const c2 = `hsl(${h + 20} 80% 25%)`;
  const id = `pv-${project.slug}`;
  return (
    <svg viewBox="0 0 400 250" className={className} role="img" aria-label={`${project.category} demonstration illustration`} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={c2} />
          <stop offset="1" stopColor="#040a1c" />
        </linearGradient>
      </defs>
      <rect width="400" height="250" fill={`url(#${id})`} />
      <circle cx="330" cy="40" r="90" fill={c1} opacity=".18" />
      <g transform="translate(60 38)">
        <rect width="280" height="174" rx="12" fill="#071342" stroke={c1} strokeOpacity=".6" />
        <rect width="280" height="22" rx="12" fill={c1} opacity=".35" />
        <circle cx="16" cy="11" r="3.5" fill="#fff" opacity=".7" />
        <circle cx="28" cy="11" r="3.5" fill="#fff" opacity=".5" />
        <circle cx="40" cy="11" r="3.5" fill="#fff" opacity=".3" />
        {project.category === "Websites" && (
          <>
            <rect x="20" y="44" width="130" height="12" rx="6" fill="#fff" opacity=".9" />
            <rect x="20" y="66" width="190" height="7" rx="3.5" fill="#8fa6e8" />
            <rect x="20" y="80" width="160" height="7" rx="3.5" fill="#8fa6e8" />
            <rect x="20" y="104" width="64" height="22" rx="11" fill={c1} />
            <rect x="170" y="100" width="90" height="56" rx="8" fill={c1} opacity=".3" />
          </>
        )}
        {project.category === "Web Applications" && (
          <>
            {BARS.map((b, i) => (
              <rect key={i} x={24 + i * 22} y={140 - b} width="14" height={b} rx="3" fill={c1} opacity={0.5 + i * 0.1} />
            ))}
            <rect x="150" y="44" width="106" height="12" rx="6" fill="#fff" opacity=".85" />
            {[0, 1, 2].map((i) => (
              <rect key={i} x="150" y={70 + i * 22} width={106 - i * 16} height="8" rx="4" fill="#8fa6e8" />
            ))}
          </>
        )}
        {project.category === "AI & Automation" && (
          <>
            <rect x="20" y="40" width="150" height="26" rx="13" fill="#fff" opacity=".12" />
            <rect x="110" y="76" width="150" height="26" rx="13" fill={c1} opacity=".7" />
            <rect x="20" y="112" width="120" height="26" rx="13" fill="#fff" opacity=".12" />
            <circle cx="248" cy="136" r="10" fill={c1} />
          </>
        )}
      </g>
    </svg>
  );
}
