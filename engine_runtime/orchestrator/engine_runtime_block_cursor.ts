// ENGINE V3 — ENGINE RUNTIME (ORCHESTRATOR)
// BLOCK CURSOR CONTRACT — LOCKED

export type BlockCursor = {
  lastProcessedBlock: number
  nextBlockToProcess: number
}

export function initializeBlockCursor(startBlock: number): BlockCursor {
  return {
    lastProcessedBlock: startBlock - 1,
    nextBlockToProcess: startBlock
  }
}

export function advanceBlockCursor(cursor: BlockCursor): BlockCursor {
  return {
    lastProcessedBlock: cursor.nextBlockToProcess,
    nextBlockToProcess: cursor.nextBlockToProcess + 1
  }
}
