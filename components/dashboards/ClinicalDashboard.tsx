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
              <h6 className="text-muted font-semibold mb-1" style={{ fontSize: "0.85rem" }}>Active Encounters</h6>
              <h6 className="font-extrabold mb-0" style={{ fontSize: "1.4rem" }}>8</h6>
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
              <h6 className="text-muted font-semibold mb-1" style={{ fontSize: "0.85rem" }}>Avg Consultation</h6>
              <h6 className="font-extrabold mb-0" style={{ fontSize: "1.4rem" }}>15m</h6>
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
              <h6 className="text-muted font-semibold mb-1" style={{ fontSize: "0.85rem" }}>Critical Patients</h6>
              <h6 className="font-extrabold mb-0 text-danger" style={{ fontSize: "1.4rem" }}>2</h6>
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
              <h6 className="text-muted font-semibold mb-1" style={{ fontSize: "0.85rem" }}>AI Diagnosis Help</h6>
              <h6 className="font-extrabold mb-0 text-success" style={{ fontSize: "1.1rem", fontWeight: 700 }}>Ready</h6>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Workspace & Queue Links */}
      <div className="col-12 col-lg-7 reveal" style={{ ["--d" as string]: "300ms" }}>
        <div className="card h-100">
          <div className="card-header border-0 pt-4 pb-0">
            <h4 className="mb-1">Active Consultations</h4>
            <small className="text-muted">Patients currently waiting in your room.</small>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="fw-semibold">Amina Said</td>
                    <td>08:12</td>
                    <td><span className="badge bg-warning">In progress</span></td>
                  </tr>
                  <tr>
                    <td className="fw-semibold">Juma Mwangi</td>
                    <td>08:40</td>
                    <td><span className="badge bg-warning">In progress</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Clinical Operations */}
      <div className="col-12 col-lg-5 reveal" style={{ ["--d" as string]: "350ms" }}>
        <div className="card h-100">
          <div className="card-header border-0 pt-4 pb-0">
            <h4 className="mb-1">Clinical Tools</h4>
            <small className="text-muted">Direct operational shortcuts.</small>
          </div>
          <div className="card-body d-flex flex-column justify-content-between">
            <div className="d-grid gap-3 mt-2">
              <Link href="/visits" className="btn btn-primary d-flex align-items-center justify-content-center gap-2">
                <Icon name="clock" size={18} />
                Encounter/Visit Log
              </Link>
              <Link href="/patients" className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2">
                <Icon name="people" size={18} />
                Patient Registry
              </Link>
              <Link href="/ai-help" className="btn btn-light-primary d-flex align-items-center justify-content-center gap-2 font-bold">
                <Icon name="spark" size={18} />
                AI Clinical Co-Pilot
              </Link>
            </div>
            <div className="mt-4 pt-3 border-top text-muted" style={{ fontSize: "0.8rem" }}>
              Secure clinical workspace. Patient health data confidentiality is protected under statutory law.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
