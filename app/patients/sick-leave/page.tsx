const LEAVE = [
  { name: "Nuru Hassan", dept: "Nursing", days: 3, from: "Jul 22", to: "Jul 25" },
  { name: "Brian Kiptoo", dept: "Lab", days: 1, from: "Jul 23", to: "Jul 24" },
  { name: "Zuri Ahmed", dept: "Maternity", days: 7, from: "Aug 01", to: "Aug 08" },
];

export default function SickLeavePage() {
  return (
    <>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6">
              <h3>Sick Leave</h3>
              <p className="text-subtitle text-muted">Issue and track medical leave certificates.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="card reveal">
            <div className="card-header">
              <h4>Issued certificates</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Department</th>
                      <th>Days</th>
                      <th>Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    {LEAVE.map((l) => (
                      <tr key={l.name}>
                        <td className="font-bold">{l.name}</td>
                        <td className="text-muted">{l.dept}</td>
                        <td>{l.days}</td>
                        <td className="text-muted">
                          {l.from} → {l.to}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card reveal" style={{ ["--d" as string]: "120ms" }}>
            <div className="card-header">
              <h4>New certificate</h4>
            </div>
            <div className="card-body">
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">Employee name</label>
                  <input className="form-control" placeholder="Full name" />
                </div>
                <div className="row">
                  <div className="col-6 mb-3">
                    <label className="form-label">Start</label>
                    <input className="form-control" type="date" />
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label">End</label>
                    <input className="form-control" type="date" />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Reason</label>
                  <textarea className="form-control" rows={3} placeholder="Clinical reason (kept private)" />
                </div>
                <button className="btn btn-primary w-100">Issue certificate</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
