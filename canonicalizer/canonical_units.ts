export function canonicalizeUnits(raw: any): CanonicalUnits {
  assertNoFloat(raw.tick, 'tick')

  return {
    amount0: BigInt(raw.amount0),
    amount1: BigInt(raw.amount1),
    liquidity: BigInt(raw.liquidity),
    tick: raw.tick,
    sqrtPriceX96: BigInt(raw.sqrtPriceX96),
  }
}
