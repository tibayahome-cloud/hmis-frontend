import type { Acuity } from "@/lib/mock-data";

const MAP: Record<Acuity, { label: string; cls: string }> = {
  green: { label: "Stable", cls: "bg-success" },
  amber: { label: "Urgent", cls: "bg-warning" },
  red: { label: "Critical", cls: "bg-danger" },
};

export default function AcuityBadge({ acuity }: { acuity: Acuity }) {
  const m = MAP[acuity];
  return <span className={`badge ${m.cls}`}>{m.label}</span>;
}
