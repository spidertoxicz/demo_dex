🔒 forbidden.md
ENGINE V3 — Constitutional Guardrails
STATUS: CANONICAL · NON-NEGOTIABLE
Purpose
This file defines architectural violations for Engine V3.
If a change conflicts with any rule below, the change is rejected immediately, regardless of convenience, speed, or perceived benefit.
These rules exist to protect:
Determinism
Structural purity
Replay integrity
Cognitive boundaries
Engine V3 prioritizes durability over flexibility.
PRIME DIRECTIVE
Only the engine thinks.
Everything else observes.
If thinking appears outside /engine, it is a violation.
🔴 CATEGORY A — Causality Violations (SEVERITY: CRITICAL)
❌ Time-Based Cognition
Engine behavior MUST NOT depend on:
wall-clock time
timers
cron schedules
delays
session duration
Blocks are the only clock.
Allowed:
time for transport scheduling
time for logs
Never for structure.
❌ Threshold-Based Structure
The engine MUST NOT introduce:
numeric thresholds
scoring systems
weighted signals
probability models
confidence levels
Engine V3 is categorical, not probabilistic.
If the engine begins to “lean”, determinism is already compromised.
❌ Hidden State / Memory
Forbidden:
rolling counters
decay timers
persistence-based bias
smoothing
averaging
Every state must be explicit and replayable.
Replay must reconstruct cognition from zero.
🔴 CATEGORY B — Boundary Violations (SEVERITY: CRITICAL)
❌ Thinking Outside /engine
The following directories MUST remain non-cognitive:
/observability
/transport
/infra
/replay
/docs
If lifecycle, structure, or interpretation appears there → violation.
❌ UI-Derived Structure
Structure MUST NEVER originate from:
UI computations
dashboards
visual layers
analytics panels
UI is a window, not a sensor.
❌ Replay Influencing Engine Behavior
Replay is an auditor.
Replay MUST NOT:
patch engine logic
compensate for behavior
introduce corrections
“stabilize” transitions
If replay changes cognition, replay is corrupted.
❌ Transport Accessing Engine Internals
Transport layers MUST read only from L7 snapshots.
Forbidden:
direct engine queries
chain reads
lifecycle access
Transport is intentionally blind.
🔴 CATEGORY C — Structural Drift Violations (SEVERITY: HIGH)
❌ Duplicate Interpretation
Structure may be interpreted exactly once.
Flow:
Salin kode

Physics → Structure → Lifecycle → Global → Mode
Later layers compress truth.
They MUST NOT reinterpret it.
❌ Lifecycle Driven by Duration
States MUST NOT change because they have existed “long enough.”
Lifecycle changes ONLY when structural behavior changes.
Never because time passed.
❌ Cleverness Inside Kernel Layers
Kernel layers (L3–L6) must remain mechanically simple.
If a file feels:
clever
heuristic
overly smart
…it is likely wrong.
Boring engines are stable engines.
🔴 CATEGORY D — Determinism Threats (SEVERITY: CRITICAL)
❌ Non-Replayable Logic
Forbidden:
unordered async flows
nondeterministic iteration
randomization
environment-dependent branching
Given identical blocks:
Engine output MUST be identical.
No exceptions.
❌ Schema Drift
Fields MUST NOT appear outside /schemas.
If code invents structure not defined in schemas → violation.
Schemas define reality.
🟡 CATEGORY E — Governance Discipline (SEVERITY: HIGH)
❌ Migration + Redesign Simultaneously
Structural moves must never alter behavior.
Relocate first.
Refactor later.
Always.
❌ Governance Bloat
Do NOT add rules reactively.
New invariants require architectural justification.
More rules ≠ more safety.
Sharp rules create safety.
ALLOWED EVOLUTION (IMPORTANT)
Engine V3 is not frozen forever.
But evolution must follow this order:
Observe via replay
Confirm pattern repetition
Identify structural necessity
Modify schemas
Then update logic
Never invert this.
Observation precedes change.
VIOLATION PROTOCOL
If a proposed change conflicts with this file:
👉 The change is rejected immediately.
Discussion starts only after the violation is acknowledged.
This prevents slow architectural decay.
FINAL LAW
Calm systems survive.
Clever systems drift.
Engine V3 chooses calm.
END — forbidden.md
