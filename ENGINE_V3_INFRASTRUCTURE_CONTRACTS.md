ENGINE V3 — INFRASTRUCTURE CONTRACTS (LOCKED)
AUTHORITATIVE SOURCE OF TRUTH
This file defines ALL NON-ENGINE contracts.
Any deviation is ARCHITECTURAL VIOLATION.
These rules protect engine determinism and structural integrity.

High-Level Execution Flow (Authoritative)

BOOTSTRAP (Pre-Engine)
  ↓
ENGINE RUNTIME (Orchestrator)
  ↓
RAW ON-CHAIN CAPTURE (ANKR Polling)
  ↓
DATA NORMALIZATION (Canonicalizer)

This reflects real blockchain physics + engine contract boundaries.
1. BOOTSTRAP (Pre-Engine) — LOCKED
Status: ❌ NOT ENGINE
Role: Define runtime context & safety boundaries.
1.1 Chain Context (LOCKED)
BOOTSTRAP MUST define:
Salin kode

BOOTSTRAP_CONTEXT = {
  chainId: number,
  networkName: string,
  rpcProvider: "ANKR",
  rpcUrl: string,
  finalityOffsetBlocks: number,
  maxReorgDepth: number
}
Hard Rules:
Engine MUST NOT process blocks newer than: latestBlock - finalityOffsetBlocks
Reorg deeper than maxReorgDepth: → FULL ENGINE HALT + MANUAL INTERVENTION
Chain context MUST NOT change at runtime.
1.2 Universe Policy (LOCKED)
Defines which pools/pairs are processed.
Salin kode

UNIVERSE_POLICY = {
  mode: "STATIC" | "DISCOVERY",
  staticPools?: string[],
  discoveryFactory?: string[],
  maxPools: number
}
Hard Rules:
Universe MUST be deterministic.
Dynamic discovery MUST be logged + versioned.
Universe changes REQUIRE engine restart.
1.3 Time Authority (LOCKED)
Salin kode

TIME_AUTHORITY = "BLOCK_TIME"
Hard Rules:
All engine time = blockTimestamp
Wall-clock time ONLY allowed for L7 snapshots
No engine logic may reference Date.now()
2. ENGINE RUNTIME (Orchestrator) — LOCKED
Status: ❌ NOT ENGINE LAYER
Role: Deterministic pipeline runner.
2.1 Block Cursor Contract
Salin kode

BLOCK_CURSOR = {
  lastProcessedBlock: number,
  nextBlockToProcess: number
}
Hard Rules:
Exactly one block processed per engine tick.
No skipping blocks unless explicitly marked as DROPPED.
All block processing is sequential.
2.2 Backpressure & Lag Policy (LOCKED)
If RPC lag or backlog:
Salin kode

BACKPRESSURE_POLICY = {
  mode: "REPLAY_UNTIL_CAUGHT_UP",
  maxBacklogBlocks: number
}
Hard Rules:
Engine MUST replay backlog.
Engine MUST NOT skip blocks silently.
If backlog > maxBacklogBlocks: → EMIT CRITICAL ALERT + PAUSE
2.3 Deterministic Replay Contract (LOCKED)
Salin kode

REPLAY_MODE = {
  enabled: true,
  source: "RAW_EVENT_LOG" | "CANONICAL_LOG",
  deterministic: true
}
Hard Rules:
Given same canonical input → engine MUST produce same output.
Replay is first-class, not optional.
Replay MUST NOT depend on wall-clock.
3. RAW ON-CHAIN CAPTURE (ANKR Polling) — LOCKED
Status: ❌ NOT ENGINE
Role: Block-atomic raw data acquisition.
3.1 Block Atomicity (LOCKED)
For each block N:
RAW MUST emit:
Salin kode

RAW_BLOCK_FRAME = {
  blockNumber,
  blockHash,
  parentHash,
  timestamp,
  logs[],
  receipts?,
  poolStateSnapshots[]
}
Hard Rules:
RAW MUST be complete per block.
Partial block emission = VIOLATION.
RAW MUST include blockHash + parentHash for reorg detection.
3.2 Event Completeness (LOCKED)
RAW MUST attempt to capture:
Swap
Mint
Burn
Collect
TickCross / Sync
Slot0
Liquidity
Hard Rules:
Missing critical event types: → RAW_BLOCK_FRAME marked INVALID
INVALID blocks MUST NOT be normalized.
3.3 Reorg Handling (LOCKED)
If parentHash mismatch:
Salin kode

REORG_EVENT = {
  depth,
  affectedBlocks[]
}
Hard Rules:
Engine MUST rollback affected blocks.
Canonical + engine state MUST rewind.
No silent overwrite allowed.
4. DATA NORMALIZATION (Canonicalizer) — LOCKED
Status: ❌ NOT ENGINE
Role: Deterministic transform to canonical schema.
4.1 Canonical Ordering (LOCKED)
All canonical events MUST be ordered by:
Salin kode

(blockNumber, txIndex, logIndex)
Hard Rules:
Arrival order is forbidden.
Canonical stream MUST be stable & replayable.
4.2 Unit Canonicalization (LOCKED)
Salin kode

CANONICAL_UNITS = {
  amount0: bigint,
  amount1: bigint,
  liquidity: bigint,
  tick: number,
  sqrtPriceX96: bigint
}
Hard Rules:
NO floats
NO decimals
NO rounding
Preserve full precision
4.3 Direction & Sign Convention (LOCKED)
Salin kode

SIGN_CONVENTION = {
  amount0: pool perspective,
  amount1: pool perspective,
  liquidityDelta: signed (+ add, - remove)
}
Hard Rules:
Sign meaning MUST be globally consistent.
Swap direction MUST be canonical across all pools.
4.4 Missing Data Policy (LOCKED)
Hard Rule:
NO INTERPOLATION. EVER.
If missing or corrupt raw data:
Canonicalizer MUST mark block INVALID.
INVALID blocks MUST NOT enter L0.
Orchestrator MUST retry or halt.

