import { AnchorState, RangePressure } from './l4.types'

interface L2ContextFrame {
  wallVacuum: 'WALL' | 'NEUTRAL' | 'VACUUM'
  interaction: 'ABSORB' | 'RETREAT'
}

interface L3AnchorFrame {
  anchorState: AnchorState
}

export function deriveRangePressure(
  l2: L2ContextFrame,
  l3: L3AnchorFrame
): RangePressure {

  if (
    l3.anchorState === 'ANCHOR_DEAD' ||
    l2.wallVacuum === 'VACUUM'
  ) {
    return 'BROKEN'
  }

  if (
    l3.anchorState === 'ANCHOR_FADING' ||
    l2.interaction === 'RETREAT' ||
    l2.wallVacuum === 'NEUTRAL'
  ) {
    return 'PRESSURED'
  }

  // ANCHOR_NEW | ANCHOR_ACTIVE
  return 'STABLE'
}
