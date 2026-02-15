L0_INGESTION_FRAME.schema.ts

ENGINE V3 — DETERMINISTIC BRIDGE LAYER

Status: LOCKED · NON-COGNITIVE · SEQUENTIAL

L0 is the deterministic ingestion boundary between:

- Infra (CanonicalBlockFrame)
- Engine Cognition (L1–L6)

It is not intelligence.
It is not interpretation.
It is not lifecycle.

It is a membrane.

Its purpose is to:

- Enforce sequential intake
- Anchor canonical blocks to engine timeline
- Guarantee replay parity
- Prevent cognition from seeing malformed reality

---

PRIME DIRECTIVE

L0 must guarantee:

👉 Exactly one canonical block enters the engine per tick.
👉 Blocks are sequential and hash-verified.
👉 No cognition sees incomplete or reordered data.

L0 does not think.
It only guards causality.

---

TYPE DEFINITION

// L0_INGESTION_FRAME.schema.ts

import { CanonicalBlockFrame } from "../infra/CANONICAL_BLOCK_FRAME.schema"

export type L0IngestionFrame = Readonly<{

  // --- Timeline Anchor ---
  blockNumber: number
  blockHash: string
  parentHash: string

  // --- Canonical Payload ---
  canonicalBlock: CanonicalBlockFrame

  // --- Cursor Anchor Snapshot ---
  previousBlockHash: string

}>

---

FIELD DEFINITIONS

blockNumber

Must match:

canonicalBlock.blockNumber

Redundant by design.

Redundancy protects against silent corruption.

---

blockHash

Must match:

canonicalBlock.blockHash

Never recomputed.

---

parentHash

Must match:

canonicalBlock.parentHash

Used to validate sequential continuity.

---

canonicalBlock

The fully validated CanonicalBlockFrame.

L0 does not modify it.

L0 does not reorder it.

L0 does not enrich it.

---

previousBlockHash

Snapshot of cursor’s lastProcessedBlockHash.

Used to verify:

parentHash === previousBlockHash

If mismatch:

→ Trigger reorg flow
→ Reject ingestion

Never forward mismatched blocks.

---

HARD INVARIANTS

INVARIANT 1 — SEQUENTIAL ENFORCEMENT

L0 must validate:

blockNumber === cursor.nextBlockNumber

If not:

Reject ingestion.

Never auto-correct.

---

INVARIANT 2 — HASH CONTINUITY

parentHash === previousBlockHash

If mismatch:

Trigger ReorgEvent.

Do not pass to L1.

---

INVARIANT 3 — SINGLE BLOCK PER TICK

L0 must process exactly one block at a time.

Forbidden:

- batch ingestion into cognition
- parallel block feeding
- speculative preloading

One block → one propagation.

---

INVARIANT 4 — ZERO STRUCTURAL INTELLIGENCE

L0 must not:

- decode LP intent
- classify vacuum vs wall
- infer lifecycle
- compute deltas
- filter events

That begins at L2.

Never earlier.

---

INVARIANT 5 — REPLAY PARITY

Replay must produce identical L0IngestionFrame sequence.

If replay produces different ingestion frames:

Infra or cursor is corrupt.

---

INVARIANT 6 — IMMUTABILITY

Once emitted to L1:

L0IngestionFrame must be treated as immutable.

No downstream mutation allowed.

---

RELATION TO RUNTIME FLOW

Runtime sequence:

CanonicalBlockFrame
   ↓
Cursor validation
   ↓
L0IngestionFrame creation
   ↓
L1 physics exposure

L0 is the final gate before cognition.

---

FAILURE POLICY

If any invariant fails:

- Do not propagate to L1
- Do not advance cursor
- Emit structural error
- Await correction (replay or reorg)

L0 must prefer halt over corruption.

---

RELATION TO ENGINE PHYSICS

L0 marks:

The exact moment reality enters engine cognition.

It must remain:

- Deterministic
- Sequential
- Hash-anchored
- Cognitively blind

If L0 becomes intelligent,
Layer Boundaries collapse.

If L0 becomes permissive,
Determinism collapses.

Protect its neutrality.

---

FINAL CONSTITUTIONAL STATEMENT

L0 is not part of cognition.
It is the bridge.

It enforces:

- Sequential causality
- Timeline integrity
- Replay stability

Then steps aside.

From L1 onward,
structure begins.

Keep L0 boring.
Boring is correct.
