RAW_BLOCK_FRAME.schema.ts

ENGINE V3 — ATOMIC REALITY CONTAINER

Status: LOCKED · LOSSLESS · IMMUTABLE

This schema defines the complete, unfiltered capture of on-chain block reality before any normalization occurs.

RAW is not interpretation.
RAW is not structure.
RAW is not intelligence.

RAW is evidence.

If reality is noisy — capture the noise.
If reality is chaotic — capture the chaos.

Filtering belongs downstream.

---

PRIME DIRECTIVE

A RAW block frame must allow the engine to reconstruct blockchain reality exactly as it occurred.

No inference.
No interpolation.
No omission.

Losslessness is mandatory.

---

TYPE DEFINITION

// RAW_BLOCK_FRAME.schema.ts

export type RAWBlockFrame = Readonly<{

  // --- Block Identity ---
  blockNumber: number
  blockHash: string
  parentHash: string

  // --- Temporal Anchor (NOT engine time authority) ---
  timestamp: number

  // --- Execution Evidence ---
  logs: ReadonlyArray<RawLogEvent>
  receipts?: ReadonlyArray<RawTransactionReceipt>

  // --- Optional Pool Snapshots ---
  // Captured only if atomically available.
  // NEVER synthesized later.
  poolStateSnapshots?: ReadonlyArray<RawPoolSnapshot>

}>

---

SUB-TYPES

RawLogEvent

export type RawLogEvent = Readonly<{
  address: string
  topics: ReadonlyArray<string>
  data: string

  logIndex: number
  transactionIndex: number
  transactionHash: string

  removed?: boolean // MUST exist for reorg-aware providers
}>

---

RawTransactionReceipt

export type RawTransactionReceipt = Readonly<{
  transactionHash: string
  transactionIndex: number

  status?: number
  gasUsed?: bigint
  cumulativeGasUsed?: bigint

  logs: ReadonlyArray<RawLogEvent>
}>

---

RawPoolSnapshot

export type RawPoolSnapshot = Readonly<{
  poolAddress: string

  liquidity?: bigint
  sqrtPriceX96?: bigint
  tick?: number

  token0Balance?: bigint
  token1Balance?: bigint
}>

---

HARD INVARIANTS

INVARIANT 1 — BLOCK IDENTITY IS SACRED

The tuple:

(blockNumber, blockHash, parentHash)

Defines causal position.

Rules:

- blockHash MUST match provider output.
- parentHash MUST be preserved for reorg detection.
- Hashes must NEVER be recomputed.

Numbers locate.
Hashes verify.

---

INVARIANT 2 — RAW IS LOSSLESS

Forbidden:

- event filtering
- deduplication
- ordering corrections
- structure inference
- decoding assumptions

RAW must remain provider-authentic.

Normalization happens later — never here.

---

INVARIANT 3 — ARRIVAL ORDER IS IRRELEVANT

Even if RPC delivers data out of order:

RAW must preserve what was received.

Canonicalization will establish deterministic ordering.

Do not “fix” reality prematurely.

---

INVARIANT 4 — NO FLOATING POINTS

Forbidden:

number (for token amounts)
float
decimal

Allowed:

bigint
hex
string

Precision loss is permanent corruption.

---

INVARIANT 5 — OPTIONAL DOES NOT MEAN SYNTHETIC

If a provider fails to supply:

- receipts
- pool snapshots

The engine must NOT fabricate them later.

Missing data must remain visibly missing.

Truth includes absence.

---

INVARIANT 6 — IMMUTABILITY

RAWBlockFrame must be treated as:

«Write once. Read forever.»

Forbidden:

- mutation
- enrichment
- patching
- retroactive edits

If corruption occurs:

Discard and recapture.

Never repair silently.

---

INVARIANT 7 — REORG VISIBILITY

If the provider marks logs as removed:

The flag MUST be preserved.

Reorg awareness begins at RAW.

Do not compress this signal.

---

INVARIANT 8 — ATOMIC CAPTURE

A RAW block frame must represent a complete capture attempt for that block.

Partial frames are forbidden from entering canonicalization.

If completeness cannot be guaranteed:

Mark the block INVALID upstream.

Retry capture.

Never pass uncertainty forward.

---

FORBIDDEN DESIGN PATTERNS

Immediately reject any proposal that adds:

- decoded swap direction
- interpreted liquidity delta
- derived tick movement
- structural hints
- lifecycle signals

Those belong to cognition layers.

RAW must remain intellectually blind.

---

MEMORY & STORAGE GUIDANCE

RAW should be stored in append-only fashion.

Recommended pattern:

/raw_blocks/{blockNumber}.json

Never overwrite history.

Historical RAW is replay gold.

---

RELATION TO ENGINE PHYSICS

RAW exists BELOW cognition.

It must remain free from:

- lifecycle bias
- structural interpretation
- probabilistic filtering

Think of RAW as:

«Blockchain thermodynamics.»

Meaning emerges later.

---

FAILURE PHILOSOPHY

When in doubt:

Capture more — not less.

Disk is cheap.
Replay integrity is priceless.

---

FINAL CONSTITUTIONAL STATEMENT

RAW_BLOCK_FRAME is the engine’s memory of reality.

If this memory is incomplete, altered, or inferred:

The engine stops being deterministic.

Capture reality exactly once.
Preserve it forever.
Interpret it only downstream.
