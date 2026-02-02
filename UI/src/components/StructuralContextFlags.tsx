import { L7Snapshot } from "../types/l7";

export function StructuralContextFlags({ snapshot }: { snapshot: L7Snapshot }) {
  const ctx = snapshot.structuralContextSummary || {};

  return (
    <section className="panel">
      <h2>Structural Context</h2>
      <div>Vacuum vs Wall: {ctx.vacuumVsWall || "-"}</div>
      <div>Absorption vs Retreat: {ctx.absorptionVsRetreat || "-"}</div>
      <div>Ahead vs Behind: {ctx.aheadVsBehind || "-"}</div>
      <div>Support Rebuild: {ctx.supportRebuild || "-"}</div>
    </section>
  );
}
