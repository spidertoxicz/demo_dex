import { PAIR_BSU } from "./pair";

export function assertInvariant() {
  if (!PAIR_BSU.address || PAIR_BSU.address.startsWith("0xPASTE")) {
    throw new Error("INVARIANT_ERROR: PAIR_ADDRESS_NOT_SET");
  }

  if (PAIR_BSU.quoteToken !== "USDT" && PAIR_BSU.quoteToken !== "WBNB") {
    throw new Error("INVARIANT_ERROR: UNSUPPORTED_QUOTE_TOKEN");
  }
}
