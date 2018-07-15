export interface World {
  id: number;
  currentStepId: number;
}

// SystemJS bug:
// TS file must export something real in JS, not just interfaces
export const _dummy = undefined;
