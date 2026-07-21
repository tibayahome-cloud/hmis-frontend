import { PATIENTS } from "@/lib/mock-data";

export default function NewPatientPage() {
  return (
    <>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6">
              <h3>New Patient</h3>
              <p className="text-subtitle text-muted">Register a patient and open their chart.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="card reveal">
            <div className="card-header">
              <h4>Intake</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">First name</label>
                    <input className="form-control" placeholder="Amina" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Last name</label>
                    <input className="form-control" placeholder="Said" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Date of birth</label>
                    <input className="form-control" type="date" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Sex</label>
                    <select className="form-select">
                      <option>Female</option>
                      <option>Male</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input className="form-control" placeholder="+254..." />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">ID type</label>
                    <select className="form-select">
                      <option>National ID</option>
                      <option>Passport</option>
                      <option>Birth cert</option>
                    </select>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input className="form-control" placeholder="District, estate, building" />
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">Presenting complaint</label>
                    <textarea className="form-control" rows={3} placeholder="Reason for visit" />
                  </div>
                </div>
                <div className="col-12 d-flex gap-2">
                  <button className="btn btn-primary">Register patient</button>
                  <button className="btn btn-light-primary">Save draft</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card reveal" style={{ ["--d" as string]: "120ms" }}>
            <div className="card-header">
              <h4>On register</h4>
            </div>
            <div className="card-body">
              <p className="text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                New registrations write to the patient table, then route to triage. This form is local only; wire the
                submit handler to <code>lib/api.ts</code> when the backend accepts POSTs.
              </p>
              <div className="badge bg-success">Form is local only</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
