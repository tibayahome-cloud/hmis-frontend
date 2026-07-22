"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import type { StaffRead } from "@/lib/types";

type Props = {
  profile: StaffRead | null;
  role: string;
};

export default function ReceptionDashboard({ profile, role }: Props) {
  return (
    <div className="row g-4">
      {/* KPI Stats Cards */}
      <div className="col-12 col-sm-6 col-xl-3 reveal" style={{ ["--d" as string]: "100ms" }}>
        <div className="card h-100">
          <div className="card-body p-4 d-flex align-items-center gap-3">
            <div className="stats-icon purple flex-shrink-0">
              <Icon name="person-plus" size={20} />
            </div>
            <div>
              <h6 className="text-muted font-semibold mb-1" style={{ fontSize: "0.85rem" }}>Registered Today</h6>
              <h6 className="font-extrabold mb-0" style={{ fontSize: "1.4rem" }}>14</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-xl-3 reveal" style={{ ["--d" as string]: "150ms" }}>
        <div className="card h-100">
          <div className="card-body p-4 d-flex align-items-center gap-3">
            <div className="stats-icon blue flex-shrink-0">
              <Icon name="people" size={20} />
            </div>
            <div>
              <h6 className="text-muted font-semibold mb-1" style={{ fontSize: "0.85rem" }}>Active Visits</h6>
              <h6 className="font-extrabold mb-0" style={{ fontSize: "1.4rem" }}>32</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-xl-3 reveal" style={{ ["--d" as string]: "200ms" }}>
        <div className="card h-100">
          <div className="card-body p-4 d-flex align-items-center gap-3">
            <div className="stats-icon green flex-shrink-0">
              <Icon name="grid" size={20} />
            </div>
            <div>
              <h6 className="text-muted font-semibold mb-1" style={{ fontSize: "0.85rem" }}>Beds Occupied</h6>
              <h6 className="font-extrabold mb-0" style={{ fontSize: "1.4rem" }}>73 <span style={{ fontSize: "0.9rem", color: "var(--muted)" }}>/ 96</span></h6>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-xl-3 reveal" style={{ ["--d" as string]: "250ms" }}>
        <div className="card h-100">
          <div className="card-body p-4 d-flex align-items-center gap-3">
            <div className="stats-icon red flex-shrink-0">
              <Icon name="clock" size={20} />
            </div>
            <div>
              <h6 className="text-muted font-semibold mb-1" style={{ fontSize: "0.85rem" }}>Avg Wait Time</h6>
              <h6 className="font-extrabold mb-0" style={{ fontSize: "1.4rem" }}>28m</h6>
            </div>
          </div>
        </div>
      </div>

      {/* Front-desk Quick Actions */}
      <div className="col-12 col-lg-6 reveal" style={{ ["--d" as string]: "300ms" }}>
        <div className="card h-100">
          <div className="card-header border-0 pt-4 pb-0">
            <h4 className="mb-1">Reception Console</h4>
            <small className="text-muted">Register and check-in patients.</small>
          </div>
          <div className="card-body d-flex flex-column justify-content-between">
            <div className="d-grid gap-3 mt-2">
              <Link href="/patients/new" className="btn btn-primary d-flex align-items-center justify-content-center gap-2">
                <Icon name="person-plus" size={18} />
                Register New Patient
              </Link>
              <Link href="/visits/new" className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2">
                <Icon name="clock" size={18} />
                Check-in / Start New Visit
              </Link>
            </div>
            <div className="mt-4 pt-3 border-top text-muted" style={{ fontSize: "0.8rem" }}>
              Verify identity details and confirm insurance/payment methods before starting encounters.
            </div>
          </div>
        </div>
      </div>

      {/* Session Overview */}
      <div className="col-12 col-lg-6 reveal" style={{ ["--d" as string]: "350ms" }}>
        <div className="card h-100">
          <div className="card-header border-0 pt-4 pb-0">
            <h4 className="mb-1">Session Summary</h4>
            <small className="text-muted">Current front-desk workspace details.</small>
          </div>
          <div className="card-body">
            {profile ? (
              <div className="d-flex flex-column gap-2 mt-2">
                <div>
                  <span className="text-muted d-block" style={{ fontSize: "0.8rem" }}>Operator Name</span>
                  <span className="fw-semibold">{profile.full_name}</span>
                </div>
                <div>
                  <span className="text-muted d-block" style={{ fontSize: "0.8rem" }}>Designated Role</span>
                  <span>{role}</span>
                </div>
                <div className="d-flex gap-2 mt-2">
                  <span className="badge bg-success">Active Session</span>
                </div>
              </div>
            ) : (
              <div className="text-muted">Loading workspace details...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
