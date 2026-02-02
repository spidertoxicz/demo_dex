/**
 * Canonical Types
 * ---------------
 * Shared type contract for canonicalizer layer.
 * No logic allowed in this file.
 */

/**
 * Raw log coordinate reference
 * Used for canonical ordering.
 */
export interface RawLogRef {
  blockNumber: bigint
  txIndex: number
  logIndex: number
}

/**
 * Signed liquidity delta
 * + : add liquidity
 * - : remove liquidity
 */
export type SignedLiquidity = bigint

/**
 * Canonical numeric units (LOCKED)
 * - NO float
 * - NO decimal
 * - NO rounding
 */
export type CanonicalUnits = {
  amount0: bigint
  amount1: bigint
  liquidity: bigint
  tick: number
  sqrtPriceX96: bigint
}

/**
 * Canonical event (minimal shape)
 * Extended fields may exist, but these are canonicalized.
 */
export type CanonicalEvent =
  | (RawLogRef & {
      type: 'SWAP'
      amount0: bigint
      amount1: bigint
    })
  | (RawLogRef & {
      type: 'LIQUIDITY'
      liquidity: SignedLiquidity
    })

/**
 * Canonical block validation result
 * INVALID is a valid deterministic outcome.
 */
export type CanonicalBlockResult =
  | {
      status: 'VALID'
      events: CanonicalEvent[]
    }
  | {
      status: 'INVALID'
      reason: string
    }
