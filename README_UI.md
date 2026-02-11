🔒 README_UI.md — CORRECTED & FINAL LOCK (v1.1)
Below is the corrected version.
You can replace your README_UI.md with this.
I’ll mark only what changed conceptually, but this is safe to paste as full file.
ENGINE V3 — UI CONTRACT (READ-ONLY)
STATUS: FINAL LOCK (UI Semantics)
This document defines UI behavior for Engine V3.
UI is strictly an observability layer.
UI MUST NOT affect engine logic.
UI MUST NOT act as a trading interface.
If something is not written here, IT DOES NOT EXIST in UI.
0. UI Philosophy
UI is a window into engine perception.
UI is NOT:
a trading tool
a signal generator
a decision engine
UI exists to help humans:
Observe LP structure
Understand lifecycle
Understand regime transitions
UI must not encourage:
Buy / Sell thinking
Entry / Exit thinking
Indicator interpretation
1. UI Data Source (Authoritative)
UI consumes ONLY:
L7 — Latest Engine Structural Snapshot
Important clarification:
L7 snapshot is block-causal
L7 always reflects the latest committed engine truth
UI may read snapshots on a schedule, but does not define structure
UI MUST NOT:
Read from L0–L6
Read from engine memory
Read from normalization
Read from raw RPC
UI is downstream of L7 only.
2. Snapshot vs Alert Cadence (VERY IMPORTANT)
Structural Evaluation
Happens block-by-block
Driven only by on-chain events
Part of engine (L0–L6)
UI / Telegram Dispatch
Happens on wall-clock schedule (e.g. every 15 minutes)
Transport only
Does NOT trigger structure
Does NOT confirm structure
Does NOT delay structure
Time schedules broadcast truth — they never create truth.
3. UI Is Read-Only
UI MUST NOT:
Send commands to engine
Modify engine state
Trigger recalculation
Feed data back to engine
UI is a passive observer.
4. UI Panels (Allowed)
UI panels must map directly to L7 output fields.
4.1 Structural Snapshot Panel
Shows:
Anchor lifecycle state
Range lifecycle state
Global structural state
Engine mode
Purpose:
Human-readable summary of structure
Rules:
No color implying buy/sell
No arrows implying direction
No confidence score
4.2 LP Snapshot Heatmap (Visualization Only)
Shows:
Near / Mid / Far liquidity bands
Relative LP presence
Purpose:
Visualize LP positioning topology
Rules:
No numeric depth ladder
No orderbook-style view
No price ladder
No % dominance numbers
Heatmap is spatial, not actionable.
4.3 Anchor Lifecycle Timeline
Shows:
ANCHOR_NEW
ANCHOR_ACTIVE
ANCHOR_FADING
ANCHOR_DEAD
Purpose:
Observe anchor evolution
Rules:
No duration scoring
No time-to-death estimates
No countdowns
4.4 Range Lifecycle Timeline
Shows:
RANGE_ACTIVE
RANGE_STRESSED
RANGE_ABANDONED
RANGE_DEAD
Purpose:
Observe range defense and breakdown
Rules:
No breakout markers
No price overlays
4.5 Structural Context Flags
Shows:
Vacuum vs Wall
Ahead vs Behind
Absorption vs Retreat
Support Rebuild
Purpose:
Show LP behavior context
Rules:
No scoring
No weighting
No probability
4.6 Structural Timeline (History View)
Shows historical L7 snapshots.
Purpose:
Observe regime evolution
Rules:
No backtesting UI
No performance stats
No trade markers
No pattern derivation
No prediction
Timeline is narrative, not analytical.
5. Engine Mode Display Rules
Engine Mode is descriptive posture, not bias.
UI MUST display engine_mode as:
Textual state
Contextual explanation
UI MUST NOT:
Label mode as bullish/bearish
Suggest trades
Allowed:
“STRUCTURAL_BUILD — structure forming”
“STRUCTURAL_BREAKDOWN — defense withdrawn”
Forbidden:
“BUY MODE”
“SELL MODE”
“LONG / SHORT”
6. Structural Reasons Panel
UI MAY show textual reasons directly supplied by L7.
Rules:
UI MUST NOT generate reasons
UI MUST NOT interpret structure
Reasons map to L2/L3/L4 semantics
No numbers
No thresholds
7. Color & Visual Semantics
Colors represent structure, not direction.
Allowed:
Lifecycle phase
Presence / absence
Structural integrity
Forbidden:
Green = buy
Red = sell
Profit / Loss colors
8. UI Does Not Compute
UI MUST NOT:
Recompute bands
Recompute lifecycle
Recompute structure
Derive new metrics
UI displays only what L7 provides.
9. Storage & History
UI may read stored L7 snapshots.
Rules:
Storage is audit-only
UI MUST NOT infer new structure
UI MUST NOT smooth or average snapshots
UI MUST NOT generate analytics
10. Final UI Contract
UI is an observability surface.
UI = Narrative + Visualization
UI ≠ Signal + Decision
ARCHITECTURAL GUARANTEE
ENGINE (L0–L6) → Truth & Structure
L7              → Official Snapshot (block-causal)
UI              → Read-only Observer (time-dispatched)
UI MUST NEVER become part of engine logic.
UI MUST NEVER influence decisions.
END OF README_UI.md
