ENGINE_TRACE_STORE.module.ts

ENGINE V3 — DETERMINISTIC TRACE PERSISTENCE

Status: LOCKED · OBSERVABILITY-ONLY · NON-INTRUSIVE

EngineTraceStore persists the deterministic per-block state snapshot used by ReplayHarness v2.

It must:

- Observe engine output
- Persist state immutably
- Never influence engine logic
- Never modify engine state

Trace is evidence — not authority.

---

PRIME DIRECTIVE

EngineTraceStore must guarantee:

👉 One trace frame per committed block
👉 Append-only storage
👉 Atomic writes
👉 Replay parity

Trace persistence must never alter engine motion.

---

TRACE FRAME STRUCTURE

// ENGINE_TRACE_FRAME.schema.ts

export type EngineTraceFrame = Readonly<{

  blockNumber: number
  blockHash: string

  cursor: {
    lastProcessedBlockNumber: number
    lastProcessedBlockHash: string
  }

  l3AnchorState: string
  l4RangeState: string
  l5GlobalState: string
  l6EngineMode: string

  stateHash: string  // SHA256 hash of full frame (optional but recommended)

}>

---

MODULE INTERFACE

// ENGINE_TRACE_STORE.module.ts

import { EngineTraceFrame } from "./ENGINE_TRACE_FRAME.schema"

export interface EngineTraceStore {

  append(frame: EngineTraceFrame): Promise<void>

  get(blockNumber: number): Promise<EngineTraceFrame | null>

  getLatest(): Promise<EngineTraceFrame | null>

  deleteFrom(blockNumber: number): Promise<void>

}

---

HARD INVARIANTS

INVARIANT 1 — APPEND-ONLY

Trace must be appended sequentially.

Enforce:

frame.blockNumber === lastStoredBlockNumber + 1

No overwriting.
No skipping.
No patching.

---

INVARIANT 2 — ATOMIC WRITE

Trace frame must be written atomically.

Recommended pattern:

- Serialize frame
- Write to temp file
- fsync
- Rename to final filename

Partial trace writes are forbidden.

---

INVARIANT 3 — IMMUTABILITY

Once stored:

Trace frames must never be modified.

If corruption detected:

Delete and rebuild via replay.

Never patch.

---

INVARIANT 4 — NON-BLOCKING

Trace persistence must not block engine commit.

If trace write fails:

- Emit error
- Do not alter engine state

Trace is observability.
Engine is authority.

---

INVARIANT 5 — REORG AWARENESS

On reorg:

TraceStore.deleteFrom(forkBlockNumber + 1)

Trace must reflect canonical timeline.

No orphan traces allowed.

---

INVARIANT 6 — STATE HASH CONSISTENCY

stateHash must be computed deterministically:

stateHash = SHA256(stableSerialize(frameWithoutHash))

Serialization must be:

- Stable key order
- No non-deterministic formatting

Hash protects against subtle mutation.

---

STORAGE MODEL

Filesystem layout:

/engine_trace/
  100.json
  101.json
  102.json

One file per block.

Never store giant aggregate file.

---

TRACE GENERATION TIMING

Trace frame must be created:

AFTER:

- CanonicalBlockStore append
- Cursor update
- L3–L6 propagation

BEFORE:

- L7 snapshot emission

Trace must reflect committed state only.

---

FORBIDDEN PATTERNS

Reject immediately:

- Writing trace before commit
- Writing trace from inside lifecycle logic
- Enriching trace with derived metrics
- Adding performance stats
- Including timestamps from wall-clock (except optional debug)

Trace must mirror structural truth only.

---

RELATION TO REPLAY HARNESS

ReplayHarness v2 must:

1. Load stored LIVE trace
2. Run full replay
3. Generate REPLAY trace
4. Compare block-by-block

TraceStore makes determinism testable.

Without it, replay verification is incomplete.

---

FAILURE POLICY

If trace append fails:

- Log error
- Continue engine

If trace retrieval fails:

- ReplayHarness must halt
- Investigate storage corruption

Trace must never silently degrade.

---

FINAL CONSTITUTIONAL STATEMENT

EngineTraceStore is the engine’s audit log.

It does not decide.
It does not influence.
It does not interpret.

It records structural truth exactly as it existed at commit time.

Trace makes determinism observable.

And observable determinism is provable determinism.
