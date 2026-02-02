export type AnchorLifecycle =
  | "ANCHOR_NEW"
  | "ANCHOR_ACTIVE"
  | "ANCHOR_FADING"
  | "ANCHOR_DEAD";

export type RangeLifecycle =
  | "RANGE_ACTIVE"
  | "RANGE_STRESSED"
  | "RANGE_ABANDONED"
  | "RANGE_DEAD";

export type GlobalStructuralState =
  | "STRUCTURE_FORMING"
  | "STRUCTURE_ACTIVE"
  | "STRUCTURE_DEFENDING"
  | "STRUCTURE_WEAKENING"
  | "STRUCTURE_BREAKING"
  | "STRUCTURE_DEAD"
  | "STRUCTURE_RESET"
  | "STRUCTURE_UNCERTAIN";

export type EngineMode =
  | "STRUCTURAL_BUILD"
  | "STRUCTURAL_DEFENSE"
  | "STRUCTURAL_BREAKDOWN"
  | "STRUCTURAL_RESET"
  | "STRUCTURAL_UNCERTAIN";

export type L7Snapshot = {
  timestamp: number;
  blockNumber: number;
  poolAddress: string;

  anchorLifecycle: AnchorLifecycle;
  rangeLifecycle: RangeLifecycle;
  globalStructuralState: GlobalStructuralState;
  engineMode: EngineMode;

  structuralContextSummary?: {
    vacuumVsWall?: string;
    absorptionVsRetreat?: string;
    aheadVsBehind?: string;
    supportRebuild?: string;
  };

  // Optional visualization helper from backend
  lpBands?: {
    near?: "LOW" | "MEDIUM" | "HIGH";
    mid?: "LOW" | "MEDIUM" | "HIGH";
    far?: "LOW" | "MEDIUM" | "HIGH";
  };

  structuralReasons?: string[];
};
