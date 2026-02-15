REPLAY_HARNESS_V2.spec.ts

ENGINE V3 — DETERMINISTIC EQUIVALENCE VALIDATOR

Status: LOCKED · AUDIT-GRADE · NON-OPTIONAL

ReplayHarness v2 verifies that ENGINE V3 produces identical results when:

- Running in LIVE mode
- Running in REPLAY mode from RAW

It guarantees that:

Same input → Same canonical blocks → Same lifecycle → Same global state → Same engine mode.

No divergence permitted.

---

PRIME DIRECTIVE

Determinism is not assumed.

It must be proven.

ReplayHarness v2 exists to mechanically validate:

- Timeline integrity
- State evolution integrity
- Storage integrity
- Lifecycle transition integrity

If mismatch occurs:
The engine is incorrect.

---

TEST SCOPE

ReplayHarness v2 validates per block:

1. CanonicalBlockFrame equality
2. Cursor equality
3. L3 Anchor state
4. L4 Range state
5. L5 GlobalStructuralState
6. L6 EngineMode

All must match exactly.

---

REQUIRED TRACE OUTPUT

Each engine run must produce a deterministic trace record:

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

}>

Trace must be persisted per block.

No derived values.
No smoothing.
No compression.

---

HARNESS EXECUTION FLOW

STEP 1 — LIVE RUN CAPTURE

Run engine normally.

Persist:

- Canonical blocks
- Cursor states
- EngineTraceFrame sequence

Store as:

/replay_reference/live_trace.json

---

STEP 2 — FULL REPLAY

Reset:

- Cursor
- CanonicalBlockStore
- Engine state

Replay from RAW:

Block 0 → N

Persist replay trace:

/replay_reference/replay_trace.json

---

STEP 3 — STRICT COMPARISON

For each block:

Validate:

- blockNumber identical
- blockHash identical
- Cursor identical
- L3 identical
- L4 identical
- L5 identical
- L6 identical

Comparison must be strict equality.

No tolerance.
No soft matching.

---

DIVERGENCE POLICY

If mismatch detected:

Immediately:

- Stop replay
- Emit divergence report
- Output first mismatching block
- Dump both states

Never continue after mismatch.

Determinism failure must be loud.

---

OPTIONAL HASH MODE

For faster equivalence testing:

EngineTraceFrame may also compute:

stateHash = SHA256(JSON.stringify(frame))

ReplayHarness may compare only hash values.

If hashes mismatch:

Deep compare frame.

Hash mode is optimization — not authority.

---

REORG VALIDATION MODE

ReplayHarness v2 must also support:

Simulated reorg injection.

Procedure:

1. Run LIVE to block N
2. Inject synthetic fork in RAW
3. Trigger ReorgEvent
4. Replay full timeline

Result must match expected deterministic rebuild.

Reorg determinism must be provable.

---

FORBIDDEN BEHAVIOR

ReplayHarness must NOT:

- Modify engine code path
- Enable special replay shortcuts
- Bypass L0
- Bypass CanonicalBlockStore
- Disable invariants

Replay must use identical runtime path as LIVE.

If replay needs different logic:
Architecture is wrong.

---

FAILURE CLASSIFICATION

ReplayHarness must classify mismatch as:

- Canonical divergence
- Cursor divergence
- Lifecycle divergence
- Global state divergence
- Mode divergence

Categorized failure improves debugging precision.

---

STORAGE REQUIREMENTS

Trace output must be:

- Append-only
- Immutable
- Versioned with engineVersion

Never overwrite historical trace.

ReplayHarness itself must be replayable.

---

SUCCESS CRITERIA

ReplayHarness passes when:

For entire block range:

live_trace === replay_trace

Exact match.

Determinism proven.

---

FINAL CONSTITUTIONAL STATEMENT

ReplayHarness v2 is the mechanical proof that ENGINE V3 is deterministic.

Without it:
Determinism is a belief.

With it:
Determinism is verifiable.

This harness must be run:

- After major refactors
- After infra changes
- After lifecycle changes
- Before production deployment

Truth must be provable.
