// ENGINE V3 — ENGINE RUNTIME (ORCHESTRATOR)
// DETERMINISTIC REPLAY CONTRACT — LOCKED

export type ReplayMode = {
  enabled: true
  source: "RAW_EVENT_LOG" | "CANONICAL_LOG"
  deterministic: true
}

export function assertReplayDeterminism(replay: ReplayMode): void {
  if (!replay.enabled) {
    throw new Error("Replay MUST be enabled")
  }
  if (!replay.deterministic) {
    throw new Error("Replay MUST be deterministic")
  }
}
