// L3AnchorTypes.ts
// ================================
// ENGINE CORE — LOCKED
// Do NOT add logic here
// ================================

export type AnchorState =
  | "ANCHOR_NEW"
  | "ANCHOR_ACTIVE"
  | "ANCHOR_FADING"
  | "ANCHOR_DEAD"

export interface L3AnchorFrame {
  blockNumber: number
  poolAddress: string
  anchorState: AnchorState
}

// ================================
// Input strictly from L2
// ================================

export interface L3Inputs {
  anchorDetected: boolean
  anchorStrengthening: boolean
  anchorWeakening: boolean
  absorptionPresent: boolean
  vacuumForming: boolean
}
