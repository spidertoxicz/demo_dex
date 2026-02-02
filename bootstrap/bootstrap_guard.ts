// bootstrap/bootstrap_guard.ts

import { BootstrapContext } from "./bootstrap_context";

export class BootstrapGuard {
  private readonly ctx: BootstrapContext;

  constructor(ctx: BootstrapContext) {
    this.ctx = ctx;
  }

  /**
   * Enforce finality window
   */
  assertBlockAllowed(latestBlock: number, targetBlock: number): void {
    const maxAllowed = latestBlock - this.ctx.finalityOffsetBlocks;
    if (targetBlock > maxAllowed) {
      throw new Error(
        `BLOCK_TOO_NEW: target=${targetBlock}, allowed<=${maxAllowed}`
      );
    }
  }

  /**
   * Enforce reorg safety
   */
  assertReorgDepth(depth: number): never | void {
    if (depth > this.ctx.maxReorgDepth) {
      throw new Error(
        `FATAL_REORG: depth=${depth} > max=${this.ctx.maxReorgDepth}. ENGINE HALT REQUIRED`
      );
    }
  }
}
