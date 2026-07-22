"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import type { StaffRead } from "@/lib/types";

type Props = {
  profile: StaffRead | null;
  role: string;
};

const acuityLevels = [
  { label: "Critical (Red — Immediate attention)", count: 2, color: "#EF4444" },
  { label: "Urgent (Amber — Delayed attention)", count: 2, color: "#F59E0B" },
  { label: "Stable (Green — Standard attention)", count: 2, color: "#22C55E" },
];

export default function TriageDashboard({ profile, role }: Props) {
  return (
    <div className="row g-4">
      {/* KPI Stats Cards */}
      <div className="col-12 col-sm-6 col-xl-3 reveal" style={{ ["--d" as string]: "100ms" }}>
        <div className="card h-100">
          <div className="card-body p-4 d-flex align-items-center gap-3">
            <div className="stats-icon purple flex-shrink-0">
              <Icon name="clock" size={20} />
            </div>
            <div>
              <h6 style={{ fontSize: "0.85rem", color: "#4B5563", fontWeight: 600, marginBottom: 4 }}>Triage Queue</h6>
              <h6 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#1F2937", marginBottom: 0 }}>6</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-xl-3 reveal" style={{ ["--d" as string]: "150ms" }}>
        <div className="card h-100">
          <div className="card-body p-4 d-flex align-items-center gap-3">
            <div className="stats-icon red flex-shrink-0">
              <Icon name="heart" size={20} />
            </div>
            <div>
              <h6 style={{ fontSize: "0.85rem", color: "#4B5563", fontWeight: 600, marginBottom: 4 }}>Acuity (Red)</h6>
              <h6 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#DC2626", marginBottom: 0 }}>2</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-xl-3 reveal" style={{ ["--d" as string]: "200ms" }}>
        <div className="card h-100">
          <div className="card-body p-4 d-flex align-items-center gap-3">
            <div className="stats-icon blue flex-shrink-0">
              <Icon name="activity" size={20} />
            </div>
            <div>
              <h6 style={{ fontSize: "0.85rem", color: "#4B5563", fontWeight: 600, marginBottom: 4 }}>Vitals Taken Today</h6>
              <h6 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#1F2937", marginBottom: 0 }}>18</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-xl-3 reveal" style={{ ["--d" as string]: "250ms" }}>
        <div className="card h-100">
          <div className="card-body p-4 d-flex align-items-center gap-3">
            <div className="stats-icon green flex-shrink-0">
              <Icon name="people" size={20} />
            </div>
            <div>
              <h6 style={{ fontSize: "0.85rem", color: "#4B5563", fontWeight: 600, marginBottom: 4 }}>Triage Complete</h6>
              <h6 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#1F2937", marginBottom: 0 }}>14</h6>
            </div>
          </div>
        </div>
      </div>

      {/* Triage Acuity Distribution */}
      <div className="col-12 col-lg-7 reveal" style={{ ["--d" as string]: "300ms" }}>
        <div className="card h-100">
          <div className="card-header border-0 pt-4 pb-0">
            <h4 className="mb-1 fw-bold" style={{ color: "#1F2937" }}>Triage Acuity Distribution</h4>
            <small style={{ color: "#4B5563" }}>Breakdown of priority levels currently in waiting.</small>
          </div>
          <div className="card-body">
            {acuityLevels.map((level, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.85rem 0",
                  borderBottom: i < acuityLevels.length - 1 ? "1px solid #F3F4F6" : "none",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "#374151", fontWeight: 500, fontSize: "0.92rem" }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: level.color, display: "inline-block", flexShrink: 0 }} />
                  {level.label}
                </span>
                <strong style={{ fontSize: "1.15rem", color: "#1F2937", fontWeight: 700 }}>{level.count}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Operational Links */}
      <div className="col-12 col-lg-5 reveal" style={{ ["--d" as string]: "350ms" }}>
        <div className="card h-100">
          <div className="card-header border-0 pt-4 pb-0">
            <h4 className="mb-1 fw-bold" style={{ color: "#1F2937" }}>Operational Links</h4>
            <small style={{ color: "#4B5563" }}>Direct triage operations.</small>
          </div>
          <div className="card-body d-flex flex-column gap-3">
            <div className="d-flex align-items-center gap-2 py-2 px-3" style={{ fontSize: "0.8rem", color: "#854d0e", background: "#fef9c3", border: "1px solid #fef08a", borderRadius: "6px" }}>
              <Icon name="shield" size={16} />
              <span>Capture vitals, compute emergency triage scores, and route high-acuity cases to doctors immediately.</span>
            </div>
            <div className="d-grid gap-3">
              <Link href="/patients/triage" className="btn btn-primary d-flex align-items-center justify-content-center gap-2 py-2">
                <Icon name="heart" size={18} />
                Access Triage Acuity Board
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
