"use client";

import Icon from "@/components/Icon";

type Props = {
  onMenu: () => void;
};

export default function Topbar({ onMenu }: Props) {
  return (
    <header className="mb-3">
      <nav className="navbar navbar-expand navbar-light">
        <div className="container-fluid" style={{ padding: 0 }}>
          <a href="#" className="burger-btn d-block d-lg-none" onClick={onMenu}>
            <Icon name="menu" size={24} />
          </a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown me-3">
                <a className="nav-link active dropdown-toggle" href="#" role="button">
                  <Icon name="bell" size={22} className="text-gray-600" />
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <h6 className="dropdown-header">Notifications</h6>
                  </li>
                  <li>
                    <a className="dropdown-item">No notification available</a>
                  </li>
                </ul>
              </li>
            </ul>

            <div className="dropdown">
              <a href="#" role="button">
                <div className="user-menu d-flex">
                  <div className="user-name text-end me-3">
                    <h6 className="mb-0">Dennis Muga</h6>
                    <p className="mb-0">Administrator</p>
                  </div>
                  <div className="user-img d-flex align-items-center">
                    <div className="avatar avatar-md">
                      <img
                        src="https://i.pravatar.cc/80?img=12"
                        alt="user"
                        style={{ width: 38, height: 38, borderRadius: "50%" }}
                      />
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
