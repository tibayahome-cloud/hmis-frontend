import AcuityBadge from "@/components/AcuityBadge";
import type { QueuePatient } from "@/lib/mock-data";

export default function VisitQueue({ rows }: { rows: QueuePatient[] }) {
  return (
    <div className="card">
      <div className="card-header">
        <h4>Live triage queue</h4>
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
              {rows.map((r) => (
                <tr key={r.position}>
                  <td className="font-extrabold">{String(r.position).padStart(2, "0")}</td>
                  <td>
                    <span className="font-bold">{r.name}</span>
                    <div className="text-muted" style={{ fontSize: "0.8rem" }}>
                      {r.age}y
                    </div>
                  </td>
                  <td>{r.complaint}</td>
                  <td className="text-muted">{r.waited}</td>
                  <td>
                    <AcuityBadge acuity={r.acuity} />
                  </td>
                  <td>
                    <button className="btn btn-primary btn-sm">Open</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
