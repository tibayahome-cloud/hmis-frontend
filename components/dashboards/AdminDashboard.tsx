"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import type { StaffRead } from "@/lib/types";

type Props = {
  profile: StaffRead | null;
  role: string;
};

export default function AdminDashboard({ profile, role }: Props) {
  return (
    <div className="row g-4">
      {/* KPI Stats Cards */}
      <div className="col-12 col-sm-6 col-xl-3 reveal" style={{ ["--d" as string]: "100ms" }}>
        <div className="card h-100">
          <div className="card-body p-4 d-flex align-items-center gap-3">
            <div className="stats-icon purple flex-shrink-0">
              <Icon name="people" size={20} />
            </div>
            <div>
              <h6 className="text-muted font-semibold mb-1" style={{ fontSize: "0.85rem" }}>Total Staff</h6>
              <h6 className="font-extrabold mb-0" style={{ fontSize: "1.4rem" }}>24</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-xl-3 reveal" style={{ ["--d" as string]: "150ms" }}>
        <div className="card h-100">
          <div className="card-body p-4 d-flex align-items-center gap-3">
            <div className="stats-icon blue flex-shrink-0">
              <Icon name="hospital" size={20} />
            </div>
            <div>
              <h6 className="text-muted font-semibold mb-1" style={{ fontSize: "0.85rem", color: "var(--muted-dark)" }}>Active Hospitals</h6>
              <h6 className="font-extrabold mb-0" style={{ fontSize: "1.4rem" }}>3</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-xl-3 reveal" style={{ ["--d" as string]: "200ms" }}>
        <div className="card h-100">
          <div className="card-body p-4 d-flex align-items-center gap-3">
            <div className="stats-icon green flex-shrink-0">
              <Icon name="activity" size={20} />
            </div>
            <div>
              <h6 className="text-muted font-semibold mb-1" style={{ fontSize: "0.85rem", color: "var(--muted-dark)" }}>System Status</h6>
              <h6 className="font-extrabold mb-0 text-success" style={{ fontSize: "1.1rem", fontWeight: 700 }}>Healthy</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-xl-3 reveal" style={{ ["--d" as string]: "250ms" }}>
        <div className="card h-100">
          <div className="card-body p-4 d-flex align-items-center gap-3">
            <div className="stats-icon red flex-shrink-0">
              <Icon name="database" size={20} />
            </div>
            <div>
              <h6 className="text-muted font-semibold mb-1" style={{ fontSize: "0.85rem", color: "var(--muted-dark)" }}>DB Connection</h6>
              <h6 className="font-extrabold mb-0 text-success" style={{ fontSize: "1.1rem", fontWeight: 700 }}>Connected</h6>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Overview Card */}
      <div className="col-12 col-lg-6 reveal" style={{ ["--d" as string]: "300ms" }}>
        <div className="card h-100">
          <div className="card-header border-0 pt-4 pb-0">
            <h4 className="mb-1">Administrator Profile</h4>
            <small className="text-muted" style={{ color: "var(--muted-dark)" }}>Your active session details.</small>
          </div>
          <div className="card-body">
            {profile ? (
              <div className="d-grid gap-3 mt-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                <div>
                  <span className="text-muted d-block mb-1" style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--muted-dark)" }}>Full Name</span>
                  <span className="fw-semibold" style={{ fontSize: "1.05rem", color: "var(--body-color)" }}>{profile.full_name}</span>
                </div>
                <div>
                  <span className="text-muted d-block mb-1" style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--muted-dark)" }}>Email Address</span>
                  <span className="fw-semibold" style={{ fontSize: "1.05rem", color: "var(--body-color)" }}>{profile.email}</span>
                </div>
                <div>
                  <span className="text-muted d-block mb-1" style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--muted-dark)" }}>System Role</span>
                  <span className="badge bg-primary mt-1" style={{ textTransform: "uppercase", fontSize: "0.7rem", letterSpacing: "0.04em" }}>{role}</span>
                </div>
                <div>
                  <span className="text-muted d-block mb-1" style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--muted-dark)" }}>Account Status</span>
                  <span className={`badge ${profile.is_active ? "bg-success" : "bg-secondary"} mt-1`} style={{ fontSize: "0.7rem" }}>
                    {profile.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-muted">Loading profile details...</div>
            )}
          </div>
        </div>
      </div>

      {/* Admin Quick Actions Card */}
      <div className="col-12 col-lg-6 reveal" style={{ ["--d" as string]: "350ms" }}>
        <div className="card h-100">
          <div className="card-header border-0 pt-4 pb-0">
            <h4 className="mb-1">Administrative Console</h4>
            <small className="text-muted">Quick access to management tasks.</small>
          </div>
          <div className="card-body d-flex flex-column justify-content-between">
            <div className="d-grid gap-3 mt-2">
              <Link href="/staff" className="btn btn-primary d-flex align-items-center justify-content-center gap-2">
                <Icon name="people" size={18} />
                Manage Staff Directory
              </Link>
              {role === "super_admin" && (
                <Link href="/hospitals" className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2">
                  <Icon name="hospital" size={18} />
                  Manage Connected Hospitals
                </Link>
              )}
            </div>
            <div className="mt-4 pt-3 border-top text-muted" style={{ fontSize: "0.8rem" }}>
              Logged in as a system supervisor. Please exercise caution when modifying staff privileges.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
