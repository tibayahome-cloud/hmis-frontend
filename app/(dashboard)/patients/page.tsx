import Link from "next/link";
import { PATIENTS } from "@/lib/mock-data";

const STATUS: Record<string, string> = {
  Admitted: "bg-danger",
  Outpatient: "bg-success",
  Triage: "bg-warning",
  Discharged: "bg-info",
};

export default function PatientsPage() {
  return (
    <>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6">
              <h3>Patients</h3>
              <p className="text-subtitle text-muted">Everyone currently in the system.</p>
            </div>
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-md-end">
              <Link href="/patients/new" className="btn btn-primary">
                + New Patient
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="card reveal">
        <div className="card-header">
          <h4>Patient registry</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>MRN</th>
                  <th>Age / sex</th>
                  <th>Status</th>
                  <th>Last visit</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {PATIENTS.map((p) => (
                  <tr key={p.id}>
                    <td className="font-bold">{p.name}</td>
                    <td>{p.mrn}</td>
                    <td>
                      {p.age} · {p.sex}
                    </td>
                    <td>
                      <span className={`badge ${STATUS[p.status]}`}>{p.status}</span>
                    </td>
                    <td className="text-muted">{p.lastVisit}</td>
                    <td className="text-end">
                      <Link href="/patients/new" className="btn btn-sm btn-light-primary font-bold">
                        Chart
                      </Link>
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
