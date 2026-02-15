ENGINE_RUNTIME_FLOW.md

ENGINE V3 — DETERMINISTIC RUNTIME MOTION

Status: LOCKED · CAUSAL · NON-NEGOTIABLE

This document defines the one lawful motion path through which blockchain reality becomes engine cognition.

Runtime flow is not orchestration logic.

It is the causal conveyor belt of ENGINE V3.

There must never exist an alternate path.

---

PRIME RUNTIME DIRECTIVE

When a new canonical block becomes available:

«The engine advances exactly one causal step forward.»

No branching.
No optional routes.
No intelligent scheduling.

Reality moves → the engine follows.

---

RUNTIME PHILOSOPHY

ENGINE V3 is push-driven by causality, not pull-driven by modules.

Forbidden architecture:

- modules fetching their own data
- cognition querying infra
- UI triggering recalculation
- layers running opportunistically

Allowed architecture:

Block advances → pipeline executes → state emerges

One direction.

Always.

---

HIGH-LEVEL MOTION

Bootstrap
   ↓
Cursor initializes
   ↓
WAIT for next canonical block
   ↓
Validate block identity
   ↓
Ingest deterministically (L0)
   ↓
Propagate upward through cognition (L1–L6)
   ↓
Commit engine state
   ↓
Emit L7 snapshot (non-blocking)
   ↓
Advance cursor

If any step fails:

«The engine does not advance.»

---

THE ONE-BLOCK LAW

ENGINE V3 processes exactly one block per causal tick.

Forbidden:

- multi-block cognition
- speculative pre-processing
- skipping ahead
- out-of-order execution

Replay may accelerate throughput —
but it MUST preserve one-block semantics internally.

---

DETAILED CAUSAL FLOW

STEP 0 — BOOTSTRAP CONTEXT

Load immutable runtime configuration:

- chain context
- universe definition
- finality policy
- replay mode (if active)

Bootstrap MUST complete before cursor activation.

No hot mutation allowed.

---

STEP 1 — CURSOR AUTHORITY

The cursor defines the engine’s position in reality.

For block N:

nextBlock = cursor.lastProcessed + 1

The engine MUST NOT guess the next block.

Numbers locate.
Hashes verify.

---

STEP 2 — CANONICAL BLOCK WAIT

Runtime waits until the canonicalizer emits block N.

The engine MUST NEVER:

- read RAW directly
- assemble partial blocks
- infer missing events

Canonical completeness is mandatory.

No block → no motion.

---

STEP 3 — BLOCK IDENTITY VALIDATION

Before cognition begins:

Verify:

- blockNumber continuity
- parentHash linkage
- canonical ordering

If mismatch occurs:

→ Trigger deterministic rewind.
→ Halt forward motion.

Never “patch forward.”

---

STEP 4 — L0 DETERMINISTIC INGESTION (BRIDGE)

Canonical reality crosses into the engine.

Responsibilities:

- enforce sequential intake
- reject duplicates
- reject gaps
- guarantee replayable entry

L0 MUST NOT:

- interpret structure
- filter events
- aggregate behavior

It is a membrane.

Not intelligence.

---

STEP 5 — COGNITION PROPAGATION (STRICT ORDER)

Truth flows upward exactly once:

L1  → expose physics
L1.5 → map spatial geometry
L2  → interpret structure
L3  → update anchor lifecycle
L4  → update range lifecycle
L5  → compress global structure
L6  → declare engine posture

Forbidden:

- parallel lifecycle updates
- reordered execution
- re-interpretation downstream

Interpret once. Propagate upward.

---

STEP 6 — ATOMIC STATE COMMIT

After L6 completes successfully:

Persist:

- lifecycle states
- global structure
- engine mode
- block hash anchor

Commit MUST be atomic.

Partial commits are architectural violations.

If commit fails:

→ Treat block as unprocessed.
→ Do not advance cursor.

---

STEP 7 — SNAPSHOT EMISSION (L7)

After commit:

Emit observability snapshot.

Snapshot MUST be:

- asynchronous
- non-blocking
- non-authoritative

Failure to emit MUST NOT stall the engine.

L7 is projection — not causality.

---

STEP 8 — CURSOR ADVANCE

Only AFTER successful commit:

cursor.lastProcessed = N

Cursor movement certifies causal completion.

Moving the cursor early is timeline corruption.

---

FAILURE BEHAVIOR (RUNTIME LAW)

When uncertainty appears:

The engine must prefer halting over guessing.

Allowed reactions:

- pause
- rewind
- retry
- alert

Forbidden reactions:

- skip
- approximate
- smooth
- interpolate

Truth first. Always.

---

REPLAY MODE PARITY

Replay runtime MUST execute the identical flow.

No replay shortcuts allowed.

If live and replay paths differ:

«Determinism is already compromised.»

Replay is not a tool.

Replay is a second proof of correctness.

---

ORCHESTRATOR — PROPER ROLE

The orchestrator is NOT the brain.

It is a metronome.

Responsibilities:

- advance cursor
- trigger pipeline
- enforce sequencing
- apply backpressure

Forbidden:

- structural decisions
- lifecycle influence
- interpretation
- heuristic scheduling

The orchestrator moves time.
The engine understands reality.

Never invert this.

---

FORBIDDEN RUNTIME PATTERNS

Stop immediately if you see:

- modules pulling infra data
- layers bypassing L0
- cognition running in parallel
- partial state persistence
- UI-triggered recomputation
- replay-specific logic branches

These are precursors to nondeterminism.

---

RUNTIME SAFETY PRINCIPLE

ENGINE V3 does not chase uptime.

It protects causal integrity.

A paused engine is healthy.
A guessing engine is broken.

---

FINAL RUNTIME STATEMENT

ENGINE V3 behaves like a causal machine:

Reality advances →
The engine validates →
The engine understands →
The engine commits →
The engine advances.

No speculation.
No shortcuts.
No alternate timelines.

Motion is singular.
Truth is preserved.
