export function validateRawBlock(rawEvents: any[]): CanonicalBlockResult {
  for (const ev of rawEvents) {
    if (
      ev.blockNumber == null ||
      ev.txIndex == null ||
      ev.logIndex == null
    ) {
      return {
        status: 'INVALID',
        reason: 'MISSING_LOG_COORDINATES',
      }
    }

    try {
      BigInt(ev.amount0)
      BigInt(ev.amount1)
      BigInt(ev.sqrtPriceX96)
    } catch {
      return {
        status: 'INVALID',
        reason: 'CORRUPT_NUMERIC_FIELD',
      }
    }
  }

  return { status: 'VALID', events: rawEvents }
}
