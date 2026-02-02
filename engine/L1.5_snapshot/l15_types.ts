// l15_types.ts

// ==============================
// SEMANTIC ENUMS (LOCKED)
// ==============================

export type LiquidityDominance =
  | "DOMINANT_ABOVE"
  | "DOMINANT_BELOW"
  | "BALANCED"
  | "NONE";

export type RangeStructure =
  | "BOUNDED"
  | "UNBOUNDED"
  | "NONE";

// ==============================
// BAND SNAPSHOT TYPES
// ==============================

export interface BandLiquiditySnapshot {
  liquidity: bigint;        // absolute presence (numeric, read-only)
  netLiquidity: bigint;     // signed (numeric, read-only)

  // semantic geometry (NEW)
  dominance?: LiquidityDominance;     // near / far
  rangeStructure?: RangeStructure;    // mid only
}

// ==============================
// L1.5 SNAPSHOT FRAME
// ==============================

export interface L15SnapshotFrame {
  blockNumber: number;
  poolAddress: string;
  currentTick: number;

  bands: {
    near: BandLiquiditySnapshot;
    mid: BandLiquiditySnapshot;
    far: BandLiquiditySnapshot;
  };
}
