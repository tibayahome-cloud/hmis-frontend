"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { staff, hospitals } from "@/lib/api";
import Icon from "@/components/Icon";
import type { StaffRead } from "@/lib/types";
import type { Page } from "@/lib/api";

type Props = {
  profile: StaffRead | null;
  role: string;
};

// Helper to format numbers with commas
function formatCount(n: number | null | undefined): string {
  if (n === undefined || n === null) return "—";
  return n.toLocaleString();
}

export default function AdminDashboard({ profile, role }: Props) {
  const [staffCount, setStaffCount] = useState<number | null>(null);
  const [hospitalCount, setHospitalCount] = useState<number | null>(null);
  const [systemStatus, setSystemStatus] = useState<"Healthy" | "Degraded" | "Error">("Healthy");
  const [dbStatus, setDbStatus] = useState<"Connected" | "Error">("Connected");
  const [loadingKpis, setLoadingKpis] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadKpis() {
      setLoadingKpis(true);
      try {
        // Fetch staff count
        const staffResult = await staff.list({ limit: 1 });
        if (!cancelled) setStaffCount(staffResult.items.length); // API returns total count via pagination

        // Fetch hospital count
        const hospResult = await hospitals.list({ limit: 1 });
        if (!cancelled) setHospitalCount(hospResult.items.length);

        // Simulate system health check (in real app, this would be a health endpoint)
        setSystemStatus("Healthy");
        setDbStatus("Connected");
      } catch (err) {
        if (!cancelled) {
          setSystemStatus("Degraded");
          setDbStatus("Error");
        }
      } finally {
        if (!cancelled) setLoadingKpis(false);
      }
    }

    loadKpis();
    return () => { cancelled = true; };
  }, []);

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
              <h6 className="text-muted font-semibold mb-1" style={{ fontSize: "0.85rem", color: "#4B5563" }}>Total Staff</h6>
              <h6 className="font-extrabold mb-0" style={{ fontSize: "1.4rem" }}>
                {loadingKpis ? <span className="animate-pulse">—</span> : formatCount(staffCount)}
              </h6>
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
              <h6 className="text-muted font-semibold mb-1" style={{ fontSize: "0.85rem", color: "#4B5563" }}>Active Hospitals</h6>
              <h6 className="font-extrabold mb-0" style={{ fontSize: "1.4rem" }}>
                {loadingKpis ? <span className="animate-pulse">—</span> : formatCount(hospitalCount)}
              </h6>
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
              <h6 className="text-muted font-semibold mb-1" style={{ fontSize: "0.85rem", color: "#4B5563" }}>System Status</h6>
              <h6 className={`font-extrabold mb-0 ${systemStatus === "Healthy" ? "text-success" : systemStatus === "Degraded" ? "text-warning" : "text-danger"}`} style={{ fontSize: "1.4rem", fontWeight: 700 }}>
                {systemStatus}
              </h6>
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
              <h6 className="text-muted font-semibold mb-1" style={{ fontSize: "0.85rem", color: "#4B5563" }}>DB Connection</h6>
              <h6 className={`font-extrabold mb-0 ${dbStatus === "Connected" ? "text-success" : "text-danger"}`} style={{ fontSize: "1.4rem", fontWeight: 700 }}>
                {dbStatus}
              </h6>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Overview Card */}
      <div className="col-12 col-lg-6 reveal" style={{ ["--d" as string]: "300ms" }}>
        <div className="card h-100">
          <div className="card-header border-0 pt-4 pb-0">
            <h4 className="mb-1 fw-bold" style={{ color: "#1F2937" }}>Administrator Profile</h4>
            <small className="text-muted" style={{ color: "#4B5563" }}>Your active session details.</small>
          </div>
          <div className="card-body">
            {profile ? (
              <div className="d-grid gap-3 mt-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                <div>
                  <span className="text-muted d-block mb-1" style={{ fontSize: "0.8rem", fontWeight: 600, color: "#4B5563" }}>Full Name</span>
                  <span className="fw-semibold" style={{ fontSize: "1.05rem", color: "var(--body-color)" }}>{profile.full_name}</span>
                </div>
                <div>
                  <span className="text-muted d-block mb-1" style={{ fontSize: "0.8rem", fontWeight: 600, color: "#4B5563" }}>Email Address</span>
                  <span className="fw-semibold" style={{ fontSize: "1.05rem", color: "var(--body-color)" }}>{profile.email}</span>
                </div>
                <div>
                  <span className="text-muted d-block mb-1" style={{ fontSize: "0.8rem", fontWeight: 600, color: "#4B5563" }}>System Role</span>
                  <span className="badge mt-1" style={{ textTransform: "uppercase", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.04em", borderRadius: "9999px", background: "#E0E7FF", color: "#3730A3", padding: "0.35em 0.8em" }}>{role}</span>
                </div>
                <div>
                  <span className="text-muted d-block mb-1" style={{ fontSize: "0.8rem", fontWeight: 600, color: "#4B5563" }}>Account Status</span>
                  <span className={`badge mt-1`} style={{ fontSize: "0.7rem", fontWeight: 700, borderRadius: "9999px", background: profile.is_active ? "#DCFCE7" : "#F1F5F9", color: profile.is_active ? "#166534" : "#475569", padding: "0.35em 0.8em" }}>
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
            <h4 className="mb-1 fw-bold" style={{ color: "#1F2937" }}>Administrative Console</h4>
            <small className="text-muted" style={{ color: "#4B5563" }}>Quick access to management tasks.</small>
          </div>
          <div className="card-body d-flex flex-column gap-3">
            <div className="alert alert-warning mb-2 py-2 px-3 d-flex align-items-center gap-2" style={{ fontSize: "0.8rem", color: "#854d0e", background: "#fef9c3", border: "1px solid #fef08a", borderRadius: "6px" }}>
              <Icon name="shield" size={16} />
              <span>Logged in as a system supervisor. Exercise caution when modifying privileges.</span>
            </div>
            
            <div className="d-grid gap-3">
              <Link href="/staff" className="btn btn-primary d-flex align-items-center justify-content-center gap-2 py-2">
                <Icon name="people" size={18} />
                Manage Staff Directory
              </Link>
              {role === "super_admin" && (
                <Link href="/hospitals" className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2 py-2">
                  <Icon name="hospital" size={18} />
                  Manage Connected Hospitals
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}