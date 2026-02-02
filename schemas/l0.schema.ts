// l0.schema.ts
// AUTHORITATIVE ENGINE ENTRY CONTRACT
// This is the ONLY legal entry to the engine

import { CanonicalPoolBatch } from "./canonical.schema";

// ----------- L0 Block Frame -----------

export type L0BlockFrame = {
  blockNumber: number;
  blockTimestamp: number;

  pools: L0PoolFrame[];
};

// ----------- L0 Pool Frame -----------

export type L0PoolFrame = {
  poolAddress: string;

  // Minimal packed state
  pool: {
    tick: number;
    sqrtPriceX96: bigint;
    liquidity: bigint;
  };

  swaps: L0Swap[];
  lpAdds: L0LPDelta[];
  lpRemoves: L0LPDelta[];
  collects: L0Collect[];
  tickCrosses: L0TickCross[];
};

// ----------- L0 Event Types -----------

export type L0Swap = {
  amount0: bigint;
  amount1: bigint;
};

export type L0LPDelta = {
  tickLower: number;
  tickUpper: number;
  liquidityDelta: bigint; // + add, - remove
};

export type L0Collect = {
  amount0: bigint;
  amount1: bigint;
};

export type L0TickCross = {
  tickIndex: number;
  liquidityNet: bigint;
};

// ----------- L0 Intake Rules (LOCKED) -----------

// One L0BlockFrame == exactly one block
// Partial frames are REJECTED
// Duplicate blockNumbers are DROPPED
// Out-of-order blocks are REJECTED

// ----------- Helper Mapping Contract -----------

// Canonical → L0 mapping MUST:
// - Merge MINT + BURN into lpAdds / lpRemoves
// - Strip tx/log metadata
// - Preserve sign conventions
// - Preserve block atomicity

export type CanonicalToL0Mapper = (
  canonical: CanonicalPoolBatch
) => L0PoolFrame;
