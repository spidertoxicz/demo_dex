// canonical.schema.ts
// AUTHORITATIVE CANONICAL CONTRACT — INFRA ONLY
// Deterministic transform of RAW → CANONICAL
// Any deviation = ARCHITECTURAL VIOLATION

// ----------- Canonical Block Batch -----------

export type CanonicalBlockBatch = {
  blockNumber: number;
  blockHash?: string;
  parentHash?: string;
  blockTimestamp: number;

  pools: CanonicalPoolBatch[];
};

// One entry per pool per block
export type CanonicalPoolBatch = {
  poolAddress: string;

  poolState: CanonicalPoolState;

  swaps: CanonicalSwap[];
  mints: CanonicalMint[];
  burns: CanonicalBurn[];
  collects: CanonicalCollect[];
  tickCrosses: CanonicalTickCross[];
};

// ----------- Canonical Pool State -----------

export type CanonicalPoolState = {
  tick: number;
  sqrtPriceX96: bigint;
  liquidity: bigint;
};

// ----------- Canonical Event Base -----------

export type CanonicalEventBase = {
  blockNumber: number;
  txHash: string;
  txIndex: number;
  logIndex: number;
};

// Ordering rule (LOCKED):
// sort by (blockNumber, txIndex, logIndex)

// ----------- Swap -----------

export type CanonicalSwap = CanonicalEventBase & {
  type: "SWAP";

  // Pool-perspective signed amounts
  amount0: bigint;   // + = pool receives token0, - = pool sends token0
  amount1: bigint;   // + = pool receives token1, - = pool sends token1

  tickAfter: number;
  sqrtPriceX96After: bigint;
};

// ----------- Mint (LP Add) -----------

export type CanonicalMint = CanonicalEventBase & {
  type: "MINT";

  owner: string;
  tickLower: number;
  tickUpper: number;

  liquidityDelta: bigint; // + liquidity
};

// ----------- Burn (LP Remove) -----------

export type CanonicalBurn = CanonicalEventBase & {
  type: "BURN";

  owner: string;
  tickLower: number;
  tickUpper: number;

  liquidityDelta: bigint; // - liquidity
};

// ----------- Collect -----------

export type CanonicalCollect = CanonicalEventBase & {
  type: "COLLECT";

  owner: string;

  amount0: bigint;
  amount1: bigint;
};

// ----------- Tick Cross -----------

export type CanonicalTickCross = CanonicalEventBase & {
  type: "TICK_CROSS";

  tickIndex: number;
  liquidityNet: bigint;   // signed liquidity net change
};

// ----------- Canonical Batch Status -----------

export type CanonicalBatchStatus = "VALID" | "INVALID";

export type CanonicalBlockEnvelope = {
  batch: CanonicalBlockBatch;
  status: CanonicalBatchStatus;
  invalidReason?: string;
};
