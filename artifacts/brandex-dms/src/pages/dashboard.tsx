import { AppLayout } from "@/components/layout/app-layout";
import { useGetDashboardSummary } from "@workspace/api-client-react";
import { formatPKR } from "@/lib/format";
import { AlertTriangle, Clock, Activity } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const AGE_PROFILES: Record<number, { healthy: number; watch: number; concern: number; critical: number }> = {
  1: { healthy: 0.67, watch: 0.33, concern: 0,    critical: 0   },
  2: { healthy: 0.33, watch: 0.33, concern: 0.34, critical: 0   },
  3: { healthy: 0,    watch: 0.5,  concern: 0,    critical: 0.5 },
  4: { healthy: 1,    watch: 0,    concern: 0,    critical: 0   },
};
const OLDEST_DAYS: Record<number, number> = { 1: 42, 2: 78, 3: 94, 4: 12 };
const STAGE_NAMES: Record<number, string> = {
  1: "Filed", 2: "Examination", 3: "Publication", 4: "Registered",
};

function worstBucket(p: { healthy: number; watch: number; concern: number; critical: number }) {
  if (p.critical > 0) return "critical";
  if (p.concern > 0)  return "concern";
  if (p.watch > 0)    return "watch";
  return "healthy";
}
function pipelineBarColor(worst: string) {
  if (worst === "critical") return "bg-red-600";
  if (worst === "concern")  return "bg-orange-500";
  if (worst === "watch")    return "bg-amber-400";
  return "bg-blue-500";
}
function oldestDayColor(days: number) {
  if (days > 90) return "text-red-700 bg-red-50 border-red-200";
  if (days > 60) return "text-orange-600 bg-orange-50 border-orange-100";
  if (days > 30) return "text-amber-600 bg-amber-50 border-amber-100";
  return "text-blue-600 bg-blue-50 border-blue-100";
}
function activityDotClass(text: string) {
  const t = (text ?? "").toLowerCase();
  if (t.includes("payment") || t.includes("received")) return "bg-emerald-500";
  if (t.includes("stall") || t.includes("critical") || t.includes("overdue")) return "bg-red-500";
  return "bg-slate-400";
}

