BOOTSTRAP_CONTEXT — REALITY SELECTION CONTRACT

ENGINE V3 — INFRASTRUCTURE LAUNCH LAYER

Status: LOCKED — UNIVERSE DEFINER

---

PRIME DIRECTIVE

"BOOTSTRAP_CONTEXT" defines the immutable runtime universe in which the engine operates.

It establishes:

- chain identity
- finality assumptions
- RPC authority
- universe scope

Bootstrap executes once at startup.

After verification, it becomes silent.

Runtime must never mutate bootstrap state.

---

SCHEMA VERSION

schemaVersion: 1

Versioning is mandatory.

Bootstrap changes require explicit migration.

Never silent alteration.

---

BOOTSTRAP STRUCTURE

type BOOTSTRAP_CONTEXT = {
  schemaVersion: 1

  chain: {
    chainId: number
    networkName: string
  }

  rpc: {
    provider: "ANKR"
    rpcUrl: string
  }

  finality: {
    offsetBlocks: number
    maxReorgDepth: number
  }

  universe: {
    mode: "STATIC" | "DISCOVERY"
    staticPools?: string[]
    discoveryFactories?: string[]
    maxPools: number
  }

  bootstrapMeta: {
    createdAt: number
    environment: "production" | "staging" | "replay"
  }
}

---

CHAIN IDENTITY LAW (CRITICAL)

Chain identity defines the physical universe.

Startup Verification:

On boot:

- Fetch live chainId from RPC.
- Compare with bootstrap.

If mismatch:

→ REFUSE TO START.

Never attempt recovery.

Wrong chain is not a recoverable error.

It is a foreign reality.

---

RPC AUTHORITY LAW

RPC defines your physics gateway.

Hard Rules:

- Provider must be explicit.
- Failover must be deterministic.
- Silent provider switching is forbidden.

Why?

Different providers sometimes return subtly different data.

Provider drift → replay drift.

If failover is required:

It MUST be logged as a severity event.

---

FINALITY LAW

finality: {
  offsetBlocks,
  maxReorgDepth
}

offsetBlocks

Engine MUST NOT process blocks newer than:

latestBlock - offsetBlocks

This creates a safety buffer against shallow reorgs.

Determinism prefers slight delay over structural rewind.

---

maxReorgDepth

Defines the boundary between:

- automatic recovery
- operator intervention

Rule:

Reorg ≤ maxReorgDepth
→ automatic rewind.

Reorg > maxReorgDepth
→ CRITICAL HALT.

Do not attempt heroics beyond this boundary.

Humans decide.

---

UNIVERSE SELECTION LAW

The engine must know exactly which pools belong to reality.

Ambiguous universes create divergent timelines.

---

STATIC MODE (Preferred for Determinism)

Explicit pool list.

Benefits:

- perfectly replayable
- zero discovery drift
- maximum stability

Recommended for early-stage engines.

---

DISCOVERY MODE (Advanced)

Factories may emit new pools.

Allowed ONLY if:

Discovery is replay-deterministic.

Meaning:

Given identical block history → identical pools discovered.

Hard Requirements:

- discovery events MUST originate from canonical data
- discovery MUST be versioned
- universe mutations REQUIRE engine restart

Hot expansion is forbidden.

---

MAX POOLS GUARDRAIL

maxPools: number

Prevents runaway discovery.

Mechanical protection only.

Must NEVER filter based on structure.

Remember:

Mechanical thresholds may STOP the engine.

Never shape it.

---

IMMUTABILITY LAW

After boot verification:

Bootstrap becomes READ-ONLY.

Forbidden at runtime:

❌ config mutation
❌ pool injection
❌ provider swapping
❌ finality changes

If change is required:

→ stop engine
→ migrate
→ restart

Never mutate reality mid-flight.

---

ENVIRONMENT ISOLATION LAW

environment:
  "production" | "staging" | "replay"

Replay must never accidentally point to production endpoints.

Production must never ingest replay data.

Cross-environment contamination is a forensic nightmare.

Hard isolate them.

---

STARTUP VERIFICATION CHECKLIST (ELITE PRACTICE)

Before runtime begins:

✅ chainId matches
✅ canonical schema version matches
✅ cursor schema version matches
✅ RPC reachable
✅ finality sane
✅ universe valid

If any fail:

→ refuse boot.

Correctness > uptime.

Always.

---

BOOTSTRAP SILENCE LAW

After successful startup:

Bootstrap must never influence engine behavior again.

It selected the universe.

Its job is complete.

---

FINAL CONSTITUTIONAL LOCK

Bootstrap selects reality.
RAW captures reality.
Canonical orders reality.
Cursor walks reality.
Engine interprets reality.

If bootstrap selects the wrong universe —
determinism faithfully computes nonsense.

Choose reality carefully.
