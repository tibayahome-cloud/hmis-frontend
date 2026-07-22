"use client";

import { useEffect, useState } from "react";
import { hospitals, type HospitalRead, type HospitalCreate } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

export default function HospitalsPage() {
  const { user } = useAuth();
  const [hospitalList, setHospitalList] = useState<HospitalRead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    address: "",
    phone: "",
    admin_full_name: "",
    admin_email: "",
    admin_password: "",
  });

  const fetchHospitals = async () => {
    try {
      const data = await hospitals.list();
      setHospitalList(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load hospitals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const result = await hospitals.create(formData as HospitalCreate);
      setHospitalList([result.hospital, ...hospitalList]);
      setShowCreateForm(false);
      setFormData({
        name: "",
        code: "",
        address: "",
        phone: "",
        admin_full_name: "",
        admin_email: "",
        admin_password: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create hospital");
    }
  };

  const canCreateHospital = user?.role?.name === "super_admin";

  return (
    <>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6">
              <h3>Hospitals</h3>
              <p className="text-subtitle text-muted">
                Manage hospital tenants and their admin accounts.
              </p>
            </div>
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-md-end">
              {canCreateHospital && (
                <button
                  className="btn btn-primary"
                  onClick={() => setShowCreateForm(true)}
                >
                  + New Hospital
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
            <h4>Create New Hospital</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleCreate}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Hospital Name</label>
                    <input
                      className="form-control"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Hospital Code</label>
                    <input
                      className="form-control"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                      className="form-control"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
                <div className="col-12">
                  <hr />
                  <h5>Admin Account</h5>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Admin Full Name</label>
                    <input
                      className="form-control"
                      value={formData.admin_full_name}
                      onChange={(e) => setFormData({ ...formData, admin_full_name: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Admin Email</label>
                    <input
                      className="form-control"
                      type="email"
                      value={formData.admin_email}
                      onChange={(e) => setFormData({ ...formData, admin_email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Admin Password</label>
                    <input
                      className="form-control"
                      type="password"
                      value={formData.admin_password}
                      onChange={(e) => setFormData({ ...formData, admin_password: e.target.value })}
                      required
                      minLength={8}
                    />
                  </div>
                </div>
                <div className="col-12 d-flex gap-2">
                  <button type="submit" className="btn btn-primary">
                    Create Hospital
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
          <h4>Hospital Directory</h4>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-muted">Loading hospitals...</div>
          ) : hospitalList.length === 0 ? (
            <div className="text-muted">No hospitals found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Phone</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {hospitalList.map((h) => (
                    <tr key={h.id}>
                      <td className="font-bold">{h.name}</td>
                      <td>{h.code}</td>
                      <td>{h.phone || "—"}</td>
                      <td>
                        <span className={`badge ${h.is_active ? "bg-success" : "bg-secondary"}`}>
                          {h.is_active ? "Active" : "Inactive"}
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
