import { useEffect, useState } from "react";
import { fetchLatestL7 } from "./api/l7";
import { L7Snapshot } from "./types/l7";

import { StructuralSnapshotPanel } from "./components/StructuralSnapshotPanel";
import { LPSnapshotHeatmap } from "./components/LPSnapshotHeatmap";
import { AnchorLifecycleTimeline } from "./components/AnchorLifecycleTimeline";
import { RangeLifecycleTimeline } from "./components/RangeLifecycleTimeline";
import { StructuralContextFlags } from "./components/StructuralContextFlags";
import { StructuralTimeline } from "./components/StructuralTimeline";
import { StructuralReasonsPanel } from "./components/StructuralReasonsPanel";

export default function App() {
  const [snapshot, setSnapshot] = useState<L7Snapshot | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchLatestL7();
      setSnapshot(data);
    };
    load();
    const id = setInterval(load, 15_000); // UI polling only
    return () => clearInterval(id);
  }, []);

  if (!snapshot) return <div>Loading L7 Snapshot...</div>;

  return (
    <div className="grid">
      <StructuralSnapshotPanel snapshot={snapshot} />
      <LPSnapshotHeatmap snapshot={snapshot} />
      <AnchorLifecycleTimeline snapshot={snapshot} />
      <RangeLifecycleTimeline snapshot={snapshot} />
      <StructuralContextFlags snapshot={snapshot} />
      <StructuralReasonsPanel snapshot={snapshot} />
      <StructuralTimeline />
    </div>
  );
}
