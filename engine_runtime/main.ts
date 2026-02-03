import {
  EngineRuntimeOrchestrator
} from "./engine_runtime"

import {
  evaluateBackpressure,
  BackpressurePolicy
} from "./engine_runtime/orchestrator/backpressure_policy"

// ---- CONFIG (STATIC, NO INFERENCE)
const ENGINE_ID = "ENGINE_V3"
const GENESIS_BLOCK = 0
const START_TIMESTAMP = 1700000000000
const BLOCK_INTERVAL_MS = 1000

const BACKPRESSURE_POLICY: BackpressurePolicy = {
  mode: "REPLAY_UNTIL_CAUGHT_UP",
  maxBacklogBlocks: 1000
}

// ---- INIT RUNTIME
const runtime = new EngineRuntimeOrchestrator(
  ENGINE_ID,
  GENESIS_BLOCK,
  START_TIMESTAMP,
  BLOCK_INTERVAL_MS
)

// ---- REGISTER MODULES (CONTOH)
runtime.onTick(tick => {
  // L0 RAW CAPTURE
  // rawCapture.consume(tick)
})

runtime.onTick(tick => {
  // L7 SNAPSHOT / LOGGER
  // snapshotCollector.collect(tick)
})

// ---- LOOP CONTROLLER
let paused = false

function loop() {
  // backlog dihitung DI LUAR runtime
  const backlogBlocks = 0 // ← nanti diisi dari L0/L3 state

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

// ---- SCHEDULER (EXTERNAL CLOCK)
setInterval(loop, BLOCK_INTERVAL_MS)
