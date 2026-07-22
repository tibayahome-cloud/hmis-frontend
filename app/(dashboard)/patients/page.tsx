"use client";

import UnderConstruction from "@/components/UnderConstruction";

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
          </div>
        </div>
      </div>

      <UnderConstruction
        title="Patient Registry"
        description="Patient records and registry management will be available here soon. This feature is being prepared for your workflow."
        icon="users"
      />
    </>
  );
}
