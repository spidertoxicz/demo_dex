import { L7Snapshot } from "../types/l7";

export function StructuralReasonsPanel({ snapshot }: { snapshot: L7Snapshot }) {
  return (
    <section className="panel">
      <h2>Structural Reasons</h2>
      <ul>
        {(snapshot.structuralReasons || []).map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </section>
  );
}
