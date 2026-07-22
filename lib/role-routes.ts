/** Role-to-route mapping for navigation filtering and access control. */

export const ROLE_ROUTES: Record<string, string[]> = {
  super_admin: ["/", "/patients", "/visits", "/staff", "/admin", "/reports"],
  admin: ["/", "/patients", "/visits", "/staff", "/admin"],
  receptionist: ["/", "/patients", "/patients/new", "/visits", "/visits/new"],
  triage_nurse: ["/", "/patients/triage", "/queues/triage"],
  doctor: ["/", "/patients", "/visits", "/consultations", "/ward-rounds"],
  lab_tech: ["/", "/service-rooms/lab", "/queues/lab"],
  pharmacist: ["/", "/pharmacy", "/queues/pharmacy"],
  consultant: ["/", "/patients", "/ward-rounds", "/discharge"],
  admission_officer: ["/", "/admissions", "/beds", "/patients"],
  billing_clerk: ["/", "/billing", "/invoices", "/discharge"],
  records_officer: ["/", "/patients", "/reports", "/death-register"],
  ward_nurse: ["/", "/ward-rounds", "/admissions", "/queues/ward"],
};

/** Reverse mapping: route prefix → allowed roles. Used by middleware. */
export const ROUTE_ROLES: Record<string, string[]> = {
  "/patients": ["receptionist", "admin", "records_officer", "doctor", "consultant"],
  "/billing": ["billing_clerk", "admin"],
  "/pharmacy": ["pharmacist", "admin"],
  "/admissions": ["admission_officer", "ward_nurse", "admin"],
  "/ward-rounds": ["ward_nurse", "doctor", "consultant", "admin"],
  "/service-rooms": ["lab_tech", "doctor", "admin"],
  "/consultations": ["doctor", "consultant", "admin"],
  "/discharge": ["doctor", "consultant", "billing_clerk", "admin"],
  "/admin": ["super_admin", "admin"],
  "/reports": ["records_officer", "admin", "super_admin"],
  "/staff": ["admin", "super_admin"],
  "/queues": ["triage_nurse", "lab_tech", "pharmacist", "ward_nurse", "admin"],
};
