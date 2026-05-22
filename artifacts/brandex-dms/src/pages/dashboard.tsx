import { AppLayout } from "@/components/layout/app-layout";
import { useGetDashboardSummary } from "@workspace/api-client-react";
import { formatPKR } from "@/lib/format";
import { AlertCircle, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const STAGE_NAMES = ["Filed", "Examination", "Publication", "Registered"];
const STAGE_BAR = ["bg-slate-200", "bg-blue-200", "bg-indigo-300", "bg-emerald-400"];
const STAGE_DOT = ["bg-slate-300", "bg-blue-400", "bg-indigo-400", "bg-emerald-400"];
const STAGE_CARD = [
  "bg-slate-50 border-slate-100",
  "bg-blue-50 border-blue-100",
  "bg-indigo-50 border-indigo-100",
  "bg-emerald-50 border-emerald-100",
];
const STAGE_LABEL = ["text-slate-700", "text-blue-900", "text-indigo-900", "text-emerald-900"];

function activityDotColor(details: string): string {
  const d = (details ?? "").toLowerCase();
  if (d.includes("payment") || d.includes("received")) return "bg-emerald-500";
  if (d.includes("stage 4") || d.includes("registered")) return "bg-emerald-600";
  if (d.includes("stage 3") || d.includes("publication")) return "bg-indigo-500";
  if (d.includes("stage 2") || d.includes("examination")) return "bg-blue-500";
  return "bg-slate-400";
}

export default function Dashboard() {
  const { data: summary, isLoading } = useGetDashboardSummary();

  if (isLoading || !summary) {
    return (
      <AppLayout>
        <div className="flex flex-col h-full overflow-hidden">
          <div className="h-20 bg-white border-b border-slate-200 animate-pulse shrink-0" />
          <div className="flex-1 p-10">
            <div className="h-8 w-48 bg-slate-200 rounded animate-pulse mb-8" />
            <div className="h-64 bg-slate-200 rounded-xl animate-pulse" />
          </div>
        </div>
      </AppLayout>
    );
  }

  const totalDue = Number(summary.totalDue);
  const totalReceived = Number(summary.totalReceived);
  const outstanding = totalDue - totalReceived;
  const collectionRate =
    totalDue > 0 ? ((totalReceived / totalDue) * 100).toFixed(1) : "0.0";

  const totalCasesInPipeline =
    summary.casesByStage.reduce((s, i) => s + i.count, 0) || 1;

  const stages = [1, 2, 3, 4].map((n, i) => {
    const found = summary.casesByStage.find((s) => s.stage === n);
    return {
      stage: n,
      name: STAGE_NAMES[i],
      count: found?.count ?? 0,
      bar: STAGE_BAR[i],
      dot: STAGE_DOT[i],
      card: STAGE_CARD[i],
      label: STAGE_LABEL[i],
    };
  });

  return (
    <AppLayout>
      <div className="flex flex-col h-full overflow-hidden">

        {/* Compact Financial Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center px-8 shrink-0">
          <div className="flex items-center gap-10">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Portfolio
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-extrabold text-slate-800 tracking-tight">
                  {summary.totalCases}
                </span>
                <span className="text-sm font-medium text-slate-500">Cases</span>
                <span className="text-slate-300 px-1">/</span>
                <span className="text-xl font-extrabold text-slate-800 tracking-tight">
                  {summary.totalClients}
                </span>
                <span className="text-sm font-medium text-slate-500">Clients</span>
              </div>
            </div>

            <div className="h-10 w-px bg-slate-100" />

            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Total Billed
              </p>
              <p className="text-xl font-bold text-slate-800 font-mono tracking-tight">
                {formatPKR(summary.totalDue)}
              </p>
            </div>

            <div className="h-10 w-px bg-slate-100" />

            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Collected
              </p>
              <div className="flex items-center gap-3">
                <p className="text-xl font-bold text-emerald-600 font-mono tracking-tight">
                  {formatPKR(summary.totalReceived)}
                </p>
                <span className="text-xs font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100">
                  {collectionRate}%
                </span>
              </div>
            </div>

            <div className="h-10 w-px bg-slate-100" />

            <div>
              <p className="text-[11px] font-bold text-amber-500/80 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                Outstanding <AlertCircle size={12} strokeWidth={3} />
              </p>
              <p className="text-xl font-bold text-amber-600 font-mono tracking-tight">
                {formatPKR(outstanding)}
              </p>
            </div>
          </div>
        </header>

        {/* Body: pipeline + activity */}
        <div className="flex-1 flex overflow-hidden">

          {/* Pipeline main area */}
          <main className="flex-1 overflow-y-auto p-10 bg-slate-50/50">
            <div className="max-w-5xl">
              <div className="mb-10">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Active Pipeline
                </h1>
                <p className="text-sm text-slate-500 mt-1.5">
                  Case progression and financial exposure by stage.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                {/* Proportional bar */}
                <div className="flex h-12 rounded-lg overflow-hidden shadow-inner border border-slate-200 mb-8">
                  {stages.map((s, i) => {
                    const pct = (s.count / totalCasesInPipeline) * 100;
                    return (
                      <div
                        key={s.stage}
                        className={`${s.bar} hover:brightness-95 transition-all flex items-center justify-center${i < 3 ? " border-r border-white/50" : ""}`}
                        style={{ width: `${pct}%`, minWidth: s.count > 0 ? "8%" : "0" }}
                      >
                        <span className="font-bold text-slate-700 text-sm">{s.count}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Stage cards */}
                <div className="flex gap-4">
                  {stages.map((s) => (
                    <div
                      key={s.stage}
                      className={`flex-1 ${s.card} border rounded-xl p-5 hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <div className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
                        <h4 className={`text-xs font-bold ${s.label} uppercase tracking-wide`}>
                          Stage {s.stage}: {s.name}
                        </h4>
                      </div>
                      <p className="text-3xl font-extrabold text-slate-800 tracking-tight">
                        {s.count}{" "}
                        <span className="text-sm font-medium text-slate-500 tracking-normal">
                          {s.count === 1 ? "case" : "cases"}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>

          {/* Right activity panel */}
          <aside className="w-[340px] bg-white border-l border-slate-200 flex flex-col shrink-0 shadow-[-4px_0_24px_-12px_rgba(0,0,0,0.05)]">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-2">
              <Clock size={16} className="text-slate-400" />
              <h3 className="font-semibold text-slate-800">Recent Activity</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {summary.recentActivity.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-8">No recent activity</p>
              ) : (
                <div className="relative space-y-7">
                  <div className="absolute top-2 bottom-0 left-[11px] w-px bg-slate-100" />
                  {summary.recentActivity.map((activity) => {
                    const dotColor = activityDotColor(activity.details ?? "");
                    return (
                      <div key={activity.id} className="relative pl-8">
                        <div
                          className={`absolute left-[7px] top-1.5 w-2.5 h-2.5 ${dotColor} rounded-full ring-4 ring-white`}
                        />
                        <p className="text-sm text-slate-700 leading-snug font-medium">
                          {activity.action}
                        </p>
                        {activity.details && (
                          <p className="text-xs text-slate-500 mt-0.5">{activity.details}</p>
                        )}
                        <p className="text-xs text-slate-400 mt-1">
                          {formatDistanceToNow(new Date(activity.createdAt), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}
