"use client";

import { useEffect, useState } from "react";
import { hospitals, type HospitalRead, type HospitalCreate, type Page } from "@/lib/api";
import DataTable from "@/components/admin/DataTable";
import Icon from "@/components/Icon";

const PAGE_SIZE = 8;

export default function HospitalsPage() {
  const [page, setPage] = useState<Page<HospitalRead> | null>(null);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const [formData, setFormData] = useState<HospitalCreate>({
    name: "",
    code: "",
    address: null,
    phone: null,
    admin_full_name: "",
    admin_email: "",
    admin_password: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  async function loadPage(targetCursor?: string, direction: "next" | "prev" | "init" = "init") {
    setLoading(true);
    try {
      const result = await hospitals.list({ cursor: targetCursor, limit: PAGE_SIZE });
      setPage(result);
      setCursor(targetCursor);
      if (direction === "next") {
        setPageNumber((p) => p + 1);
      } else if (direction === "prev") {
        setPageNumber((p) => Math.max(1, p - 1));
      } else {
        setPageNumber(1);
      }
    } catch (err) {
      console.error("Failed to load hospitals page", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;
    async function init() {
      await loadPage(undefined, "init");
      if (!cancelled) setLoading(false);
    }
    init();
    return () => { cancelled = true; };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setFormLoading(true);
    try {
      await hospitals.create(formData);
      setFormData({ name: "", code: "", address: null, phone: null, admin_full_name: "", admin_email: "", admin_password: "" });
      setShowForm(false);
      await loadPage(undefined, "init");
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to create hospital.");
    } finally {
      setFormLoading(false);
    }
  }

  const startIdx = (pageNumber - 1) * PAGE_SIZE + 1;
  const endIdx = startIdx + (page?.items?.length ?? 0) - 1;
  const paginationText = page?.items?.length ? `Showing ${startIdx} to ${endIdx} results` : "No results";

  return (
    <>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 order-last">
              <h3 style={{ color: "#1F2937", fontWeight: 700 }}>Hospitals</h3>
              <p className="text-subtitle" style={{ color: "#4B5563" }}>Configure hospitals and assign admin staff.</p>
            </div>
            <div className="col-12 col-md-6 order-md-2 order-first">
              <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Hospitals</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <section className="row flex-grow-1 overflow-hidden">
        <div className="col-12 h-100 d-flex flex-column">
          <div className="card reveal d-flex flex-column h-100 mb-0" style={{ ["--d" as string]: "220ms", overflow: "hidden" }}>
            <div className="card-header d-flex justify-content-between align-items-center border-bottom-0 pb-2">
              <div>
                <h4 className="mb-0 fw-bold" style={{ color: "#1F2937" }}>Hospital Directory</h4>
                <small style={{ color: "#4B5563" }}>All registered hospitals.</small>
              </div>
              <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => setShowForm(true)}>
                <Icon name="hospital" size={16} />
                Create hospital
              </button>
            </div>

            <DataTable<HospitalRead>
              className="d-flex flex-column flex-grow-1 overflow-hidden"
              title="Hospital Directory"
              columns={[
                {
                  key: "name",
                  label: "Name",
                  render: (item) => <span className="fw-semibold" style={{ color: "#1F2937" }}>{item?.name ?? "—"}</span>,
                },
                {
                  key: "code",
                  label: "Code",
                  render: (item) => <code>{item?.code ?? "—"}</code>,
                },
                {
                  key: "phone",
                  label: "Phone",
                  render: (item) => item?.phone ?? "—",
                },
                {
                  key: "is_active",
                  label: "Status",
                  render: (item) => item?.is_active ? (
                    <span style={{ borderRadius: "9999px", background: "#DCFCE7", color: "#166534", padding: "0.35em 0.8em", fontSize: "0.7rem", fontWeight: 700 }}>Active</span>
                  ) : (
                    <span style={{ borderRadius: "9999px", background: "#FEE2E2", color: "#991B1B", padding: "0.35em 0.8em", fontSize: "0.7rem", fontWeight: 700 }}>Inactive</span>
                  ),
                },
              ]}
              items={page?.items ?? []}
              loading={loading}
              empty="No hospitals found. Create one using the button above."
              footer={
                <div className="d-flex justify-content-between align-items-center w-100">
                  <small style={{ color: "#4B5563", fontWeight: 500 }}>{paginationText}</small>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-light-primary" disabled={!page?.prev_cursor} onClick={() => loadPage(page?.prev_cursor ?? undefined, "prev")}>Prev</button>
                    <button className="btn btn-sm btn-light-primary" disabled={!page?.has_more} onClick={() => loadPage(page?.next_cursor ?? undefined, "next")}>Next</button>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* Drawer Backdrop */}
      <div className={`drawer-backdrop ${showForm ? "open" : ""}`} onClick={() => setShowForm(false)} />

      {/* Slide-over Drawer */}
      <div className={`drawer ${showForm ? "open" : ""}`}>
        <div className="drawer-header">
          <h4 className="mb-0 fw-bold" style={{ color: "#1F2937" }}>Create Hospital</h4>
          <button type="button" className="btn btn-sm btn-light" onClick={() => setShowForm(false)} style={{ borderRadius: "50%", width: "32px", height: "32px", padding: 0 }}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="d-flex flex-column h-100" style={{ overflow: "hidden" }}>
          <div className="drawer-body">
            <div className="d-flex flex-column gap-3">
              <div>
                <label className="form-label" style={{ color: "#374151" }}>Hospital Name</label>
                <input className="form-control" required placeholder="e.g. Nairobi General Hospital" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div>
                <label className="form-label" style={{ color: "#374151" }}>Short Code</label>
                <input className="form-control" required placeholder="e.g. NGH" value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} />
              </div>
              <div>
                <label className="form-label" style={{ color: "#374151" }}>Phone</label>
                <input className="form-control" placeholder="Optional phone number" value={formData.phone ?? ""} onChange={(e) => setFormData({ ...formData, phone: e.target.value || null })} />
              </div>
              <div>
                <label className="form-label" style={{ color: "#374151" }}>Address</label>
                <input className="form-control" placeholder="Optional address" value={formData.address ?? ""} onChange={(e) => setFormData({ ...formData, address: e.target.value || null })} />
              </div>
              <div>
                <label className="form-label" style={{ color: "#374151" }}>Admin Full Name</label>
                <input className="form-control" required placeholder="Enter admin full name" value={formData.admin_full_name} onChange={(e) => setFormData({ ...formData, admin_full_name: e.target.value })} />
              </div>
              <div>
                <label className="form-label" style={{ color: "#374151" }}>Admin Email</label>
                <input className="form-control" type="email" required placeholder="admin@hospital.com" value={formData.admin_email} onChange={(e) => setFormData({ ...formData, admin_email: e.target.value })} />
              </div>
              <div>
                <label className="form-label" style={{ color: "#374151" }}>Admin Password</label>
                <input className="form-control" type="password" required minLength={8} placeholder="Minimum 8 characters" value={formData.admin_password} onChange={(e) => setFormData({ ...formData, admin_password: e.target.value })} />
              </div>
              {formError && (
                <div className="alert alert-danger mb-0 py-2 px-3" role="alert" style={{ fontSize: "0.85rem" }}>{formError}</div>
              )}
            </div>
          </div>
          <div className="drawer-footer">
            <button type="button" className="btn btn-light" onClick={() => setShowForm(false)} disabled={formLoading}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={formLoading}>{formLoading ? "Saving..." : "Save Hospital"}</button>
          </div>
        </form>
      </div>
    </>
  );
}
