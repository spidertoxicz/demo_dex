CANONICAL_BLOCK_STORE.contract.ts

ENGINE V3 — PERSISTENCE AUTHORITY

Status: LOCKED · APPEND-ONLY · REWIND-SAFE

CanonicalBlockStore is the deterministic persistence layer for CanonicalBlockFrame.

It defines:

- How canonical blocks are stored
- How they are retrieved
- How they are deleted during reorg
- What is forbidden

It is NOT a database abstraction.

It is a causality contract.

---

PRIME DIRECTIVE

Canonical storage must guarantee:

👉 Append-only forward progression
👉 Atomic block writes
👉 Deterministic rewind behavior
👉 No in-place mutation

Storage must never invent history.

---

INTERFACE CONTRACT

// CANONICAL_BLOCK_STORE.contract.ts

import { CanonicalBlockFrame } from "./CANONICAL_BLOCK_FRAME.schema"

export interface CanonicalBlockStore {

  // --- Write ---
  appendBlock(block: CanonicalBlockFrame): Promise<void>

  // --- Read ---
  getBlock(blockNumber: number): Promise<CanonicalBlockFrame | null>

  getLatestBlock(): Promise<CanonicalBlockFrame | null>

  // --- Existence ---
  hasBlock(blockNumber: number): Promise<boolean>

  // --- Rewind ---
  deleteBlocksFrom(blockNumber: number): Promise<void>

}

---

HARD INVARIANTS

INVARIANT 1 — APPEND-ONLY FORWARD MOTION

"appendBlock" must enforce:

block.blockNumber === lastStoredBlockNumber + 1

If mismatch:

Reject write.

Never allow:

- skipping blocks
- overwriting existing block
- inserting historical block

---

INVARIANT 2 — NO OVERWRITE

If blockNumber already exists:

Reject append.

Never replace canonical history.

Reorg requires deletion first.

---

INVARIANT 3 — ATOMIC WRITE

"appendBlock" must be atomic.

Either:

- Entire block is persisted
  or
- Nothing is persisted

Partial writes are forbidden.

Recommended strategy:

- Write to temp file
- fsync
- Rename to final filename

Atomic rename is required.

---

INVARIANT 4 — IMMUTABLE RETRIEVAL

"getBlock()" must return:

- Exact stored data
- No transformation
- No enrichment
- No recomputation

Store must be intellectually blind.

---

INVARIANT 5 — DETERMINISTIC REWIND

"deleteBlocksFrom(blockNumber)"

Must:

- Delete all blocks >= blockNumber
- Delete in descending order
- Be atomic

Example:

If forkBlockNumber = 100

deleteBlocksFrom(101)

Removes:

101
102
103
...

Never partially delete.

---

INVARIANT 6 — NO PATCHING

Forbidden operations:

- updateBlock
- patchBlock
- mutateBlock
- mergeBlocks

History must be deleted and rebuilt.

Never edited.

---

INVARIANT 7 — REPLAY PARITY

Given identical RAW input:

CanonicalBlockStore content must be byte-identical across:

- Live runtime
- Replay runtime

Any divergence indicates storage corruption.

---

STORAGE MODEL RECOMMENDATION

Filesystem layout:

/canonical_blocks/
  100.json
  101.json
  102.json

Avoid:

- Single giant file
- In-memory-only store
- Mutable database rows

Flat, append-only storage is safest for replay determinism.

---

FAILURE POLICY

If write fails:

- Do NOT advance cursor
- Do NOT propagate to L1
- Emit critical error

If delete fails during reorg:

- Halt engine
- Do not attempt partial recovery

Storage must never enter inconsistent state.

---

RELATION TO CURSOR

Cursor update must occur AFTER:

appendBlock(block)

Never before.

Cursor reflects stored reality — not intended reality.

---

RELATION TO REORG

Reorg flow:

1. Detect fork
2. deleteBlocksFrom(forkBlockNumber + 1)
3. Reset cursor
4. Re-canonicalize from RAW
5. Append forward

No shortcuts.

---

FORBIDDEN DESIGN PATTERNS

Reject immediately:

- Database auto-upsert
- Overwriting block by blockNumber
- Multi-threaded block appends
- Async append without ordering lock
- Storing only event-level data

Block-level atomicity is required.

---

CONCURRENCY RULE

Only one append operation may run at a time.

Storage layer must be single-writer.

Parallel writers break determinism.

---

FINAL CONSTITUTIONAL STATEMENT

CanonicalBlockStore is the engine’s memory of lawful reality.

It must remain:

- Sequential
- Append-only
- Rewind-safe
- Immutable

If storage lies,
the engine lies.

Protect storage more strictly than code.

Code can be rewritten.
History cannot.
