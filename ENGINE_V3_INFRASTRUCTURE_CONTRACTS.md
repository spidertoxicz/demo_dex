ENGINE V3 — INFRASTRUCTURE CONSTITUTION

CANONICAL · NON-ENGINE · DETERMINISM-CRITICAL

---

PRIME DIRECTIVE

Infrastructure exists to transport reality, not interpret it.

Infra moves data.
Engine produces truth.

Any infrastructure behavior that mutates, filters, delays, or reinterprets causal data is an ARCHITECTURAL VIOLATION.

---

ENGINE MEMBRANE (ABSOLUTE BOUNDARY)

INFRASTRUCTURE  → transports causal data  
ENGINE (L0–L6) → derives structural truth  
L7 → projects truth outward

Nothing interpretive may cross downward.
Nothing mechanical may cross upward.

---

AUTHORITATIVE CAUSAL FLOW

BOOTSTRAP (context only)

↓ runtime starts

RAW ON-CHAIN CAPTURE
↓
CANONICALIZATION
↓
ENGINE RUNTIME (deterministic dispatcher)
↓
ENGINE L0–L6
↓
L7 OBSERVABILITY

Physics MUST always precede orchestration.

Runtime is never causally superior to blockchain data.

---

TIME AUTHORITY — LOCKED

TIME_AUTHORITY = "BLOCK_ORDER"

Block sequence defines causality.

- The engine advances strictly by block order.
- "blockTimestamp" is descriptive metadata only.
- Timestamps MUST NEVER influence transitions.

Forbidden inside engine cognition:

- wall-clock time
- timers
- scheduling logic
- duration inference

Allowed usage:

Wall-clock time may be used only for:

- transport scheduling
- monitoring
- alert cadence
- L7 snapshot emission

Never for structure.

---

BOOTSTRAP (PRE-ENGINE) — LOCKED

Status: NOT ENGINE
Role: Define immutable runtime context.

---

Chain Context

BOOTSTRAP_CONTEXT = {
  chainId: number,
  networkName: string,
  rpcProvider: "ANKR",
  rpcUrl: string,
  finalityOffsetBlocks: number,
  maxReorgDepth: number
}

Hard Rules

- Engine MUST NOT process blocks newer than
  "latestBlock - finalityOffsetBlocks".

- Reorg depth ≤ finalityOffsetBlocks
  → automatic rewind + replay.

- Reorg depth > maxReorgDepth
  → CRITICAL HALT + manual intervention.

- Chain context MUST NOT mutate at runtime.

Determinism begins at bootstrap.

---

Universe Policy — LOCKED

Defines which pools enter the causal universe.

UNIVERSE_POLICY = {
  mode: "STATIC" | "DISCOVERY",
  staticPools?: string[],
  discoveryFactory?: string[],
  maxPools: number
}

Hard Rules

Universe MUST be deterministic.

Dynamic discovery MUST be:

- logged
- versioned
- replay-deterministic

Given identical block history →
the discovered universe MUST be identical.

Universe changes REQUIRE engine restart.

No hot mutation allowed.

---

MECHANICAL THRESHOLD LAW

Infrastructure may enforce thresholds only for runtime safety.

Allowed Purposes:

- backlog protection
- queue limits
- memory guards
- RPC safety
- backpressure

Mechanical thresholds MAY:

✅ pause the pipeline
✅ emit alerts
✅ trigger operator intervention

Mechanical thresholds MUST NEVER:

- filter events
- drop blocks
- reorder causality
- suppress data
- aggregate meaning
- influence structural interpretation

Mechanical thresholds may STOP the engine.
They must NEVER SHAPE the engine.

---

ENGINE RUNTIME (DETERMINISTIC DISPATCHER) — LOCKED

Status: NOT an intelligence layer
Role: Execute strictly ordered block processing.

Runtime is mechanical.

Never perceptive.

---

Block Cursor Contract

BLOCK_CURSOR = {
  lastProcessedBlock: number,
  lastProcessedHash: string,
  nextBlockToProcess: number
}

Hard Rules

