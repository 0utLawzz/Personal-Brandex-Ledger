import React from "react";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CreditCard,
  Settings,
  TrendingUp,
  Activity,
  BarChart4
} from "lucide-react";
import "./_group.css";

const Sidebar = () => (
  <aside className="w-[240px] bg-[#0f172a] text-slate-300 flex flex-col h-full shrink-0">
    <div className="p-6">
      <h1 className="text-white font-semibold tracking-tight text-xl flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-indigo-500/20 flex items-center justify-center">
          <Activity className="w-4 h-4 text-indigo-400" />
        </div>
        Brandex DMS
      </h1>
    </div>
    
    <nav className="flex-1 px-3 space-y-1 mt-4">
      <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md bg-indigo-500/10 text-indigo-400">
        <LayoutDashboard className="w-5 h-5" />
        <span className="font-medium">Dashboard</span>
      </a>
      <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800/50 transition-colors">
        <Users className="w-5 h-5 opacity-70" />
        <span>Clients</span>
      </a>
      <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800/50 transition-colors">
        <Briefcase className="w-5 h-5 opacity-70" />
        <span>Cases</span>
      </a>
      <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800/50 transition-colors">
        <CreditCard className="w-5 h-5 opacity-70" />
        <span>Payments</span>
      </a>
    </nav>

    <div className="p-3">
      <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800/50 transition-colors">
        <Settings className="w-5 h-5 opacity-70" />
        <span>Settings</span>
      </a>
    </div>
  </aside>
);

const StageCard = ({ name, probability, cases, billed, expected, colorClass }: any) => {
  return (
    <div className="flex-1 flex flex-col bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-800">{name}</h3>
        <span className="text-xs font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
          {cases} Cases
        </span>
      </div>
      
      <div className="space-y-1 mb-6 flex-1">
        <div className="text-2xl font-bold text-slate-900 tracking-tight">
          PKR {expected.toLocaleString()}
        </div>
        <div className="text-sm text-slate-500 flex items-center justify-between">
          <span>Expected value</span>
          <span className={`text-xs font-medium px-1.5 py-0.5 rounded-sm ${colorClass} bg-opacity-10 text-opacity-90 border border-current`}>
            {probability}% likely
          </span>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 mt-auto">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-500">Gross Billed</span>
          <span className="font-medium text-slate-700">PKR {billed.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export function ExpectedValue() {
  const stages = [
    { name: "Stage 1: Filed", probability: 35, cases: 3, billed: 185000, expected: 64750, colorClass: "text-slate-500 border-slate-200" },
    { name: "Stage 2: Examination", probability: 60, cases: 3, billed: 275000, expected: 165000, colorClass: "text-slate-500 border-slate-200" },
    { name: "Stage 3: Publication", probability: 82, cases: 2, billed: 195000, expected: 159900, colorClass: "text-slate-500 border-slate-200" },
    { name: "Stage 4: Registered", probability: 97, cases: 1, billed: 57000, expected: 55290, colorClass: "text-slate-500 border-slate-200" }
  ];

  const totalExpected = 444940;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 font-sans text-slate-900">
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="max-w-6xl w-full mx-auto p-8">
          
          <header className="mb-10 flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Pipeline Valuation</h2>
              <p className="text-sm text-slate-500 mt-1">Weighted expectation across active portfolio.</p>
            </div>

            {/* Top Stat Strip */}
            <div className="flex items-stretch bg-white border border-slate-200 rounded-lg shadow-sm divide-x divide-slate-100">
              <div className="p-6 flex-1">
                <div className="text-sm font-medium text-slate-500 mb-1">Gross Billed</div>
                <div className="text-3xl font-bold text-slate-900 tracking-tight">PKR 712,000</div>
                <div className="text-xs text-slate-400 mt-2">Across 9 cases (5 clients)</div>
              </div>
              <div className="p-6 flex-1 bg-indigo-50/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-sm font-medium text-indigo-700">Expected Value</div>
                    <TrendingUp className="w-3 h-3 text-indigo-500" />
                  </div>
                  <div className="text-3xl font-bold text-indigo-700 tracking-tight">PKR 444,940</div>
                  <div className="text-xs text-indigo-500/80 mt-2 font-medium">Risk gap: PKR 267,060</div>
                </div>
              </div>
              <div className="p-6 flex-1">
                <div className="text-sm font-medium text-slate-500 mb-1">Collected</div>
                <div className="text-3xl font-bold text-slate-700 tracking-tight">PKR 481,000</div>
                <div className="text-xs text-slate-400 mt-2">67.6% realization rate</div>
              </div>
              <div className="p-6 flex-1">
                <div className="text-sm font-medium text-slate-500 mb-1">Outstanding</div>
                <div className="text-3xl font-bold text-slate-700 tracking-tight">PKR 231,000</div>
                <div className="text-xs text-slate-400 mt-2">To be collected</div>
              </div>
            </div>
          </header>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <BarChart4 className="w-4 h-4 text-slate-400" />
                Weighted Portfolio
              </h3>
            </div>

            {/* Pipeline Bar */}
            <div className="h-6 bg-slate-100 rounded-md overflow-hidden flex mb-8 border border-slate-200 shadow-sm">
              <div className="h-full bg-slate-300 transition-all border-r border-slate-400/20" style={{ width: '14.55%' }} title="Stage 1: 14.55%" />
              <div className="h-full bg-slate-400 transition-all border-r border-slate-500/20" style={{ width: '37.08%' }} title="Stage 2: 37.08%" />
              <div className="h-full bg-slate-500 transition-all border-r border-slate-600/20" style={{ width: '35.94%' }} title="Stage 3: 35.94%" />
              <div className="h-full bg-slate-700 transition-all" style={{ width: '12.43%' }} title="Stage 4: 12.43%" />
            </div>

            {/* Stage Cards */}
            <div className="flex gap-4">
              {stages.map((stage, idx) => (
                <StageCard key={idx} {...stage} />
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
