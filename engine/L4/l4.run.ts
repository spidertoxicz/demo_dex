import { deriveRangePressure } from './l4.rangePressure'
import { nextRangeState } from './l4.fsm'
import { L4RangeFrame, L4RangeState } from './l4.types'

export function runL4(
  blockNumber: number,
  poolAddress: string,
  prevState: L4RangeState | null,
  l2: any,
  l3: any
): L4RangeFrame {

  const pressure = deriveRangePressure(l2, l3)
  const rangeState = nextRangeState(prevState, pressure)

  return {
    blockNumber,
    poolAddress,
    rangeState
  }
}
