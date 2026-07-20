import Icon from "@/components/Icon";
import type { Kpi } from "@/lib/mock-data";

function Spark({ data, color }: { data: number[]; color: string }) {
  const w = 110;
  const h = 44;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const step = w / (data.length - 1);
  const pts = data.map((d, i) => [i * step, h - ((d - min) / span) * (h - 8) - 4]);
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;
  const gid = `g-${color}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ position: "absolute", right: 16, bottom: 12, opacity: 0.5 }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const SPARK_COLOR: Record<string, string> = {
  purple: "#9694ff",
  blue: "#57caeb",
  green: "#5ddab4",
  red: "#ff7976",
};

export default function StatCard({ kpi, index = 0 }: { kpi: Kpi; index?: number }) {
  return (
    <div className="col-6 col-lg-3 col-md-6 reveal" style={{ ["--d" as string]: `${index * 80}ms` }}>
      <div className="card">
        <div className="card-body px-3 py-4-5" style={{ position: "relative" }}>
          <div className="row">
            <div className="col-md-4">
              <div className={`stats-icon ${kpi.color}`}>
                <Icon name={kpi.icon} size={20} />
              </div>
            </div>
            <div className="col-md-8">
              <h6 className="text-muted font-semibold mb-0">{kpi.label}</h6>
              <h6 className="font-extrabold mb-0">
                {kpi.value.toLocaleString()}
                {kpi.unit && <span style={{ fontSize: 16 }}> {kpi.unit}</span>}
              </h6>
            </div>
          </div>
          <div
            className="text-muted mt-2"
            style={{ fontSize: "0.78rem" }}
          >
            {kpi.trend === "up" ? "▲ " : kpi.trend === "down" ? "▼ " : ""}
            {kpi.delta}
          </div>
          <Spark data={kpi.spark} color={SPARK_COLOR[kpi.color]} />
        </div>
      </div>
    </div>
  );
}
