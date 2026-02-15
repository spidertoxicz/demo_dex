CANONICAL_EVENT.schema.ts

ENGINE V3 — DETERMINISTIC EVENT LAW

Status: LOCKED · ORDERED · REPLAYABLE

This schema defines the deterministic representation of on-chain events after RAW capture.

Canonicalization transforms:

Provider-dependent data
→ Deterministic engine-consumable truth

No interpretation occurs here.
Only ordering, normalization, and unit stabilization.

---

PRIME DIRECTIVE

Every canonical event must satisfy:

- Globally ordered
- Replay stable
- Lossless relative to RAW
- Structurally neutral

Canonicalization removes randomness.
It does not add meaning.

---

TYPE DEFINITION

// CANONICAL_EVENT.schema.ts

export type CanonicalEvent = Readonly<{

  // --- Causal Ordering ---
  blockNumber: number
  blockHash: string

  transactionIndex: number
  logIndex: number

  // --- Identity ---
  transactionHash: string
  address: string

  // --- Event Classification ---
  eventType: CanonicalEventType

  // --- Normalized Payload ---
  payload: CanonicalPayload

}>

---

CANONICAL ORDERING RULE

Events MUST be sorted strictly by:

(blockNumber, transactionIndex, logIndex)

Arrival order is forbidden.

Any deviation breaks replay determinism.

---

EVENT TYPE ENUM

export type CanonicalEventType =
  | "SWAP"
  | "MINT"
  | "BURN"
  | "COLLECT"
  | "SYNC"
  | "TICK_UPDATE"
  | "POOL_STATE"
  | "UNKNOWN"

Rules:

- Types must be explicit.
- No heuristic classification.
- If decoding fails → use "UNKNOWN".
- Never guess.

---

CANONICAL PAYLOAD

Payload must use deterministic, lossless units.

export type CanonicalPayload =
  | CanonicalSwap
  | CanonicalMint
  | CanonicalBurn
  | CanonicalCollect
  | CanonicalSync
  | CanonicalTickUpdate
  | CanonicalPoolState
  | CanonicalUnknown

---

PAYLOAD DEFINITIONS

All numeric fields MUST be:

- bigint
- signed when directional
- full precision
- no floats
- no decimals
- no rounding

---

SWAP

export type CanonicalSwap = Readonly<{
  amount0: bigint   // pool perspective
  amount1: bigint   // pool perspective

  sqrtPriceX96: bigint
  liquidity: bigint
  tick: number
}>

Sign convention MUST be globally consistent.

---

MINT

export type CanonicalMint = Readonly<{
  liquidityDelta: bigint  // positive
  tickLower: number
  tickUpper: number
}>

---

BURN

export type CanonicalBurn = Readonly<{
  liquidityDelta: bigint  // negative
  tickLower: number
  tickUpper: number
}>

---

COLLECT

export type CanonicalCollect = Readonly<{
  amount0: bigint
  amount1: bigint
}>

---

SYNC

export type CanonicalSync = Readonly<{
  reserve0: bigint
  reserve1: bigint
}>

---

TICK UPDATE

export type CanonicalTickUpdate = Readonly<{
  tick: number
  liquidityGross?: bigint
  liquidityNet?: bigint
}>

---

POOL STATE

export type CanonicalPoolState = Readonly<{
  liquidity: bigint
  sqrtPriceX96: bigint
  tick: number
}>

---

UNKNOWN

export type CanonicalUnknown = Readonly<{
  rawData: string
  topics: ReadonlyArray<string>
}>

UNKNOWN events must still preserve:

- ordering
- identity
- replay integrity

Never discard undecodable events.

---

HARD INVARIANTS

INVARIANT 1 — ORDER IS LAW

CanonicalEvent sequence must be stable across:

- live runtime
- replay mode
- multi-node environments

Sorting must be deterministic.

---

INVARIANT 2 — NO STRUCTURAL INTERPRETATION

Forbidden inside canonicalization:

- lifecycle detection
- LP behavior inference
- vacuum/wall classification
- anchor detection

Canonicalization prepares truth.

It does not understand truth.

---

INVARIANT 3 — NO FLOATS EVER

Any introduction of float values is architectural corruption.

All numeric blockchain values MUST remain bigint.

---

INVARIANT 4 — NO EVENT DROPPING

Events must never be silently filtered.

Even irrelevant events must be preserved.

Filtering belongs downstream — if ever.

---

INVARIANT 5 — HASH ANCHORING

blockHash must be preserved in every event.

Canonical events must remain verifiable against RAW.

---

INVARIANT 6 — IMMUTABILITY

CanonicalEvent must be treated as immutable once emitted.

No mutation.

No enrichment.

No correction.

If canonicalization fails:

→ Reject block.
→ Retry from RAW.

Never patch.

---

RELATION TO ENGINE PHYSICS

Canonical events are:

- ordered
- typed
- unit-stabilized

They are NOT:

- structural
- behavioral
- lifecycle-aware

Meaning begins at L2.

Never before.

---

STORAGE RECOMMENDATION

Canonical blocks should be stored append-only:

/canonical_blocks/{blockNumber}.json

This ensures:

- replay determinism
- audit traceability
- state verification

---

FAILURE POLICY

If any canonical invariant fails:

- Reject block
- Emit critical error
- Halt forward progression

Do not guess.

Do not partially canonicalize.

Do not continue.

---

FINAL CONSTITUTIONAL STATEMENT

Canonicalization converts chaos into law.

It does not add meaning.
It does not filter intent.
It does not infer structure.

It creates a single, replayable, deterministic timeline.

All cognition depends on its purity.

Protect it accordingly.
