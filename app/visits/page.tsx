import Link from "next/link";
import { VISITS } from "@/lib/mock-data";

const DISPOSITION: Record<string, string> = {
  Complete: "bg-success",
  "In progress": "bg-warning",
  Waiting: "bg-info",
};

export default function VisitsPage() {
  return (
    <>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6">
              <h3>Visits</h3>
              <p className="text-subtitle text-muted">Every encounter logged today.</p>
            </div>
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-md-end">
              <Link href="/visits/new" className="btn btn-primary">
                + New Visit
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="card reveal">
        <div className="card-header">
          <h4>Visit log</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Patient</th>
                  <th>Clinician</th>
                  <th>Department</th>
                  <th>Time</th>
                  <th>Disposition</th>
                </tr>
              </thead>
              <tbody>
                {VISITS.map((v) => (
                  <tr key={v.id}>
                    <td className="font-bold">{v.id}</td>
                    <td>{v.patient}</td>
                    <td>{v.clinician}</td>
                    <td className="text-muted">{v.department}</td>
                    <td className="text-muted">{v.time}</td>
                    <td>
                      <span className={`badge ${DISPOSITION[v.disposition]}`}>{v.disposition}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
