// runtime_operator/main_live.ts

import { EngineRuntimeOrchestrator } from "../engine_runtime"
import {
  evaluateBackpressure,
  BackpressurePolicy
} from "../engine_runtime/orchestrator/backpressure_policy"

// =======================
// STATIC CONFIG (NO INFER)
// =======================
const ENGINE_ID = "ENGINE_V3"
const GENESIS_BLOCK = 0
const START_TIMESTAMP = 1700000000000
const BLOCK_INTERVAL_MS = 1000

const BACKPRESSURE_POLICY: BackpressurePolicy = {
  mode: "REPLAY_UNTIL_CAUGHT_UP",
  maxBacklogBlocks: 5_000
}

// =======================
// INIT RUNTIME
// =======================
const runtime = new EngineRuntimeOrchestrator(
  ENGINE_ID,
  GENESIS_BLOCK,
  START_TIMESTAMP,
  BLOCK_INTERVAL_MS
)

// =======================
// REGISTER HANDLERS (PASSIVE)
// =======================
runtime.onTick(tick => {
  // L0 RAW CAPTURE (live)
  // rawCapture.consume(tick)
})

runtime.onTick(tick => {
  // L7 SNAPSHOT / LOGGER
  // snapshotCollector.collect(tick)
})

// =======================
// LIVE LOOP (OS-DRIVEN)
// =======================
let paused = false

function computeBacklogBlocks(): number {
  // Hitung backlog secara MEKANIK dari adapter luar
  // contoh placeholder:
  return 0
}

function liveStep() {
  const backlogBlocks = computeBacklogBlocks()

  const pressure = evaluateBackpressure(
    backlogBlocks,
    BACKPRESSURE_POLICY
  )

  if (pressure === "CRITICAL_PAUSE") {
    paused = true
    return
  }

  if (!paused) {
    runtime.step()
  }
}

// OS scheduler (boleh jitter)
setInterval(liveStep, BLOCK_INTERVAL_MS)
