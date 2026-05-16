export function formatPKR(amount: number | undefined | null): string {
  if (amount == null) return "PKR 0";
  return `PKR ${amount.toLocaleString('en-PK')}`;
}

export function getStageColor(stage: number): string {
  if (stage === 1) return "bg-slate-100 text-slate-700 border-slate-200";
  if (stage === 2) return "bg-blue-50 text-blue-700 border-blue-200";
  if (stage === 3) return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-green-50 text-green-700 border-green-200";
}

export const STAGE_LABELS: Record<number, string> = {
  1: "Stage 1 — Filed",
  2: "Stage 2 — Examination",
  3: "Stage 3 — Publication",
  4: "Stage 4 — Registered",
};

export const STAGES = [1, 2, 3, 4];
