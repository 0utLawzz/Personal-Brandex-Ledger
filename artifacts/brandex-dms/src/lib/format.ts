export function formatPKR(amount: number | undefined | null): string {
  if (amount == null) return "PKR 0";
  return `PKR ${amount.toLocaleString('en-PK')}`;
}

export function getStageColor(stage: number): string {
  if (stage < 10) return "bg-slate-100 text-slate-700 border-slate-200";
  if (stage < 20) return "bg-blue-50 text-blue-700 border-blue-200";
  if (stage < 30) return "bg-amber-50 text-amber-700 border-amber-200";
  if (stage < 40) return "bg-orange-50 text-orange-700 border-orange-200";
  return "bg-green-50 text-green-700 border-green-200";
}
