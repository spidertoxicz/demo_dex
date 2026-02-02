import { L7Snapshot } from "../types/l7";

export function LPSnapshotHeatmap({ snapshot }: { snapshot: L7Snapshot }) {
  const bands = snapshot.lpBands || {};

  return (
    <section className="panel">
      <h2>LP Snapshot Heatmap (Qualitative)</h2>
      <div>Near: {bands.near || "UNKNOWN"}</div>
      <div>Mid: {bands.mid || "UNKNOWN"}</div>
      <div>Far: {bands.far || "UNKNOWN"}</div>
    </section>
  );
}
