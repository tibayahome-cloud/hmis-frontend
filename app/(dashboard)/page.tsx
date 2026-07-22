"use client";

import { useEffect, useState } from "react";
import { staff } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import type { StaffRead } from "@/lib/types";

export default function DashboardPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<StaffRead | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await staff.me();
        if (!cancelled) setProfile(data);
      } catch {
        // keep auth-context user state
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const role = profile?.role?.name || user?.role?.name || "";

  return (
    <>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 order-last">
              <h3>Dashboard</h3>
              <p className="text-subtitle text-muted">
                {loading
                  ? "Loading your session..."
                  : profile
                    ? `Good morning, ${profile.full_name}.`
                    : "Overview of your hospital environment."}
              </p>
            </div>
            <div className="col-12 col-md-6 order-md-2 order-first">
              <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Dashboard
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <section className="row g-4">
        <div className="col-12 col-xl-8">
          <div className="card reveal" style={{ ["--d" as string]: "200ms" }}>
            <div className="card-header border-0 pt-4 pb-0">
              <div>
                <h4 className="mb-1">Profile</h4>
                <small className="text-muted">Your current session identity.</small>
              </div>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-muted">Loading profile...</div>
              ) : profile ? (
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                  <div>
                    <div className="fw-semibold" style={{ fontSize: "1.1rem" }}>
                      {profile.full_name}
                    </div>
                    <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                      {profile.email}
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <span className="badge bg-primary">{profile.role?.name || "Staff"}</span>
                    <span className={`badge ${profile.is_active ? "bg-success" : "bg-secondary"}`}>
                      {profile.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <div className="card reveal h-100" style={{ ["--d" as string]: "240ms" }}>
            <div className="card-header border-0 pt-4 pb-0">
              <h4 className="mb-1">Quick actions</h4>
              <small className="text-muted">Common admin tasks.</small>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <a href="/staff" className="btn btn-primary">
                  Manage staff
                </a>
                {(role === "super_admin") && (
                  <a href="/hospitals" className="btn btn-outline-primary">
                    Manage hospitals
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <div className="card reveal h-100" style={{ ["--d" as string]: "280ms" }}>
            <div className="card-header border-0 pt-4 pb-0">
              <h4 className="mb-1">Role</h4>
              <small className="text-muted">Authorized access level.</small>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-muted">Loading...</div>
              ) : (
                <div style={{ fontSize: "1.6rem", fontWeight: 600 }}>
                  {role || "—"}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-8">
          <div className="card reveal" style={{ ["--d" as string]: "320ms" }}>
            <div className="card-header border-0 pt-4 pb-0">
              <h4 className="mb-1">Context</h4>
              <small className="text-muted">What this dashboard is for.</small>
            </div>
            <div className="card-body">
              <div className="text-muted" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                Use the sidebar to run setup and administration tasks.
                Modules for patients, visits, billing, pharmacy, admissions,
                ward operations, and reporting will appear here as they are enabled.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
