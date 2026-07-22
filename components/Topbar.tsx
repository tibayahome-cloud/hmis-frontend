"use client";

import Icon from "@/components/Icon";
import { useAuth } from "@/lib/auth-context";

type Props = {
  onMenu: () => void;
};

export default function Topbar({ onMenu }: Props) {
  const { user } = useAuth();
  const displayName = user?.full_name || "Staff User";
  const displayRole = user?.role?.name || "Administrator";

  return (
    <header className="mb-3">
      <nav className="navbar navbar-expand navbar-light">
        <div className="container-fluid" style={{ padding: 0 }}>
          <a href="#" className="burger-btn d-lg-none" onClick={onMenu}>
            <Icon name="menu" size={24} />
          </a>

          <div className="ms-auto d-flex align-items-center gap-3">
            <a className="nav-link active me-2" href="#" role="button">
              <Icon name="bell" size={22} className="text-gray-600" />
            </a>

            <div className="user-menu d-flex align-items-center" style={{ cursor: "pointer" }}>
              <div className="user-name text-end me-3">
                <h6 className="mb-0 fw-semibold" style={{ color: "var(--body-color)" }}>{displayName}</h6>
                <p className="mb-0 text-muted" style={{ fontSize: "0.72rem", color: "var(--muted)", textTransform: "capitalize" }}>{displayRole}</p>
              </div>
              <div className="user-img d-flex align-items-center">
                <div className="avatar avatar-md">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=435ebe&color=fff`}
                    alt="user"
                    style={{ width: 38, height: 38, borderRadius: "50%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
