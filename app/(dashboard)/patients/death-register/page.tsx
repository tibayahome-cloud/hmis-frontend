"use client";

import UnderConstruction from "@/components/UnderConstruction";

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

      <UnderConstruction
        title="Death Register"
        description="Statutory death record management will be available here soon. This feature is being prepared for your workflow."
        icon="file-text"
      />
    </>
  );
}
