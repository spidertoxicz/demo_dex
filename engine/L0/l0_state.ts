// engine/l0/l0_state.ts

import { BlockNumber, BlockHash, PoolId } from './l0_types'
import { EngineHalt } from './l0_errors'

let lastBlockNumber: BlockNumber | null = null
let lastBlockHash: BlockHash | null = null

const activePools = new Set<PoolId>()

export function assertBlockContinuity(
  blockNumber: BlockNumber,
  blockHash?: BlockHash
) {
  if (lastBlockNumber !== null) {
    if (blockNumber !== lastBlockNumber + 1) {
      throw new EngineHalt('BLOCK_NUMBER_DISCONTINUITY')
    }
  }

  if (blockHash && lastBlockHash && blockHash === lastBlockHash) {
    throw new EngineHalt('BLOCK_HASH_REPEAT')
  }

  lastBlockNumber = blockNumber
  if (blockHash) lastBlockHash = blockHash
}

export function assertPoolScope(poolId: PoolId) {
  activePools.add(poolId)
}
