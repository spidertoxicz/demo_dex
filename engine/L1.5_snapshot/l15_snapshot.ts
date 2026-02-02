// l15_snapshot.ts

import {
  L15SnapshotFrame,
  BandLiquiditySnapshot,
  LiquidityDominance,
  RangeStructure,
} from "./l15_types";

// ==============================
// SEMANTIC MAPPERS (PURE)
// ==============================

function mapLiquidityDominance(
  band: BandLiquiditySnapshot
): LiquidityDominance {
  if (band.liquidity === 0n) return "NONE";
  if (band.netLiquidity > 0n) return "DOMINANT_ABOVE";
  if (band.netLiquidity < 0n) return "DOMINANT_BELOW";
  return "BALANCED";
}

function mapRangeStructure(
  band: BandLiquiditySnapshot
): RangeStructure {
  if (band.liquidity === 0n) return "NONE";
  if (band.netLiquidity === 0n) return "BOUNDED";
  return "UNBOUNDED";
}

// ==============================
// SNAPSHOT GENERATOR
// ==============================

export function generateL15Snapshot(
  blockNumber: number,
  poolAddress: string,
  currentTick: number,
  bands: {
    near: BandLiquiditySnapshot;
    mid: BandLiquiditySnapshot;
    far: BandLiquiditySnapshot;
  }
): L15SnapshotFrame {

  // attach semantic geometry (NO NUMERIC LOGIC HERE)
  const near: BandLiquiditySnapshot = {
    ...bands.near,
    dominance: mapLiquidityDominance(bands.near),
  };

  const far: BandLiquiditySnapshot = {
    ...bands.far,
    dominance: mapLiquidityDominance(bands.far),
  };

  const mid: BandLiquiditySnapshot = {
    ...bands.mid,
    rangeStructure: mapRangeStructure(bands.mid),
  };

  return {
    blockNumber,
    poolAddress,
    currentTick,
    bands: {
      near,
      mid,
      far,
    },
  };
}
