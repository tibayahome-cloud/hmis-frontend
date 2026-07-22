"use client";

import Icon from "@/components/Icon";
import { useAuth } from "@/lib/auth-context";

type Props = {
  onMenu: () => void;
};

export default function Topbar({ onMenu }: Props) {
  const { user, logout } = useAuth();
  const displayName = user?.full_name || "Staff User";
  const displayRole = user?.role?.name || "Administrator";

  return (
    <header className="mb-3">
      <nav className="navbar navbar-expand navbar-light">
        <div className="container-fluid" style={{ padding: 0 }}>
          <a href="#" className="burger-btn d-block d-lg-none" onClick={onMenu}>
            <Icon name="menu" size={24} />
          </a>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item me-3">
              <a className="nav-link active" href="#" role="button">
                <Icon name="bell" size={22} className="text-gray-600" />
              </a>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            <div className="user-menu d-flex align-items-center">
              <div className="user-name text-end me-3">
                <h6 className="mb-0">{displayName}</h6>
                <p className="mb-0 text-muted" style={{ fontSize: "0.75rem" }}>{displayRole}</p>
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

            <button
              onClick={logout}
              className="btn btn-light-primary btn-sm d-flex align-items-center gap-1 font-bold"
              title="Log out"
            >
              <Icon name="logout" size={18} />
              <span className="d-none d-sm-inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
