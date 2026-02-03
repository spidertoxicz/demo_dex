/**
 * ENGINE V3
 * main.ts — ENTRYPOINT ONLY (MONITOR / PRE-RUNTIME)
 *
 * RULE:
 * - NO market logic
 * - NO state mutation
 * - NO inference
 * - ONLY wiring + observation
 */

import "dotenv/config";
import { JsonRpcProvider } from "ethers";

import { createBootstrapContext } from "./bootstrap/bootstrap_context";
import { bootstrapGuard } from "./bootstrap/bootstrap_guard";

import { NETWORK_BSC } from "./config/network";

// ================================
// BOOTSTRAP (PRE-ENGINE)
// ================================
const BOOTSTRAP_CONTEXT = createBootstrapContext(NETWORK_BSC);

// SAFETY GATE — MUST PASS BEFORE ANYTHING RUNS
bootstrapGuard(BOOTSTRAP_CONTEXT);

// ================================
// PROVIDER (TRANSPORT ONLY)
// ================================
const provider = new JsonRpcProvider(process.env.RPC_BSC);

// ================================
// MONITOR STATE (NON-PERSISTENT)
// ================================
let lastObservedBlock: number | null = null;

// ================================
// MONITOR LOOP (NO ENGINE YET)
// ================================
async function monitorLoop() {
  const latest = await provider.getBlockNumber();

  const safeBlock =
    latest - BOOTSTRAP_CONTEXT.finalityOffsetBlocks;

  if (safeBlock <= 0) return;
  if (lastObservedBlock !== null && safeBlock <= lastObservedBlock) return;

  const block = await provider.getBlock(safeBlock);
  if (!block) return;

  console.log(
    `[MONITOR] block=${block.number} ts=${block.timestamp}`
  );

  lastObservedBlock = block.number;
}

// ================================
// ENTRYPOINT
// ================================
async function main() {
  console.log("ENGINE V3 — MONITOR MODE");
  console.log(`chainId=${BOOTSTRAP_CONTEXT.chainId}`);
  console.log(`finality=${BOOTSTRAP_CONTEXT.finalityOffsetBlocks}`);

  while (true) {
    try {
      await monitorLoop();
    } catch (err) {
      console.error("[MONITOR ERROR]", err);
    }

    // HARD POLL — deterministic & boring (GOOD)
    await new Promise((r) => setTimeout(r, 3_000));
  }
}

main().catch((err) => {
  console.error("[FATAL]", err);
  process.exit(1);
});
