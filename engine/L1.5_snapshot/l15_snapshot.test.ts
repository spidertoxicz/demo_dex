// l15_snapshot.test.ts

import { generateL15Snapshot } from "./l15_snapshot";

describe("L1.5 Semantic Geometry Snapshot", () => {

  test("dominance NONE when liquidity = 0", () => {
    const snap = generateL15Snapshot(1, "0xpool", 0, {
      near: { liquidity: 0n, netLiquidity: 0n },
      mid:  { liquidity: 0n, netLiquidity: 0n },
      far:  { liquidity: 0n, netLiquidity: 0n },
    });

    expect(snap.bands.near.dominance).toBe("NONE");
    expect(snap.bands.mid.rangeStructure).toBe("NONE");
    expect(snap.bands.far.dominance).toBe("NONE");
  });

  test("balanced vs bounded semantics", () => {
    const snap = generateL15Snapshot(1, "0xpool", 0, {
      near: { liquidity: 10n, netLiquidity: 0n },
      mid:  { liquidity: 20n, netLiquidity: 0n },
      far:  { liquidity: 30n, netLiquidity: 0n },
    });

    expect(snap.bands.near.dominance).toBe("BALANCED");
    expect(snap.bands.mid.rangeStructure).toBe("BOUNDED");
    expect(snap.bands.far.dominance).toBe("BALANCED");
  });

  test("directional dominance semantics", () => {
    const snap = generateL15Snapshot(1, "0xpool", 0, {
      near: { liquidity: 10n, netLiquidity: -5n },
      mid:  { liquidity: 20n, netLiquidity: 7n },
      far:  { liquidity: 30n, netLiquidity: 9n },
    });

    expect(snap.bands.near.dominance).toBe("DOMINANT_BELOW");
    expect(snap.bands.mid.rangeStructure).toBe("UNBOUNDED");
    expect(snap.bands.far.dominance).toBe("DOMINANT_ABOVE");
  });

  test("determinism — same input same enum", () => {
    const a = generateL15Snapshot(1, "0xpool", 0, {
      near: { liquidity: 10n, netLiquidity: 5n },
      mid:  { liquidity: 10n, netLiquidity: 0n },
      far:  { liquidity: 10n, netLiquidity: -3n },
    });

    const b = generateL15Snapshot(1, "0xpool", 0, {
      near: { liquidity: 10n, netLiquidity: 5n },
      mid:  { liquidity: 10n, netLiquidity: 0n },
      far:  { liquidity: 10n, netLiquidity: -3n },
    });

    expect(a).toEqual(b);
  });
});
