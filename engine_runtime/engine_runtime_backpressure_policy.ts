// ENGINE V3 — ENGINE RUNTIME (ORCHESTRATOR)
// BACKPRESSURE & LAG POLICY — LOCKED

export type BackpressurePolicy = {
  mode: "REPLAY_UNTIL_CAUGHT_UP"
  maxBacklogBlocks: number
}

export function evaluateBackpressure(
  backlogBlocks: number,
  policy: BackpressurePolicy
): "OK" | "CRITICAL_PAUSE" {
  if (backlogBlocks > policy.maxBacklogBlocks) {
    return "CRITICAL_PAUSE"
  }
  return "OK"
}
