STATE_TRANSITIONS.md

ENGINE V3 — KERNEL PHYSICS

Status: LOCKED · NON-NEGOTIABLE · CAUSAL

This document defines the laws of motion governing all lifecycle state machines inside ENGINE V3.

States define structure.
Transitions define behavior.

If transitions are not explicitly constrained, determinism collapses silently.

This file prevents architectural drift.

---

PRIME DIRECTIVE

A state machine is deterministic only when:

👉 Every allowed transition is explicit.
👉 Every illegal transition is forbidden.
👉 No transition is implied.

Undefined motion is forbidden.

---

GLOBAL TRANSITION LAWS

These laws apply to ALL FSM layers.

---

LAW 1 — NO TELEPORTATION

A state may only transition to its explicitly permitted neighbors.

Forbidden:

- skipping intermediate states
- jumping across lifecycle phases
- retroactive resurrection

State evolution must be mechanically continuous.

---

LAW 2 — NO IMPLICIT RESETS

The engine must never silently reset a lifecycle.

Forbidden patterns:

- defaulting to NEW
- auto-returning to ACTIVE
- clearing state on ambiguity

Resets must only occur through defined transitions.

---

LAW 3 — FORWARD CAUSALITY ONLY

Transitions must be triggered by observed structural change — never by absence of data or passage of time.

Forbidden triggers:

- timers
- block counters
- duration thresholds
- decay variables

If nothing structurally changes, the state must persist.

---

LAW 4 — ILLEGAL TRANSITIONS MUST FAIL LOUDLY

If an undefined transition is attempted:

The engine MUST:

- reject the transition
- emit a structural error
- halt the affected lifecycle update

Silent acceptance is forbidden.

---

LAW 5 — REPLAY PARITY

Given identical canonical input:

State transitions MUST occur identically in replay.

If replay produces a different transition path:

«The FSM is broken.»

---

L3 — ANCHOR LIFECYCLE FSM

States:

ANCHOR_NEW  
ANCHOR_ACTIVE  
ANCHOR_FADING  
ANCHOR_DEAD

---

Allowed Transitions

NEW → ACTIVE

Anchor demonstrates structural defense.

ACTIVE → FADING

Defense weakens but remains observable.

FADING → DEAD

Structural support disappears.

DEAD → NEW

A genuinely new anchor emerges.

This is not resurrection.
This is replacement.

---

Allowed Recovery

FADING → ACTIVE

If defense strength clearly returns.

This represents structural recovery — not reset.

---

Forbidden Transitions

❌ NEW → DEAD
(Anchor cannot die before activation.)

❌ ACTIVE → NEW
(No implicit lifecycle reset.)

❌ DEAD → ACTIVE
(Prevents anchor resurrection.)

❌ FADING → NEW
(Prevents timeline rewrite.)

❌ ANY → NEW without structural trigger

---

Persistence Rule

If signals are ambiguous:

👉 Maintain current state.

The engine must prefer persistence over guessing.

---

L4 — RANGE LIFECYCLE FSM

States:

RANGE_ACTIVE  
RANGE_STRESSED  
RANGE_ABANDONED  
RANGE_DEAD

---

Allowed Transitions

ACTIVE → STRESSED

Defense weakens under pressure.

STRESSED → ABANDONED

Liquidity withdraws.

ABANDONED → DEAD

Range ceases to exist.

---

Allowed Recovery

STRESSED → ACTIVE

Defense re-stabilizes.

ABANDONED → STRESSED

Liquidity reappears.

This is recovery — not reset.

---

Special Case — DEAD → ACTIVE

Allowed ONLY when:

👉 A structurally new defended range forms.

This must originate from L2 structural detection.

Never infer continuity.

---

Forbidden Transitions

❌ ACTIVE → DEAD
(Skips structural degradation.)

❌ DEAD → STRESSED
(A dead range cannot be pressured.)

❌ STRESSED → DEAD without abandonment

❌ ANY → ACTIVE without defense evidence

---

CROSS-FSM CONSISTENCY LAW

L3 and L4 must never contradict in ways that violate structural reality.

Example contradictions:

- ANCHOR_DEAD + RANGE_ACTIVE
- ANCHOR_NEW + RANGE_DEAD

When contradictions occur:

👉 L5 must classify STRUCTURE_UNCERTAIN.

Never “force-fit” alignment.

Ambiguity is safer than fiction.

---

L5 — GLOBAL STRUCTURE TRANSITIONS

L5 is a pure mapping layer.

It MUST NOT:

- invent transitions
- smooth contradictions
- reinterpret lifecycle

If upstream states conflict:

Return:

STRUCTURE_UNCERTAIN

UNCERTAIN is a safety state — not a weakness.

---

L6 — ENGINE MODE STABILITY

Engine mode must transition ONLY when L5 changes.

Forbidden:

- mode oscillation inside a single block
- interpretation-based flips
- sensitivity tuning

One block → one posture evaluation.

---

AMBIGUITY RULE

When structural signals are insufficient:

👉 Do nothing.

Hold the current state.

Deterministic engines prefer inertia over speculation.

---

ATOMIC TRANSITION RULE

All lifecycle updates for a block must commit atomically.

Forbidden:

- partial FSM commits
- mixed-state frames
- mid-propagation persistence

Either the entire causal step succeeds — or none of it exists.

---

STRUCTURAL SUCCESSION PRINCIPLE

When a structure dies:

The next structure must be detected — not assumed.

Death creates space.

It does not imply replacement.

---

TRANSITION OBSERVABILITY

Every transition must be externally traceable via replay logs.

Transitions must never be:

- implicit
- hidden
- inferred retroactively

Auditability is part of determinism.

---

FINAL CONSTITUTIONAL STATEMENT

ENGINE V3 is a block-driven state evolution machine.

Time advances.
Structure responds.
Lifecycle updates.

Transitions must remain:

- explicit
- causal
- replayable
- finite

Undefined transitions are silent corruption.

This document exists to ensure the engine evolves like physics — not behavior.

Protect it accordingly.
