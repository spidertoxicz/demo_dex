ENGINE_RUNTIME_CURSOR — CAUSAL CONTRACT

ENGINE V3 — DETERMINISTIC NAVIGATION LAYER

Status: LOCKED — REPLAY-CRITICAL

---

PRIME DIRECTIVE

"ENGINE_RUNTIME_CURSOR" defines the engine’s exact position within the canonical causal chain.

It guarantees that block progression is:

- sequential
- hash-anchored
- rewindable
- replay-safe

The cursor does not interpret reality.

It navigates it.

---

SCHEMA VERSION

schemaVersion: 1

Versioning is mandatory.

Cursor migrations must be explicit and auditable.

---

CURSOR STRUCTURE

type ENGINE_RUNTIME_CURSOR = {
  schemaVersion: 1

  chainId: number

  lastProcessed: {
    blockNumber: number
    blockHash: string
  }

  nextExpectedBlock: number

  finalizedCheckpoint?: {
    blockNumber: number
    blockHash: string
  }

  cursorMeta: {
    canonicalSchemaVersion: number
    updatedAtWallClock: number
  }
}

---

FIELD PHILOSOPHY

chainId (CRITICAL)

Prevents cross-network corruption.

Hard Law:

If chainId mismatches at startup → REFUSE TO BOOT.

Never attempt recovery.

Wrong chain = foreign universe.

---

lastProcessed (CAUSAL ANCHOR)

lastProcessed: {
  blockNumber
  blockHash
}

This pair defines the engine’s current reality boundary.

Absolute Rules:

- Hash MUST match canonical history.
- Number alone is forbidden as authority.
- Both fields are mandatory.

Numbers locate.

Hashes verify.

---

nextExpectedBlock

nextExpectedBlock = lastProcessed.blockNumber + 1

Must always be deterministic.

Hard Rules:

If incoming block.number != nextExpectedBlock:

→ HALT runtime.

Never auto-heal gaps.

Never fast-forward.

Never skip.

Pause > corruption.

Always.

---

finalizedCheckpoint (Optional but Powerful)

Represents the deepest block considered economically irreversible.

Useful for:

- pruning replay depth
- accelerating recovery
- limiting rewind cost

Hard Rule:

Checkpoint MUST also be hash-anchored.

Never checkpoint by number alone.

---

cursorMeta

Operational metadata only.

Must NEVER influence engine cognition.

Wall-clock fields are allowed here because:

👉 Cursor is infrastructure — not structure.

But they must remain observational.

Never causal.

---

STARTUP VERIFICATION LAW (VERY IMPORTANT)

On engine boot:

1️⃣ Load cursor
2️⃣ Fetch canonical block at "lastProcessed.blockNumber"
3️⃣ Compare hashes

If mismatch:

→ trigger reorg recovery immediately.

Never continue optimistically.

Optimism is not determinism.

---

REORG RECOVERY LAW

If parentHash mismatch is detected:

Cursor MUST rewind to the last matching hash.

Not an estimated depth.

Not a configured number.

The LAST VERIFIED HASH.

History must remain reconstructible.

---

CRASH RECOVERY LAW

Cursor MUST be persisted atomically.

Forbidden patterns:

❌ in-memory only
❌ async unsafe writes
❌ partial commits

If a crash occurs after processing block N…

Cursor must still point to N.

Never N-1.
Never unknown.

Atomic persistence is replay safety.

---

NO SKIP LAW

Cursor advancement MUST follow:

process block → commit cursor

Never the reverse.

Never speculative advancement.

Forward motion without processing is causal fraud.

---

REPLAY MODE COMPATIBILITY

During replay:

Cursor behavior MUST be identical to live runtime.

No alternate logic paths allowed.

Replay is not a simulation.

Replay is reality reconstruction.

---

MULTI-INSTANCE PROTECTION (ELITE RULE)

Only ONE runtime may control a cursor.

If multiple runtimes attempt control:

→ refuse startup.

Cursor contention creates timeline forks.

Forked timelines destroy determinism.

---

CURSOR IMMUTABILITY LAW

Historical cursor positions MUST remain reconstructible.

Never overwrite logs silently.

Cursor history is part of auditability.

---

FINAL CONSTITUTIONAL LOCK

RAW defines reality.
Canonical orders reality.
Cursor walks reality.
Engine interprets reality.

If the cursor lies about position —
every state above it becomes fiction.
