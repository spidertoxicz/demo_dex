// __tests__/L3AnchorStateMachine.spec.ts
// ======================================
// FORMAL FSM TEST — LOCKED
// ======================================

import { nextAnchorState } from "../fsm/L3AnchorStateMachine"
import { AnchorState, L3Inputs } from "../types/L3AnchorTypes"

describe("L3 Anchor Lifecycle — Formal State Machine", () => {

  const baseInput: L3Inputs = {
    anchorDetected: false,
    anchorStrengthening: false,
    anchorWeakening: false,
    absorptionPresent: false,
    vacuumForming: false
  }

  const input = (overrides: Partial<L3Inputs>): L3Inputs => ({
    ...baseInput,
    ...overrides
  })

  // --------------------------------------------------
  // STARTUP / NULL
  // --------------------------------------------------

  test("Startup: anchor detected → ANCHOR_NEW", () => {
    const state = nextAnchorState(null, input({ anchorDetected: true }))
    expect(state).toBe("ANCHOR_NEW")
  })

  test("Startup: no anchor → ANCHOR_DEAD", () => {
    const state = nextAnchorState(null, input({}))
    expect(state).toBe("ANCHOR_DEAD")
  })

  // --------------------------------------------------
  // FROM ANCHOR_NEW
  // --------------------------------------------------

  test("ANCHOR_NEW → ANCHOR_ACTIVE when strengthening", () => {
    const state = nextAnchorState("ANCHOR_NEW", input({ anchorStrengthening: true }))
    expect(state).toBe("ANCHOR_ACTIVE")
  })

  test("ANCHOR_NEW → ANCHOR_FADING when weakening", () => {
    const state = nextAnchorState("ANCHOR_NEW", input({ anchorWeakening: true }))
    expect(state).toBe("ANCHOR_FADING")
  })

  test("ANCHOR_NEW → ANCHOR_DEAD when vacuum forms", () => {
    const state = nextAnchorState("ANCHOR_NEW", input({ vacuumForming: true }))
    expect(state).toBe("ANCHOR_DEAD")
  })

  test("ANCHOR_NEW stays ANCHOR_NEW when no structural change", () => {
    const state = nextAnchorState("ANCHOR_NEW", input({}))
    expect(state).toBe("ANCHOR_NEW")
  })

  // --------------------------------------------------
  // FROM ANCHOR_ACTIVE
  // --------------------------------------------------

  test("ANCHOR_ACTIVE → ANCHOR_FADING when weakening", () => {
    const state = nextAnchorState("ANCHOR_ACTIVE", input({ anchorWeakening: true }))
    expect(state).toBe("ANCHOR_FADING")
  })

  test("ANCHOR_ACTIVE → ANCHOR_DEAD when vacuum forms", () => {
    const state = nextAnchorState("ANCHOR_ACTIVE", input({ vacuumForming: true }))
    expect(state).toBe("ANCHOR_DEAD")
  })

  test("ANCHOR_ACTIVE stays ANCHOR_ACTIVE when stable", () => {
    const state = nextAnchorState("ANCHOR_ACTIVE", input({}))
    expect(state).toBe("ANCHOR_ACTIVE")
  })

  // --------------------------------------------------
  // FROM ANCHOR_FADING
  // --------------------------------------------------

  test("ANCHOR_FADING → ANCHOR_ACTIVE when strengthening (revive)", () => {
    const state = nextAnchorState("ANCHOR_FADING", input({ anchorStrengthening: true }))
    expect(state).toBe("ANCHOR_ACTIVE")
  })

  test("ANCHOR_FADING → ANCHOR_DEAD when vacuum forms", () => {
    const state = nextAnchorState("ANCHOR_FADING", input({ vacuumForming: true }))
    expect(state).toBe("ANCHOR_DEAD")
  })

  test("ANCHOR_FADING stays ANCHOR_FADING when no change", () => {
    const state = nextAnchorState("ANCHOR_FADING", input({}))
    expect(state).toBe("ANCHOR_FADING")
  })

  // --------------------------------------------------
  // FROM ANCHOR_DEAD
  // --------------------------------------------------

  test("ANCHOR_DEAD → ANCHOR_NEW when anchor detected", () => {
    const state = nextAnchorState("ANCHOR_DEAD", input({ anchorDetected: true }))
    expect(state).toBe("ANCHOR_NEW")
  })

  test("ANCHOR_DEAD stays ANCHOR_DEAD when nothing detected", () => {
    const state = nextAnchorState("ANCHOR_DEAD", input({}))
    expect(state).toBe("ANCHOR_DEAD")
  })

  // --------------------------------------------------
  // COLLISION RULES (PRIORITY CHECK)
  // --------------------------------------------------

  test("vacuumForming overrides strengthening", () => {
    const state = nextAnchorState(
      "ANCHOR_ACTIVE",
      input({ anchorStrengthening: true, vacuumForming: true })
    )
    expect(state).toBe("ANCHOR_DEAD")
  })

  test("vacuumForming overrides weakening", () => {
    const state = nextAnchorState(
      "ANCHOR_FADING",
      input({ anchorWeakening: true, vacuumForming: true })
    )
    expect(state).toBe("ANCHOR_DEAD")
  })
})
