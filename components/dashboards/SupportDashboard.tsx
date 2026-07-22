"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import type { StaffRead } from "@/lib/types";

type Props = {
  profile: StaffRead | null;
  role: string;
};

export default function SupportDashboard({ profile, role }: Props) {
  // Determine role-based console action
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
      {/* KPI Stat Cards */}
      <div className="col-12 col-sm-6 col-xl-3 reveal" style={{ ["--d" as string]: "100ms" }}>
        <div className="card h-100">
          <div className="card-body p-4 d-flex align-items-center gap-3">
            <div className="stats-icon purple flex-shrink-0">
              <Icon name="clock" size={20} />
            </div>
            <div>
              <h6 style={{ fontSize: "0.85rem", color: "#4B5563", fontWeight: 600 }} className="mb-1">
                Pending Queue
              </h6>
              <h6 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#1F2937" }} className="mb-0">
                9
              </h6>
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
              <h6 style={{ fontSize: "0.85rem", color: "#4B5563", fontWeight: 600 }} className="mb-1">
                Completed Today
              </h6>
              <h6 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#1F2937" }} className="mb-0">
                16
              </h6>
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
              <h6 style={{ fontSize: "0.85rem", color: "#4B5563", fontWeight: 600 }} className="mb-1">
                Assigned Staff
              </h6>
              <h6 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#1F2937" }} className="mb-0">
                4
              </h6>
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
              <h6 style={{ fontSize: "0.85rem", color: "#4B5563", fontWeight: 600 }} className="mb-1">
                Operational Status
              </h6>
              <h6
                className="mb-0 text-success"
                style={{ fontSize: "1.4rem", fontWeight: 700 }}
              >
                Online
              </h6>
            </div>
          </div>
        </div>
      </div>

      {/* Support Workspace */}
      <div className="col-12 col-lg-6 reveal" style={{ ["--d" as string]: "300ms" }}>
        <div className="card h-100">
          <div className="card-header border-0 pt-4 pb-0">
            <h4 className="mb-1 fw-bold" style={{ color: "#1F2937" }}>
              Support Workspace
            </h4>
            <small style={{ color: "#4B5563" }}>Operations panel for support services.</small>
          </div>
          <div className="card-body d-flex flex-column justify-content-between">
            <div>
              <div
                className="d-flex align-items-center gap-2 mb-3 py-2 px-3"
                style={{
                  fontSize: "0.8rem",
                  color: "#854d0e",
                  background: "#fef9c3",
                  border: "1px solid #fef08a",
                  borderRadius: "6px",
                }}
              >
                <Icon name="shield" size={16} />
                <span>
                  Please maintain strict logs of all operations and confirm verification flags.
                </span>
              </div>
              <div className="d-grid gap-3">
                <Link
                  href={actionLink}
                  className="btn btn-primary d-flex align-items-center justify-content-center gap-2 py-2"
                >
                  <Icon name={actionIcon} size={18} />
                  {actionLabel}
                </Link>
                {role === "records_officer" && (
                  <Link
                    href="/patients/sick-leave"
                    className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2 py-2"
                  >
                    <Icon name="file-med" size={18} />
                    Sick Leave Registry
                  </Link>
                )}
              </div>
            </div>
            <p style={{ fontSize: "0.78rem", color: "#6B7280", marginTop: "1rem" }}>
              All support operations are subject to audit and compliance review.
            </p>
          </div>
        </div>
      </div>

      {/* Operator Profile */}
      <div className="col-12 col-lg-6 reveal" style={{ ["--d" as string]: "350ms" }}>
        <div className="card h-100">
          <div className="card-header border-0 pt-4 pb-0">
            <h4 className="mb-1 fw-bold" style={{ color: "#1F2937" }}>
              Operator Profile
            </h4>
            <small style={{ color: "#4B5563" }}>Active identity details.</small>
          </div>
          <div className="card-body">
            {profile ? (
              <div
                className="d-grid gap-3 mt-3"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
              >
                <div>
                  <span
                    style={{ fontSize: "0.8rem", fontWeight: 600, color: "#4B5563" }}
                    className="d-block mb-1"
                  >
                    Full Name
                  </span>
                  <span
                    className="fw-semibold"
                    style={{ fontSize: "1.05rem", color: "var(--body-color)" }}
                  >
                    {profile.full_name}
                  </span>
                </div>
                <div>
                  <span
                    style={{ fontSize: "0.8rem", fontWeight: 600, color: "#4B5563" }}
                    className="d-block mb-1"
                  >
                    Designated Role
                  </span>
                  <span
                    style={{
                      borderRadius: "9999px",
                      background: "#E0E7FF",
                      color: "#3730A3",
                      padding: "0.35em 0.8em",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                    }}
                  >
                    {role}
                  </span>
                </div>
                <div>
                  <span
                    style={{ fontSize: "0.8rem", fontWeight: 600, color: "#4B5563" }}
                    className="d-block mb-1"
                  >
                    Account Status
                  </span>
                  {profile.is_active !== false ? (
                    <span
                      style={{
                        borderRadius: "9999px",
                        background: "#DCFCE7",
                        color: "#166534",
                        padding: "0.35em 0.8em",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                      }}
                    >
                      Active
                    </span>
                  ) : (
                    <span
                      style={{
                        borderRadius: "9999px",
                        background: "#FEE2E2",
                        color: "#991B1B",
                        padding: "0.35em 0.8em",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                      }}
                    >
                      Inactive
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="mt-3">
                <div
                  className="animate-pulse bg-skeleton rounded"
                  style={{ height: "1rem", width: "60%", marginBottom: "8px" }}
                />
                <div
                  className="animate-pulse bg-skeleton rounded"
                  style={{ height: "1rem", width: "40%", marginBottom: "8px" }}
                />
                <div
                  className="animate-pulse bg-skeleton rounded"
                  style={{ height: "1rem", width: "50%", marginBottom: "8px" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
