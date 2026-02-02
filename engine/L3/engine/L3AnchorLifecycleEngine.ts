// L3AnchorLifecycleEngine.ts
// ==================================
// ENGINE CORE — LOCKED
// ==================================

import { AnchorState, L3AnchorFrame, L3Inputs } from "./L3AnchorTypes"
import { nextAnchorState } from "./L3AnchorStateMachine"

export class L3AnchorLifecycleEngine {

  private state: AnchorState | null = null

  update(
    blockNumber: number,
    poolAddress: string,
    l3Input: L3Inputs
  ): L3AnchorFrame {

    this.state = nextAnchorState(this.state, l3Input)

    return {
      blockNumber,
      poolAddress,
      anchorState: this.state
    }
  }

  // Optional: for debugging / snapshot
  getCurrentState(): AnchorState | null {
    return this.state
  }
}
