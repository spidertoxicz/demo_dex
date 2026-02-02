import { L7Snapshot } from "../types/l7";

export function RangeLifecycleTimeline({ snapshot }: { snapshot: L7Snapshot }) {
  return (
    <section className="panel">
      <h2>Range Lifecycle</h2>
      <div>Current: {snapshot.rangeLifecycle}</div>
    </section>
  );
}
