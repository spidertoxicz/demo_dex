// L4 Range States (LOCKED)
export type L4RangeState =
  | 'RANGE_ACTIVE'
  | 'RANGE_STRESSED'
  | 'RANGE_ABANDONED'
  | 'RANGE_DEAD'

// Anchor states from L3
export type AnchorState =
  | 'ANCHOR_NEW'
  | 'ANCHOR_ACTIVE'
  | 'ANCHOR_FADING'
  | 'ANCHOR_DEAD'

// Derived pressure (categorical only)
export type RangePressure =
  | 'STABLE'
  | 'PRESSURED'
  | 'BROKEN'

// L4 Output (LOCKED)
export interface L4RangeFrame {
  blockNumber: number
  poolAddress: string
  rangeState: L4RangeState
}
