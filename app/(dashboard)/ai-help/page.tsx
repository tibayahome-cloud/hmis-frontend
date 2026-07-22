"use client";

import UnderConstruction from "@/components/UnderConstruction";

export default function AiHelpPage() {
  return (
    <>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6">
              <h3>AI Help</h3>
              <p className="text-subtitle text-muted">
                Patient overview, image analysis, and treatment planning.
              </p>
            </div>
          </div>
        </div>
      </div>

      <UnderConstruction
        title="AI Assistance"
        description="AI-powered patient insights, image analysis, and treatment planning will be available here soon. This feature is being prepared for your workflow."
        icon="brain"
      />
    </>
  );
}
