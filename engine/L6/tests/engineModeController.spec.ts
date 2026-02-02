// engine/l6-engine-mode/__tests__/engineModeController.spec.ts

import { deriveEngineMode } from '../engineModeController'
import { GlobalStructuralState } from '../types'

describe('L6 Engine Mode Controller', () => {
  it('ACTIVE + ACTIVE → STRUCTURAL_BUILD', () => {
    const state: GlobalStructuralState = {
      anchor: 'ACTIVE',
      range: 'ACTIVE',
    }
    expect(deriveEngineMode(state)).toBe('STRUCTURAL_BUILD')
  })

  it('ACTIVE + STRESSED → STRUCTURAL_DEFENSE', () => {
    const state: GlobalStructuralState = {
      anchor: 'ACTIVE',
      range: 'STRESSED',
    }
    expect(deriveEngineMode(state)).toBe('STRUCTURAL_DEFENSE')
  })

  it('FADING + ABANDONED → STRUCTURAL_BREAKDOWN', () => {
    const state: GlobalStructuralState = {
      anchor: 'FADING',
      range: 'ABANDONED',
    }
    expect(deriveEngineMode(state)).toBe('STRUCTURAL_BREAKDOWN')
  })

  it('DEAD + DEAD → STRUCTURAL_RESET', () => {
    const state: GlobalStructuralState = {
      anchor: 'DEAD',
      range: 'DEAD',
    }
    expect(deriveEngineMode(state)).toBe('STRUCTURAL_RESET')
  })

  it('NEW + STRESSED → STRUCTURAL_UNCERTAIN', () => {
    const state: GlobalStructuralState = {
      anchor: 'NEW',
      range: 'STRESSED',
    }
    expect(deriveEngineMode(state)).toBe('STRUCTURAL_UNCERTAIN')
  })

  it('any + AMBIGUOUS → STRUCTURAL_UNCERTAIN', () => {
    const state: GlobalStructuralState = {
      anchor: 'ACTIVE',
      range: 'AMBIGUOUS',
    }
    expect(deriveEngineMode(state)).toBe('STRUCTURAL_UNCERTAIN')
  })
})
