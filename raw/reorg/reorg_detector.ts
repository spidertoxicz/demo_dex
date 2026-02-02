import { RawBlockFrame, ReorgEvent } from "../types/raw_types"

export function detectReorg(
  prev: RawBlockFrame | null,
  curr: RawBlockFrame
): ReorgEvent | null {
  if (!prev) return null

  if (curr.parentHash !== prev.blockHash) {
    return {
      depth: 1,
      affectedBlocks: [prev.blockNumber, curr.blockNumber]
    }
  }

  return null
}
