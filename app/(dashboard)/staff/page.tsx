"use client";

import { useEffect, useState } from "react";
import { staff, type HospitalRead, type HospitalCreate, type StaffCreate } from "@/lib/api";
import type { StaffRead, RoleRead } from "@/lib/types";
import { useAuth } from "@/lib/auth-context";

export default function StaffPage() {
  const { user } = useAuth();
  const [staffList, setStaffList] = useState<StaffRead[]>([]);
  const [roles, setRoles] = useState<RoleRead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    role_id: "",
  });

  const fetchStaff = async () => {
    try {
      const [staffData, rolesData] = await Promise.all([
        staff.list(),
        staff.roles(),
      ]);
      setStaffList(staffData);
      setRoles(rolesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load staff");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const newStaff = await staff.create(formData as StaffCreate);
      setStaffList([newStaff, ...staffList]);
      setShowCreateForm(false);
      setFormData({ full_name: "", email: "", phone: "", password: "", role_id: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create staff");
    }
  };

  const canCreateStaff = user?.role?.name === "admin" || user?.role?.name === "super_admin";

  return (
    <>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6">
              <h3>Staff Management</h3>
              <p className="text-subtitle text-muted">
                {user?.role?.name === "super_admin"
                  ? "Manage staff across all hospitals."
                  : "Manage staff for your hospital."}
              </p>
            </div>
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-md-end">
              {canCreateStaff && (
                <button
                  className="btn btn-primary"
                  onClick={() => setShowCreateForm(true)}
                >
                  + New Staff
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {showCreateForm && (
        <div className="card reveal">
          <div className="card-header">
            <h4>Create New Staff</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleCreate}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      className="form-control"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      className="form-control"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      className="form-control"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      className="form-control"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      minLength={8}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                      className="form-select"
                      value={formData.role_id}
                      onChange={(e) => setFormData({ ...formData, role_id: e.target.value })}
                      required
                    >
                      <option value="">Select a role</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-12 d-flex gap-2">
                  <button type="submit" className="btn btn-primary">
                    Create Staff
                  </button>
                  <button
                    type="button"
                    className="btn btn-light-primary"
                    onClick={() => setShowCreateForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h4>Staff Directory</h4>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-muted">Loading staff...</div>
          ) : staffList.length === 0 ? (
            <div className="text-muted">No staff found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {staffList.map((s) => (
                    <tr key={s.id}>
                      <td className="font-bold">{s.full_name}</td>
                      <td>{s.email}</td>
                      <td>{s.role?.name || "—"}</td>
                      <td>
                        <span className={`badge ${s.is_active ? "bg-success" : "bg-secondary"}`}>
                          {s.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
