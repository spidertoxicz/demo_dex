// src/config/token.ts

import { NETWORK } from "./network";

export const TOKEN_BSU = {
  symbol: "BSU",
  address: "0xBee2C57e3a11220e2B948E26965DAAA9dFD87A4A",
  decimals: 18,
  chainId: NETWORK.chainId,
} as const;

export type Token = typeof TOKEN_BSU;
