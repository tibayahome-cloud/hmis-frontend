"use client";

import UnderConstruction from "@/components/UnderConstruction";

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

      <UnderConstruction
        title="Sick Leave Management"
        description="Medical leave certificate issuance and tracking will be available here soon. This feature is being prepared for your workflow."
        icon="file-text"
      />
    </>
  );
}
