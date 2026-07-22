"use client";

import { useEffect, useState } from "react";
import { staff } from "@/lib/api";
import DataTable from "@/components/admin/DataTable";
import type { StaffRead, RoleRead } from "@/lib/types";
import type { Page, StaffCreate } from "@/lib/api";

const PAGE_SIZE = 10;

export default function StaffPage() {
  const [page, setPage] = useState<Page<StaffRead> | null>(null);
  const [roles, setRoles] = useState<RoleRead[]>([]);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState<StaffCreate>({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    role_id: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  async function loadRoles() {
    try {
      setRoles(await staff.roles());
    } catch {
      // non-blocking
    }
  }

  async function loadPage(targetCursor?: string) {
    const result = await staff.list({ cursor: targetCursor, limit: PAGE_SIZE });
    setPage(result);
    setCursor(targetCursor);
  }

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    async function init() {
      await loadRoles();
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
      await staff.create(formData);
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        role_id: "",
      });
      setShowForm(false);
      await loadPage(cursor);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to create staff.");
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
              <h3>Staff</h3>
              <p className="text-subtitle text-muted">
                Manage staff accounts and role assignments.
              </p>
            </div>
            <div className="col-12 col-md-6 order-md-2 order-first">
              <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Staff
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
                <h4 className="mb-0">Staff Directory</h4>
                <small className="text-muted">All hospital staff accounts.</small>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => setShowForm((prev) => !prev)}
              >
                {showForm ? "Close" : "Create staff"}
              </button>
            </div>

            {showForm && (
              <div className="card-body border-bottom">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label">Full name</label>
                      <input
                        className="form-control"
                        required
                        value={formData.full_name}
                        onChange={(e) =>
                          setFormData({ ...formData, full_name: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Email</label>
                      <input
                        className="form-control"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Password</label>
                      <input
                        className="form-control"
                        type="password"
                        required
                        minLength={8}
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Role</label>
                      <select
                        className="form-select"
                        required
                        value={formData.role_id}
                        onChange={(e) =>
                          setFormData({ ...formData, role_id: e.target.value })
                        }
                      >
                        <option value="">Select a role</option>
                        {roles.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        ))}
                      </select>
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
                    <div className="col-md-4 d-flex align-items-end">
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

            <DataTable<StaffRead>
              title="Staff Directory"
              description={`${page?.items?.length ?? 0} staff records`}
              columns={[
                {
                  key: "full_name",
                  label: "Name",
                  render: (item) => <span className="fw-semibold">{item.full_name}</span>,
                },
                { key: "email", label: "Email" },
                {
                  key: "role",
                  label: "Role",
                  render: (item) => (
                    <span className={`badge ${item.role?.name === "super_admin" || item.role?.name === "admin" ? "bg-primary" : "bg-light text-dark border"}`}>
                      {item.role?.name ?? "—"}
                    </span>
                  ),
                },
                {
                  key: "is_active",
                  label: "Status",
                  render: (item) => (
                    <span
                      className={`badge ${item.is_active ? "bg-success" : "bg-secondary"}`}
                    >
                      {item.is_active ? "Active" : "Inactive"}
                    </span>
                  ),
                },
              ]}
              items={page?.items ?? []}
              loading={loading}
              empty="No staff found. Create one above."
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
