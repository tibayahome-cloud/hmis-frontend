"use client";

import { useEffect, useState } from "react";
import { hospitals, type HospitalRead, type HospitalCreate, type Page } from "@/lib/api";
import DataTable from "@/components/admin/DataTable";

const PAGE_SIZE = 10;

export default function HospitalsPage() {
  const [page, setPage] = useState<Page<HospitalRead> | null>(null);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);

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

  async function loadPage(targetCursor?: string) {
    const result = await hospitals.list({ cursor: targetCursor, limit: PAGE_SIZE });
    setPage(result);
    setCursor(targetCursor);
  }

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    async function init() {
      await loadPage(undefined);
      if (!cancelled) setLoading(false);
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setFormLoading(true);

    try {
      await hospitals.create(formData);
      setFormData({
        name: "",
        code: "",
        address: null,
        phone: null,
        admin_full_name: "",
        admin_email: "",
        admin_password: "",
      });
      setShowForm(false);
      await loadPage(cursor);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to create hospital.");
    } finally {
      setFormLoading(false);
    }
  }

  return (
    <>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 order-last">
              <h3>Hospitals</h3>
              <p className="text-subtitle text-muted">
                Configure hospitals and assign admin staff.
              </p>
            </div>
            <div className="col-12 col-md-6 order-md-2 order-first">
              <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Hospitals
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <section className="row">
        <div className="col-12">
          <div className="card reveal" style={{ ["--d" as string]: "220ms" }}>
            <div className="card-header d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-0">Hospital Directory</h4>
                <small className="text-muted">All registered hospitals.</small>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => setShowForm((prev) => !prev)}
              >
                {showForm ? "Close" : "Create hospital"}
              </button>
            </div>

            {showForm && (
              <div className="card-body border-bottom">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label">Name</label>
                      <input
                        className="form-control"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Code</label>
                      <input
                        className="form-control"
                        required
                        value={formData.code}
                        onChange={(e) =>
                          setFormData({ ...formData, code: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Phone</label>
                      <input
                        className="form-control"
                        value={formData.phone ?? ""}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value || null })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Address</label>
                      <input
                        className="form-control"
                        value={formData.address ?? ""}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value || null })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Admin full name</label>
                      <input
                        className="form-control"
                        required
                        value={formData.admin_full_name}
                        onChange={(e) =>
                          setFormData({ ...formData, admin_full_name: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Admin email</label>
                      <input
                        className="form-control"
                        type="email"
                        required
                        value={formData.admin_email}
                        onChange={(e) =>
                          setFormData({ ...formData, admin_email: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Admin password</label>
                      <input
                        className="form-control"
                        type="password"
                        required
                        minLength={8}
                        value={formData.admin_password}
                        onChange={(e) =>
                          setFormData({ ...formData, admin_password: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary" disabled={formLoading}>
                        {formLoading ? "Creating..." : "Create"}
                      </button>
                    </div>
                    {formError && (
                      <div className="col-12">
                        <div className="alert alert-danger" role="alert">
                          {formError}
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            )}

            <DataTable<HospitalRead>
              title="Hospital Directory"
              description={`${page?.items?.length ?? 0} hospitals`}
              columns={[
                {
                  key: "name",
                  label: "Name",
                  render: (item) => <span className="fw-semibold">{item?.name ?? "—"}</span>,
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
                  render: (item) => (
                    <span
                      className={`badge ${item?.is_active ? "bg-success" : "bg-secondary"}`}
                    >
                      {item?.is_active ? "Active" : "Inactive"}
                    </span>
                  ),
                },
              ]}
              items={page?.items ?? []}
              loading={loading}
              empty="No hospitals found. Create one above."
              footer={
                page ? (
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      {cursor ? (
                        <>
                          Showing page{" "}
                          <code>{cursor.slice(0, 8)}</code>
                        </>
                      ) : (
                        "First page"
                      )}
                    </small>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-light-primary"
                        disabled={!page.prev_cursor}
                        onClick={() => loadPage(page.prev_cursor ?? undefined)}
                      >
                        Prev
                      </button>
                      <button
                        className="btn btn-sm btn-light-primary"
                        disabled={!page.has_more}
                        onClick={() => loadPage(page.next_cursor ?? undefined)}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                ) : null
              }
            />
          </div>
        </div>
      </section>
    </>
  );
}
