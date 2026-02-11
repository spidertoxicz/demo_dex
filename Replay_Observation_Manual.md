ENGINE V3 — Replay Observation Manual
Operator Checklist · Read-Only Phase
Purpose
This manual defines how to observe Engine V3 replay safely.
Replay Observation is NOT debugging.
Replay Observation is NOT optimization.
Replay Observation is NOT architecture redesign.
Replay Observation exists to:
Align human intuition with engine perception without corrupting determinism.
What This Manual Is NOT
❌ Not a test suite
❌ Not replay harness logic
❌ Not analytics
❌ Not signal research
This manual does not change the engine.
It trains the operator.
Relationship to replay_harness.ts
Component
Role
replay_harness.ts
Machine determinism verifier (PASS / FAIL)
Replay Observation Manual
Human perception alignment
If determinism fails → fix immediately.
If behavior feels weird → observe first.
Never invert this order.
Operating Rule (NON-NEGOTIABLE)
No engine logic changes are allowed during observation.
Observation phase is read-only thinking.
SECTION 0 — Pre-Observation Sanity Check
Before observing anything, confirm:
[ ] Replay starts from cold state
[ ] Replay uses exact production pipeline
[ ] Same block range produces identical output across runs
[ ] No replay-specific shortcuts exist
If any item fails →
❌ STOP OBSERVATION
This is a determinism bug, not a behavioral issue.
SECTION 1 — What to Look At First
During replay, ignore full traces initially.
Focus ONLY on:
Lifecycle transitions
Global state changes
Engine mode changes
Transitions tell the story.
Static states do not.
SECTION 2 — Transition Density Check
Observe transition frequency.
Ask:
[ ] Are transitions happening every block? (⚠️ suspicious)
[ ] Are there long stable periods? (expected)
[ ] Do transitions cluster during volatile periods? (normal)
Red Flags (DO NOT FIX YET)
Rapid oscillation between states
ACTIVE ↔ FADING ↔ ACTIVE loops within few blocks
Log these. Do not react.
SECTION 3 — Lifecycle Stability Review
L3 — Anchor Lifecycle
Observe:
[ ] ANCHOR_NEW persists more than 1–2 blocks
[ ] ANCHOR_ACTIVE feels structurally stable
[ ] ANCHOR_FADING precedes ANCHOR_DEAD logically
[ ] No NEW → DEAD jumps
Expected behavior:
monotonic decay
no teleporting states
L4 — Range Lifecycle
Observe:
[ ] RANGE_ACTIVE dominates stable regimes
[ ] RANGE_STRESSED appears before ABANDONED
[ ] ABANDONED → DEAD feels structural
[ ] DEAD → ACTIVE only occurs with new anchor
Unexpected behavior ≠ bug yet.
SECTION 4 — Cross-Layer Consistency
Ask these questions without judgment:
[ ] Anchor fading → does range weaken soon after?
[ ] RANGE_ABANDONED → STRUCTURE_BREAKING?
[ ] Engine mode matches global structure intuitively?
If something feels off:
📌 Log as cross-layer tension
Do NOT fix yet.
SECTION 5 — UNCERTAIN State Audit
UNCERTAIN is not noise.
It is a structural alarm.
Check:
[ ] Why did UNCERTAIN occur?
[ ] Was it due to lifecycle contradiction?
[ ] Did it resolve quickly?
[ ] Is it rare?
Healthy UNCERTAIN behavior:
rare
short-lived
explainable
Frequent UNCERTAIN = interpretation tension upstream.
SECTION 6 — Time Independence Check
Ask:
[ ] Would this transition make sense if blocks were faster?
[ ] Would it make sense if blocks were slower?
If NO →
⚠️ Time leakage detected
This violates Engine V3 invariants.
SECTION 7 — Categorization (CRITICAL STEP)
Every observed “weird” behavior must go into exactly one bucket.
Bucket A — Determinism Bug
Examples:
Replay mismatch
Non-repeatable state
Order-dependent output
✅ Fix immediately
Bucket B — Expected Structural Churn
Examples:
Short STRESSED flickers
Quick NEW → ACTIVE
Brief DEFENSE phases
✅ Do nothing
This is real market behavior.
Bucket C — Architectural Question
Examples:
“Why does anchor die here?”
“Why is range still alive after fade?”
“Why UNCERTAIN here?”
✅ Collect only
Do not fix yet.
Patterns matter more than single cases.
SECTION 8 — Observation Log (RECOMMENDED)
Maintain a simple log per replay:
Salin kode

Block Range: 18,440,000 – 18,445,000

Observations:
- Frequent ANCHOR_FADING during high activity
- RANGE_STRESSED oscillates but recovers
- One UNCERTAIN resolved in 12 blocks

Classification:
- Mostly Bucket B
- One Bucket C
After multiple replays, patterns emerge naturally.
SECTION 9 — Forbidden Reactions
During observation, NEVER:
Add counters
Add smoothing
Add thresholds
Redesign FSMs
Introduce time-based rules
These actions destroy signal.
SECTION 10 — When Observation Phase Ends
You are ready to move on only when you start saying:
“This transition pattern repeats”
“This behavior is always present”
“This UNCERTAIN always resolves this way”
Only then is it safe to:
➡️ Design Replay Trace Schema v2
➡️ Tighten invariants
➡️ Add annotations (not filters)
Final Operator Law
Replay noise is the cost of perception.
Silence is worse.
If replay feels loud, the engine sees.
If replay feels quiet, the engine is blind.
Status
Engine: READ-ONLY
Operator: OBSERVE
Architecture: LOCKED
END — REPLAY OBSERVATION MANUAL
