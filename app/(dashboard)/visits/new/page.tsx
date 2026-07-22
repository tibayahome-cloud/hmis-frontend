import { PATIENTS } from "@/lib/mock-data";

export default function NewVisitPage() {
  return (
    <>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6">
              <h3>New Visit</h3>
              <p className="text-subtitle text-muted">Open an encounter against a patient and department.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="card reveal">
            <div className="card-header">
              <h4>Encounter</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-12 mb-3">
                  <label className="form-label">Patient</label>
                  <select className="form-select">
                    {PATIENTS.map((p) => (
                      <option key={p.id}>
                        {p.name} · {p.mrn}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Department</label>
                  <select className="form-select">
                    <option>Emergency</option>
                    <option>General</option>
                    <option>Cardiology</option>
                    <option>Maternity</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Clinician</label>
                  <input className="form-control" placeholder="Dr. ..." />
                </div>
                <div className="col-12 mb-3">
                  <label className="form-label">Clinical note</label>
                  <textarea className="form-control" rows={4} placeholder="Presentation, examination, plan" />
                </div>
                <div className="col-12 d-flex gap-2">
                  <button className="btn btn-primary">Start visit</button>
                  <button className="btn btn-light-primary">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card reveal" style={{ ["--d" as string]: "120ms" }}>
            <div className="card-header">
              <h4>Note</h4>
            </div>
            <div className="card-body">
              <p className="text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                Encounter details will be saved once backend endpoints are available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
