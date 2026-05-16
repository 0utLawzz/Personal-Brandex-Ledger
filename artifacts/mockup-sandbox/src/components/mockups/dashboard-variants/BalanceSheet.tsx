import React from "react";
import { LayoutDashboard, Users, Briefcase, CreditCard, Settings, Search, Bell } from "lucide-react";
import "./_group.css";

const Sidebar = () => (
  <div className="w-[240px] bg-[#0f172a] text-slate-300 flex flex-col h-full shrink-0">
    <div className="p-6 pb-8">
      <h1 className="text-xl font-semibold text-white tracking-tight">Brandex DMS</h1>
    </div>
    <nav className="flex-1 px-4 space-y-1">
      <a href="#" className="flex items-center gap-3 px-3 py-2 bg-white/10 text-white rounded-md font-medium text-sm">
        <LayoutDashboard className="w-4 h-4" />
        Dashboard
      </a>
      <a href="#" className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 hover:text-white rounded-md font-medium text-sm transition-colors">
        <Users className="w-4 h-4" />
        Clients
      </a>
      <a href="#" className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 hover:text-white rounded-md font-medium text-sm transition-colors">
        <Briefcase className="w-4 h-4" />
        Cases
      </a>
      <a href="#" className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 hover:text-white rounded-md font-medium text-sm transition-colors">
        <CreditCard className="w-4 h-4" />
        Payments
      </a>
    </nav>
    <div className="p-4">
      <a href="#" className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 hover:text-white rounded-md font-medium text-sm transition-colors">
        <Settings className="w-4 h-4" />
        Settings
      </a>
    </div>
  </div>
);

export function BalanceSheet() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0">
          <h2 className="text-lg font-medium text-slate-800">Financial Overview</h2>
          <div className="flex items-center gap-4 text-slate-500">
            <button className="hover:text-slate-700">
              <Search className="w-5 h-5" />
            </button>
            <button className="hover:text-slate-700">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 ml-2"></div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8 space-y-8">
          <div className="flex items-center gap-8 text-sm text-slate-600 mb-2">
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-900 text-lg">5</span> Total Clients
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-900 text-lg">9</span> Active Cases
            </div>
          </div>

          <section className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
            <div className="mb-8">
              <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Outstanding Balance</h3>
              <div className="text-5xl font-semibold text-amber-balance tracking-tight">
                PKR 231,000
              </div>
              <div className="text-slate-500 mt-2 font-medium">
                67.6% collected
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-700">PKR 481,000 received</span>
                <span className="text-slate-500">PKR 712,000 billed</span>
              </div>
              <div className="h-4 w-full bg-amber-unfilled rounded-full overflow-hidden flex shadow-inner">
                <div className="bg-slate-fill h-full rounded-full" style={{ width: '67.6%' }}></div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-6 uppercase tracking-wider">Recent Activity</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                  <div>
                    <p className="text-sm text-slate-800 font-medium">Case 43334 moved to Stage 1</p>
                    <p className="text-xs text-slate-500 mt-0.5">2 mins ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
                  <div>
                    <p className="text-sm text-slate-800 font-medium">Payment PKR 70,000 received from Multan Auto Parts</p>
                    <p className="text-xs text-slate-500 mt-0.5">12 mins ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
                  <div>
                    <p className="text-sm text-slate-800 font-medium">Payment PKR 30,000 received from Peshawar Foods Group</p>
                    <p className="text-xs text-slate-500 mt-0.5">12 mins ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
                  <div>
                    <p className="text-sm text-slate-800 font-medium">Payment PKR 100,000 received from Islamabad Pharma</p>
                    <p className="text-xs text-slate-500 mt-0.5">12 mins ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                  <div>
                    <p className="text-sm text-slate-800 font-medium">Case 511293 updated — Stage 4</p>
                    <p className="text-xs text-slate-500 mt-0.5">15 mins ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 shrink-0"></div>
                  <div>
                    <p className="text-sm text-slate-800 font-medium">Case 398471 created for Lahore Textile Mills</p>
                    <p className="text-xs text-slate-500 mt-0.5">18 mins ago</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-6 uppercase tracking-wider">Cases by Stage</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold">1</div>
                    <span className="text-sm font-medium text-slate-700">Filed</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">3</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold">2</div>
                    <span className="text-sm font-medium text-slate-700">Examination</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">3</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold">3</div>
                    <span className="text-sm font-medium text-slate-700">Publication</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">2</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold">4</div>
                    <span className="text-sm font-medium text-slate-700">Registered</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">1</span>
                </div>
              </div>
            </section>
          </div>

        </main>
      </div>
    </div>
  );
}