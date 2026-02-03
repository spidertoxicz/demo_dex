// src/config/pair.ts

import { TOKEN_BSU } from "./token";
import { NETWORK } from "./network";

export const TOKEN_USDT = {
  symbol: "USDT",
  address: "0x55d398326f99059fF775485246999027B3197955", // BSC USDT
  decimals: 18,
  chainId: NETWORK.chainId,
} as const;

export const PAIR_BSU_USDT = {
  dex: "PancakeSwapV3",
  baseToken: TOKEN_BSU,
  quoteToken: TOKEN_USDT,
  // ⬇️ POOL address, NOT token address
  address: "0xBee2C57e3a11220e2B948E26965DAAA9dFD87A4A",
} as const;

export type Pair = typeof PAIR_BSU_USDT;
