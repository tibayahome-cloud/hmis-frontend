"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import type { StaffRead } from "@/lib/types";

type Props = {
  profile: StaffRead | null;
  role: string;
};

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
              <h6 className="text-muted font-semibold mb-1" style={{ fontSize: "0.85rem" }}>Triage Queue</h6>
              <h6 className="font-extrabold mb-0" style={{ fontSize: "1.4rem" }}>6</h6>
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
              <h6 className="text-muted font-semibold mb-1" style={{ fontSize: "0.85rem" }}>Acuity (Red)</h6>
              <h6 className="font-extrabold mb-0 text-danger" style={{ fontSize: "1.4rem" }}>2</h6>
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
              <h6 className="text-muted font-semibold mb-1" style={{ fontSize: "0.85rem" }}>Vitals Taken Today</h6>
              <h6 className="font-extrabold mb-0" style={{ fontSize: "1.4rem" }}>18</h6>
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
              <h6 className="text-muted font-semibold mb-1" style={{ fontSize: "0.85rem" }}>Triage Complete</h6>
              <h6 className="font-extrabold mb-0" style={{ fontSize: "1.4rem" }}>14</h6>
            </div>
          </div>
        </div>
      </div>

      {/* Triage Acuity Mix Breakdown */}
      <div className="col-12 col-lg-7 reveal" style={{ ["--d" as string]: "300ms" }}>
        <div className="card h-100">
          <div className="card-header border-0 pt-4 pb-0">
            <h4 className="mb-1">Triage Acuity Distribution</h4>
            <small className="text-muted">Breakdown of priority levels currently in waiting.</small>
          </div>
          <div className="card-body">
            <div className="legend-row">
              <span>
                <span className="legend-dot" style={{ background: "var(--bs-danger)" }} />
                Critical (Red - Immediate attention)
              </span>
              <strong>2</strong>
            </div>
            <div className="legend-row">
              <span>
                <span className="legend-dot" style={{ background: "var(--bs-warning)" }} />
                Urgent (Amber - Delayed attention)
              </span>
              <strong>2</strong>
            </div>
            <div className="legend-row">
              <span>
                <span className="legend-dot" style={{ background: "var(--bs-success)" }} />
                Stable (Green - Standard attention)
              </span>
              <strong>2</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Action panel */}
      <div className="col-12 col-lg-5 reveal" style={{ ["--d" as string]: "350ms" }}>
        <div className="card h-100">
          <div className="card-header border-0 pt-4 pb-0">
            <h4 className="mb-1">Operational Links</h4>
            <small className="text-muted">Direct triage operations.</small>
          </div>
          <div className="card-body d-flex flex-column justify-content-between">
            <div className="d-grid gap-3 mt-2">
              <Link href="/patients/triage" className="btn btn-primary d-flex align-items-center justify-content-center gap-2">
                <Icon name="heart" size={18} />
                Access Triage Acuity Board
              </Link>
            </div>
            <div className="mt-4 pt-3 border-top text-muted" style={{ fontSize: "0.8rem" }}>
              Capture vitals, compute emergency triage scores, and route high-acuity cases to doctors immediately.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
