// engine/l6-engine-mode/types.ts

/**
 * Anchor state derived from L3 (via L5)
 */
export type AnchorState =
  | 'ACTIVE'
  | 'FADING'
  | 'DEAD'
  | 'NEW'

/**
 * Range state derived from L4 (via L5)
 */
export type RangeState =
  | 'ACTIVE'
  | 'STRESSED'
  | 'ABANDONED'
  | 'DEAD'
  | 'AMBIGUOUS'

/**
 * Global structural state from L5
 * L6 ONLY sees this object.
 */
export interface GlobalStructuralState {
  anchor: AnchorState
  range: RangeState
}

/**
 * Engine Mode (L6 Output)
 * LOCKED semantics.
 */
export type EngineMode =
  | 'STRUCTURAL_BUILD'
  | 'STRUCTURAL_DEFENSE'
  | 'STRUCTURAL_BREAKDOWN'
  | 'STRUCTURAL_RESET'
  | 'STRUCTURAL_UNCERTAIN'
