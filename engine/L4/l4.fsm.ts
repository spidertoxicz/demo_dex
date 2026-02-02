import { L4RangeState, RangePressure } from './l4.types'

export function nextRangeState(
  prev: L4RangeState | null,
  pressure: RangePressure
): L4RangeState {

  // 1. Startup
  if (prev === null) {
    if (pressure === 'STABLE') return 'RANGE_ACTIVE'
    if (pressure === 'PRESSURED') return 'RANGE_STRESSED'
    return 'RANGE_DEAD'
  }

  // 2. From RANGE_ACTIVE
  if (prev === 'RANGE_ACTIVE') {
    if (pressure === 'STABLE') return 'RANGE_ACTIVE'
    if (pressure === 'PRESSURED') return 'RANGE_STRESSED'
    return 'RANGE_ABANDONED'
  }

  // 3. From RANGE_STRESSED
  if (prev === 'RANGE_STRESSED') {
    if (pressure === 'STABLE') return 'RANGE_ACTIVE'
    if (pressure === 'PRESSURED') return 'RANGE_STRESSED'
    return 'RANGE_ABANDONED'
  }

  // 4. From RANGE_ABANDONED
  if (prev === 'RANGE_ABANDONED') {
    if (pressure === 'STABLE') return 'RANGE_ACTIVE'
    if (pressure === 'PRESSURED') return 'RANGE_STRESSED'
    return 'RANGE_DEAD'
  }

  // 5. From RANGE_DEAD
  if (prev === 'RANGE_DEAD') {
    if (pressure === 'STABLE') return 'RANGE_ACTIVE'
    return 'RANGE_DEAD'
  }

  return prev
}
