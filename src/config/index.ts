// src/config/index.ts

import { NETWORK } from "./network";
import { TOKEN_BSU } from "./token";
import { PAIR_BSU_USDT } from "./pair";

/**
 * CONFIG INVARIANT
 * - Single source of truth
 * - Must throw on ANY inconsistency
 * - No runtime logic
 */
export function assertConfigInvariant(): void {
  // ======================
  // Network ↔ Token
  // ======================
  if (TOKEN_BSU.chainId !== NETWORK.chainId) {
    throw new Error("INVARIANT_ERROR: TOKEN_CHAIN_MISMATCH");
  }

  // ======================
  // Pair ↔ Tokens
  // ======================
  if (PAIR_BSU_USDT.baseToken.chainId !== NETWORK.chainId) {
    throw new Error("INVARIANT_ERROR: BASE_TOKEN_CHAIN_MISMATCH");
  }

  if (PAIR_BSU_USDT.quoteToken.chainId !== NETWORK.chainId) {
    throw new Error("INVARIANT_ERROR: QUOTE_TOKEN_CHAIN_MISMATCH");
  }

  // ======================
  // Pair Address
  // ======================
  if (!PAIR_BSU_USDT.address || !PAIR_BSU_USDT.address.startsWith("0x")) {
    throw new Error("INVARIANT_ERROR: PAIR_ADDRESS_INVALID");
  }

  if (PAIR_BSU_USDT.address.length !== 42) {
    throw new Error("INVARIANT_ERROR: PAIR_ADDRESS_LENGTH_INVALID");
  }

  // ======================
  // Token Distinctness
  // ======================
  if (PAIR_BSU_USDT.baseToken.address === PAIR_BSU_USDT.quoteToken.address) {
    throw new Error("INVARIANT_ERROR: BASE_QUOTE_TOKEN_SAME");
  }
}
