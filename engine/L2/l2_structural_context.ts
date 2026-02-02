// /engine/l2/l2_structural_context.ts

import { L1PhysicsFrame } from "../l1/l1_types";
import { L15SnapshotFrame } from "../l1_5/l15_types";

export type AheadVsBehind = "AHEAD" | "BEHIND" | "NEUTRAL";

export interface L2StructuralFlags {
  // Anchor related
  anchorDetected: boolean;
  anchorStrengthening: boolean;
  anchorWeakening: boolean;

  // Range related
  rangeDetected: boolean;
  rangeDefenseActive: boolean;
  rangeWeakening: boolean;
  rangeAbandoned: boolean;

  // Structural physics context
  absorptionPresent: boolean;
  vacuumForming: boolean;

  // Positional context
  aheadVsBehind: AheadVsBehind;
}

/**
 * L2 — Structural Context Interpreter
 * LOCKED — ENUM CONSUMER ONLY
 */
export function interpretL2StructuralContext(
  l1: L1PhysicsFrame,
  l15: L15SnapshotFrame
): L2StructuralFlags {

  // ===============================
  // Structural Physics Context
  // ===============================

  const absorptionPresent =
    l1.swapFlow.dominantSide !== "NONE" &&
    (l1.liquidityDelta.activeLiquidityDelta === "STABLE" ||
     l1.liquidityDelta.activeLiquidityDelta === "INCREASE");

  const vacuumForming =
    l1.liquidityDelta.activeLiquidityDelta === "DECREASE" &&
    !absorptionPresent;

  // ===============================
  // Anchor (Near Band)
  // ===============================

  const anchorDetected =
    l15.bands.near.dominance !== "NONE";

  const anchorStrengthening =
    anchorDetected &&
    l1.lpFlow.netLPDelta === "INCREASE";

  const anchorWeakening =
    anchorDetected &&
    l1.lpFlow.netLPDelta === "DECREASE";

  // ===============================
  // Range (Mid Band)
  // ===============================

  const rangeDetected =
    l15.bands.mid.rangeStructure === "BOUNDED";

  const rangeDefenseActive =
    rangeDetected && absorptionPresent;

  const rangeWeakening =
    rangeDetected && anchorWeakening;

  const rangeAbandoned =
    vacuumForming && !rangeDetected;

  // ===============================
  // Ahead vs Behind (ENUM ONLY)
  // ===============================

  let aheadVsBehind: AheadVsBehind = "NEUTRAL";

  if (l1.priceDelta.direction === "UP") {
    if (l15.bands.far.dominance === "DOMINANT_ABOVE") {
      aheadVsBehind = "AHEAD";
    } else if (l15.bands.near.dominance === "DOMINANT_BELOW") {
      aheadVsBehind = "BEHIND";
    }
  }

  if (l1.priceDelta.direction === "DOWN") {
    if (l15.bands.far.dominance === "DOMINANT_BELOW") {
      aheadVsBehind = "AHEAD";
    } else if (l15.bands.near.dominance === "DOMINANT_ABOVE") {
      aheadVsBehind = "BEHIND";
    }
  }

  // ===============================
  // FINAL — CANONICAL FLAGS
  // ===============================

  return {
    anchorDetected,
    anchorStrengthening,
    anchorWeakening,

    rangeDetected,
    rangeDefenseActive,
    rangeWeakening,
    rangeAbandoned,

    absorptionPresent,
    vacuumForming,

    aheadVsBehind,
  };
}
