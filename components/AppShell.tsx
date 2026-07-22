"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { FLAT_NAV } from "@/lib/nav";

function deriveTitle(pathname: string) {
  const match = [...FLAT_NAV]
    .sort((a, b) => b.href.length - a.href.length)
    .find((i) => (i.href === "/" ? pathname === "/" : pathname.startsWith(i.href)));
  if (!match) return "Tiba HMIS";
  return match.label;
}

export default function AppShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const heading = title ?? "Dashboard";

  const handleMenuToggle = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 992) {
      setSidebarCollapsed((v) => !v);
    } else {
      setSidebarOpen((v) => !v);
    }
  };

  return (
    <div id="app">
      <Sidebar
        open={sidebarOpen}
        onNavigate={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={handleMenuToggle}
      />
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 9, background: "rgba(0,0,0,0.3)" }}
        />
      )}
      <div id="main" className="layout-navbar">
        <Topbar onMenu={handleMenuToggle} />
        <div id="main-content">
          {children}
          <footer style={{ marginTop: "auto", paddingTop: "1rem" }}>
            <div className="footer clearfix mb-0 text-muted d-flex justify-content-between align-items-center">
              <p className="mb-0" style={{ fontSize: "0.8rem", color: "#6B7280" }}>2026 &copy; Tiba HMIS</p>
              <p className="mb-0" style={{ fontSize: "0.8rem", color: "#6B7280" }}>
                All rights reserved <a href="#" style={{ color: "#435ebe" }}>Jack Reacher Ltd</a>
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
