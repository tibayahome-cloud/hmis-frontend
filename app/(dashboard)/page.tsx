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
        <div className="col-12 col-lg-8">
          <div className="row">
            <div className="col-12">
              <div className="card reveal" style={{ ["--d" as string]: "220ms" }}>
                <div className="card-header">
                  <h4>Profile</h4>
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
            <div className="col-12 col-md-6">
              <div className="card reveal" style={{ ["--d" as string]: "260ms" }}>
                <div className="card-header">
                  <h4>Account</h4>
                </div>
                <div className="card-body">
                  {loading ? (
                    <div className="text-muted">Loading...</div>
                  ) : (
                    <div>
                      <div className="font-bold" style={{ fontSize: "1.6rem" }}>
                        {role || "—"}
                      </div>
                      <div className="text-muted">Role</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="card reveal" style={{ ["--d" as string]: "300ms" }}>
                <div className="card-header">
                  <h4>Getting started</h4>
                </div>
                <div className="card-body">
                  <div className="text-muted">
                    Use the left menu to manage staff and hospital setup.
                    Additional workflows will appear here as modules are enabled.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
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
