// L7 — Observability Snapshot Types (LOCKED)

import { AnchorLifecycleState } from '../l3-anchor/l3.types'
import { RangeLifecycleState } from '../l4-range/l4.types'
import { GlobalStructuralState } from '../l5-global/l5.types'
import { EngineMode } from '../l6-mode/l6.types'
import { L2Summary } from '../l2-structure/l2.types'

export type L7Inputs = {
  anchorLifecycle: AnchorLifecycleState
  rangeLifecycle: RangeLifecycleState
  globalStructuralState: GlobalStructuralState
  engineMode: EngineMode
  structuralContextSummary?: L2Summary
}

export type L7Snapshot = {
  timestamp: number           // wall-clock
  blockNumber: number         // latest processed block
  poolAddress: string

  anchorLifecycle: AnchorLifecycleState
  rangeLifecycle: RangeLifecycleState
  globalStructuralState: GlobalStructuralState
  engineMode: EngineMode

  structuralContextSummary?: {
    vacuumVsWall?: string
    absorptionVsRetreat?: string
    aheadVsBehind?: string
    supportRebuild?: string
  }
}
