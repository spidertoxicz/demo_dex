export type ValidationResult =
  | { status: 'VALID' }
  | { status: 'INVALID'; reason: string }

export function validateRawBlock(rawEvents: unknown[]): ValidationResult {

  if (!Array.isArray(rawEvents)) {
    return { status: 'INVALID', reason: 'RAW_NOT_ARRAY' }
  }

  const seen = new Set<string>()

  for (const ev of rawEvents as any[]) {

    // must be object
    if (!ev || typeof ev !== 'object') {
      return { status: 'INVALID', reason: 'EVENT_NOT_OBJECT' }
    }

    // coordinate invariant
    if (
      !Number.isInteger(ev.blockNumber) ||
      !Number.isInteger(ev.txIndex) ||
      !Number.isInteger(ev.logIndex)
    ) {
      return { status: 'INVALID', reason: 'INVALID_LOG_COORDINATES' }
    }

    // dedup invariant
    const key = `${ev.blockNumber}-${ev.txIndex}-${ev.logIndex}`
    if (seen.has(key)) {
      return { status: 'INVALID', reason: 'DUPLICATE_LOG_COORDINATE' }
    }
    seen.add(key)

    // known event invariant
    if (
      ev.type !== 'SWAP' &&
      ev.type !== 'MINT' &&
      ev.type !== 'BURN' &&
      ev.type !== 'LIQUIDITY'
    ) {
      return { status: 'INVALID', reason: 'UNKNOWN_EVENT_TYPE' }
    }

    // bigint coercion check (corruption firewall)
    try {
      if (ev.amount0 !== undefined) BigInt(ev.amount0)
      if (ev.amount1 !== undefined) BigInt(ev.amount1)
      if (ev.sqrtPriceX96 !== undefined) BigInt(ev.sqrtPriceX96)
    } catch {
      return { status: 'INVALID', reason: 'CORRUPT_NUMERIC_FIELD' }
    }

    // liquidity enum
    if (ev.type === 'LIQUIDITY') {
      if (ev.action !== 'ADD' && ev.action !== 'REMOVE') {
        return { status: 'INVALID', reason: 'INVALID_LIQUIDITY_ACTION' }
      }
    }

    // float firewall
    if (ev.tick !== undefined && !Number.isInteger(ev.tick)) {
      return { status: 'INVALID', reason: 'NON_INTEGER_TICK' }
    }
  }

  return { status: 'VALID' }
}
