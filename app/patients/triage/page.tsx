import AcuityBadge from "@/components/AcuityBadge";
import { QUEUE } from "@/lib/mock-data";

export default function TriagePage() {
  return (
    <>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6">
              <h3>Triage</h3>
              <p className="text-subtitle text-muted">Sort the waiting room by acuity.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card reveal">
        <div className="card-header">
          <h4>Acuity board</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Patient</th>
                  <th>Complaint</th>
                  <th>Waited</th>
                  <th>Acuity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {QUEUE.map((r) => (
                  <tr key={r.position}>
                    <td className="font-extrabold">{String(r.position).padStart(2, "0")}</td>
                    <td className="font-bold">{r.name}</td>
                    <td>{r.complaint}</td>
                    <td className="text-muted">{r.waited}</td>
                    <td>
                      <AcuityBadge acuity={r.acuity} />
                    </td>
                    <td>
                      <button className="btn btn-sm btn-primary">Assess</button>
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
