"use client";

import { useEffect, useState } from "react";
import { staff } from "@/lib/api";
import DataTable from "@/components/admin/DataTable";
import Icon from "@/components/Icon";
import type { StaffRead, RoleRead } from "@/lib/types";
import type { Page, StaffCreate } from "@/lib/api";

const PAGE_SIZE = 8; // strict limit of 8 rows per page as requested

export default function StaffPage() {
  const [page, setPage] = useState<Page<StaffRead> | null>(null);
  const [roles, setRoles] = useState<RoleRead[]>([]);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

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

  async function loadPage(targetCursor?: string, direction: "next" | "prev" | "init" = "init") {
    setLoading(true);
    try {
      const result = await staff.list({ cursor: targetCursor, limit: PAGE_SIZE });
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
      console.error("Failed to load staff page", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function init() {
      await loadRoles();
      await loadPage(undefined, "init");
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
      await loadPage(undefined, "init"); // reload to first page
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to create staff.");
    } finally {
      setFormLoading(false);
    }
  }

  const startIdx = (pageNumber - 1) * PAGE_SIZE + 1;
  const endIdx = startIdx + (page?.items?.length ?? 0) - 1;
  const paginationText = page?.items?.length
    ? `Showing ${startIdx} to ${endIdx} results`
    : "No results";

  return (
    <>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 order-last">
              <h3 style={{ color: "#1F2937", fontWeight: 700 }}>Staff</h3>
              <p className="text-subtitle" style={{ color: "#4B5563" }}>
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

      <section className="row flex-grow-1 overflow-hidden">
        <div className="col-12 h-100 d-flex flex-column">
          <div className="card reveal d-flex flex-column h-100 mb-0" style={{ ["--d" as string]: "220ms", overflow: "hidden" }}>
            <div className="card-header d-flex justify-content-between align-items-center border-bottom-0 pb-2">
              <div>
                <h4 className="mb-0 fw-bold" style={{ color: "#1F2937" }}>Staff Directory</h4>
                <small style={{ color: "#4B5563" }}>All hospital staff accounts.</small>
              </div>
              <button
                className="btn btn-primary d-flex align-items-center gap-2"
                onClick={() => setShowForm(true)}
              >
                <Icon name="person-plus" size={16} />
                Create staff
              </button>
            </div>

            <DataTable<StaffRead>
              className="d-flex flex-column flex-grow-1 overflow-hidden"
              title="Staff Directory"
              columns={[
                {
                  key: "full_name",
                  label: "Name",
                  render: (item) => <span className="fw-semibold" style={{ color: "#1F2937" }}>{item.full_name}</span>,
                },
                { key: "email", label: "Email" },
                {
                  key: "role",
                  label: "Role",
                  render: (item) => {
                    const roleName = item.role?.name || "";
                    const isAdm = roleName === "super_admin" || roleName === "admin";
                    return (
                      <span className={`role-badge ${isAdm ? "super_admin" : "staff-default"}`}>
                        {roleName.replace("_", " ")}
                      </span>
                    );
                  },
                },
                {
                  key: "is_active",
                  label: "Status",
                  render: (item) => (
                    <span className={`role-badge ${item.is_active ? "active-status" : "inactive-status"}`}>
                      {item.is_active ? "Active" : "Inactive"}
                    </span>
                  ),
                },
              ]}
              items={page?.items ?? []}
              loading={loading}
              empty="No staff found. Create one using the button above."
              footer={
                <div className="d-flex justify-content-between align-items-center w-100">
                  <small style={{ color: "#4B5563", fontWeight: 500 }}>
                    {paginationText}
                  </small>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-light-primary"
                      disabled={!page?.prev_cursor}
                      onClick={() => loadPage(page?.prev_cursor ?? undefined, "prev")}
                    >
                      Prev
                    </button>
                    <button
                      className="btn btn-sm btn-light-primary"
                      disabled={!page?.has_more}
                      onClick={() => loadPage(page?.next_cursor ?? undefined, "next")}
                    >
                      Next
                    </button>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* Slide-over Drawer Backdrop */}
      <div
        className={`drawer-backdrop ${showForm ? "open" : ""}`}
        onClick={() => setShowForm(false)}
      />

      {/* Slide-over Drawer Panel */}
      <div className={`drawer ${showForm ? "open" : ""}`}>
        <div className="drawer-header">
          <h4 className="mb-0 fw-bold" style={{ color: "#1F2937" }}>Create Staff</h4>
          <button
            type="button"
            className="btn btn-sm btn-light"
            onClick={() => setShowForm(false)}
            style={{ borderRadius: "50%", width: "32px", height: "32px", padding: 0 }}
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="d-flex flex-column h-100" style={{ overflow: "hidden" }}>
          <div className="drawer-body">
            <div className="d-flex flex-column gap-3">
              <div>
                <label className="form-label" style={{ color: "#374151" }}>Full Name</label>
                <input
                  className="form-control"
                  required
                  placeholder="Enter full name"
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="form-label" style={{ color: "#374151" }}>Email Address</label>
                <input
                  className="form-control"
                  type="email"
                  required
                  placeholder="name@hospital.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="form-label" style={{ color: "#374151" }}>Password</label>
                <input
                  className="form-control"
                  type="password"
                  required
                  minLength={8}
                  placeholder="Minimum 8 characters"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="form-label" style={{ color: "#374151" }}>Role</label>
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
                      {role.name.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label" style={{ color: "#374151" }}>Phone Number</label>
                <input
                  className="form-control"
                  placeholder="Optional phone number"
                  value={formData.phone ?? ""}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value || null })
                  }
                />
              </div>
              {formError && (
                <div className="alert alert-danger mb-0 py-2 px-3" role="alert" style={{ fontSize: "0.85rem" }}>
                  {formError}
                </div>
              )}
            </div>
          </div>
          <div className="drawer-footer">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => setShowForm(false)}
              disabled={formLoading}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={formLoading}>
              {formLoading ? "Saving..." : "Save Staff"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
