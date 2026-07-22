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

          <div className="ms-auto d-flex align-items-center gap-3">
            <a className="nav-link active" href="#" role="button">
              <Icon name="bell" size={22} className="text-gray-600" />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
