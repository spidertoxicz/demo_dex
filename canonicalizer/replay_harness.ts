import crypto from 'crypto'
import { canonicalizeBlock } from './canonicalizer'

// stable stringify prevents key-order randomness
function stableStringify(obj: unknown): string {
  return JSON.stringify(obj, (_, v) =>
    typeof v === 'bigint' ? v.toString() : v
  )
}

function hashCanonical(events: unknown[]): string {
  const str = stableStringify(events)

  return crypto
    .createHash('sha256')
    .update(str)
    .digest('hex')
}

export function replayDeterminismTest(rawBlock: any[]) {

  const ITERATIONS = 1000

  const hashes = new Set<string>()

  for (let i = 0; i < ITERATIONS; i++) {

    const canonical = canonicalizeBlock(rawBlock)

    const hash = hashCanonical(canonical)

    hashes.add(hash)

    if (hashes.size > 1) {
      throw new Error('NON_DETERMINISTIC_REPLAY')
    }
  }

  console.log('Deterministic replay ✓')
}
