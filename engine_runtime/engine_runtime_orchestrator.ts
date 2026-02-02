// ENGINE V3 — ENGINE RUNTIME (ORCHESTRATOR)
// DETERMINISTIC PIPELINE RUNNER — LOCKED

import { BlockCursor, advanceBlockCursor } from "./engine_runtime_block_cursor"
import { BackpressurePolicy, evaluateBackpressure } from "./engine_runtime_backpressure_policy"
import { ReplayMode, assertReplayDeterminism } from "./engine_runtime_replay_mode"

export type EngineRuntimeContext = {
  cursor: BlockCursor
  backpressure: BackpressurePolicy
  replay: ReplayMode
}

export type BlockProcessor = (blockNumber: number) => void

export function runEngineTick(
  ctx: EngineRuntimeContext,
  currentChainHead: number,
  processBlock: BlockProcessor
): EngineRuntimeContext {
  assertReplayDeterminism(ctx.replay)

  const backlog = currentChainHead - ctx.cursor.nextBlockToProcess

  const pressureState = evaluateBackpressure(backlog, ctx.backpressure)
  if (pressureState === "CRITICAL_PAUSE") {
    throw new Error("CRITICAL_BACKPRESSURE_PAUSE")
  }

  // Exactly one block per tick
  processBlock(ctx.cursor.nextBlockToProcess)

  return {
    ...ctx,
    cursor: advanceBlockCursor(ctx.cursor)
  }
}
