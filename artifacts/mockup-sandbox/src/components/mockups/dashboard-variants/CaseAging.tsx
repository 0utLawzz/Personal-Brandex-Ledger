import React from "react";
import { LayoutDashboard, Users, Briefcase, CreditCard, Settings, AlertTriangle, Activity, CheckCircle2, Clock, FileText, UploadCloud, Gavel } from "lucide-react";

export function CaseAging() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <div className="w-[240px] flex-shrink-0 bg-[#0f172a] text-slate-300 flex flex-col border-r border-slate-800">
        <div className="h-16 flex items-center px-6 border-b border-slate-800/60 bg-[#0a1120]">
          <span className="font-semibold text-white tracking-wide text-sm flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-xs shadow-sm">
              <FileText size={14} className="text-white" />
            </div>
            Brandex DMS
          </span>
        </div>
        
        <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          <div className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-4">Overview</div>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-blue-600/10 text-blue-400">
            <LayoutDashboard size={18} />
            Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800/50 hover:text-slate-100 transition-colors">
            <Users size={18} />
            Clients
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800/50 hover:text-slate-100 transition-colors">
            <Briefcase size={18} />
            Cases
          </button>
          
          <div className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-8">Billing</div>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800/50 hover:text-slate-100 transition-colors">
            <CreditCard size={18} />
            Payments
          </button>
        </div>
        
        <div className="p-3 border-t border-slate-800/60 mt-auto">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800/50 hover:text-slate-100 transition-colors">
            <Settings size={18} />
            Settings
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header Strip */}
        <div className="h-16 flex items-center px-8 border-b border-slate-200 bg-white shadow-sm z-10 flex-shrink-0">
          <h1 className="text-xl font-bold text-slate-800 mr-8">Pipeline Aging</h1>
          
          <div className="flex items-center gap-8 ml-auto text-sm">
            <div className="flex flex-col">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Portfolio</span>
              <span className="font-semibold text-slate-700">9 cases / 5 clients</span>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="flex flex-col">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Billed</span>
              <span className="font-semibold text-slate-700">PKR 712,000</span>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="flex flex-col">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Collected</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-emerald-600">PKR 481,000</span>
                <span className="text-xs bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-medium">67.6%</span>
              </div>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="flex flex-col">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Outstanding</span>
              <span className="font-semibold text-rose-600">PKR 231,000</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto flex p-8 gap-8">
          
          {/* Main Pipeline Area */}
          <div className="flex-1 flex flex-col">
            
            {/* Context/Legend */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Clock className="w-5 h-5 text-slate-400" />
                Case Age Distribution
              </h2>
              <div className="flex items-center gap-4 text-xs font-medium bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm bg-blue-500"></div>
                  <span className="text-slate-600">0-30d</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm bg-amber-400"></div>
                  <span className="text-slate-600">31-60d</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm bg-orange-500"></div>
                  <span className="text-slate-600">61-90d</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm bg-red-600"></div>
                  <span className="text-slate-600">90+d</span>
                </div>
              </div>
            </div>

            {/* Visual Pipeline Bar */}
            <div className="flex h-3 w-full rounded-full overflow-hidden mb-8 shadow-inner bg-slate-200">
              {/* Worst age in segment determines color */}
              <div className="w-[33.3%] bg-amber-400 border-r border-white/40"></div> {/* Worst: 31-60d */}
              <div className="w-[33.3%] bg-orange-500 border-r border-white/40"></div> {/* Worst: 61-90d */}
              <div className="w-[22.2%] bg-red-600 border-r border-white/40"></div> {/* Worst: 90+d */}
              <div className="w-[11.2%] bg-blue-500"></div> {/* Worst: 0-30d */}
            </div>

            {/* Stages Grid */}
            <div className="grid grid-cols-4 gap-4 flex-1">
              
              {/* Stage 1: Filed */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-xl">
                  <div className="font-semibold text-slate-800">1. Filed</div>
                  <div className="text-sm font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">3 cases</div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  {/* Heatmap Bar */}
                  <div className="flex h-6 w-full rounded overflow-hidden mb-4 border border-slate-200/50">
                    <div className="h-full bg-blue-500/90" style={{ width: '66.6%' }}></div>
                    <div className="h-full bg-amber-400/90" style={{ width: '33.3%' }}></div>
                  </div>
                  
                  <div className="space-y-3 mt-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        Healthy <span className="text-xs text-slate-400">(0-30d)</span>
                      </span>
                      <span className="font-semibold text-slate-700">2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                        Watch <span className="text-xs text-slate-400">(31-60d)</span>
                      </span>
                      <span className="font-semibold text-slate-700">1</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-6">
                    <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Oldest Case</div>
                    <div className="text-sm font-semibold text-amber-600 flex items-center gap-1.5 bg-amber-50 px-2 py-1.5 rounded-md border border-amber-100">
                      <Clock size={14} /> 42 days
                    </div>
                  </div>
                </div>
              </div>

              {/* Stage 2: Examination */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-xl">
                  <div className="font-semibold text-slate-800">2. Examination</div>
                  <div className="text-sm font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">3 cases</div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  {/* Heatmap Bar */}
                  <div className="flex h-6 w-full rounded overflow-hidden mb-4 border border-slate-200/50">
                    <div className="h-full bg-blue-500/90" style={{ width: '33.3%' }}></div>
                    <div className="h-full bg-amber-400/90" style={{ width: '33.3%' }}></div>
                    <div className="h-full bg-orange-500/90" style={{ width: '33.3%' }}></div>
                  </div>
                  
                  <div className="space-y-3 mt-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        Healthy
                      </span>
                      <span className="font-semibold text-slate-700">1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                        Watch
                      </span>
                      <span className="font-semibold text-slate-700">1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        Concern <span className="text-xs text-slate-400">(61-90d)</span>
                      </span>
                      <span className="font-semibold text-slate-700">1</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-6">
                    <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Oldest Case</div>
                    <div className="text-sm font-semibold text-orange-600 flex items-center gap-1.5 bg-orange-50 px-2 py-1.5 rounded-md border border-orange-100">
                      <Clock size={14} /> 78 days
                    </div>
                  </div>
                </div>
              </div>

              {/* Stage 3: Publication (Critical) */}
              <div className="bg-white rounded-xl border-2 border-red-500 shadow-md flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-red-50 text-red-500 translate-x-8 -translate-y-8 rotate-45 border-b border-red-200"></div>
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-red-50/30 rounded-t-xl">
                  <div className="font-semibold text-slate-900 flex items-center gap-2">
                    3. Publication
                  </div>
                  <div className="text-sm font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-sm">2 cases</div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  {/* Heatmap Bar */}
                  <div className="flex h-6 w-full rounded overflow-hidden mb-4 border border-slate-200/50">
                    <div className="h-full bg-amber-400/90" style={{ width: '50%' }}></div>
                    <div className="h-full bg-red-600/90" style={{ width: '50%' }}></div>
                  </div>
                  
                  <div className="space-y-3 mt-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                        Watch
                      </span>
                      <span className="font-semibold text-slate-700">1</span>
                    </div>
                    <div className="flex items-center justify-between bg-red-50 -mx-2 px-2 py-1 rounded border border-red-100">
                      <span className="text-red-700 font-medium flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
                        Critical <span className="text-xs text-red-400">(90+d)</span>
                      </span>
                      <span className="font-bold text-red-700">1</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-4">
                    <div className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-md border border-red-200 mb-3">
                      <AlertTriangle size={12} className="fill-red-200" />
                      1 stale case detected
                    </div>
                    <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Oldest Case</div>
                    <div className="text-sm font-bold text-red-700 flex items-center gap-1.5 bg-red-50 px-2 py-1.5 rounded-md border border-red-200">
                      <Clock size={14} /> 94 days (Action Required)
                    </div>
                  </div>
                </div>
              </div>

              {/* Stage 4: Registered */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col opacity-80">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-xl">
                  <div className="font-semibold text-slate-800">4. Registered</div>
                  <div className="text-sm font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">1 case</div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  {/* Heatmap Bar */}
                  <div className="flex h-6 w-full rounded overflow-hidden mb-4 border border-slate-200/50">
                    <div className="h-full bg-blue-500/90" style={{ width: '100%' }}></div>
                  </div>
                  
                  <div className="space-y-3 mt-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        Healthy
                      </span>
                      <span className="font-semibold text-slate-700">1</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-6">
                    <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Oldest Case</div>
                    <div className="text-sm font-semibold text-blue-600 flex items-center gap-1.5 bg-blue-50 px-2 py-1.5 rounded-md border border-blue-100">
                      <Clock size={14} /> 12 days
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Activity Feed (Right Panel) */}
          <div className="w-80 flex flex-col border border-slate-200 bg-white rounded-xl shadow-sm overflow-hidden flex-shrink-0">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Activity size={18} className="text-blue-500" />
                Recent Activity
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Activity Item 1 */}
              <div className="relative pl-6 pb-2 border-l-2 border-slate-100 last:border-0 last:pb-0">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                </div>
                <div className="text-xs text-slate-400 mb-1">Today, 10:42 AM</div>
                <div className="text-sm font-medium text-slate-800">Application Filed</div>
                <div className="text-sm text-slate-500 mt-0.5">Nexus Corp logo mark submitted to IPO.</div>
                <div className="mt-2 text-xs font-medium text-blue-600 bg-blue-50 inline-block px-2 py-1 rounded">Case #4819</div>
              </div>

              {/* Activity Item 2 */}
              <div className="relative pl-6 pb-2 border-l-2 border-slate-100 last:border-0 last:pb-0">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                </div>
                <div className="text-xs text-slate-400 mb-1">Yesterday</div>
                <div className="text-sm font-medium text-slate-800">Payment Received</div>
                <div className="text-sm text-slate-500 mt-0.5">PKR 45,000 collected for TechFlow filing.</div>
              </div>

              {/* Activity Item 3 */}
              <div className="relative pl-6 pb-2 border-l-2 border-slate-100 last:border-0 last:pb-0">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-red-100 border-2 border-white flex items-center justify-center">
                  <AlertTriangle size={10} className="text-red-500" />
                </div>
                <div className="text-xs text-slate-400 mb-1">Oct 12</div>
                <div className="text-sm font-medium text-slate-800">Publication Stalled</div>
                <div className="text-sm text-slate-500 mt-0.5">Apex Innovations case exceeded 90 days in publication phase. Follow-up required.</div>
                <div className="mt-2 text-xs font-medium text-red-600 bg-red-50 inline-block px-2 py-1 rounded border border-red-100">Case #4722</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
