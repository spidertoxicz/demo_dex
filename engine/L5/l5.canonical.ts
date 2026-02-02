import { AnchorLifecycleState, RangeLifecycleState, GlobalStructuralState } from "./l5.schema"

export const CANONICAL_L5_TABLE: Record<
  AnchorLifecycleState,
  Record<RangeLifecycleState, GlobalStructuralState>
> = { ... }
