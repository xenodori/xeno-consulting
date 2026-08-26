import { trajectory } from "@/lib/content";

/**
 * 시그니처: 창업의 성장 궤적을 좌표 위에 플롯한다.
 * data 좌표는 0~100(y는 위로 갈수록 큼) → SVG 좌표계로 변환.
 */
export default function Trajectory({ className = "" }: { className?: string }) {
  const W = 100;
  const H = 100;
  const pad = 4;

  const pts = trajectory.map(([x, y]) => ({
    x: pad + (x / 100) * (W - pad * 2),
    y: H - pad - (y / 100) * (H - pad * 2),
  }));

  const line = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `${pts[0].x},${H} ${line} ${pts[pts.length - 1].x},${H}`;
  const last = pts[pts.length - 1];

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      role="img"
      aria-label="0에서 1로 오르는 성장 궤적"
      className={className}
    >
      <defs>
        <linearGradient id="traj-fill" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--color-amber)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--color-amber)" stopOpacity="0.18" />
        </linearGradient>
      </defs>

      {/* baseline + vertical axis */}
      <line x1={pad} y1={H - pad} x2={W - pad} y2={H - pad} stroke="var(--color-line)" strokeWidth="0.4" />
      <line x1={pad} y1={pad} x2={pad} y2={H - pad} stroke="var(--color-line)" strokeWidth="0.4" />

      <polygon points={area} fill="url(#traj-fill)" />

      <polyline
        points={line}
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        style={{
          strokeDasharray: 1,
          strokeDashoffset: 1,
          animation: "traj-draw 1.8s cubic-bezier(0.22,0.61,0.36,1) 0.2s forwards",
        }}
      />

      {/* milestone nodes */}
      {pts.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={i === pts.length - 1 ? 1.8 : 1}
          fill="var(--color-paper)"
          stroke={i === pts.length - 1 ? "var(--color-amber-deep)" : "var(--color-ink)"}
          strokeWidth="0.7"
          vectorEffect="non-scaling-stroke"
        />
      ))}

      {/* endpoint marker ring */}
      <circle
        cx={last.x}
        cy={last.y}
        r="3.2"
        fill="none"
        stroke="var(--color-amber)"
        strokeWidth="0.6"
        vectorEffect="non-scaling-stroke"
        opacity="0.6"
      />

      <style>{`@keyframes traj-draw { to { stroke-dashoffset: 0; } }
        @media (prefers-reduced-motion: reduce){ polyline { animation: none !important; stroke-dashoffset: 0 !important; } }`}</style>
    </svg>
  );
}
