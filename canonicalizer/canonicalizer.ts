import { canonicalSort } from './canonical_sort'
import { canonicalizeUnits } from './canonical_units'
import {
  canonicalizeSwap,
  canonicalizeLiquidityDelta,
} from './canonical_direction'
import { validateRawBlock } from './canonical_validate'
import {
  CanonicalBlockResult,
  CanonicalEvent,
} from './canonical_types'

/**
 * Canonicalizer Entry Point
 * ------------------------
 * - NOT engine
 * - NOT stateful
 * - deterministic
 * - replayable
 *
 * Pipeline:
 * 1. validate (HARD GATE)
 * 2. sort (canonical order)
 * 3. canonical transform
 */
export function canonicalizeBlock(
  rawEvents: any[]
): CanonicalBlockResult {
  // 1️⃣ HARD VALIDATION GATE
  const validation = validateRawBlock(rawEvents)
  if (validation.status === 'INVALID') {
    return validation
  }

  // 2️⃣ CANONICAL ORDERING
  const ordered = canonicalSort(validation.events)

  // 3️⃣ CANONICAL TRANSFORM
  const canonicalEvents: CanonicalEvent[] = ordered.map((ev) => {
    switch (ev.type) {
      case 'SWAP': {
        const swap = canonicalizeSwap({
          amount0: ev.amount0,
          amount1: ev.amount1,
        })

        return {
          ...ev,
          amount0: swap.amount0,
          amount1: swap.amount1,
        }
      }

      case 'LIQUIDITY': {
        const liquidityDelta = canonicalizeLiquidityDelta(
          ev.liquidity,
          ev.action // 'ADD' | 'REMOVE'
        )

        return {
          ...ev,
          liquidity: liquidityDelta,
        }
      }

      default:
        // Unknown event types MUST be rejected upstream
        return ev
    }
  })

  return {
    status: 'VALID',
    events: canonicalEvents,
  }
}
