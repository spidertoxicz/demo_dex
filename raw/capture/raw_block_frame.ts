import { RawBlockFrame } from "../types/raw_types"

export function buildRawBlockFrame(input: any): RawBlockFrame {
  return {
    blockNumber: parseInt(input.number, 16),
    blockHash: input.hash,
    parentHash: input.parentHash,
    timestamp: parseInt(input.timestamp, 16),
    logs: input.logs ?? [],
    receipts: input.receipts,
    poolStateSnapshots: [],
    valid: true
  }
}
