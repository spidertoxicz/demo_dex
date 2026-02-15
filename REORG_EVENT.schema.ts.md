REORG_EVENT.schema.ts

ENGINE V3 — TIMELINE CORRECTION CONTRACT

Status: LOCKED · SINGLE-TIMELINE · DETERMINISTIC

This schema defines the structured representation of a detected blockchain reorganization.

A reorg event does not represent failure.

It represents:

«The blockchain invalidating a previously accepted timeline.»

ENGINE V3 must respond by rewinding deterministically.

Never by patching forward.

---

PRIME DIRECTIVE

There must exist:

👉 Exactly one canonical timeline inside the engine.

When the chain forks:

- The invalid branch must be removed
- The valid branch must be adopted
- Cursor must rewind
- Canonical blocks must be regenerated

No parallel realities allowed.

---

TYPE DEFINITION

// REORG_EVENT.schema.ts

export type ReorgEvent = Readonly<{

  // --- Detection Point ---
  detectedAtBlockNumber: number

  // --- Fork Information ---
  forkBlockNumber: number
  forkBlockHash: string

  // --- Depth ---
  depth: number

  // --- Invalidated Blocks ---
  invalidatedBlockNumbers: ReadonlyArray<number>

  // --- Replacement Anchor ---
  newCanonicalParentHash: string

  // --- Timestamp (Wall-Clock for audit only) ---
  detectedAtTimestamp: number

}>

---

FIELD DEFINITIONS

detectedAtBlockNumber

Block number at which mismatch was detected.

This is not necessarily the fork point.
It is where divergence was first observed.

---

forkBlockNumber

The last common ancestor block number between:

- Engine timeline
- New chain reality

Engine must rewind to this block.

---

forkBlockHash

Hash of the last valid shared ancestor block.

This is the re-entry anchor.

---

depth

depth = detectedAtBlockNumber - forkBlockNumber

Defines how many blocks must be removed.

---

invalidatedBlockNumbers

Explicit list of blocks to remove from canonical store.

Must be sequential and descending:

Example:

[105, 104, 103]

Never infer this list later.

ReorgEvent must make it explicit.

---

newCanonicalParentHash

The hash that the next block must match after rewind.

This ensures timeline purity.

---

detectedAtTimestamp

Wall-clock timestamp for audit and observability only.

Must NEVER influence engine logic.

---

HARD INVARIANTS

INVARIANT 1 — REWIND BEFORE PROCEED

Upon receiving ReorgEvent:

Engine must:

1. Halt forward progression
2. Delete canonical blocks beyond forkBlockNumber
3. Reset cursor to forkBlockNumber
4. Resume canonicalization from RAW

Never patch forward.

---

INVARIANT 2 — NO PARTIAL REWIND

Rewind must be atomic.

Forbidden:

- deleting some but not all invalid blocks
- partially updating cursor
- preserving stale lifecycle state

State and canonical data must rewind together.

---

INVARIANT 3 — LIFECYCLE RESET VIA REPLAY

After rewind:

Lifecycle state (L3–L6) must be reconstructed via replay.

Never attempt partial lifecycle correction.

Reorg means:

«“Previous structural understanding may be invalid.”»

Respect that.

---

INVARIANT 4 — NO MULTI-TIMELINE MEMORY

Engine must never:

- remember old fork states
- store alternative timelines
- attempt reconciliation

Only one reality may exist.

---

INVARIANT 5 — REPLAY PARITY

Reorg handling must behave identically in:

- LIVE mode
- REPLAY mode

No special-case logic.

Determinism must survive fork conditions.

---

FORBIDDEN DESIGN PATTERNS

Reject immediately:

- “Soft reorg” handling
- Ignoring shallow forks
- Accepting parentHash mismatch temporarily
- Allowing depth threshold to auto-skip rewind
- Continuing forward while patching

Pause.
Rewind.
Rebuild.

Always.

---

RELATION TO CURSOR

After rewind:

cursor.lastProcessedBlockNumber = forkBlockNumber
cursor.lastProcessedBlockHash = forkBlockHash
cursor.nextBlockNumber = forkBlockNumber + 1

Cursor must reflect new canonical reality.

---

RELATION TO CANONICAL STORE

Upon reorg:

Delete canonical blocks in:

/canonical_blocks/{blockNumber}

for all invalidatedBlockNumbers.

Never overwrite.

Delete and regenerate.

---

FAILURE PHILOSOPHY

If reorg depth exceeds configured maxReorgDepth:

Engine must:

- Halt completely
- Emit CRITICAL alert
- Require manual intervention

Determinism is more important than availability.

---

FINAL CONSTITUTIONAL STATEMENT

Reorg is not chaos.

It is blockchain reality correcting itself.

ENGINE V3 must:

- Accept correction
- Rewind deterministically
- Rebuild understanding
- Resume forward motion

Never guess.
Never patch.
Never run two realities.

One timeline.
Always.
