CURSOR.schema.ts

ENGINE V3 — TIMELINE AUTHORITY

Status: LOCKED · SINGLE SOURCE OF POSITION TRUTH

The Cursor defines the engine’s current position in canonical blockchain reality.

It represents:

- What block has been fully processed
- What block is next
- What hash anchors the engine’s timeline

The cursor is not a helper variable.

It is the engine’s temporal spine.

---

PRIME DIRECTIVE

The cursor must guarantee:

👉 Sequential block progression
👉 Hash-anchored continuity
👉 Replay parity
👉 No skipped causality

Cursor movement certifies that a block has been fully and atomically processed.

---

TYPE DEFINITION

// CURSOR.schema.ts

export type EngineCursor = Readonly<{

  // --- Last Fully Committed Block ---
  lastProcessedBlockNumber: number
  lastProcessedBlockHash: string

  // --- Next Block To Process ---
  nextBlockNumber: number

  // --- Runtime Mode ---
  mode: "LIVE" | "REPLAY"

}>

---

HARD INVARIANTS

INVARIANT 1 — SEQUENTIAL CONSISTENCY

The relationship must always hold:

nextBlockNumber === lastProcessedBlockNumber + 1

No gaps allowed.

If mismatch is detected:

→ Halt engine
→ Investigate state corruption

Never auto-correct.

---

INVARIANT 2 — HASH AUTHORITY

The tuple:

(lastProcessedBlockNumber, lastProcessedBlockHash)

Anchors the engine’s current reality.

When processing block N:

incoming.parentHash MUST equal lastProcessedBlockHash

If mismatch:

→ Trigger reorg handling
→ Do NOT advance cursor

Never trust block numbers alone.

Hashes verify identity.

---

INVARIANT 3 — CURSOR MOVES ONLY AFTER COMMIT

Cursor must only update AFTER:

- CanonicalBlockFrame accepted
- L0 ingestion complete
- L1–L6 propagation complete
- Atomic state commit successful

Moving the cursor early creates timeline corruption.

---

INVARIANT 4 — NO SKIPPING

Cursor must never:

- Jump forward
- Skip blocks
- Auto-catch-up silently

If backlog exists:

Process blocks sequentially.

One block at a time.

---

INVARIANT 5 — REPLAY PARITY

Replay mode must use the same cursor semantics.

Differences between LIVE and REPLAY:

- Source of canonical blocks
- Speed of progression

But NEVER:

- Transition logic
- Cursor movement rules
- Hash validation

Replay is not a simulation.
It is a second execution of truth.

---

INVARIANT 6 — IMMUTABILITY PER TICK

During processing of block N:

Cursor must remain stable.

Only after full commit:

lastProcessedBlockNumber = N
lastProcessedBlockHash = blockHash
nextBlockNumber = N + 1

Atomic update only.

Partial cursor writes are forbidden.

---

INVARIANT 7 — PERSISTENCE GUARANTEE

Cursor state must be:

- Persisted to durable storage
- Updated atomically
- Recovered on restart

On restart:

Engine must resume from:

lastProcessedBlockNumber + 1

Never guess position.

Never derive from wall-clock.

---

RELATION TO REORG HANDLING

If reorg detected at depth D:

1. Rewind cursor to last valid ancestor
2. Delete canonical blocks beyond fork
3. Re-run canonicalization
4. Resume sequential processing

Cursor must never straddle two realities.

Only one timeline may exist.

---

FORBIDDEN DESIGN PATTERNS

Reject immediately:

- Storing only block number without hash
- Allowing cursor correction without replay
- Using wall-clock to infer missing blocks
- Multi-block cursor jumps
- Concurrent cursor writes

Cursor is sacred.

---

STORAGE RECOMMENDATION

Cursor should be stored as a single atomic record:

/state/engine_cursor.json

Use write-then-rename strategy to ensure atomic persistence.

Never partially write.

---

RELATION TO ENGINE PHYSICS

Cursor sits between:

CanonicalBlockFrame
and
L0 deterministic ingestion

It protects:

Time continuity.

If the cursor lies:

The engine lies.

---

FAILURE PHILOSOPHY

If cursor integrity is uncertain:

Pause engine.

Investigate.

Repair via replay.

Never guess position.

---

FINAL CONSTITUTIONAL STATEMENT

The Cursor is the engine’s declaration:

“I have fully processed up to this point in reality.”

It must remain:

- Sequential
- Hash-anchored
- Replay-consistent
- Atomically updated

Without cursor integrity,
determinism collapses.

Protect it accordingly.
