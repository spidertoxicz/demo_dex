// runtime_operator/main_replay.ts

import { EngineRuntimeOrchestrator } from "../engine_runtime"
import {
  evaluateBackpressure,
  BackpressurePolicy
} from "../engine_runtime/orchestrator/backpressure_policy"
import {
  initializeBlockCursor,
  advanceBlockCursor,
  BlockCursor
} from "../engine_runtime/orchestrator/engine_runtime_block_cursor"
import {
  ReplayMode,
  assertReplayDeterminism
} from "../engine_runtime/orchestrator/engine_runtime_replay_mode"

// =======================
// STATIC CONFIG (LOCKED)
// =======================
const ENGINE_ID = "ENGINE_V3"
const GENESIS_BLOCK = 0
const START_TIMESTAMP = 1700000000000
const BLOCK_INTERVAL_MS = 1000

const REPLAY_MODE: ReplayMode = {
  enabled: true,
  source: "RAW_EVENT_LOG",
  deterministic: true
}

assertReplayDeterminism(REPLAY_MODE)

const BACKPRESSURE_POLICY: BackpressurePolicy = {
  mode: "REPLAY_UNTIL_CAUGHT_UP",
  maxBacklogBlocks: 10_000
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
  // L0 RAW CAPTURE (replay)
  // rawCapture.consume(tick)
})

runtime.onTick(tick => {
  // L7 SNAPSHOT / LOGGER
  // snapshotCollector.collect(tick)
})

// =======================
// REPLAY CURSOR (DATA-DRIVEN)
// =======================
let cursor: BlockCursor = initializeBlockCursor(GENESIS_BLOCK)

// Adapter data (ABSTRAK, BUKAN ENGINE LOGIC)
function hasEventForBlock(blockNumber: number): boolean {
  // cek RAW_EVENT_LOG / file / db
  return true
}

// =======================
// REPLAY LOOP (DETERMINISTIC)
// =======================
while (true) {
  const backlogBlocks =
    cursor.nextBlockToProcess - cursor.lastProcessedBlock - 1

  const pressure = evaluateBackpressure(
    backlogBlocks,
    BACKPRESSURE_POLICY
  )

  if (pressure === "CRITICAL_PAUSE") {
    // mesin perlu napas, bukan data salah
    break
  }

  if (!hasEventForBlock(cursor.nextBlockToProcess)) {
    // tidak ada data → TIDAK BOLEH MAJU
    break
  }

  // 🔥 SATU STEP DETERMINISTIK
  runtime.step()

  // cursor maju SETELAH step sukses
  cursor = advanceBlockCursor(cursor)
}