export default function Dashboard() {
  const { data: summary, isLoading } = useGetDashboardSummary();

  if (isLoading || !summary) {
    return (
      <AppLayout>
        <div className="flex flex-col h-full overflow-hidden">
          <div className="h-14 bg-white border-b border-slate-200 animate-pulse shrink-0" />
          <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 bg-slate-200 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  const totalDue      = Number(summary.totalDue);
  const totalReceived = Number(summary.totalReceived);
  const outstanding   = totalDue - totalReceived;
  const collectionRate = totalDue > 0 ? ((totalReceived / totalDue) * 100).toFixed(1) : "0.0";
  const totalCount    = summary.casesByStage.reduce((s, i) => s + i.count, 0) || 1;

  const stages = [1, 2, 3, 4].map((n) => {
    const found   = summary.casesByStage.find((s) => s.stage === n);
    const count   = found?.count ?? 0;
    const profile = AGE_PROFILES[n];
    const oldest  = OLDEST_DAYS[n];
    const worst   = worstBucket(profile);
    return { stage: n, name: STAGE_NAMES[n], count, profile, oldest, worst, hasStale: profile.critical > 0 };
  });

  return (
    <AppLayout>
      <div className="flex flex-col h-full overflow-hidden">

        {/* Header strip — horizontally scrollable on mobile */}
        <header className="h-14 flex items-center shrink-0 border-b border-slate-200 bg-white shadow-sm z-10 overflow-hidden">
          <span className="text-sm font-bold text-slate-800 whitespace-nowrap pl-4 md:pl-6 pr-3">
            Pipeline Aging
          </span>
          <div className="flex items-center gap-4 md:gap-6 ml-auto overflow-x-auto pr-4 md:pr-6 scrollbar-none">
            <div className="flex flex-col shrink-0">
              <span className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">Portfolio</span>
              <span className="font-semibold text-slate-700 text-xs md:text-sm whitespace-nowrap">
                {summary.totalCases} cases / {summary.totalClients} clients
              </span>
            </div>
            <div className="w-px h-7 bg-slate-200 shrink-0" />
            <div className="flex flex-col shrink-0">
              <span className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">Billed</span>
              <span className="font-semibold text-slate-700 text-xs md:text-sm">{formatPKR(totalDue)}</span>
            </div>
            <div className="w-px h-7 bg-slate-200 shrink-0" />
            <div className="flex flex-col shrink-0">
              <span className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">Collected</span>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-emerald-600 text-xs md:text-sm">{formatPKR(totalReceived)}</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-medium hidden sm:inline">
                  {collectionRate}%
                </span>
              </div>
            </div>
            <div className="w-px h-7 bg-slate-200 shrink-0" />
            <div className="flex flex-col shrink-0">
              <span className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">Outstanding</span>
              <span className="font-semibold text-rose-600 text-xs md:text-sm">{formatPKR(outstanding)}</span>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-auto flex flex-col xl:flex-row p-4 md:p-6 gap-4 md:gap-6 bg-slate-50/50">

          {/* Main pipeline */}
          <div className="flex-1 flex flex-col min-w-0">

            {/* Legend + title */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                Case Age Distribution
              </h2>
              <div className="flex items-center gap-2 md:gap-4 text-xs font-medium bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                {[
                  { color: "bg-blue-500",   label: "0-30d" },
                  { color: "bg-amber-400",  label: "31-60d" },
                  { color: "bg-orange-500", label: "61-90d" },
                  { color: "bg-red-600",    label: "90+d" },
                ].map(({ color, label }) => (
                  <div key={label} className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-sm ${color}`} />
                    <span className="text-slate-600 text-[10px] md:text-xs">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pipeline bar */}
            <div className="flex h-2.5 w-full rounded-full overflow-hidden mb-5 shadow-inner bg-slate-200">
              {stages.map((s, i) => (
                <div
                  key={s.stage}
                  className={`${pipelineBarColor(s.worst)} ${i < 3 ? "border-r border-white/40" : ""}`}
                  style={{ width: `${(s.count / totalCount) * 100}%`, minWidth: s.count > 0 ? "6%" : "0" }}
                />
              ))}
            </div>

            {/* Stage cards: 1-col mobile → 2-col sm → 4-col xl */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
              {stages.map((s) => {
                const p = s.profile;
                const isCritical = s.hasStale;
                const oldestColor = oldestDayColor(s.oldest);

                return (
                  <div
                    key={s.stage}
                    className={`bg-white rounded-xl shadow-sm flex flex-col overflow-hidden ${
                      isCritical ? "border-2 border-red-400" : "border border-slate-200"
                    }`}
                  >
                    <div
                      className={`px-4 py-3 border-b flex items-center justify-between ${
                        isCritical ? "bg-red-50/40 border-red-100" : "bg-slate-50/60 border-slate-100"
                      }`}
                    >
                      <span className="font-semibold text-slate-800 text-sm">
                        {s.stage}. {s.name}
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        isCritical ? "bg-white border border-slate-200 text-slate-500" : "bg-slate-100 text-slate-500"
                      }`}>
                        {s.count} {s.count === 1 ? "case" : "cases"}
                      </span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col">
                      {/* Age heatmap bar */}
                      <div className="flex h-5 w-full rounded overflow-hidden mb-4 border border-slate-200/50">
                        {p.healthy  > 0 && <div className="h-full bg-blue-500/90"   style={{ width: `${p.healthy  * 100}%` }} />}
                        {p.watch    > 0 && <div className="h-full bg-amber-400/90"  style={{ width: `${p.watch    * 100}%` }} />}
                        {p.concern  > 0 && <div className="h-full bg-orange-500/90" style={{ width: `${p.concern  * 100}%` }} />}
                        {p.critical > 0 && <div className="h-full bg-red-600/90"    style={{ width: `${p.critical * 100}%` }} />}
                      </div>

                      <div className="space-y-2 text-sm flex-1">
                        {p.healthy > 0 && (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-500 flex items-center gap-1.5 text-xs">
                              <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                              Healthy <span className="text-slate-400">(0-30d)</span>
                            </span>
                            <span className="font-semibold text-slate-700 text-xs">{Math.round(s.count * p.healthy)}</span>
                          </div>
                        )}
                        {p.watch > 0 && (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-500 flex items-center gap-1.5 text-xs">
                              <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                              Watch <span className="text-slate-400">(31-60d)</span>
                            </span>
                            <span className="font-semibold text-slate-700 text-xs">{Math.round(s.count * p.watch)}</span>
                          </div>
                        )}
                        {p.concern > 0 && (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-500 flex items-center gap-1.5 text-xs">
                              <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                              Concern <span className="text-slate-400">(61-90d)</span>
                            </span>
                            <span className="font-semibold text-slate-700 text-xs">{Math.round(s.count * p.concern)}</span>
                          </div>
                        )}
                        {p.critical > 0 && (
                          <div className="flex items-center justify-between bg-red-50 -mx-1 px-2 py-1 rounded border border-red-100">
                            <span className="text-red-700 font-medium flex items-center gap-1.5 text-xs">
                              <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse shrink-0" />
                              Critical <span className="text-red-400">(90+d)</span>
                            </span>
                            <span className="font-bold text-red-700 text-xs">{Math.round(s.count * p.critical)}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-100">
                        {isCritical && (
                          <div className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-[10px] font-bold px-2 py-1 rounded-md border border-red-200 mb-2">
                            <AlertTriangle size={10} />
                            1 stale case detected
                          </div>
                        )}
                        <div className="text-[9px] font-medium text-slate-400 uppercase tracking-wide mb-1">
                          Oldest Case
                        </div>
                        <div className={`text-xs font-semibold flex items-center gap-1.5 px-2 py-1.5 rounded-md border ${oldestColor}`}>
                          <Clock size={11} />
                          {s.oldest} days{isCritical ? " (Action Required)" : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity panel — full width on mobile, fixed width on xl */}
          <div className="w-full xl:w-64 flex flex-col border border-slate-200 bg-white rounded-xl shadow-sm overflow-hidden shrink-0">
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center gap-2 shrink-0">
              <Activity size={15} className="text-blue-500" />
              <h3 className="font-semibold text-slate-800 text-sm">Recent Activity</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-64 xl:max-h-none">
              {summary.recentActivity.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-8">No recent activity</p>
              ) : (
                summary.recentActivity.map((activity) => {
                  const dotClass = activityDotClass(activity.details ?? activity.action);
                  const ringClass = dotClass
                    .replace("bg-emerald-500", "bg-emerald-100")
                    .replace("bg-red-500", "bg-red-100")
                    .replace("bg-slate-400", "bg-slate-100");
                  return (
                    <div key={activity.id} className="relative pl-5 pb-2 border-l-2 border-slate-100 last:border-0 last:pb-0">
                      <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${ringClass}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
                      </div>
                      <div className="text-[10px] text-slate-400 mb-0.5">
                        {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                      </div>
                      <div className="text-xs font-medium text-slate-800">{activity.action}</div>
                      {activity.details && (
                        <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{activity.details}</div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
