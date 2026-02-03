// src/config/network.ts

export const NETWORK = {
  name: "bsc",
  chainId: 56,
} as const;

export type Network = typeof NETWORK;
