export type BaseEvent = {
  blockNumber: number
  txIndex: number
  logIndex: number
}

export type CanonicalSwap = BaseEvent & {
  type: 'SWAP'
  amount0: bigint
  amount1: bigint
  sqrtPriceX96: bigint
  tick: bigint
}

export type CanonicalLiquidity = BaseEvent & {
  type: 'LIQUIDITY'
  liquidityDelta: bigint
}

export type CanonicalEvent =
  | CanonicalSwap
  | CanonicalLiquidity
