import { L5Input, GlobalStructuralState } from "./l5.schema"
import { CANONICAL_L5_TABLE } from "./l5.canonical"

export function classifyGlobalStructuralState(
  input: L5Input
): GlobalStructuralState {
  return CANONICAL_L5_TABLE[input.anchorState][input.rangeState]
}
