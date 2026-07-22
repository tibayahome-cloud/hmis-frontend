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

  return (
    <div id="app" style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        open={sidebarOpen}
        onNavigate={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
      />
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 9, background: "rgba(0,0,0,0.3)" }}
        />
      )}
      <div id="main" className="layout-navbar" style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
        <Topbar onMenu={() => setSidebarOpen((v) => !v)} />
        <div id="main-content" style={{ flex: 1, display: "flex", flexDirection: "column", padding: "2rem" }}>
          {children}
          <footer style={{ marginTop: "auto" }}>
            <div className="footer clearfix mb-0 text-muted d-flex justify-content-between align-items-center">
              <div>
                <p className="mb-0">2026 &copy; Tiba HMIS</p>
              </div>
              <div>
                <p className="mb-0">
                  All rights reserved <a href="#">Jack Reacher Ltd</a>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