- Exactly ONE block per engine tick.
- Blocks MUST NOT be skipped.
- If a block cannot be processed → engine PAUSES.
- Hash anchoring is mandatory for reorg safety.

Skipping blocks is a causal violation.

Pause instead.

Always.

---

Backpressure & Lag Policy

BACKPRESSURE_POLICY = {
  mode: "REPLAY_UNTIL_CAUGHT_UP",
  maxBacklogBlocks: number
}

Hard Rules

- Backlog MUST be replayed.
- Silent skipping is forbidden.

If backlog exceeds threshold:

→ Emit CRITICAL alert
→ Pause engine

Determinism is more important than liveness.

---

Deterministic Replay Contract — LOCKED

REPLAY_MODE = {
  enabled: true,
  source: "RAW_EVENT_LOG" | "CANONICAL_LOG",
  deterministic: true
}

Hard Rules

Identical canonical input MUST produce identical outputs.

Replay is a first-class capability — never optional.

Replay MUST NOT depend on wall-clock time.

Severity Rule

Replay divergence is a SEVERITY-1 ARCHITECTURAL FAILURE.

All feature work halts until determinism is restored.

---

RAW ON-CHAIN CAPTURE — LOCKED

Status: NOT ENGINE
Role: Block-atomic acquisition of chain reality.

Capture noise if it exists.
Reality is never filtered upstream.

---

Block Atomicity

For each block:

RAW_BLOCK_FRAME = {
  blockNumber,
  blockHash,
  parentHash,
  timestamp,
  logs[],
  receipts?,
  poolStateSnapshots[]
}

Hard Rules

- RAW MUST emit complete block frames.
- Partial emission is forbidden.
- "blockHash" + "parentHash" required for reorg detection.

---

Event Completeness

RAW MUST attempt to capture all critical pool mechanics:

- Swap
- Mint
- Burn
- Collect
- TickCross / Sync
- Slot0
- Liquidity

Missing critical events:

→ mark block INVALID

---

INVALID Block Policy

- INVALID blocks MUST NOT be normalized.
- Engine MUST NOT advance past an INVALID block.
- Retry is mandatory.
- Persistent failure → CRITICAL halt.

Forward motion without causality is forbidden.

---

Reorg Handling

On parent hash mismatch:

REORG_EVENT = {
  depth,
  affectedBlocks[]
}

Hard Rules

- Engine MUST rewind affected blocks.
- Canonical store MUST rewind.
- Engine state MUST rewind.
- Silent overwrite is forbidden.

History must remain reconstructible.

---

DATA CANONICALIZATION — LOCKED

Status: NOT ENGINE
Role: Deterministic transformation into stable schema.

Canonicalization removes transport randomness — not meaning.

---

Canonical Ordering

All events MUST be ordered by:

(blockNumber, txIndex, logIndex)

Hard Rules

- Arrival order is forbidden.
- Ordering MUST be deterministic across machines.
- Canonical stream MUST be replay-stable.

---

Unit Canonicalization

CANONICAL_UNITS = {
  amount0: bigint,
  amount1: bigint,
  liquidity: bigint,
  tick: number,
  sqrtPriceX96: bigint
}

Hard Rules

- NO floats
- NO decimals
- NO rounding

Preserve full precision.

Always.

---

Direction & Sign Convention

SIGN_CONVENTION = {
  amount0: poolPerspective,
  amount1: poolPerspective,
  liquidityDelta: signed
}

Hard Rules

Global consistency is mandatory.

Sign ambiguity destroys structural interpretation.

---

Missing Data Policy

NO INTERPOLATION. EVER.

If raw data is corrupt or missing:

→ mark block INVALID
→ retry or halt

Synthetic data is structural poison.

---

INFRASTRUCTURE PRIME LAW

Infrastructure components are mechanical.

They MUST NOT:

- interpret structure
- prioritize signals
- detect regimes
- infer intent
- compress meaning

If infrastructure starts to "look smart,"
the engine is already being corrupted.

---

FINAL CONSTITUTIONAL LOCK

Infrastructure protects causality so the engine can perceive reality.

The chain defines events.
Infra transports them faithfully.
The engine derives truth.

Never invert this order.

Systems that mutate causality drift into fiction.
