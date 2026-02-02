// raw.schema.ts
// AUTHORITATIVE RAW CONTRACT — INFRA ONLY
// Any deviation = ARCHITECTURAL VIOLATION

export type RawBlockFrame = {
  blockNumber: number;
  blockHash: string;
  parentHash: string;
  blockTimestamp: number;

  logs: RawLog[];
  receipts?: RawReceipt[];

  // Per-pool state snapshot at block
  poolStates: RawPoolState[];
};

export type RawLog = {
  address: string;        // contract address
  topics: string[];
  data: string;
  txHash: string;
  txIndex: number;
  logIndex: number;
};

export type RawReceipt = {
  txHash: string;
  status: number;
  gasUsed: bigint;
};

export type RawPoolState = {
  poolAddress: string;

  // Uniswap V3 style state
  tick: number;
  sqrtPriceX96: bigint;
  liquidity: bigint;

  // Optional for debugging / integrity
  blockNumber: number;
};

export type RawSwapLog = RawLog;
export type RawMintLog = RawLog;
export type RawBurnLog = RawLog;
export type RawCollectLog = RawLog;
export type RawTickCrossLog = RawLog;

// Raw block validity marker
export type RawBlockStatus = "VALID" | "INVALID";

export type RawBlockEnvelope = {
  frame: RawBlockFrame;
  status: RawBlockStatus;
  invalidReason?: string;
};
