import { createL7Snapshot } from './l7.snapshot'
import { emitSnapshot } from './l7.emitters'
import { getL7Inputs } from './index'

const FIFTEEN_MINUTES = 15 * 60 * 1000

export function startL7Scheduler() {
  setInterval(() => {
    const inputs = getL7Inputs()

    const snapshot = createL7Snapshot({
      inputs,
      blockNumber: inputs.globalStructuralState.latestBlock,
      poolAddress: inputs.globalStructuralState.poolAddress,
    })

    emitSnapshot(snapshot)
  }, FIFTEEN_MINUTES)
}
