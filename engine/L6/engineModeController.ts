// engine/l6-engine-mode/engineModeController.ts

import {
  GlobalStructuralState,
  EngineMode,
} from './types'

/**
 * L6 — Engine Mode Controller
 *
 * Pure function:
 * - Deterministic
 * - Stateless
 * - Function of L5 ONLY
 */
export function deriveEngineMode(
  state: GlobalStructuralState
): EngineMode {
  const { anchor, range } = state

  // Ambiguity override (LOCKED)
  if (range === 'AMBIGUOUS') {
    return 'STRUCTURAL_UNCERTAIN'
  }

  // Canonical Mapping Table (LOCKED)
  if (anchor === 'ACTIVE' && range === 'ACTIVE') {
    return 'STRUCTURAL_BUILD'
  }

  if (
    (anchor === 'ACTIVE' && range === 'STRESSED') ||
    (anchor === 'FADING' && range === 'ACTIVE') ||
    (anchor === 'FADING' && range === 'STRESSED')
  ) {
    return 'STRUCTURAL_DEFENSE'
  }

  if (
    (anchor === 'FADING' && range === 'ABANDONED') ||
    (anchor === 'DEAD' && range === 'ABANDONED')
  ) {
    return 'STRUCTURAL_BREAKDOWN'
  }

  if (anchor === 'DEAD' && range === 'DEAD') {
    return 'STRUCTURAL_RESET'
  }

  if (
    (anchor === 'NEW' && range === 'ACTIVE') ||
    (anchor === 'NEW' && range === 'STRESSED')
  ) {
    return 'STRUCTURAL_UNCERTAIN'
  }

  // Safety net (still deterministic)
  return 'STRUCTURAL_UNCERTAIN'
}
