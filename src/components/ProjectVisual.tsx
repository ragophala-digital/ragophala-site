import type { Project } from "@/lib/site";

const BARS = [30, 55, 40, 75, 60];

/** Generated illustration of a concept project (no external image dependency). */
export function ProjectVisual({ project, className }: { project: Pick<Project, "category" | "slug">; className?: string }) {
  const id = `pv-${project.slug}`;
  return (
    <svg viewBox="0 0 400 250" className={className} role="img" aria-label={`${project.category} concept illustration`} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#DCE5FF" />
          <stop offset="1" stopColor="#EAE7E0" />
        </linearGradient>
      </defs>
      <rect width="400" height="250" fill={`url(#${id})`} />
      <circle cx="340" cy="30" r="80" fill="#315BFA" opacity=".12" />
      <g transform="translate(56 36)">
        <rect width="288" height="178" rx="10" fill="#fff" stroke="#101827" strokeOpacity=".15" />
        <rect width="288" height="22" rx="10" fill="#F5F3EF" />
        <circle cx="14" cy="11" r="3" fill="#101827" opacity=".2" />
        <circle cx="26" cy="11" r="3" fill="#101827" opacity=".2" />
        <circle cx="38" cy="11" r="3" fill="#101827" opacity=".2" />
        {project.category === "Websites" && (
          <>
            <rect x="20" y="44" width="130" height="12" rx="6" fill="#101827" />
            <rect x="20" y="64" width="100" height="12" rx="6" fill="#101827" />
            <rect x="20" y="90" width="170" height="6" rx="3" fill="#101827" opacity=".15" />
            <rect x="20" y="102" width="140" height="6" rx="3" fill="#101827" opacity=".15" />
            <rect x="20" y="124" width="64" height="22" rx="6" fill="#315BFA" />
            <rect x="188" y="44" width="80" height="100" rx="8" fill="#DCE5FF" />
          </>
        )}
        {project.category === "Web Applications" && (
          <>
            <rect x="0" y="22" width="56" height="156" fill="#101827" />
            {BARS.map((b, i) => (
              <rect key={i} x={80 + i * 24} y={150 - b} width="16" height={b} rx="3" fill={i === 4 ? "#315BFA" : "#DCE5FF"} />
            ))}
            <rect x="80" y="40" width="90" height="8" rx="4" fill="#101827" />
            <rect x="204" y="44" width="68" height="14" rx="4" fill="#F5F3EF" />
            <rect x="204" y="68" width="68" height="14" rx="4" fill="#F5F3EF" />
            <rect x="204" y="92" width="68" height="14" rx="4" fill="#F5F3EF" />
          </>
        )}
        {project.category === "AI & Automation" && (
          <>
            <rect x="20" y="40" width="150" height="26" rx="13" fill="#F5F3EF" />
            <rect x="118" y="76" width="150" height="26" rx="13" fill="#315BFA" />
            <rect x="20" y="112" width="120" height="26" rx="13" fill="#F5F3EF" />
            <circle cx="248" cy="148" r="10" fill="#101827" />
          </>
        )}
      </g>
    </svg>
  );
}
