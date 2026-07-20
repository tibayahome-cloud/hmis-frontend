// Sidebar navigation mirroring the Flask sidebar.html groups, so the new
// frontend keeps the same structure during the migration off Jinja.

export type NavItem = {
  label: string;
  href: string;
  icon: string;
  exact?: boolean;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const NAV: NavGroup[] = [
  {
    label: "MAIN MENU",
    items: [{ label: "Dashboard", href: "/", icon: "grid" }],
  },
  {
    label: "PATIENT MANAGEMENT",
    items: [
      { label: "Patients", href: "/patients", icon: "people", exact: true },
      { label: "New Patient", href: "/patients/new", icon: "person-plus" },
      { label: "Triage", href: "/patients/triage", icon: "heart" },
      { label: "Sick Leave", href: "/patients/sick-leave", icon: "file-med" },
      { label: "Death Register", href: "/patients/death-register", icon: "people-lines" },
    ],
  },
  {
    label: "CLINICAL OPERATIONS",
    items: [
      { label: "Visits", href: "/visits", icon: "clock", exact: true },
      { label: "New Visit", href: "/visits/new", icon: "person-plus" },
      { label: "AI Help", href: "/ai-help", icon: "spark" },
    ],
  },
];

export const FLAT_NAV: NavItem[] = NAV.flatMap((g) => g.items);
