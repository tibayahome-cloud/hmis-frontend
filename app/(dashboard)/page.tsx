"use client";

import { useEffect, useState } from "react";
import { staff } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import type { StaffRead } from "@/lib/types";

// Import Role Dashboards
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import ClinicalDashboard from "@/components/dashboards/ClinicalDashboard";
import ReceptionDashboard from "@/components/dashboards/ReceptionDashboard";
import TriageDashboard from "@/components/dashboards/TriageDashboard";
import SupportDashboard from "@/components/dashboards/SupportDashboard";

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

  // Render correct dashboard based on role name
  const renderDashboardContent = () => {
    if (loading) {
      return (
        <div className="d-flex justify-content-center align-items-center py-5">
          <div className="text-muted">Loading your dashboard...</div>
        </div>
      );
    }

    switch (role) {
      case "super_admin":
      case "admin":
        return <AdminDashboard profile={profile} role={role} />;

      case "doctor":
      case "consultant":
      case "ward_nurse":
        return <ClinicalDashboard profile={profile} role={role} />;

      case "receptionist":
      case "admission_officer":
        return <ReceptionDashboard profile={profile} role={role} />;

      case "triage_nurse":
        return <TriageDashboard profile={profile} role={role} />;

      case "lab_tech":
      case "pharmacist":
      case "billing_clerk":
      case "records_officer":
        return <SupportDashboard profile={profile} role={role} />;

      default:
        // Default general dashboard fallback
        return <ClinicalDashboard profile={profile} role={role} />;
    }
  };

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 order-last">
              <h3 style={{ color: "#1F2937", fontWeight: 700 }}>Dashboard</h3>
              <p className="text-subtitle" style={{ color: "#4B5563" }}>
                {loading
                  ? "Loading your session..."
                  : profile
                    ? `${greeting()}, ${profile.full_name}.`
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

      <section className="section" style={{ overflowY: "auto", flex: 1 }}>
        {loading ? (
          <div className="row g-4">
            {[100, 150, 200, 250].map((d) => (
              <div key={d} className="col-12 col-sm-6 col-xl-3">
                <div className="card h-100">
                  <div className="card-body p-4 d-flex align-items-center gap-3">
                    <div className="animate-pulse bg-skeleton rounded" style={{ width: 44, height: 44, borderRadius: "12px" }} />
                    <div style={{ flex: 1 }}>
                      <div className="animate-pulse bg-skeleton rounded mb-2" style={{ height: "0.75rem", width: "60%" }} />
                      <div className="animate-pulse bg-skeleton rounded" style={{ height: "1.4rem", width: "35%" }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          renderDashboardContent()
        )}
      </section>
    </>
  );
}
