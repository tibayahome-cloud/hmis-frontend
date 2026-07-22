"use client";

import UnderConstruction from "@/components/UnderConstruction";

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

      <UnderConstruction
        title="Triage Board"
        description="Triage queue and acuity sorting will be available here soon. This feature is being prepared for your workflow."
        icon="clipboard"
      />
    </>
  );
}
