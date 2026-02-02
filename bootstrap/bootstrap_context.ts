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
 */
export function createBootstrapContext(
  ctx: BootstrapContext
): Readonly<BootstrapContext> {
  return Object.freeze({ ...ctx });
}
