import type { ServiceKey } from "@/lib/site";

const BLUE = "#2f7bff";
const LIGHT = "#8ab9ff";

/** Distinct layered-glass illustration for each service division. */
export function ServiceVisual({ kind, className }: { kind: ServiceKey; className?: string }) {
  return (
    <svg viewBox="0 0 400 300" className={className} role="img" aria-label={`${kind} service illustration`}>
      <defs>
        <linearGradient id={`sv-${kind}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#12236a" />
          <stop offset="1" stopColor="#060d28" />
        </linearGradient>
        <filter id={`glow-${kind}`}><feGaussianBlur stdDeviation="6" /></filter>
      </defs>
      <rect width="400" height="300" rx="24" fill="#050b22" />
      <circle cx="300" cy="70" r="80" fill={BLUE} opacity=".25" filter={`url(#glow-${kind})`} />
      {kind === "web" && (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${60 + i * 36} ${50 + i * 34})`}>
              <rect width="210" height="130" rx="12" fill={`url(#sv-${kind})`} stroke={i === 2 ? LIGHT : BLUE} strokeOpacity={i === 2 ? 1 : 0.5} />
              <rect width="210" height="20" rx="12" fill={BLUE} opacity=".3" />
              {i === 2 && (<><rect x="18" y="38" width="100" height="12" rx="6" fill="#fff" /><rect x="18" y="60" width="150" height="7" rx="3.5" fill="#8fa6e8" /><rect x="18" y="74" width="120" height="7" rx="3.5" fill="#8fa6e8" /><rect x="18" y="96" width="60" height="20" rx="10" fill={BLUE} /></>)}
            </g>
          ))}
        </g>
      )}
      {kind === "apps" && (
        <g>
          <rect x="50" y="50" width="300" height="200" rx="14" fill={`url(#sv-${kind})`} stroke={BLUE} strokeOpacity=".6" />
          <rect x="50" y="50" width="70" height="200" rx="14" fill={BLUE} opacity=".18" />
          {[0, 1, 2, 3].map((i) => (<rect key={i} x="64" y={74 + i * 26} width="42" height="8" rx="4" fill={i === 0 ? "#fff" : "#6f8de0"} />))}
          {[40, 70, 52, 96, 78].map((h, i) => (<rect key={i} x={150 + i * 28} y={170 - h + 40} width="18" height={h} rx="4" fill={i === 3 ? "#fff" : BLUE} />))}
          <circle cx="300" cy="100" r="26" fill="none" stroke={LIGHT} strokeWidth="9" strokeDasharray="110 60" />
          <rect x="140" y="72" width="90" height="10" rx="5" fill="#fff" opacity=".85" />
        </g>
      )}
      {kind === "ai" && (
        <g stroke={BLUE} strokeOpacity=".6" fill="none">
          {[[70, 80, 160, 60], [70, 80, 160, 150], [70, 200, 160, 150], [70, 200, 160, 240], [160, 60, 260, 110], [160, 150, 260, 110], [160, 150, 260, 190], [160, 240, 260, 190], [260, 110, 335, 150], [260, 190, 335, 150]].map(([a, b, c, d], i) => (<line key={i} x1={a} y1={b} x2={c} y2={d} />))}
          {[[70, 80], [70, 200], [160, 60], [160, 150], [160, 240], [260, 110], [260, 190]].map(([x, y], i) => (<circle key={i} cx={x} cy={y} r="11" fill="#0b1f5c" stroke={LIGHT} />))}
          <circle cx="335" cy="150" r="24" fill={BLUE} stroke="#fff" />
        </g>
      )}
      {kind === "support" && (
        <g>
          <path d="M200 45l105 38v70c0 55-42 90-105 112C137 243 95 208 95 153V83z" fill={`url(#sv-${kind})`} stroke={LIGHT} strokeWidth="2" />
          <path d="M155 150l32 32 60-68" fill="none" stroke="#fff" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="75" cy="70" r="6" fill={BLUE} /><circle cx="330" cy="230" r="8" fill={LIGHT} /><circle cx="345" cy="95" r="4" fill="#fff" />
        </g>
      )}
    </svg>
  );
}
