ENGINE_LAWS.md

ENGINE V3 — CONSTITUTIONAL LAWS

Status: LOCKED · NON-NEGOTIABLE · TIMELESS

This document defines the absolute laws governing ENGINE V3.
These laws are higher priority than any implementation, optimization, or feature.

If code violates these laws, the code is wrong — not the law.

---

0. CONSTITUTIONAL AUTHORITY

ENGINE_LAWS.md is the highest authority in the system.

Priority order:

1. ENGINE_LAWS.md
2. Infrastructure Contracts
3. Layer Schemas
4. Runtime Code
5. Tooling / UI

No lower layer may override a higher layer.

---

LAW 1 — BLOCK CAUSALITY

Blocks are the only clock.

- All engine progression is driven by block sequence.
- Wall-clock time has zero authority over structure.
- If blocks stop, the engine stops.
- If blocks rewind, the engine rewinds.

Forbidden:

- timers
- durations
- “for N blocks”
- decay by time
- scheduling-based inference

---

LAW 2 — DETERMINISM

Same input → same state → same output. Always.

- Identical RAW + Canonical input MUST produce identical engine behavior.
- Replay is not optional.
- “Close enough” is failure.

If replay diverges:

«The engine is broken.»

---

LAW 3 — HASH AUTHORITY

Numbers locate. Hashes verify.

- Block numbers indicate position.
- Block hashes prove identity.
- No decision may rely on numbers alone.

If hash mismatches occur:

- Forward progress MUST stop.
- Correction MUST be deterministic.

---

LAW 4 — NO HIDDEN STATE

Every state affecting behavior must be:

- explicit
- persisted
- observable
- replayable

Forbidden:

- implicit memory
- rolling windows
- confirmation counters
- decay variables
- cached assumptions

Hidden state = silent nondeterminism.

---

LAW 5 — PAUSE OVER GUESS

The engine must prefer halting over hallucinating continuity.

When reality is incomplete or contradictory:

- Pause.
- Refuse progression.
- Await valid causality.

Forbidden:

- skipping missing blocks
- optimistic continuation
- auto-healing causality gaps

Uptime is secondary to truth.

---

LAW 6 — SINGLE CAUSAL TIMELINE

ENGINE V3 operates on exactly one timeline.

- No forks.
- No preferred branches.
- No reconciliation between realities.

Reorgs MUST:

- rewind history
- delete invalid descendants
- resume from verified ancestors

Multiverse behavior is forbidden.

---

LAW 7 — LAYER ISOLATION

Each layer has exactly one responsibility.

Truth flows upward only:

RAW → Canonical → Cursor → L1 → L2 → L3 → L4 → L5 → L6 → L7

Forbidden:

- lateral logic
- downward feedback
- cross-layer shortcuts
- duplicate interpretation

Shortcut logic creates long-term corruption.

---

LAW 8 — STRUCTURE OVER STATISTICS

ENGINE V3 is categorical, not probabilistic.

Forbidden anywhere in engine logic:

- confidence scores
- weights
- probabilities
- strength metrics
- numeric thresholds for inference

Structure is observed, not estimated.

---

LAW 9 — LIFECYCLE WITHOUT TIME

Lifecycle transitions are driven by behavioral change, not duration.

Forbidden:

- time-based decay
- block counters
- confirmation windows
- “held for long enough”

If nothing changes, lifecycle does not change.

---

LAW 10 — REPLAY IS FIRST-CLASS

Replay is not a debugging tool.

Replay is a primary operating mode.

- Live runtime and replay runtime MUST behave identically.
- No alternate logic paths.
- No replay-only shortcuts.

If replay requires special handling:

«The architecture is incorrect.»

---

LAW 11 — INFRA ≠ ENGINE

Infrastructure layers may:

- pause
- retry
- throttle
- halt

Infrastructure MUST NEVER:

- interpret structure
- influence lifecycle
- shape outcomes
- inject intelligence

Mechanical limits may stop the engine.
They may never steer it.

---

LAW 12 — ENGINE ENDS AT L6

- L0–L6 = intelligence
- L7 = observability only

L7 MUST NOT:

- influence engine behavior
- confirm transitions
- smooth states
- feed back into any layer

L7 is a camera, not a brain.

---

LAW 13 — BORING IS CORRECT

Kernel layers should feel:

- simple
- rigid
- predictable
- unexciting

If a kernel layer feels “clever”:

«It is probably wrong.»

Excitement belongs in analysis — not in causality.

---

LAW 14 — EXPLICIT FAILURE

Failure modes must be:

- detectable
- repeatable
- auditable
- deterministic

Silent failure is the worst failure.

If the engine cannot proceed correctly:

«It must refuse to proceed.»

---

LAW 15 — ARCHITECTURAL HUMILITY

ENGINE V3 assumes:

- RPC providers fail
- networks lie
- history rewrites
- disks corrupt
- processes crash

The engine must remain truthful despite hostile conditions.

Reality is adversarial.
The engine must be honest.

---

FINAL CONSTITUTIONAL STATEMENT

ENGINE V3 does not predict markets.
ENGINE V3 does not optimize outcomes.
ENGINE V3 does not chase performance.

ENGINE V3 perceives structure truthfully.

If truth is unavailable:

«The engine waits.»

If truth changes:

«The engine corrects.»

If truth contradicts memory:

«Memory is discarded.»

This document exists to prevent the engine from slowly becoming fiction.

Violating these laws may improve short-term convenience.
It will destroy long-term integrity.

Do not violate these laws.
