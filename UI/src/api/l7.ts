import { L7Snapshot } from "../types/l7";

export async function fetchLatestL7(): Promise<L7Snapshot> {
  const res = await fetch("http://localhost:3001/l7/latest");
  if (!res.ok) throw new Error("Failed to fetch L7 snapshot");
  return res.json();
}
