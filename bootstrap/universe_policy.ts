// bootstrap/universe_policy.ts

export type UniverseMode = "STATIC" | "DISCOVERY";

export interface UniversePolicy {
  readonly mode: UniverseMode;
  readonly staticPools?: readonly string[];
  readonly discoveryFactory?: readonly string[];
  readonly maxPools: number;
}

/**
 * HARD RULES:
 * - Universe MUST be deterministic
 * - Discovery MUST be logged + versioned
 * - Any change REQUIRES engine restart
 */
export function createUniversePolicy(
  policy: UniversePolicy
): Readonly<UniversePolicy> {
  validateUniversePolicy(policy);
  return Object.freeze({
    ...policy,
    staticPools: policy.staticPools ? Object.freeze([...policy.staticPools]) : undefined,
    discoveryFactory: policy.discoveryFactory
      ? Object.freeze([...policy.discoveryFactory])
      : undefined
  });
}

function validateUniversePolicy(policy: UniversePolicy): void {
  if (policy.mode === "STATIC" && !policy.staticPools?.length) {
    throw new Error("STATIC universe requires staticPools");
  }

  if (policy.mode === "DISCOVERY" && !policy.discoveryFactory?.length) {
    throw new Error("DISCOVERY universe requires discoveryFactory");
  }

  if (policy.maxPools <= 0) {
    throw new Error("maxPools must be > 0");
  }
}
