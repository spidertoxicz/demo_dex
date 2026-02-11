🔒 ENGINE V3 — Folder Constitution
CANONICAL · NON-NEGOTIABLE
If a behavior is not allowed by the folder structure,
it is not allowed by the engine.
This document defines where logic is allowed to live
and where it is forbidden, independent of developer intention.
PRIME DIRECTIVE
Filesystem enforces architecture.
Humans follow files, not documents.
This constitution assumes humans will make mistakes —
so the structure must prevent them.
TOP-LEVEL REPOSITORY LAYOUT
Salin kode

engine-v3/
│
├─ engine/              # ALL cognition (L0–L6)
├─ replay/              # Determinism verification & audit
├─ observability/       # L7 snapshot & UI feed
├─ transport/           # Telegram, API, external IO
├─ schemas/             # Canonical data contracts
├─ invariants/          # Laws & non-negotiable rules
├─ infra/               # RPC, storage, deployment (NO logic)
├─ docs/                # Human-facing manuals
└─ forbidden.md         # Explicitly disallowed patterns
If logic appears outside engine/, it is a violation by default.
1️⃣ /engine — COGNITION KERNEL (L0–L6)
This is the brain.
Nothing else may think.
Salin kode

engine/
├─ l0_raw/
├─ l1_physics/
├─ l1_5_geometry/
├─ l2_structure/
├─ l3_anchor_fsm/
├─ l4_range_fsm/
├─ l5_global_state/
├─ l6_engine_mode/
└─ engine_entry.ts
HARD RULES
❌ No UI
❌ No transport
❌ No logging beyond debug
❌ No time
❌ No scheduling
❌ No persistence logic
LAW
Engine code must be pure, block-driven, replayable.
2️⃣ /replay — TRUTH VERIFIER (OUTSIDE ENGINE)
Replay is not part of cognition.
Salin kode

replay/
├─ replay_runner.ts
├─ block_loader.ts
├─ state_tracer.ts
├─ transition_logger.ts
├─ determinism_verifier.ts
├─ snapshot_hasher.ts
└─ replay_cli.ts
HARD RULES
❌ Replay MUST NOT modify engine logic
❌ Replay MUST NOT add interpretation
❌ Replay MUST NOT fix behavior
Replay only observes and proves.
Replay answers: “Is the engine lying?”
3️⃣ /observability — L7 SNAPSHOT (CAMERA)
Salin kode

observability/
├─ snapshot_builder.ts
├─ snapshot_store.ts
└─ snapshot_types.ts
HARD RULES
❌ No logic
❌ No derivation
❌ No memory for engine use
❌ No backfeed into /engine
L7 is a mirror, not a memory.
4️⃣ /transport — EXTERNAL IO (DUMB BY DESIGN)
Salin kode

transport/
├─ telegram/
│   ├─ dispatcher.ts
│   └─ formatter.ts
├─ api/
│   └─ read_only_routes.ts
HARD RULES
❌ No engine access beyond L7
❌ No chain access
❌ No structure logic
❌ No time-based cognition
Transport is blind.
It only moves messages.
5️⃣ /schemas — SINGLE SOURCE OF TRUTH
Salin kode

schemas/
├─ l2_structure.schema.ts
├─ l3_anchor.schema.ts
├─ l4_range.schema.ts
├─ l5_global.schema.ts
├─ l6_mode.schema.ts
├─ l7_snapshot.schema.ts
HARD RULES
❌ No logic
❌ No defaults
❌ No computed fields
If a field is not in /schemas,
it does not exist.
6️⃣ /invariants — CONSTITUTIONAL LAW
Salin kode

invariants/
├─ engine_laws.md
├─ layer_boundaries.md
├─ determinism.md
├─ replay_rules.md
└─ ui_contract.md
This is not documentation.
This is enforcement reference.
Every architectural argument must point here.
7️⃣ /infra — SUPPORT ONLY (NO THINKING)
Salin kode

infra/
├─ rpc/
├─ storage/
├─ config/
└─ deploy/
HARD RULES
❌ No structure
❌ No lifecycle
❌ No state
❌ No interpretation
Infra supports thinking.
It never thinks.
8️⃣ /docs — HUMAN LEARNING
Salin kode

docs/
├─ REPLAY_OBSERVATION_MANUAL.md
├─ UI_CONTRACT.md
├─ ARCHITECTURE_OVERVIEW.md
└─ OPERATOR_GUIDE.md
Docs explain.
They do not enforce.
Structure enforces.
9️⃣ forbidden.md — EXPLICIT VIOLATIONS
This file is powerful.
Example content:
Salin kode

FORBIDDEN:
- Time-based lifecycle logic
- Threshold-based structure
- Counters inside engine
- UI-derived structure
- Replay fixing engine behavior
- Transport influencing cognition
If someone proposes one of these → discussion ends.
CROSS-CUTTING LAWS (APPLY EVERYWHERE)
LAW A — THINKING LIVES IN ONE PLACE
Only /engine thinks.
LAW B — OBSERVATION NEVER FEEDS BACK
/observability and /transport are one-way.
LAW C — REPLAY IS JUDGE, NOT PLAYER
Replay audits.
It never corrects.
LAW D — SCHEMAS PRECEDE CODE
If schema is unclear → code is illegal.
LAW E — BORING FILES = SAFE FILES
If a file feels “clever”, it’s in the wrong folder.
WHY THIS STRUCTURE PROTECTS YOU
This constitution prevents:
accidental TA logic
time leakage
UI signal creep
replay “fixing” behavior
infra thinking
future-you shortcuts
Even if:
you are tired
you are rushing
someone else joins
The filesystem stops them.
SECURITY (ADDRESSING YOUR FEAR)
This structure already protects your moat better than encryption:
cognition is isolated
structure is non-obvious
behavior is emergent, not explicit
copying files ≠ copying understanding
Encryption comes later, at transport/output level.
Never encrypt cognition prematurely.
YOUR STATE RIGHT NOW
You are no longer “building features”.
You are laying concrete.
Once this constitution exists, development becomes calmer.
Because chaos now has nowhere to hide.
