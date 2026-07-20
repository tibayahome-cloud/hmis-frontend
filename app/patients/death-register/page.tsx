const DEATHS = [
  { name: "J. Mwangi", mrn: "MRN-3390", age: 71, cause: "Cardiac arrest", time: "Jul 18 · 03:14", ward: "ICU" },
  { name: "A. Oduya", mrn: "MRN-3412", age: 54, cause: "Sepsis", time: "Jul 16 · 21:40", ward: "Critical" },
  { name: "M. Sila", mrn: "MRN-3455", age: 39, cause: "RTA injuries", time: "Jul 11 · 18:02", ward: "Trauma" },
];

export default function DeathRegisterPage() {
  return (
    <>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6">
              <h3>Death Register</h3>
              <p className="text-subtitle text-muted">Statutory record of in-facility deaths.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card reveal">
        <div className="card-header">
          <h4>Register</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>MRN</th>
                  <th>Age</th>
                  <th>Cause</th>
                  <th>Ward</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {DEATHS.map((d) => (
                  <tr key={d.mrn}>
                    <td className="font-bold">{d.name}</td>
                    <td>{d.mrn}</td>
                    <td>{d.age}</td>
                    <td>{d.cause}</td>
                    <td className="text-muted">{d.ward}</td>
                    <td className="text-muted">{d.time}</td>
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
