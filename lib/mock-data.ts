// Mock data for the boilerplate.
// The Flask backend only renders templates and has no data layer wired in, so
// the frontend ships with realistic fixtures. Keep these shapes and swap the
// source for real `fetch` calls as the API lands (see lib/api.ts).

export type Acuity = "green" | "amber" | "red";

export type QueuePatient = {
  position: number;
  name: string;
  age: number;
  complaint: string;
  waited: string;
  acuity: Acuity;
};

export const QUEUE: QueuePatient[] = [
  { position: 1, name: "Amina Said", age: 34, complaint: "Chest pain, radiating", waited: "42 min", acuity: "red" },
  { position: 2, name: "Juma Mwangi", age: 61, complaint: "Shortness of breath", waited: "28 min", acuity: "red" },
  { position: 3, name: "Faith Chebet", age: 27, complaint: "High fever, 39.2C", waited: "51 min", acuity: "amber" },
  { position: 4, name: "Otieno Kariuki", age: 8, complaint: "Ear infection", waited: "19 min", acuity: "amber" },
  { position: 5, name: "Nuru Hassan", age: 45, complaint: "Routine review", waited: "12 min", acuity: "green" },
  { position: 6, name: "Liam Omondi", age: 52, complaint: "Med refill", waited: "9 min", acuity: "green" },
];

export type Patient = {
  id: string;
  name: string;
  age: number;
  sex: "M" | "F";
  mrn: string;
  status: "Admitted" | "Outpatient" | "Triage" | "Discharged";
  lastVisit: string;
};

export const PATIENTS: Patient[] = [
  { id: "p-1024", name: "Amina Said", age: 34, sex: "F", mrn: "MRN-4471", status: "Triage", lastVisit: "Today" },
  { id: "p-1025", name: "Juma Mwangi", age: 61, sex: "M", mrn: "MRN-4472", status: "Admitted", lastVisit: "Today" },
  { id: "p-1026", name: "Faith Chebet", age: 27, sex: "F", mrn: "MRN-4473", status: "Outpatient", lastVisit: "Yesterday" },
  { id: "p-1027", name: "Otieno Kariuki", age: 8, sex: "M", mrn: "MRN-4474", status: "Outpatient", lastVisit: "2d ago" },
  { id: "p-1028", name: "Nuru Hassan", age: 45, sex: "F", mrn: "MRN-4475", status: "Discharged", lastVisit: "3d ago" },
  { id: "p-1029", name: "Liam Omondi", age: 52, sex: "M", mrn: "MRN-4476", status: "Outpatient", lastVisit: "5d ago" },
  { id: "p-1030", name: "Zuri Ahmed", age: 39, sex: "F", mrn: "MRN-4477", status: "Admitted", lastVisit: "Today" },
  { id: "p-1031", name: "Brian Kiptoo", age: 23, sex: "M", mrn: "MRN-4478", status: "Triage", lastVisit: "Today" },
];

export type Visit = {
  id: string;
  patient: string;
  clinician: string;
  department: string;
  time: string;
  disposition: "Complete" | "In progress" | "Waiting";
};

export const VISITS: Visit[] = [
  { id: "v-9001", patient: "Amina Said", clinician: "Dr. Odhiambo", department: "Emergency", time: "08:12", disposition: "In progress" },
  { id: "v-9002", patient: "Juma Mwangi", clinician: "Dr. Wairimu", department: "Cardiology", time: "08:40", disposition: "In progress" },
  { id: "v-9003", patient: "Faith Chebet", clinician: "Dr. Mutua", department: "General", time: "09:05", disposition: "Waiting" },
  { id: "v-9004", patient: "Zuri Ahmed", clinician: "Dr. Odhiambo", department: "Maternity", time: "09:22", disposition: "Complete" },
  { id: "v-9005", patient: "Brian Kiptoo", clinician: "Dr. Wairimu", department: "Emergency", time: "09:48", disposition: "Waiting" },
];

export type Kpi = {
  label: string;
  value: number;
  unit?: string;
  delta: string;
  trend: "up" | "down" | "flat";
  icon: string;
  color: "purple" | "blue" | "green" | "red";
  spark: number[];
};

export const KPIS: Kpi[] = [
  { label: "In queue", value: 6, delta: "+2 from 1h ago", trend: "up", icon: "clock", color: "purple", spark: [3, 4, 4, 5, 5, 6, 6] },
  { label: "Admissions today", value: 14, delta: "+3 from yesterday", trend: "up", icon: "people", color: "blue", spark: [9, 10, 11, 10, 12, 13, 14] },
  { label: "Avg wait", value: 28, unit: "min", delta: "-6 from yesterday", trend: "down", icon: "timer", color: "green", spark: [40, 38, 36, 34, 31, 30, 28] },
  { label: "Beds free", value: 23, delta: "of 96 total", trend: "flat", icon: "grid", color: "red", spark: [25, 24, 24, 23, 23, 24, 23] },
];

export const AI_TOOLS = [
  {
    title: "Patient overview",
    desc: "Turn a patient record into a plain-language summary for the clinician at the point of care.",
    icon: "person",
    href: "/ai-help",
  },
  {
    title: "Image analysis",
    desc: "Flag findings on scans and slides, with a confidence read and a suggested next step.",
    icon: "image",
    href: "/ai-help",
  },
  {
    title: "Treatment plan",
    desc: "Draft a first-pass plan from the presenting complaint and history, for human review.",
    icon: "shield",
    href: "/ai-help",
  },
];

export const AI_RESULT = {
  overview:
    "Amina Said, 34, presents with radiating chest pain (42 min in queue, flagged critical). No recorded allergies. Last visit 3 months ago for a resolved UTI. Suggest immediate ECG and troponin; keep her in the red lane.",
  analysis:
    "Chest X-ray: no widened mediastinum, clear lung fields. Subtle opacity right base, likely consolidation. Confidence 0.78. Suggest follow-up CT and ABG if SpO2 drops.",
  plan: [
    "Immediate 12-lead ECG and serial troponin",
    "IV access, continuous monitoring, oxygen if SpO2 < 94%",
    "Aspirin 300mg PO if ACS suspected",
    "Review in 30 min; escalate to cardiology if troponin positive",
  ],
};
