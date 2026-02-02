// bootstrap/time_authority.ts

export type TimeAuthority = "BLOCK_TIME";

/**
 * HARD RULES:
 * - All engine time = blockTimestamp
 * - Date.now() FORBIDDEN in engine logic
 * - Wall clock ONLY allowed for L7 snapshots
 */
export const TIME_AUTHORITY: TimeAuthority = "BLOCK_TIME";

export interface BlockTime {
  readonly blockNumber: number;
  readonly blockTimestamp: number;
}

export function getEngineTime(block: BlockTime): number {
  return block.blockTimestamp;
}
