"use client";

import Link from "next/link";
import Icon from "@/components/Icon";

export default function VisitsPage() {
  return (
    <>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 order-last">
              <h3 style={{ color: "#1F2937", fontWeight: 700 }}>Visits</h3>
              <p style={{ color: "#4B5563" }}>Track and manage every patient encounter.</p>
            </div>
            <div className="col-12 col-md-6 order-md-2 order-first">
              <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Visits</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <section className="row g-4" style={{ overflowY: "auto", flex: 1 }}>
        {/* Coming soon card */}
        <div className="col-12">
          <div className="card reveal" style={{ ["--d" as string]: "150ms" }}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center text-center py-5">
              <div className="stats-icon green mb-4" style={{ width: 64, height: 64, borderRadius: "16px" }}>
                <Icon name="activity" size={28} />
              </div>
              <h4 className="fw-bold mb-2" style={{ color: "#1F2937" }}>Visit & Encounter Log</h4>
              <p style={{ color: "#4B5563", maxWidth: 420, margin: "0 auto 1.5rem" }}>
                Full visit tracking, encounter documentation, and clinical notes management is coming soon.
                This feature is being prepared for your clinical workflow.
              </p>
              <div className="d-flex gap-3 flex-wrap justify-content-center">
                <Link href="/patients" className="btn btn-primary d-flex align-items-center gap-2">
                  <Icon name="people" size={16} />
                  Patient Registry
                </Link>
                <Link href="/" className="btn btn-outline-primary d-flex align-items-center gap-2">
                  <Icon name="grid" size={16} />
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Placeholder summary cards */}
        {[
          { label: "Active Visits Today", value: "—", icon: "activity", color: "purple" },
          { label: "Avg Duration", value: "—", icon: "clock", color: "blue" },
          { label: "Completed", value: "—", icon: "people", color: "green" },
          { label: "Pending Discharge", value: "—", icon: "heart", color: "red" },
        ].map((stat, i) => (
          <div key={stat.label} className="col-12 col-sm-6 col-xl-3 reveal" style={{ ["--d" as string]: `${200 + i * 50}ms` }}>
            <div className="card h-100">
              <div className="card-body p-4 d-flex align-items-center gap-3">
                <div className={`stats-icon ${stat.color} flex-shrink-0`}>
                  <Icon name={stat.icon} size={20} />
                </div>
                <div>
                  <h6 style={{ fontSize: "0.85rem", color: "#4B5563", fontWeight: 600, marginBottom: "4px" }}>{stat.label}</h6>
                  <div className="animate-pulse bg-skeleton rounded" style={{ height: "1.4rem", width: "3rem", borderRadius: "6px" }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
