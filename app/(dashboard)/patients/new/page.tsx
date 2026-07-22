"use client";

import UnderConstruction from "@/components/UnderConstruction";

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

      <UnderConstruction
        title="New Patient Registration"
        description="Patient registration and intake forms will be available here soon. This feature is being prepared for your workflow."
        icon="user-plus"
      />
    </>
  );
}
