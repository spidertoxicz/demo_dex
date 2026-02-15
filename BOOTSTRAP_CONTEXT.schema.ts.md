BOOTSTRAP_CONTEXT.schema.ts

ENGINE V3 — IMMUTABLE RUNTIME CONTEXT

Status: LOCKED · IMMUTABLE · PRE-ENGINE

This schema defines the runtime environment within which ENGINE V3 operates.

Bootstrap executes BEFORE:

- Cursor activation
- Canonical ingestion
- Engine cognition

Bootstrap is not engine intelligence.

It defines:

«The boundaries of engine existence.»

Once initialized, BootstrapContext must never change.

---

PRIME DIRECTIVE

BootstrapContext must:

- Fully define runtime reality
- Be immutable after initialization
- Be versioned if changed
- Require full engine restart upon modification

Dynamic mutation is forbidden.

---

TYPE DEFINITION

// BOOTSTRAP_CONTEXT.schema.ts

export type BootstrapContext = Readonly<{

  // --- Chain Identity ---
  chainId: number
  networkName: string

  // --- RPC Provider ---
  rpcProvider: "ANKR" | "CUSTOM"
  rpcUrl: string

  // --- Finality Policy ---
  finalityOffsetBlocks: number
  maxReorgDepth: number

  // --- Universe Definition ---
  universePolicy: UniversePolicy

  // --- Time Authority ---
  timeAuthority: "BLOCK_TIME"

  // --- Runtime Versioning ---
  engineVersion: string

}>

---

UNIVERSE POLICY

export type UniversePolicy = Readonly<{

  mode: "STATIC" | "DISCOVERY"

  staticPools?: ReadonlyArray<string>

  discoveryFactories?: ReadonlyArray<string>

  maxPools: number

}>

---

FIELD DEFINITIONS

chainId

Must match the chain being polled.

Mismatch between chainId and RPC provider must halt engine.

---

networkName

Human-readable label.

Must not influence engine logic.

Observability only.

---

rpcProvider / rpcUrl

Defines the source of RAW capture.

Changing provider requires engine restart.

No runtime provider switching.

---

finalityOffsetBlocks

Engine must not process blocks newer than:

latestBlock - finalityOffsetBlocks

This protects against shallow reorg instability.

This is mechanical safety — not structural thresholding.

---

maxReorgDepth

Defines maximum tolerated fork depth.

If exceeded:

→ Halt engine
→ Emit critical alert
→ Require manual intervention

Never auto-resolve deep forks.

---

universePolicy

Defines which pools are eligible for processing.

Must be deterministic.

Dynamic discovery must be logged and versioned.

Universe changes require restart.

---

timeAuthority

Must always be:

"BLOCK_TIME"

Wall-clock time is forbidden for engine causality.

Wall-clock is allowed only for L7 snapshot scheduling.

---

engineVersion

Semantic version string.

Used for:

- replay audit
- migration tracking
- reproducibility

Must not alter runtime behavior dynamically.

---

HARD INVARIANTS

INVARIANT 1 — IMMUTABILITY

BootstrapContext must be:

- Loaded once
- Frozen in memory
- Never mutated

Any detected mutation must trigger engine halt.

---

INVARIANT 2 — VERSIONED CHANGES

If BootstrapContext changes:

- Bump engineVersion
- Restart engine
- Re-validate cursor compatibility

Never hot-swap runtime reality.

---

INVARIANT 3 — NO STRUCTURAL LOGIC

Bootstrap must never contain:

- lifecycle defaults
- structural thresholds
- inference toggles
- behavior flags

It defines environment — not cognition.

---

INVARIANT 4 — DETERMINISTIC UNIVERSE

UniversePolicy must guarantee:

- Stable pool selection
- Deterministic inclusion
- No probabilistic filtering

Dynamic discovery must be reproducible.

---

INVARIANT 5 — BLOCK TIME ONLY

Engine logic must use:

block.timestamp

Never:

Date.now()

Wall-clock is non-authoritative.

---

FAILURE POLICY

If BootstrapContext fails validation:

- Do not start engine
- Emit fatal error
- Require operator correction

Startup integrity > uptime.

---

RELATION TO RUNTIME FLOW

Runtime order:

Load BootstrapContext
   ↓
Initialize Cursor
   ↓
Begin Canonical ingestion
   ↓
Propagate to L0

Bootstrap must complete successfully before motion begins.

---

FINAL CONSTITUTIONAL STATEMENT

BootstrapContext defines:

- Where the engine runs
- What chain it trusts
- How far it trusts finality
- What universe it observes

It must remain:

- Immutable
- Deterministic
- Explicit
- Restart-bound

If Bootstrap drifts,
the engine drifts.

Lock it before motion begins.
