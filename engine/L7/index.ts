import { L7Inputs } from './l7.types'
import { startL7Scheduler } from './l7.scheduler'

// READ-ONLY imports from engine
import { getAnchorLifecycle } from '../l3-anchor'
import { getRangeLifecycle } from '../l4-range'
import { getGlobalStructuralState } from '../l5-global'
import { getEngineMode } from '../l6-mode'
import { getL2Summary } from '../l2-structure'

export function getL7Inputs(): L7Inputs {
  return {
    anchorLifecycle: getAnchorLifecycle(),
    rangeLifecycle: getRangeLifecycle(),
    globalStructuralState: getGlobalStructuralState(),
    engineMode: getEngineMode(),
    structuralContextSummary: getL2Summary(),
  }
}

// bootstrap
startL7Scheduler()
