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
  const [open, setOpen] = useState(false);
  const heading = title ?? "Dashboard";

  return (
    <div id="app">
      <Sidebar open={open} onNavigate={() => setOpen(false)} />
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 9, background: "rgba(0,0,0,0.3)" }}
        />
      )}
      <div id="main" className="layout-navbar">
        <Topbar onMenu={() => setOpen((v) => !v)} />
        <div id="main-content">
          {children}
          <footer>
            <div className="footer clearfix mb-0 text-muted">
              <div className="float-start">
                <p>2026 &copy; Tiba HMIS</p>
              </div>
              <div className="float-end">
                <p>
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
