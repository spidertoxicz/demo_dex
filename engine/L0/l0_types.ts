// engine/l0/l0_types.ts

export type BlockNumber = number
export type BlockHash = string
export type PoolId = string

export interface CanonicalBlockBatch {
  blockNumber: BlockNumber
  blockHash?: BlockHash
  pools: PoolFrameInput[]
}

export interface PoolFrameInput {
  poolId: PoolId
  events: RawEvent[]
}

export interface RawEvent {
  kind: 'MINT' | 'BURN' | 'SWAP' | 'OTHER'
  liquidityDelta?: bigint   // REQUIRED for MINT/BURN
}

export interface PackedPoolFrame {
  poolId: PoolId
  blockNumber: BlockNumber
  blockHash?: BlockHash
  lpDelta: bigint           // merged signed delta
  rawEvents: RawEvent[]     // untouched passthrough
}
