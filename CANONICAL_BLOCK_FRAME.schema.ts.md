CANONICAL_BLOCK_FRAME.schema.ts

ENGINE V3 — ATOMIC CANONICAL BLOCK

Status: LOCKED · ATOMIC · REPLAYABLE

This schema defines the deterministic, fully ordered, and canonical representation of a single blockchain block.

It is the unit of ingestion into the engine.

CanonicalBlockFrame is:

- Ordered
- Immutable
- Replay-stable
- Hash-anchored

It is the last infra container before engine cognition begins.

---

PRIME DIRECTIVE

A CanonicalBlockFrame must represent:

«The complete and deterministically ordered causal content of exactly one block.»

No partial blocks.
No inferred data.
No structural interpretation.

Atomic truth only.

---

TYPE DEFINITION

// CANONICAL_BLOCK_FRAME.schema.ts

import { CanonicalEvent } from "./CANONICAL_EVENT.schema"

export type CanonicalBlockFrame = Readonly<{

  // --- Block Identity ---
  blockNumber: number
  blockHash: string
  parentHash: string

  // --- Block Timestamp (from chain) ---
  timestamp: number

  // --- Deterministically Ordered Events ---
  events: ReadonlyArray<CanonicalEvent>

  // --- Integrity Metadata ---
  eventCount: number

}>

---

HARD INVARIANTS

INVARIANT 1 — ATOMIC COMPLETENESS

The block must be:

- Fully canonicalized
- Fully ordered
- Fully validated

Partial blocks MUST NOT enter the engine.

If canonicalization fails:

→ Reject entire block
→ Retry upstream

Never pass incomplete truth forward.

---

INVARIANT 2 — ORDER IS FINAL

The "events" array MUST already be sorted by:

(blockNumber, transactionIndex, logIndex)

CanonicalBlockFrame MUST NOT reorder events.

Ordering is finalized before this layer.

---

INVARIANT 3 — HASH CONTINUITY

For block N:

parentHash === previousBlock.blockHash

If mismatch occurs:

→ Trigger deterministic reorg handling
→ Halt forward progression

Never auto-correct hash continuity.

---

INVARIANT 4 — EVENT COUNT CONSISTENCY

eventCount === events.length

This prevents silent event loss.

If mismatch:

Reject block.

---

INVARIANT 5 — IMMUTABILITY

CanonicalBlockFrame must be treated as:

«Write once. Read forever.»

Forbidden:

- mutation
- event injection
- structural annotation
- lifecycle enrichment

Cognition begins AFTER this container.

---

INVARIANT 6 — ZERO STRUCTURAL SEMANTICS

CanonicalBlockFrame must NOT contain:

- anchor state
- range state
- vacuum flags
- lifecycle hints
- LP classification

Those belong to L2+.

Infra must remain cognitively blind.

---

INVARIANT 7 — REPLAY IDENTITY

Given identical RAW input:

CanonicalBlockFrame MUST be byte-for-byte reproducible.

Replay divergence at this level indicates infra corruption.

---

RELATION TO ENGINE FLOW

Runtime sequence:

RAW_BLOCK_FRAME
   ↓
CANONICAL_EVENT normalization
   ↓
CANONICAL_BLOCK_FRAME
   ↓
Cursor validation
   ↓
L0 deterministic ingestion
   ↓
Cognition begins

This schema marks the final infra boundary.

After this, engine physics applies.

---

FAILURE POLICY

If any invariant fails:

- Emit critical error
- Do NOT advance cursor
- Do NOT pass to L0
- Preserve RAW for forensic replay

Truth is preferred over progress.

---

STORAGE RECOMMENDATION

Canonical blocks should be stored append-only:

/canonical_blocks/{blockNumber}.json

Never overwrite history.

Reorg handling must:

- Delete affected canonical blocks
- Regenerate from RAW

Never mutate in place.

---

RELATION TO REORG HANDLING

Reorg detection must occur BEFORE L0 ingestion.

If parentHash mismatch is detected:

1. Identify divergence depth
2. Delete canonical blocks beyond fork point
3. Re-canonicalize from RAW
4. Resume forward motion

CanonicalBlockFrame must remain timeline-pure.

---

FINAL CONSTITUTIONAL STATEMENT

CanonicalBlockFrame is the engine’s official record of a block.

It is:

- Deterministic
- Ordered
- Immutable
- Replayable

It contains no intelligence.
It contains no interpretation.
It contains no bias.

It is lawful reality.

Cognition begins only after this container is accepted.

Protect its purity.
