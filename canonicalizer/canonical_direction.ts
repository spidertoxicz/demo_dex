import { SignedLiquidity } from './canonical_types'

/**
 * Swap canonicalization
 * - pool perspective
 * - no sign inference downstream
 */
export function canonicalizeSwap(raw: {
  amount0: string | bigint
  amount1: string | bigint
}): { amount0: bigint; amount1: bigint } {
  return {
    amount0: BigInt(raw.amount0),
    amount1: BigInt(raw.amount1),
  }
}

/**
 * Liquidity delta canonicalization
 * - + add
 * - - remove
 */
export function canonicalizeLiquidityDelta(
  rawDelta: string | bigint,
  action: 'ADD' | 'REMOVE'
): SignedLiquidity {
  const delta = BigInt(rawDelta)
  return action === 'ADD' ? delta : -delta
}
