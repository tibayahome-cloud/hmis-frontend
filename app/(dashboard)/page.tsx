import Link from "next/link";
import StatCard from "@/components/StatCard";
import VisitQueue from "@/components/VisitQueue";
import { KPIS, QUEUE, VISITS } from "@/lib/mock-data";

const DISPOSITION: Record<string, string> = {
  Complete: "bg-success",
  "In progress": "bg-warning",
  Waiting: "bg-info",
};

export default function DashboardPage() {
  return (
    <>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 order-last">
              <h3>Dashboard</h3>
              <p className="text-subtitle text-muted">Get real time analytics for your hospital.</p>
            </div>
            <div className="col-12 col-md-6 order-md-2 order-first">
              <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">Dashboard</Link>
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
            {KPIS.map((k, i) => (
              <StatCard key={k.label} kpi={k} index={i} />
            ))}
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card reveal" style={{ ["--d" as string]: "220ms" }}>
                <div className="card-header">
                  <h4>Visits by department</h4>
                </div>
                <div className="card-body">
                  <div className="bar-chart">
                    {VISITS.map((v, i) => (
                      <div className="bar-col" key={v.id}>
                        <div
                          className="bar"
                          style={{ height: `${40 + ((i + 1) * 22) % 140}px`, animationDelay: `${i * 60}ms` }}
                        />
                        <span className="bar-label">{v.department.slice(0, 4)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="reveal" style={{ ["--d" as string]: "260ms" }}>
                <VisitQueue rows={QUEUE} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-3">
          <div className="card reveal" style={{ ["--d" as string]: "300ms" }}>
            <div className="card-header">
              <h4>Acuity mix</h4>
            </div>
            <div className="card-body">
              <div className="legend-row">
                <span>
                  <span className="legend-dot" style={{ background: "var(--bs-danger)" }} />
                  Critical
                </span>
                <strong>{QUEUE.filter((q) => q.acuity === "red").length}</strong>
              </div>
              <div className="legend-row">
                <span>
                  <span className="legend-dot" style={{ background: "var(--bs-warning)" }} />
                  Urgent
                </span>
                <strong>{QUEUE.filter((q) => q.acuity === "amber").length}</strong>
              </div>
              <div className="legend-row">
                <span>
                  <span className="legend-dot" style={{ background: "var(--bs-success)" }} />
                  Stable
                </span>
                <strong>{QUEUE.filter((q) => q.acuity === "green").length}</strong>
              </div>
            </div>
          </div>

          <div className="card reveal" style={{ ["--d" as string]: "340ms" }}>
            <div className="card-header">
              <h4>Recent visits</h4>
            </div>
            <div className="card-content pb-4">
              {VISITS.slice(0, 4).map((v) => (
                <div key={v.id} style={{ padding: "0.9rem 1.5rem", borderBottom: "1px solid var(--card-border)" }}>
                  <div className="font-bold">{v.patient}</div>
                  <div className="text-muted" style={{ fontSize: "0.8rem" }}>
                    {v.time} · {v.department}
                  </div>
                  <span className={`badge ${DISPOSITION[v.disposition]} mt-1`}>{v.disposition}</span>
                </div>
              ))}
              <div style={{ padding: "1rem 1.5rem" }}>
                <Link href="/visits" className="btn btn-light-primary font-bold w-100">
                  View all
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
