import { L7Snapshot } from "../types/l7";

export function AnchorLifecycleTimeline({ snapshot }: { snapshot: L7Snapshot }) {
  return (
    <section className="panel">
      <h2>Anchor Lifecycle</h2>
      <div>Current: {snapshot.anchorLifecycle}</div>
    </section>
  );
}
