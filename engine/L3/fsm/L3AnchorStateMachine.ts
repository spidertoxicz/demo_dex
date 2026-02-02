// L3AnchorStateMachine.ts
// ==================================
// FORMAL STATE MACHINE — LOCKED
// ==================================

import { AnchorState, L3Inputs } from "./L3AnchorTypes"

export function nextAnchorState(
  prev: AnchorState | null,
  input: L3Inputs
): AnchorState {

  // -------------------------------
  // STARTUP / NULL
  // -------------------------------
  if (prev === null) {
    return input.anchorDetected ? "ANCHOR_NEW" : "ANCHOR_DEAD"
  }

  // -------------------------------
  // STATE TRANSITIONS
  // -------------------------------
  switch (prev) {

    case "ANCHOR_NEW":
      if (input.vacuumForming) return "ANCHOR_DEAD"
      if (input.anchorWeakening) return "ANCHOR_FADING"
      if (input.anchorStrengthening) return "ANCHOR_ACTIVE"
      return "ANCHOR_NEW"

    case "ANCHOR_ACTIVE":
      if (input.vacuumForming) return "ANCHOR_DEAD"
      if (input.anchorWeakening) return "ANCHOR_FADING"
      return "ANCHOR_ACTIVE"

    case "ANCHOR_FADING":
      if (input.vacuumForming) return "ANCHOR_DEAD"
      if (input.anchorStrengthening) return "ANCHOR_ACTIVE"
      return "ANCHOR_FADING"

    case "ANCHOR_DEAD":
      if (input.anchorDetected) return "ANCHOR_NEW"
      return "ANCHOR_DEAD"

    default:
      // Safety: should never happen
      return "ANCHOR_DEAD"
  }
}
