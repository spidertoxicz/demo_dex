import { L7Snapshot } from "../types/l7";

export function StructuralSnapshotPanel({ snapshot }: { snapshot: L7Snapshot }) {
  return (
    <section className="panel">
      <h2>Structural Snapshot</h2>
      <div>Anchor: {snapshot.anchorLifecycle}</div>
      <div>Range: {snapshot.rangeLifecycle}</div>
      <div>Global: {snapshot.globalStructuralState}</div>
      <div>Engine Mode: {snapshot.engineMode}</div>
    </section>
  );
}
