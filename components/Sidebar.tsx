"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";
import { NAV } from "@/lib/nav";
import { ROLE_ROUTES } from "@/lib/role-routes";
import { useAuth } from "@/lib/auth-context";

type Props = {
  open: boolean;
  onNavigate: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
};

export default function Sidebar({ open, onNavigate, collapsed, onToggleCollapse }: Props) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const role = user?.role?.name || "";

  const allowedRoutes = ROLE_ROUTES[role];
  const visibleNav = allowedRoutes
    ? NAV.map((group) => ({
        ...group,
        items: group.items.filter((item) => allowedRoutes.includes(item.href)),
      })).filter((group) => group.items.length > 0)
    : NAV;

  return (
    <div id="sidebar" className={open ? "active" : ""}>
      <div className={`sidebar-wrapper ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <div className="d-flex align-items-center justify-content-between w-100">
            {!collapsed && (
              <div className="logo">
                <Link href="/">
                  <span style={{ fontFamily: "var(--font)", fontWeight: 800, fontSize: 22, color: "var(--bs-primary)" }}>
                    Tiba HMIS
                  </span>
                </Link>
              </div>
            )}
            <button
              type="button"
              className="btn btn-sm btn-light sidebar-toggle"
              onClick={onToggleCollapse}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <Icon name="menu" size={18} />
            </button>
          </div>
        </div>

        <div className="sidebar-menu">
          {visibleNav.map((group) => (
            <div key={group.label}>
              {!collapsed && <div className="sidebar-title">{group.label}</div>}
              <ul className="menu">
                {group.items.map((item) => {
                  const active = item.exact
                    ? pathname === item.href
                    : item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <li key={item.href} className={`sidebar-item ${active ? "active" : ""}`}>
                      <Link href={item.href} className="sidebar-link" onClick={onNavigate}>
                        <Icon name={item.icon} size={20} />
                        {!collapsed && <span>{item.label}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="d-flex align-items-center justify-content-center">
            <button
              onClick={logout}
              className="btn btn-sm btn-light-primary d-flex align-items-center justify-content-center"
              title="Log out"
            >
              <Icon name="logout" size={18} />
              {!collapsed && <span className="d-none d-sm-inline ms-1">Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
