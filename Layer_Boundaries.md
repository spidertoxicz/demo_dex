Layer_Boundaries.md

ENGINE V3 — ARCHITECTURAL FIREWALL

Status: LOCKED · NON-NEGOTIABLE

This document defines the hard separation of responsibilities across all layers of ENGINE V3.

Layer boundaries exist to prevent cognitive leakage, infra contamination, and structural drift.

If boundaries dissolve, determinism collapses silently.

Protect them.

---

PRIME DIRECTIVE

Every layer must answer exactly ONE question:

«“What is my responsibility — and what is forbidden?”»

If a layer performs work belonging to another layer, the architecture is being violated.

---

THE THREE DOMAINS

ENGINE V3 is divided into three architectural domains:

PHYSICS → COGNITION → PROJECTION

Truth flows upward only.

Never sideways.
Never downward.

---

DOMAIN 1 — PHYSICS (INFRASTRUCTURE)

Components:

- Bootstrap
- RAW Capture
- Canonicalization
- Cursor
- L0 — Deterministic Ingestion

Responsibility:

Capture, order, and deliver causal reality.

MUST NEVER:

- interpret structure
- infer lifecycle
- classify behavior
- compute signals
- filter “noise”
- estimate intent

Physics does not think.

It only preserves truth.

---

L0 — DETERMINISTIC INGESTION (BRIDGE LAYER)

Classification:

Pre-Cognition Bridge

L0 marks the boundary where ordered reality enters the engine.

Responsibility:

- Accept canonical frames
- Enforce sequential ingestion
- Deliver deterministic input to cognition

Forbidden:

- structural labeling
- lifecycle hints
- aggregation
- heuristic filtering
- probabilistic scoring

L0 is a membrane — not a brain.

---

DOMAIN 2 — COGNITION (ENGINE CORE)

Components:

- L1 — Physics Sensor
- L1.5 — Spatial Geometry
- L2 — Structural Interpreter
- L3 — Anchor Lifecycle FSM
- L4 — Range Lifecycle FSM
- L5 — Global Structural State
- L6 — Engine Mode

Cognition begins at L1.

Not before.

---

L1 — PHYSICS SENSOR

Responsibility:

Expose mechanical chain facts.

Forbidden:

- candles
- indicators
- smoothing
- thresholds
- lifecycle logic

L1 observes thermodynamics — not meaning.

---

L1.5 — SPATIAL GEOMETRY

Responsibility:

Represent LP topology in tick-space.

Forbidden:

- price interpretation
- ratios
- behavioral inference
- structural conclusions

Geometry is not structure.

---

L2 — STRUCTURAL INTERPRETER

⚠️ First intelligence layer.

Responsibility:

Convert physics into structural labels.

Allowed examples:

- vacuum vs wall
- absorption vs retreat
- ahead vs behind

Forbidden:

- lifecycle memory
- confirmation windows
- time bias

L2 detects.

It does not remember.

---

L3 & L4 — LIFECYCLE FSM (KERNEL)

Responsibility:

Track structural birth, stress, decay, and death.

Kernel Constraints:

- finite states only
- explicit transitions
- no timers
- no counters
- no duration logic

Lifecycle changes ONLY when behavior changes.

Never when time passes.

---

L5 — GLOBAL STRUCTURAL STATE

Responsibility:

Compress lifecycle truth into a macro structural phase.

MUST BE:

- stateless
- deterministic
- pure mapping

UNCERTAIN is allowed only for lifecycle contradiction.

Never for ambiguity tolerance.

---

L6 — ENGINE MODE (POSTURE)

Responsibility:

Describe engine posture toward structure.

MUST NEVER:

- generate signals
- imply direction
- estimate probability
- influence execution

L6 is descriptive.

Not predictive.

---

DOMAIN 3 — PROJECTION

L7 — OBSERVABILITY

Responsibility:

Mirror engine truth externally.

Examples:

- UI
- dashboards
- alerts
- telemetry

Absolute Rule:

No component inside cognition may read from L7.

Ever.

---

Forbidden:

- feedback loops
- transition confirmation
- smoothing
- delayed truth
- historical averaging

L7 is a camera.

Not memory.
Not judgment.
Not intelligence.

---

CROSS-DOMAIN FIREWALL RULES

RULE 1 — NO DOWNWARD INFLUENCE

Higher layers must never alter lower-layer truth.

Interpretation cannot rewrite physics.

---

RULE 2 — NO SIDEWAYS LOGIC

Layers may not borrow responsibilities from neighbors.

Shortcuts create future corruption.

---

RULE 3 — INTERPRET EXACTLY ONCE

Structure must be interpreted at L2 — nowhere else.

Duplicate interpretation causes state divergence.

---

RULE 4 — INFRA MAY STOP THE ENGINE

Infra may:

- pause
- retry
- rewind

Infra may NEVER:

- shape structure
- influence lifecycle
- steer cognition

Mechanical protection is allowed.
Behavioral influence is forbidden.

---

RULE 5 — PROJECTION HAS ZERO AUTHORITY

Observability exists for humans.

Not for the engine.

The engine must remain fully self-sufficient.

---

BOUNDARY VIOLATION WARNING SIGNS

If you observe any of the following, stop immediately:

- “Let’s compute this earlier for efficiency.”
- “We already have the data — just infer it here.”
- “It’s only a small shortcut.”
- “Let’s confirm using UI history.”

These are the birthplaces of architectural drift.

---

FINAL CONSTITUTIONAL STATEMENT

Clear boundaries create stable systems.

Blurred boundaries create silent corruption.

ENGINE V3 survives long-term not because it is clever —
but because each layer refuses work that is not its own.

Protect the boundaries.
Protect determinism.
Protect truth.
