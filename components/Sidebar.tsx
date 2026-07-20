"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";
import { NAV } from "@/lib/nav";

type Props = {
  open: boolean;
  onNavigate: () => void;
};

export default function Sidebar({ open, onNavigate }: Props) {
  const pathname = usePathname();

  return (
    <div id="sidebar" className={open ? "active" : ""}>
      <div className="sidebar-wrapper">
        <div className="sidebar-header">
          <div className="logo">
            <Link href="/">
              <span style={{ fontFamily: "var(--font)", fontWeight: 800, fontSize: 22, color: "var(--bs-primary)" }}>
                Tiba HMIS
              </span>
            </Link>
          </div>
        </div>

        <div className="sidebar-menu">
          {NAV.map((group) => (
            <div key={group.label}>
              <div className="sidebar-title">{group.label}</div>
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
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
