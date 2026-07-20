// Thin API client stub.
//
// The Flask backend currently only renders templates and wires nothing to a
// database, so the boilerplate renders mock data directly (lib/mock-data).
// When the backend exposes JSON endpoints, point these functions at them and
// the pages keep working because they already consume the same shapes.

const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export const api = {
  // patients: () => get<Patient[]>("/api/patients"),
  // visits: () => get<Visit[]>("/api/visits"),
  // queue: () => get<QueuePatient[]>("/api/queue"),
};
