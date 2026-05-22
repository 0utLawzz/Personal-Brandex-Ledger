import React from "react";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  CreditCard, 
  Settings,
  ArrowRight,
  ArrowDown,
  AlertTriangle,
  Activity,
  ArrowRightLeft
} from "lucide-react";
import "./_group.css";

export function Throughput() {
  return (
    <div className="flex h-[800px] w-[1280px] overflow-hidden bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-[240px] bg-[#0f172a] text-slate-300 flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <span className="text-white font-semibold text-lg tracking-tight">Brandex DMS</span>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-indigo-600/10 text-indigo-400 rounded-md group">
            <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800/50 hover:text-slate-100 rounded-md group transition-colors">
            <Users className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">Clients</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800/50 hover:text-slate-100 rounded-md group transition-colors">
            <Briefcase className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">Cases</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800/50 hover:text-slate-100 rounded-md group transition-colors">
            <CreditCard className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">Payments</span>
          </a>
        </nav>

        <div className="p-3 mt-auto">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800/50 hover:text-slate-100 rounded-md group transition-colors">
            <Settings className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">Settings</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 shrink-0">
          <h1 className="text-xl font-semibold text-slate-900">Pipeline Flow & Throughput</h1>
        </header>

        <div className="flex-1 overflow-auto">
          <div className="p-8 max-w-6xl mx-auto flex gap-8">
            
            {/* Left/Main Column - The Pipeline Flow */}
            <div className="flex-1 space-y-8">
              
              {/* Pipeline Overview Bar */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-indigo-500" />
                    System Throughput (Last 30 Days)
                  </h2>
                  <div className="text-sm text-slate-500">
                    <span className="font-medium text-slate-700">9 Active Cases</span> · 5 Clients
                  </div>
                </div>

                <div className="relative pt-6">
                  {/* Flow deltas */}
                  <div className="absolute top-0 left-0 w-full flex text-xs font-medium">
                    <div className="w-[33%] text-center text-emerald-600">+1 net</div>
                    <div className="w-[33%] text-center text-emerald-600">+1 net</div>
                    <div className="w-[22%] text-center text-amber-600 font-bold">+1 net</div>
                    <div className="w-[12%] text-center text-slate-400">0 net</div>
                  </div>
                  
                  {/* Pipeline Bar */}
                  <div className="h-4 w-full flex rounded-full overflow-hidden bg-slate-100">
                    <div className="h-full bg-slate-300" style={{ width: '33%' }}></div>
                    <div className="h-full bg-slate-400 border-l border-white/20" style={{ width: '33%' }}></div>
                    <div className="h-full bg-amber-400 border-l border-white/20 relative overflow-hidden" style={{ width: '22%' }}>
                      <div className="absolute inset-0 bg-amber-500/20 striped-bg"></div>
                    </div>
                    <div className="h-full bg-slate-700 border-l border-white/20" style={{ width: '12%' }}></div>
                  </div>
                </div>
              </div>

              {/* Stage Flow Cards */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Stage Velocity</h3>
                
                {/* Stage 1 */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex items-center">
                  <div className="w-48 shrink-0">
                    <div className="text-xs text-slate-400 font-medium mb-1">STAGE 1</div>
                    <div className="text-lg font-semibold text-slate-800">Filed</div>
                  </div>
                  <div className="flex-1 flex items-center justify-between px-8">
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-slate-500 text-sm mb-1 justify-center">
                        <ArrowDown className="w-4 h-4 text-emerald-500" /> In
                      </div>
                      <div className="text-2xl font-semibold text-slate-800">4</div>
                    </div>
                    <div className="w-24 h-px bg-slate-200 relative">
                      <ArrowRight className="w-4 h-4 text-slate-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1 box-content" />
                    </div>
                    <div className="text-center">
                      <div className="text-slate-500 text-sm mb-1">Current</div>
                      <div className="text-3xl font-bold text-indigo-600">3</div>
                    </div>
                    <div className="w-24 h-px bg-slate-200 relative">
                      <ArrowRight className="w-4 h-4 text-slate-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1 box-content" />
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-slate-500 text-sm mb-1 justify-center">
                        Out <ArrowRight className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div className="text-2xl font-semibold text-slate-800">2</div>
                    </div>
                  </div>
                </div>

                {/* Stage 2 */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex items-center">
                  <div className="w-48 shrink-0">
                    <div className="text-xs text-slate-400 font-medium mb-1">STAGE 2</div>
                    <div className="text-lg font-semibold text-slate-800">Examination</div>
                  </div>
                  <div className="flex-1 flex items-center justify-between px-8">
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-slate-500 text-sm mb-1 justify-center">
                        <ArrowDown className="w-4 h-4 text-amber-500" /> In
                      </div>
                      <div className="text-2xl font-semibold text-slate-800">2</div>
                    </div>
                    <div className="w-24 h-px bg-slate-200 relative">
                      <ArrowRight className="w-4 h-4 text-slate-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1 box-content" />
                    </div>
                    <div className="text-center">
                      <div className="text-slate-500 text-sm mb-1">Current</div>
                      <div className="text-3xl font-bold text-indigo-600">3</div>
                    </div>
                    <div className="w-24 h-px bg-slate-200 relative">
                      <ArrowRight className="w-4 h-4 text-slate-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1 box-content" />
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-slate-500 text-sm mb-1 justify-center">
                        Out <ArrowRight className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div className="text-2xl font-semibold text-slate-800">1</div>
                    </div>
                  </div>
                </div>

                {/* Stage 3 - Bottleneck */}
                <div className="bg-amber-50/50 rounded-xl border-2 border-amber-200 shadow-sm p-5 flex items-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                  <div className="w-48 shrink-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="text-xs text-amber-700 font-bold">STAGE 3</div>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 uppercase tracking-wide">Bottleneck</span>
                    </div>
                    <div className="text-lg font-bold text-slate-900">Publication</div>
                  </div>
                  <div className="flex-1 flex items-center justify-between px-8">
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-slate-500 text-sm mb-1 justify-center">
                        <ArrowDown className="w-4 h-4 text-amber-500" /> In
                      </div>
                      <div className="text-2xl font-semibold text-slate-800">1</div>
                    </div>
                    <div className="w-24 h-px bg-amber-200 relative">
                      <ArrowRight className="w-4 h-4 text-amber-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-50/50 px-1 box-content" />
                    </div>
                    <div className="text-center">
                      <div className="text-amber-700 text-sm font-medium mb-1">Current</div>
                      <div className="text-3xl font-black text-amber-600">2</div>
                    </div>
                    <div className="w-24 h-px bg-red-200 relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-50/50 px-1 text-red-400 font-bold text-xs line-through">
                        <ArrowRight className="w-4 h-4 inline-block" />
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-red-600 font-medium text-sm mb-1 justify-center">
                        Out <AlertTriangle className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-2xl font-black text-red-600">0</div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-4 text-xs font-medium text-red-500">
                    No cases advanced this month
                  </div>
                </div>

                {/* Stage 4 */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex items-center opacity-75">
                  <div className="w-48 shrink-0">
                    <div className="text-xs text-slate-400 font-medium mb-1">STAGE 4</div>
                    <div className="text-lg font-semibold text-slate-800">Registered</div>
                  </div>
                  <div className="flex-1 flex items-center justify-between px-8">
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-slate-500 text-sm mb-1 justify-center">
                        <ArrowDown className="w-4 h-4 text-slate-400" /> In
                      </div>
                      <div className="text-2xl font-semibold text-slate-600">1</div>
                    </div>
                    <div className="w-24 h-px bg-slate-200 relative">
                      <ArrowRight className="w-4 h-4 text-slate-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1 box-content" />
                    </div>
                    <div className="text-center">
                      <div className="text-slate-500 text-sm mb-1">Current</div>
                      <div className="text-3xl font-bold text-slate-700">1</div>
                    </div>
                    <div className="w-24 h-px bg-slate-200 relative">
                      <ArrowRight className="w-4 h-4 text-slate-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1 box-content" />
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-slate-500 text-sm mb-1 justify-center">
                        Out <ArrowRight className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div className="text-2xl font-semibold text-slate-600">1</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column - Flow Summary */}
            <div className="w-80 shrink-0 space-y-6">
              <div className="bg-slate-900 rounded-xl p-6 text-white shadow-lg">
                <h3 className="font-semibold text-slate-300 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <ArrowRightLeft className="w-4 h-4 text-indigo-400" />
                  Flow Summary
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="text-4xl font-light tracking-tight mb-1">3</div>
                    <div className="text-sm text-slate-400 font-medium">cases advanced this month</div>
                  </div>
                  
                  <div className="h-px w-full bg-slate-800"></div>
                  
                  <div>
                    <div className="text-3xl font-light tracking-tight mb-1">4</div>
                    <div className="text-sm text-slate-400 font-medium">new cases filed</div>
                  </div>

                  <div className="h-px w-full bg-slate-800"></div>
                  
                  <div>
                    <div className="text-2xl font-light tracking-tight text-amber-400 mb-1">~45 days</div>
                    <div className="text-sm text-slate-400 font-medium">avg stage time</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions / Insights */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <h4 className="text-sm font-semibold text-slate-800 mb-3">System Insights</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-red-50 text-red-800 rounded-lg border border-red-100 leading-relaxed">
                    <strong>Publication phase stalled.</strong> Accumulation at Stage 3 indicates blocking external dependencies.
                  </div>
                  <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-100 leading-relaxed">
                    <strong>Intake remains healthy.</strong> Stage 1 cleared 50% of incoming volume this period.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
