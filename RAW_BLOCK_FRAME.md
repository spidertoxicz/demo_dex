RAW_BLOCK_FRAME — CAUSAL CONTRACT

ENGINE V3 — INFRASTRUCTURE PHYSICS LAYER

Status: LOCKED — FOUNDATIONAL SCHEMA

---

PRIME DIRECTIVE

"RAW_BLOCK_FRAME" represents an exact, block-atomic capture of on-chain reality.

It must preserve causality, ordering potential, and replay fidelity.

RAW does not interpret.
RAW does not normalize.
RAW does not filter.

It captures reality — including noise.

---

SCHEMA VERSION

schemaVersion: 1

Schema MUST be versioned from inception.

Future changes REQUIRE migration strategy.

Never silent mutation.

---

RAW_BLOCK_FRAME STRUCTURE

type RAW_BLOCK_FRAME = {
  schemaVersion: 1

  block: {
    number: number
    hash: string
    parentHash: string
    timestamp: number
  }

  transactions: RAW_TRANSACTION_FRAME[]

  logs: RAW_LOG_FRAME[]

  receipts?: RAW_RECEIPT_FRAME[]

  poolStateSnapshots?: RAW_POOL_STATE_FRAME[]

  captureMeta: {
    rpcProvider: string
    capturedAtWallClock: number
  }
}

---

FIELD PHILOSOPHY

block (CAUSAL ANCHOR — CRITICAL)

block: {
  number: number
  hash: string
  parentHash: string
  timestamp: number
}

Hard Laws:

- "number + hash + parentHash" form the causal fingerprint.
- These fields MUST never be optional.
- Timestamp is descriptive metadata only.
- Timestamp MUST NEVER influence engine transitions.

If hash integrity is broken → replay integrity is broken.

---

transactions (ORDER CARRIER)

type RAW_TRANSACTION_FRAME = {
  txHash: string
  txIndex: number
  from: string
  to?: string
  value: string
  input: string
}

Why transactions exist in RAW:

NOT for interpretation.

But because:

👉 "txIndex" is required for deterministic log ordering.

Never depend on RPC arrival order.

---

logs (PRIMARY EVENT REALITY)

type RAW_LOG_FRAME = {
  logIndex: number
  txIndex: number
  txHash: string
  address: string
  topics: string[]
  data: string
  removed?: boolean
}

Hard Laws:

- Logs MUST remain undecoded.
- No ABI parsing in RAW.
- No event labeling.
- No swap detection.
- No mint/burn inference.

Decoding belongs to canonicalization.

RAW preserves mechanical truth only.

---

receipts (OPTIONAL BUT PREFERRED)

type RAW_RECEIPT_FRAME = {
  txHash: string
  status: number
  gasUsed: string
  cumulativeGasUsed: string
}

Optional — but recommended for:

- forensic replay
- failure diagnosis
- deep audits

Never required for engine cognition.

---

poolStateSnapshots (OPTIONAL — HIGH VALUE)

type RAW_POOL_STATE_FRAME = {
  poolAddress: string
  liquidity: string
  sqrtPriceX96: string
  tick: number
}

Important:

Snapshot is NOT interpretation.

It is a mechanical read.

Allowed ONLY if sourced directly from chain state at that block.

Forbidden:

❌ derived values
❌ ratios
❌ reconstructed liquidity

Reality only.

---

captureMeta (TRANSPORT METADATA)

captureMeta: {
  rpcProvider: string
  capturedAtWallClock: number
}

Used for:

- infra diagnostics
- latency analysis
- provider audits

MUST NEVER enter engine cognition.

Ever.

---

BLOCK ATOMICITY LAW

Each "RAW_BLOCK_FRAME" MUST represent a complete block capture.

Forbidden:

❌ partial emission
❌ streaming fragments
❌ incremental log delivery

If capture is incomplete:

→ Block MUST be marked INVALID upstream.
→ Engine MUST NOT advance.

Forward motion without causality is structural fiction.

---

REORG COMPATIBILITY LAW

RAW MUST support rewind.

Required invariant:

parentHash(previous) === hash(current)

Mismatch triggers reorg protocol.

Never overwrite history silently.

History must remain reconstructible.

---

ORDERING LAW

RAW does NOT enforce final ordering.

But it MUST provide the primitives required for deterministic ordering:

(blockNumber, txIndex, logIndex)

If these exist → canonicalization can guarantee replay.

If they do not → determinism collapses.

---

FLOATING-POINT PROHIBITION

RAW MUST NEVER emit floating numbers.

Allowed:

✅ integers
✅ bigint-compatible strings
✅ hex

Forbidden:

❌ float
❌ decimal rounding

Precision loss is replay poison.

---

INFRASTRUCTURE NON-INTERPRETATION LAW

RAW components MUST NOT:

- decode events
- classify swaps
- infer LP intent
- detect regimes
- filter "irrelevant" logs

If RAW starts looking intelligent —
the engine is already being corrupted.

---

INVALID BLOCK POLICY

A block is INVALID if:

- critical logs are missing
- RPC truncates data
- hash integrity fails

INVALID blocks MUST NOT proceed downstream.

Retry first.
Halt if unresolved.

Never fabricate continuity.

---

DETERMINISM GUARANTEE

Given identical chain history:

RAW_BLOCK_FRAME emission MUST be identical.

Not similar.
Not close.

Identical.

Replay begins here.

---

FINAL CONSTITUTIONAL LOCK

RAW is the boundary between blockchain physics and engine perception.

If this layer lies —
every layer above it hallucinates.

Protect it accordingly.
