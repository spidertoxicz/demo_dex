import { L7Inputs, L7Snapshot } from './l7.types'

type SnapshotParams = {
  inputs: L7Inputs
  blockNumber: number
  poolAddress: string
}

export function createL7Snapshot(params: SnapshotParams): L7Snapshot {
  const { inputs, blockNumber, poolAddress } = params

  return {
    timestamp: Date.now(),
    blockNumber,
    poolAddress,

    anchorLifecycle: inputs.anchorLifecycle,
    rangeLifecycle: inputs.rangeLifecycle,
    globalStructuralState: inputs.globalStructuralState,
    engineMode: inputs.engineMode,

    structuralContextSummary: inputs.structuralContextSummary
      ? {
          vacuumVsWall: inputs.structuralContextSummary.vacuumVsWall,
          absorptionVsRetreat: inputs.structuralContextSummary.absorptionVsRetreat,
          aheadVsBehind: inputs.structuralContextSummary.aheadVsBehind,
          supportRebuild: inputs.structuralContextSummary.supportRebuild,
        }
      : undefined,
  }
}
