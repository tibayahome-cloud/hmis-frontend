"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/StatCard";
import VisitQueue from "@/components/VisitQueue";
import { staff } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import type { StaffRead } from "@/lib/types";

const DISPOSITION: Record<string, string> = {
  Complete: "bg-success",
  "In progress": "bg-warning",
  Waiting: "bg-info",
};

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
                {loading ? "Loading..." : profile ? `Welcome, ${profile.full_name}` : "Get real time analytics for your hospital."}
              </p>
            </div>
            <div className="col-12 col-md-6 order-md-2 order-first">
              <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Dashboard</a>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <section className="row">
        <div className="col-12 col-lg-9">
          <div className="row">
            <div className="col-12">
              <div className="card reveal" style={{ ["--d" as string]: "220ms" }}>
                <div className="card-header">
                  <h4>Logged in as</h4>
                </div>
                <div className="card-body">
                  {loading ? (
                    <div className="text-muted">Loading profile...</div>
                  ) : profile ? (
                    <div>
                      <div className="font-bold">{profile.full_name}</div>
                      <div className="text-muted">{profile.email}</div>
                      <div>
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
          </div>

          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="card reveal" style={{ ["--d" as string]: "260ms" }}>
                <div className="card-header">
                  <h4>Available endpoints</h4>
                </div>
                <div className="card-body">
                  <ul>
                    <li><code>POST /api/v1/auth/login</code></li>
                    <li><code>POST /api/v1/auth/refresh</code></li>
                    <li><code>POST /api/v1/auth/logout</code></li>
                    <li><code>GET /api/v1/staff/me</code></li>
                    <li><code>GET /api/v1/staff</code></li>
                    <li><code>POST /api/v1/staff</code></li>
                    <li><code>GET /api/v1/staff/roles/list</code></li>
                    <li><code>GET /api/v1/hospitals</code></li>
                    <li><code>POST /api/v1/hospitals</code></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="card reveal" style={{ ["--d" as string]: "300ms" }}>
                <div className="card-header">
                  <h4>Role</h4>
                </div>
                <div className="card-body">
                  {loading ? (
                    <div className="text-muted">Loading role...</div>
                  ) : (
                    <div>
                      <div className="font-bold" style={{ fontSize: "2rem" }}>
                        {role || "—"}
                      </div>
                      <div className="text-muted">Current authenticated role</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card reveal" style={{ ["--d" as string]: "340ms" }}>
                <div className="card-header">
                  <h4>Workflow coverage</h4>
                </div>
                <div className="card-body">
                  <div className="text-muted">
                    Backend endpoints currently implemented: auth, hospitals, staff.
                    Patient, visit, billing, pharmacy, admission, ward-rounds,
                    service-rooms, triage, queue, and discharge endpoints are
                    not yet implemented in the backend.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-3">
          <div className="card reveal" style={{ ["--d" as string]: "300ms" }}>
            <div className="card-header">
              <h4>Quick actions</h4>
            </div>
            <div className="card-body">
              <a href="/staff" className="btn btn-light-primary font-bold w-100 mb-2">
                Manage staff
              </a>
              {(role === "super_admin") && (
                <a href="/hospitals" className="btn btn-light-primary font-bold w-100">
                  Manage hospitals
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
