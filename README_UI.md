Generate localhost UI v0 sesuai README_UI.md”

README_UI.md

ENGINE V3 — UI CONTRACT (READ-ONLY)

STATUS: LOCKED (UI Semantics)

This document defines UI behavior for Engine V3.
UI is strictly an observability layer.
UI MUST NOT affect engine logic.
UI MUST NOT act as a trading interface.

If something is not written here, IT DOES NOT EXIST in UI.


---

0. UI Philosophy

UI is a window into engine structure.
UI is NOT a trading tool.
UI is NOT a signal generator.
UI is NOT a decision engine.

UI exists to help humans:

Observe LP structure

Understand lifecycle

Understand regime transitions


UI must not encourage:

Buy/Sell thinking

Entry/Exit thinking

Indicator interpretation



---

1. UI Data Source (Authoritative)

UI consumes ONLY:

L7 — 15m Structural Checkpoint


UI MUST NOT:

Read from L0–L6

Read from engine memory

Read from normalization

Read from raw RPC


UI is downstream of L7 only.


---

2. UI Is Read-Only

UI MUST NOT:

Send commands to engine

Modify engine state

Trigger recalculation

Feed data back to engine


UI is a passive observer.


---

3. UI Panels (Allowed)

UI panels must map directly to L7 output fields.

3.1 Structural Snapshot Panel

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



---

3.2 LP Snapshot Heatmap (Visualization Only)

Shows (from L7 structural context + snapshot summary):

Near / Mid / Far liquidity bands

Relative LP presence


Purpose:

Visualize where LPs are positioned


Rules:

No numeric depth ladder

No orderbook style view

No price ladder

No % dominance numbers


Visualization is qualitative, not quantitative.


---

3.3 Anchor Lifecycle Timeline

Shows:

ANCHOR_NEW

ANCHOR_ACTIVE

ANCHOR_FADING

ANCHOR_DEAD


Purpose:

Observe anchor evolution


Rules:

No duration scoring

No time-to-death estimate

No countdowns



---

3.4 Range Lifecycle Timeline

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



---

3.5 Structural Context Flags

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



---

3.6 Structural Timeline (History View)

Shows historical L7 snapshots over time.

Purpose:

Observe regime evolution


Rules:

No backtesting UI

No performance stats

No trade markers


Timeline is narrative, not analytical.


---

4. Panels That Are Explicitly FORBIDDEN

UI MUST NOT include:

Candlestick charts

OHLC charts

Indicators (RSI, MACD, EMA, etc)

Orderbook depth

Trade history

PnL

Win rate

Risk/Reward

Entry/Exit buttons

Buy/Sell buttons

Alerts framed as trade signals



---

5. Engine Mode Display Rules

Engine Mode is descriptive workflow posture.

UI MUST display engine_mode as:

Textual state

Contextual explanation


UI MUST NOT:

Label engine_mode as bullish/bearish

Suggest trades based on mode


Examples:

OK:

"STRUCTURE_FORMING — LP handover likely"

"STRUCTURE_SETTLED — LP structure stable"


NOT OK:

"BUY MODE"

"SELL MODE"

"LONG"

"SHORT"



---

6. Structural Reasons Panel

UI MAY show textual reasons derived from L7:

Examples:

"Near band liquidity weakening"

"LP retreat observed"

"Support rebuild detected"


Rules:

Reasons must map to L2/L3/L4 semantics

No numerical justification

No thresholds



---

7. Color & Visual Semantics

Colors must represent structure, not direction.

Allowed:

Structural strength

Lifecycle phase

Presence / absence


Forbidden:

Green = buy

Red = sell

Profit/Loss colors


Color must be neutral and descriptive.


---

8. UI Does Not Compute

UI MUST NOT:

Recompute bands

Recompute lifecycle

Recompute structure

Derive new metrics


UI displays what L7 provides.


---

9. Storage & History

UI may read from stored L7 snapshots for history.

Rules:

Storage is audit only

UI must not infer new structure from history

UI must not smooth or average snapshots



---

10. Final UI Contract

UI is an observability surface.

UI = Narrative + Visualization
NOT = Signal + Decision

UI MUST preserve engine philosophy:

No thresholds

No scores

No indicators

No predictions



---

ARCHITECTURAL GUARANTEE

ENGINE (L0–L6)  -> Truth & Structure  
L7              -> Official Snapshot  
UI              -> Read-Only Observer

UI MUST NEVER become part of engine logic.
UI MUST NEVER influence decisions.


---

END OF README_UI.md
