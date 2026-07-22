"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import type { StaffRead } from "@/lib/types";

type Props = {
  profile: StaffRead | null;
  role: string;
};

export default function ClinicalDashboard({ profile, role }: Props) {
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
              <h6 style={{ fontSize: "0.85rem", color: "#4B5563", fontWeight: 600, marginBottom: 4 }}>Active Encounters</h6>
              <h6 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#1F2937", marginBottom: 0 }}>8</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-xl-3 reveal" style={{ ["--d" as string]: "150ms" }}>
        <div className="card h-100">
          <div className="card-body p-4 d-flex align-items-center gap-3">
            <div className="stats-icon blue flex-shrink-0">
              <Icon name="clock" size={20} />
            </div>
            <div>
              <h6 style={{ fontSize: "0.85rem", color: "#4B5563", fontWeight: 600, marginBottom: 4 }}>Avg Consultation</h6>
              <h6 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#1F2937", marginBottom: 0 }}>15m</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-xl-3 reveal" style={{ ["--d" as string]: "200ms" }}>
        <div className="card h-100">
          <div className="card-body p-4 d-flex align-items-center gap-3">
            <div className="stats-icon green flex-shrink-0">
              <Icon name="heart" size={20} />
            </div>
            <div>
              <h6 style={{ fontSize: "0.85rem", color: "#4B5563", fontWeight: 600, marginBottom: 4 }}>Critical Patients</h6>
              <h6 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#DC2626", marginBottom: 0 }}>2</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-xl-3 reveal" style={{ ["--d" as string]: "250ms" }}>
        <div className="card h-100">
          <div className="card-body p-4 d-flex align-items-center gap-3">
            <div className="stats-icon red flex-shrink-0">
              <Icon name="spark" size={20} />
            </div>
            <div>
              <h6 style={{ fontSize: "0.85rem", color: "#4B5563", fontWeight: 600, marginBottom: 4 }}>AI Diagnosis Help</h6>
              <h6 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#16A34A", marginBottom: 0 }}>Ready</h6>
            </div>
          </div>
        </div>
      </div>

      {/* Active Consultations Table */}
      <div className="col-12 col-lg-7 reveal" style={{ ["--d" as string]: "300ms" }}>
        <div className="card h-100">
          <div className="card-header border-0 pt-4 pb-0">
            <h4 className="mb-1 fw-bold" style={{ color: "#1F2937" }}>Active Consultations</h4>
            <small style={{ color: "#4B5563" }}>Patients currently waiting in your room.</small>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th style={{ color: "#374151", fontWeight: 600, fontSize: "0.85rem" }}>Patient Name</th>
                    <th style={{ color: "#374151", fontWeight: 600, fontSize: "0.85rem" }}>Time</th>
                    <th style={{ color: "#374151", fontWeight: 600, fontSize: "0.85rem" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="fw-semibold" style={{ color: "#1F2937" }}>Amina Said</td>
                    <td style={{ color: "#4B5563" }}>08:12</td>
                    <td>
                      <span style={{ borderRadius: "9999px", background: "#FEF9C3", color: "#854d0e", padding: "0.25em 0.7em", fontSize: "0.72rem", fontWeight: 600 }}>
                        In progress
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-semibold" style={{ color: "#1F2937" }}>Juma Mwangi</td>
                    <td style={{ color: "#4B5563" }}>08:40</td>
                    <td>
                      <span style={{ borderRadius: "9999px", background: "#FEF9C3", color: "#854d0e", padding: "0.25em 0.7em", fontSize: "0.72rem", fontWeight: 600 }}>
                        In progress
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Tools Quick Actions */}
      <div className="col-12 col-lg-5 reveal" style={{ ["--d" as string]: "350ms" }}>
        <div className="card h-100">
          <div className="card-header border-0 pt-4 pb-0">
            <h4 className="mb-1 fw-bold" style={{ color: "#1F2937" }}>Clinical Tools</h4>
            <small style={{ color: "#4B5563" }}>Direct operational shortcuts.</small>
          </div>
          <div className="card-body d-flex flex-column gap-3">
            <div className="d-flex align-items-center gap-2 py-2 px-3" style={{ fontSize: "0.8rem", color: "#854d0e", background: "#fef9c3", border: "1px solid #fef08a", borderRadius: "6px" }}>
              <Icon name="shield" size={16} />
              <span>Secure clinical workspace. Patient health data is protected under statutory law.</span>
            </div>
            <div className="d-grid gap-3">
              <Link href="/visits" className="btn btn-primary d-flex align-items-center justify-content-center gap-2 py-2">
                <Icon name="clock" size={18} />
                Encounter / Visit Log
              </Link>
              <Link href="/patients" className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2 py-2">
                <Icon name="people" size={18} />
                Patient Registry
              </Link>
              <Link href="/ai-help" className="btn btn-light-primary d-flex align-items-center justify-content-center gap-2 py-2">
                <Icon name="spark" size={18} />
                AI Clinical Co-Pilot
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
