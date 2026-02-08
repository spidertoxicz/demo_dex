// canonical_validate.ts

export type ValidationResult =
  | { status: 'VALID' }
  | { status: 'INVALID'; reason: string }

// coordinate helper
function hasValidCoordinates(ev: any): boolean {
  return (
    Number.isInteger(ev?.blockNumber) &&
    ev.blockNumber >= 0 &&
    Number.isInteger(ev?.txIndex) &&
    ev.txIndex >= 0 &&
    Number.isInteger(ev?.logIndex) &&
    ev.logIndex >= 0
  )
}

// strict enum guard
function isKnownEventType(type: any): boolean {
  return (
    type === 'SWAP' ||
    type === 'MINT' ||
    type === 'BURN' ||
    type === 'LIQUIDITY'
  )
}

// optional integer guard for tick
function isIntegerOrBigInt(v: any): boolean {
  return typeof v === 'bigint' || Number.isInteger(v)
}

export function validateRawBlock(rawEvents: unknown[]): ValidationResult {
  
  if (!Array.isArray(rawEvents)) {
    return { status: 'INVALID', reason: 'RAW_EVENTS_NOT_ARRAY' }
  }

  const seen = new Set<string>()

  for (const ev of rawEvents) {

    // ---- shape guard ----
    if (typeof ev !== 'object' || ev === null) {
      return { status: 'INVALID', reason: 'EVENT_NOT_OBJECT' }
    }

    // ---- coordinate guard ----
    if (!hasValidCoordinates(ev)) {
      return { status: 'INVALID', reason: 'INVALID_EVENT_COORDINATES' }
    }

    const key = `${ev.blockNumber}-${ev.txIndex}-${ev.logIndex}`

    // ---- HARD dedup firewall ----
    if (seen.has(key)) {
      return { status: 'INVALID', reason: 'DUPLICATE_LOG_COORDINATE' }
    }

    seen.add(key)

    // ---- event type firewall ----
    if (!isKnownEventType((ev as any).type)) {
      return { status: 'INVALID', reason: 'UNKNOWN_EVENT_TYPE' }
    }

    // ---- enum guard (liquidity action) ----
    if ((ev as any).type === 'LIQUIDITY') {
      const action = (ev as any).action

      if (action !== 'ADD' && action !== 'REMOVE') {
        return { status: 'INVALID', reason: 'INVALID_LIQUIDITY_ACTION' }
      }
    }

    // ---- float firewall (tick) ----
    if ('tick' in (ev as any)) {
      if (!isIntegerOrBigInt((ev as any).tick)) {
        return { status: 'INVALID', reason: 'NON_INTEGER_TICK' }
      }
    }
  }

  // validator NEVER exports events
  return { status: 'VALID' }
}
