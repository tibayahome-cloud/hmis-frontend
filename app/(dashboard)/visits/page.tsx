"use client";

import UnderConstruction from "@/components/UnderConstruction";

export default function VisitsPage() {
  return (
    <>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6">
              <h3>Visits</h3>
              <p className="text-subtitle text-muted">Every encounter logged today.</p>
            </div>
          </div>
        </div>
      </div>

      <UnderConstruction
        title="Visit Log"
        description="Visit tracking and encounter history will be available here soon. This feature is being prepared for your workflow."
        icon="activity"
      />
    </>
  );
}
