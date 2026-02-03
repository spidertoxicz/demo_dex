import { createBootstrapContext } from "./bootstrap/bootstrap_context";
import { ethers } from "ethers";
import "dotenv/config";

/**
 * =========================
 * ENGINE ENTRYPOINT (V3)
 * MODE: MONITOR ONLY
 * =========================
 */

// ===== CONFIG (LOCKED) =====
const BOOTSTRAP_CTX = createBootstrapContext({
  chainId: 56,
  networkName: "bsc",
  rpcProvider: "ANKR",
  rpcUrl: "https://rpc.ankr.com/bsc",
  finalityOffsetBlocks: 8,
  maxReorgDepth: 1,
});

// BSU TOKEN (LOCKED)
const TOKEN_BSU = {
  address: "0xBee2C57e3a11220e2B948E26965DAAA9dFD87A4A",
  symbol: "BSU",
};

// ===== PROVIDER =====
const provider = new ethers.JsonRpcProvider(BOOTSTRAP_CTX.rpcUrl);

// ===== STATE =====
let lastProcessedBlock: number | null = null;

// ===== MAIN LOOP =====
async function startEngine() {
  console.log("🚀 Engine V3 started");
  console.log("🔒 Network:", BOOTSTRAP_CTX.networkName);
  console.log("🔗 Chain ID:", BOOTSTRAP_CTX.chainId);
  console.log("👀 Monitoring token:", TOKEN_BSU.symbol, TOKEN_BSU.address);

  provider.on("block", async (latestBlockNumber) => {
    try {
      const safeBlock =
        latestBlockNumber - BOOTSTRAP_CTX.finalityOffsetBlocks;

      if (safeBlock <= 0) return;

      if (lastProcessedBlock !== null && safeBlock <= lastProcessedBlock) {
        return;
      }

      const block = await provider.getBlock(safeBlock);
      if (!block) return;

      // ===== BASIC LOG =====
      console.log(
        `[BLOCK] #${block.number} | ts=${block.timestamp} | txs=${block.transactions.length}`
      );

      lastProcessedBlock = block.number;
    } catch (err) {
      console.error("❌ Engine error:", err);
      console.error("🛑 Engine halted for safety");
      process.exit(1);
    }
  });
}

// ===== BOOT =====
startEngine().catch((err) => {
  console.error("❌ Fatal startup error:", err);
  process.exit(1);
});
