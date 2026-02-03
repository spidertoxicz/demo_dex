// bootstrap/bootstrap_context.ts

export type RpcProvider = "ANKR";

export interface BootstrapContext {
  readonly chainId: number;
  readonly networkName: string;
  readonly rpcProvider: RpcProvider;
  readonly rpcUrl: string;
  readonly finalityOffsetBlocks: number;
  readonly maxReorgDepth: number;
}

/**
 * HARD RULE:
 * - Context MUST NOT change at runtime
 * - Engine MUST NOT see blocks newer than (latest - finalityOffsetBlocks)
 * - Engine MUST run on BSC mainnet ONLY
 */
function assertBootstrapContext(ctx: BootstrapContext) {
  // 🔒 Chain lock: BSC mainnet only
  if (ctx.chainId !== 56) {
    throw new Error("BOOTSTRAP_ERROR: INVALID_CHAIN_ID (expected 56 / BSC)");
  }

  if (ctx.networkName !== "bsc") {
    throw new Error("BOOTSTRAP_ERROR: INVALID_NETWORK_NAME (expected 'bsc')");
  }

  // 🔒 RPC sanity check (simple & sufficient)
  if (!ctx.rpcUrl.toLowerCase().includes("bsc")) {
    throw new Error("BOOTSTRAP_ERROR: RPC_URL_NOT_BSC");
  }

  // 🔒 Safety sanity
  if (ctx.finalityOffsetBlocks <= 0) {
    throw new Error("BOOTSTRAP_ERROR: INVALID_FINALITY_OFFSET");
  }

  if (ctx.maxReorgDepth < 0) {
    throw new Error("BOOTSTRAP_ERROR: INVALID_REORG_DEPTH");
  }
}

export function createBootstrapContext(
  ctx: BootstrapContext
): Readonly<BootstrapContext> {
  assertBootstrapContext(ctx);
  return Object.freeze({ ...ctx });
}
