// src/config/pair.ts

import { TOKEN_BSU } from "./token";

export const PAIR_BSU = {
  dex: "PancakeSwapV3",
  baseToken: TOKEN_BSU.symbol, // BSU
  quoteToken: "USDT",          // 🔒 ANCHOR
  quoteDecimals: 18,           // BSC USDT = 18
  address: "0xBee2C57e3a11220e2B948E26965DAAA9dFD87A4A",
} as const;

export type Pair = typeof PAIR_BSU;
