CANONICAL_BLOCK_FRAME — DETERMINISTIC CONTRACT

ENGINE V3 — ORDERED REALITY LAYER

Status: LOCKED — REPLAY-CRITICAL SCHEMA

---

PRIME DIRECTIVE

"CANONICAL_BLOCK_FRAME" represents a deterministically ordered, replay-stable transformation of RAW blockchain data.

Canonical removes transport randomness.

Canonical does NOT create meaning.

Canonical does NOT interpret structure.

Canonical establishes causal order so the engine can perceive reality safely.

---

SCHEMA VERSION

schemaVersion: 1

Versioning is mandatory from inception.

Silent schema mutation is forbidden.

---

CANONICAL BLOCK STRUCTURE

type CANONICAL_BLOCK_FRAME = {
  schemaVersion: 1

  block: {
    number: number
    hash: string
    parentHash: string
    timestamp: number
  }

  events: CANONICAL_EVENT[]

  canonicalMeta: {
    ordered: true
    sourceBlockHash: string
    rawSchemaVersion: number
  }
}

---

CAUSAL ANCHOR (BLOCK)

Copied directly from RAW without mutation.

Hard Laws:

- Block fields MUST match RAW exactly.
- No transformation allowed.
- Timestamp remains descriptive metadata only.

If block identity mutates → replay collapses.

---

CANONICAL EVENT STRUCTURE

type CANONICAL_EVENT = {
  eventId: string

  blockNumber: number
  blockHash: string

  txIndex: number
  logIndex: number

  txHash: string
  address: string

  topics: string[]
  data: string

  removed: boolean
}

---

EVENT ID LAW (VERY IMPORTANT)

eventId = hash(blockHash + txIndex + logIndex)

Why this matters:

- Guarantees uniqueness
- Enables forensic replay
- Allows deterministic deduplication
- Prevents double-processing

Never rely on provider IDs.

Generate your own.

---

ORDERING LAW — ABSOLUTE

Events MUST be sorted strictly by:

(blockNumber, txIndex, logIndex)

Hard Rules:

- Arrival order is forbidden.
- Stable sorting algorithm REQUIRED.
- Non-deterministic sorting is a SEVERITY-1 failure.

Given identical RAW input → ordering MUST be identical.

Always.

---

NON-INTERPRETATION LAW

Canonical MUST NOT:

- decode ABI
- classify swaps
- label mint/burn
- detect liquidity intent
- infer LP behavior
- compute ratios
- aggregate events

If Canonical appears intelligent — architecture is being violated.

Meaning begins at L2.

Never earlier.

---

FLOATING-POINT PROHIBITION

Allowed:

✅ integers
✅ bigint-compatible strings
✅ hex

Forbidden:

❌ floats
❌ decimals
❌ rounding

Precision loss destroys replay integrity.

---

INVALID BLOCK BARRIER

Canonical MUST NOT emit frames derived from INVALID RAW blocks.

If RAW is invalid:

→ retry upstream
→ halt pipeline

Forward motion without causality is forbidden.

---

REORG COMPATIBILITY

Canonical MUST support rewind.

Required invariant:

parentHash(previous) === hash(current)

On mismatch:

→ canonical history MUST rewind
→ engine state MUST rewind

Silent overwrite is forbidden.

History must remain reconstructible.

---

MACHINE IDENTITY LAW (ELITE RULE)

Canonical output MUST be byte-stable across environments.

Meaning:

- deterministic serialization
- stable field ordering
- no runtime-dependent formatting

Two machines processing the same RAW must produce identical canonical frames.

Not similar.

Identical.

---

CANONICAL META

canonicalMeta: {
  ordered: true
  sourceBlockHash: string
  rawSchemaVersion: number
}

Purpose:

- trace lineage
- enable replay audits
- detect schema drift

Canonical must always be traceable to RAW.

---

NO AGGREGATION LAW

Structure MUST NOT emerge from batching or rolling windows.

Each block is processed atomically.

Aggregation is interpretation.

Interpretation belongs to the engine.

---

DETERMINISM GUARANTEE

Given identical RAW history:

CANONICAL_BLOCK_FRAME output MUST be identical.

Not close.
Not equivalent.

Identical.

Replay safety begins here.

---

FINAL CONSTITUTIONAL LOCK

RAW captures reality.
Canonical orders reality.
The engine interprets reality.

Never invert this chain.

Systems that mutate causality drift into fiction.
