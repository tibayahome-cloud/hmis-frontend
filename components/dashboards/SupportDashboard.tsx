"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import type { StaffRead } from "@/lib/types";

type Props = {
  profile: StaffRead | null;
  role: string;
};

export default function SupportDashboard({ profile, role }: Props) {
  // Custom headers and links based on the specific support role
  let actionLabel = "Access Tasks";
  let actionLink = "/";
  let actionIcon = "grid";

  if (role === "lab_tech") {
    actionLabel = "Laboratory Queue";
    actionLink = "/queues/lab";
    actionIcon = "activity";
  } else if (role === "pharmacist") {
    actionLabel = "Pharmacy Queue";
    actionLink = "/queues/pharmacy";
    actionIcon = "clock";
  } else if (role === "billing_clerk") {
    actionLabel = "Invoices & Billing";
    actionLink = "/billing";
    actionIcon = "people";
  } else if (role === "records_officer") {
    actionLabel = "Death Register";
    actionLink = "/patients/death-register";
    actionIcon = "people-lines";
  }

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
              <h6 className="text-muted font-semibold mb-1" style={{ fontSize: "0.85rem" }}>Pending Queue</h6>
              <h6 className="font-extrabold mb-0" style={{ fontSize: "1.4rem" }}>9</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-xl-3 reveal" style={{ ["--d" as string]: "150ms" }}>
        <div className="card h-100">
          <div className="card-body p-4 d-flex align-items-center gap-3">
            <div className="stats-icon blue flex-shrink-0">
              <Icon name="activity" size={20} />
            </div>
            <div>
              <h6 className="text-muted font-semibold mb-1" style={{ fontSize: "0.85rem" }}>Completed Today</h6>
              <h6 className="font-extrabold mb-0" style={{ fontSize: "1.4rem" }}>16</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-xl-3 reveal" style={{ ["--d" as string]: "200ms" }}>
        <div className="card h-100">
          <div className="card-body p-4 d-flex align-items-center gap-3">
            <div className="stats-icon green flex-shrink-0">
              <Icon name="people" size={20} />
            </div>
            <div>
              <h6 className="text-muted font-semibold mb-1" style={{ fontSize: "0.85rem" }}>Assigned Staff</h6>
              <h6 className="font-extrabold mb-0" style={{ fontSize: "1.4rem" }}>4</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-xl-3 reveal" style={{ ["--d" as string]: "250ms" }}>
        <div className="card h-100">
          <div className="card-body p-4 d-flex align-items-center gap-3">
            <div className="stats-icon red flex-shrink-0">
              <Icon name="grid" size={20} />
            </div>
            <div>
              <h6 className="text-muted font-semibold mb-1" style={{ fontSize: "0.85rem" }}>Operational Status</h6>
              <h6 className="font-extrabold mb-0 text-success" style={{ fontSize: "1.1rem", fontWeight: 700 }}>Online</h6>
            </div>
          </div>
        </div>
      </div>

      {/* Main console panel */}
      <div className="col-12 col-lg-6 reveal" style={{ ["--d" as string]: "300ms" }}>
        <div className="card h-100">
          <div className="card-header border-0 pt-4 pb-0">
            <h4 className="mb-1">Support Workspace</h4>
            <small className="text-muted">Operations panel for support services.</small>
          </div>
          <div className="card-body d-flex flex-column justify-content-between">
            <div className="d-grid gap-3 mt-2">
              <Link href={actionLink} className="btn btn-primary d-flex align-items-center justify-content-center gap-2">
                <Icon name={actionIcon} size={18} />
                {actionLabel}
              </Link>
              {role === "records_officer" && (
                <Link href="/patients/sick-leave" className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2">
                  <Icon name="file-med" size={18} />
                  Sick Leave Registry
                </Link>
              )}
            </div>
            <div className="mt-4 pt-3 border-top text-muted" style={{ fontSize: "0.8rem" }}>
              Please maintain strict logs of all operations and confirm verification flags.
            </div>
          </div>
        </div>
      </div>

      {/* Profile Overview */}
      <div className="col-12 col-lg-6 reveal" style={{ ["--d" as string]: "350ms" }}>
        <div className="card h-100">
          <div className="card-header border-0 pt-4 pb-0">
            <h4 className="mb-1">Operator Profile</h4>
            <small className="text-muted">Active identity details.</small>
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
