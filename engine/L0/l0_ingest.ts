// engine/l0/l0_ingest.ts

import {
  CanonicalBlockBatch,
  PackedPoolFrame,
  PoolFrameInput,
} from './l0_types'
import { assertBlockContinuity, assertPoolScope } from './l0_state'
import { RejectBlock, DropBlock } from './l0_errors'

/**
 * ENGINE ENTRY — L0
 */
export function ingestCanonicalBlock(
  batch: CanonicalBlockBatch,
  routeToL1: (frame: PackedPoolFrame) => void
) {
  // ─────────────────────────────────────────
  // 5.1 Atomic Block Gate
  // ─────────────────────────────────────────
  if (!batch || !batch.blockNumber || !batch.pools) {
    throw new RejectBlock('PARTIAL_BATCH')
  }

  if (batch.pools.length === 0) {
    throw new DropBlock('EMPTY_BLOCK')
  }

  // ─────────────────────────────────────────
  // 5.2 Determinism Gate
  // ─────────────────────────────────────────
  assertBlockContinuity(batch.blockNumber, batch.blockHash)

  // ─────────────────────────────────────────
  // Per-Pool Frame Packing
  // ─────────────────────────────────────────
  for (const pool of batch.pools) {
    assertPoolScope(pool.poolId)

    const frame = packPoolFrame(batch, pool)
    routeToL1(frame)
  }
}

function packPoolFrame(
  batch: CanonicalBlockBatch,
  pool: PoolFrameInput
): PackedPoolFrame {
  let lpDelta = 0n

  for (const e of pool.events) {
    if (e.kind === 'MINT') {
      if (e.liquidityDelta === undefined)
        throw new RejectBlock('MINT_WITHOUT_DELTA')
      lpDelta += e.liquidityDelta
    }

    if (e.kind === 'BURN') {
      if (e.liquidityDelta === undefined)
        throw new RejectBlock('BURN_WITHOUT_DELTA')
      lpDelta -= e.liquidityDelta
    }
  }

  return {
    poolId: pool.poolId,
    blockNumber: batch.blockNumber,
    blockHash: batch.blockHash,
    lpDelta,
    rawEvents: pool.events, // untouched
  }
}
